const { ipcRenderer } = require('electron');

const pxpermm = $("#perm").width() / 1000;

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
	var html = '<div class="page"><div class="padding"><div class="frame">' + marked(md) + '</div></div></div>';
	html = html.replace(/<!--page-->/g, '</div></div></div><div class="page"><div class="padding"><div class="frame">');
	return html;
}

function renderFile() {
	$("#mdpreview").get(0).innerHTML = md2html($("#mdinput").val());
	$('pre code').each(function(i, block) {
		hljs.highlightBlock(block);
	});
	$("pre code").each(function () {
		$(this).html("<ul><li>" + $(this).html().replace(/\n/g, "\n</li><li>") + "</li></ul>");
		$(this).html($(this).html().replace(/<li><\/li><\/ul>/g, "</ul>"));
	});
	let destWidth = ($("#mdpreview").width() - 2 * parseInt($("div.page").css("marginLeft")));
	let srcWidth = $("div.page").width(), srcHeight = 0;
	let e = destWidth / srcWidth;
	let margin = parseInt($("div.page").css("margin"));
	$("div.page").each(function (i) {
		$(this).css({"top": srcHeight + "px"});
		srcHeight += e * (margin + $(this).height());
	})
}

function previewResize() {
	let destWidth = ($("#mdpreview").width() - 2 * parseInt($("div.page").css("marginLeft")));
	let srcWidth = $("div.page").width();
	let e = destWidth / srcWidth;
	renderFile();
	$("head style.paper-zoom").get(0).innerHTML = "div.page{transform: scale(" + e + "," + e + ")}";
}

$("#mdinput").get(0).addEventListener('input', renderFile);

$("#mdinput").get(0).addEventListener('propertychange', renderFile);

$(function () {
	$("#mdinput").focus();
	(window.onresize = previewResize)();
})

ipcRenderer.on('changeCodeFlavour', (event, arg) => {
	$("head link.code-flavour").get(0).setAttribute('href', arg);
})

ipcRenderer.on('changeDocumentFlavour', (event, arg) => {
	$("head link.flavour").get(0).setAttribute('href', arg);
})

ipcRenderer.on('changePaperSize', (event, arg) => {
	let link = $("head link.paper-size").get(0);
	link.setAttribute('href', arg);
	styleOnload(link, previewResize);
})

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
