hljs.initHighlightingOnLoad();

const { ipcRenderer } = require('electron');

const pxpermm = $("#perm").width() / 1000;

const renderers = [function () {
	$('pre.hljs-pre code').each(function(i, block) {
		hljs.highlightBlock(block);
	});
	$("pre.hljs-pre code").each(function () {
		$(this).html("<ul><li>" + $(this).html().replace(/\n/g, "\n</li><li>") + "</li></ul>");
		$(this).html($(this).html().replace(/<li><\/li><\/ul>/g, "</ul>"));
	});
}]

marked.setOptions({
	renderer: new marked.Renderer(),
	gfm: true,
	tables: true,
	breaks: false,
	pedantic: false,
	sanitize: false,
	smartLists: true,
	smartypants: false
});

function md2html(md) {
	let html = '<div class="page"><div class="padding"><div class="frame">' + marked(md) + '</div></div></div>';
	html = html.replace(/<!--page-->/gi, '</div></div></div><div class="page"><div class="padding"><div class="frame">');
	let v = html.match(/<!--style:([^-]+)-->/gi);
	if (v) for (x of v) {
		html = '<link rel="stylesheet" href="./flavour/custom/css/' + /<!--style:([^-]+)-->/gi.exec(x)[1] + '.css"/>' + html;
	}
	v = html.match(/<!--import:([^-]+)-->/gi);
	if (v) for (x of v) {
		html += '<script type="text/javascript" src="./flavour/custom/js/' + /<!--import:([^-]+)-->/gi.exec(x)[1] + '.js"/>';
	}
	return html;
}

function renderFile() {
	$("#mdpreview").get(0).innerHTML = md2html($("#mdinput").val());
	for (renderer of renderers) {
		renderer();
	}
	let destWidth = ($("#mdpreview").width() - 2 * parseInt($("div.page").css("marginLeft")));
	let srcWidth = $("div.page").width(), srcHeight = 0;
	let e = destWidth / srcWidth;
	let margin = parseInt($("div.page").css("margin"));
	$("div.page").each(function (i) {
		$(this).css({"top": srcHeight + "px"});
		srcHeight += e * (margin + $(this).height());
	})
}

function renderPages() {
	let destWidth = ($("#mdpreview").width() - 2 * parseInt($("div.page").css("marginLeft")));
	let srcWidth = $("div.page").width();
	let e = destWidth / srcWidth;
	renderFile();
	$("head style.paper-zoom").get(0).innerHTML = "div.page{transform: scale(" + e + "," + e + ")}";
}

function styleOnload(node, callback) {
	// for IE6-9 and Opera
	if (node.attachEvent) {
		node.attachEvent('onload', callback);
	}
	// polling for Firefox, Chrome, Safari
	else {
		setTimeout(function() {
			poll(node, callback);
		}, 0.1); // for cache
	}
}

function poll(node, callback) {
	if (callback.isCalled) {
		return;
	}
	var isLoaded = false;
	if (/webkit/i.test(navigator.userAgent)) {//webkit
		if (node['sheet']) {
			isLoaded = true;
		}
	}
	// for Firefox
	else if (node['sheet']) {
		try {
			if (node['sheet'].cssRules) {
				isLoaded = true;
			}
		} catch (ex) {
			// NS_ERROR_DOM_SECURITY_ERR
			if (ex.code === 1000) {
				isLoaded = true;
			}
		}
	}
	if (isLoaded) {
		// give time to render.
		setTimeout(function() {
			callback();
		}, 1);
	}
	else {
		setTimeout(function() {
			poll(node, callback);
		}, 1);
	}
}

$("#mdinput").get(0).addEventListener('input', renderFile);

$("#mdinput").get(0).addEventListener('propertychange', renderFile);

$(function () {
	$("#mdinput").focus();
	(window.onresize = renderPages)();
})

ipcRenderer.on('changeCodeFlavour', (event, arg) => {
	$("head link.code-flavour").get(0).setAttribute('href', arg);
})

ipcRenderer.on('changeDocumentFlavour', (event, arg) => {
	$("head link.flavour").get(0).setAttribute('href', arg);
})

ipcRenderer.on('changePaperSize', (event, arg) => {
	let link = $("head link.paper-size").get(0);
	styleOnload(link, renderPages);
	link.setAttribute('href', arg);
})

ipcRenderer.on('setAutoHeight', (event, arg) => {
	let link = $("head link.auto-height").get(0);
	if (arg != "") {
		styleOnload(link, renderPages);
	} else {
		renderPages();
	}
	link.setAttribute('href', arg);
})

ipcRenderer.on('save', (event, arg) => {
	ipcRenderer.send('save', $("#mdinput").val(), arg);
})

ipcRenderer.on('exportHTML', (event, arg) => {
	let head = "";
	let js = "";
	let xhr = new XMLHttpRequest();
	$("head link:not(.native)").each(function () {
		xhr.open("get", this.href, false);
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4) {
				if (xhr.status == 200) {
					head += '<style>\n' + xhr.responseText.replace(/<\/style>/g, "<\\\/style>") + '\n</style>';
				} else {
					throw xhr.status;
				}
			}
		}
		xhr.send(null);
	})
	$("head style:not(.native)").each(function (){
		head += "<style>\n" + this.innerHTML.replace(/<\/style>/g, "<\\\/style>") + "\n</style>"
	})
	head += "<style>\ndiv.page{border-width:0 !important;margin:0 !important;left:0 !important;top:0 !important;position:relative !important}\n</style>"
	$("body div.scripts script:not(.native)").each(function () {
		xhr.open("get", this.src, false);
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4) {
				if (xhr.status == 200) {
					js += '<script type="text/javascript">\n' + xhr.responseText.replace(/<\/script>/g, "<\\\/script>") + '\n</script>';
				} else {
					throw xhr.status;
				}
			}
		}
		xhr.send(null);
	})
	let html = "<!DOCTYPE html><html><head>" + head + "</head><body>" + $("#mdpreview").get(0).innerHTML + js + "</body></html>";
	ipcRenderer.send('exportHTML', html, arg);
})

ipcRenderer.on('exportPDF', (event, arg) => {
	let options = {
		marginsType: 0,
		pageSize: {
			width: 0,
			height: 0
		}
	}
	let xhr = new XMLHttpRequest();
	xhr.open("get", $("head link.paper-size").get(0).href, false);
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				let file = xhr.responseText;
				options.pageSize.width = /width\s*\:\s*([^;\}\s]+)/g.exec(file);
				if (options.pageSize.width.length < 2) {
					throw "invalid paper size";
				}
				let c = /[a-zA-Z_]+/g.exec(options.pageSize.width[1]);
				if (c.length == 0) {
					throw "invalid paper size measurement";
				}
				options.pageSize.width = parseFloat(options.pageSize.width[1]);
				switch (c[0]) {
					case "cm": options.pageSize.width *= 10*1000; break;
					case "mm": options.pageSize.width *= 1000; break;
					case "m": options.pageSize.width *= 1000*1000; break;
					default: throw "invalid paper size measurement";
				}
				options.pageSize.height = /min\-height\s*\:\s*([^;\}\s]+)/g.exec(file);
				if (options.pageSize.height.length < 2) {
					throw "invalid paper size";
				}
				c = /[a-zA-Z_]+/g.exec(options.pageSize.height[1]);
				if (c.length == 0) {
					throw "invalid paper size measurement";
				}
				options.pageSize.height = parseFloat(options.pageSize.height[1]);
				switch (c[0]) {
					case "cm": options.pageSize.height *= 10*1000; break;
					case "mm": options.pageSize.height *= 1000; break;
					case "m": options.pageSize.height *= 1000*1000; break;
					default: throw "invalid paper size measurement";
				}
			} else {
				throw xhr.status;
			}
		}
	}
	xhr.send(null);
	ipcRenderer.send('exportPDF', options, arg);
})

ipcRenderer.on('setTitle', (event, arg) => {
	$("head title").get(0).innerHTML = "QMarkdown" + (function(filepath) {
		if (filepath) {
			let names = filepath.split("\\");
			return " - " + names[names.length - 1];
		} else {
			return "";
		}
	}) (arg);
})

ipcRenderer.on('open', (event, arg) => {
	let xhr = new XMLHttpRequest();
	if (arg) {
		xhr.open("get", arg, false);
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4) {
				if (xhr.status == 200) {
					$("#mdinput").val(xhr.responseText);
				} else {
					throw xhr.status;
				}
			}
		}
		xhr.send(null);
	} else {
		$("#mdinput").val("");
	}
	renderFile();
})