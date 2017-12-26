const { ipcRenderer } = require('electron');

const editor = CodeMirror.fromTextArea($("#mdinput").get(0), {
	lineNumbers: true,
	lineWrapping: true,
	styleActiveLine: true,
	mode: "markdown",
	foldGutter: true,
	gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
	indentUnit: 4,
	smartIndent: true,
	extraKeys: {
		Tab: function () {
			if (editor.somethingSelected()) {
				editor.indentSelection('add');
			} else {
				editor.replaceSelection(editor.getOption() ? "\t" : Array(editor.getOption("indentUnit") + 1).join(" "), "end", "+input");
			}
		}
	}
});

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

let mdconverter = marked;//markdown.toHTML;
let fileState = [true, true];
let fileContent = "";

function md2html(md) {
	// let mds = md.split("$$");
	// for (let i = 1; i < mds.length; i += 2) {
		// mds[i] = mds[i].replace(/([\+\-\>#_])/g, "\\$1");
	// }
	// md = mds.join("$$");
	let html = '<div class="page"><div class="padding"><div class="frame">' + mdconverter(md) + '</div></div></div>';
	html = html.replace(/<!--page-->/gi, '</div></div></div><div class="page"><div class="padding"><div class="frame">');
	let v = html.match(/<!--style:([^-]+)-->/gi);
	if (v) for (x of v) {
		html = '<link rel="stylesheet" href="./flavour/custom/css/' + /<!--style:([^-]+)-->/gi.exec(x)[1] + '.css"/>' + html;
	}
	v = html.match(/<!--import:([^-]+)-->/gi);
	if (v) for (x of v) {
		html += '<script type="text/javascript" src="./flavour/custom/js/' + /<!--import:([^-]+)-->/gi.exec(x)[1] + '.js"/>';
	}
	// html = html.replace(/<!--::((?:(?:[^-]|-(?=-->))|-[^-]|--[^>])*)-->((?:.|\n)*)<!---->/g);
	return '<div class="qmarkdown-preview-frame">' + html + '</div>';
}

function asyncEach(o, f, b, e) {
	!function () {
		let obj = o, func = f, breaker = b, onEndLoop = e;
		if (obj.length) {
			(function asyncEachHelper(obj, iter, func) {
				setTimeout(function () {
					func(iter, obj[iter]);
					if (iter + 1 != obj.length && (!breaker || !breaker())) {
						asyncEachHelper(obj, iter + 1, func);
					} else {
						if (onEndLoop) {
							onEndLoop();
						}
					}
				}, 0);
			}) (obj, 0, func);
		} else {
			if (onEndLoop) {
				onEndLoop();
			}
		}
	} ();
}

let renderer = {
	occupied: false,
	hangUp: false,
	extra: false,
	rendering: false,
	confirm: true,
	renderers: [],
	cacheData: {},
	timer: function () {
		let self = this;
		setTimeout(function () {
			if (self.hangUp) {
				self.hangUp = false;
				self.extra = false;
				self.render();
				self.timer();
			} else {
				if (self.extra) {
					self.occupied = false;
					self.extra = false;
				} else {
					self.extra = true;
					self.render(true);
					self.timer();
				}
			}
		}, 150)
	},
	stopRender: function () {
		if (this.rendering) {
			this.rendering = false;
		}
	},
	toggle: function () {
		this.stopRender();
		// this.render(true);
		if (this.occupied) {
			this.hangUp = true;
		} else {
			this.occupied = true;
			this.render();
			this.timer();
		}
	},
	cache: function (section, index, size) {
		if (!this.cacheData[section]) {
			this.cacheData[section] = []
		}
		if (index == this.cacheData[section].length) {
			this.cacheData[section].push(size)
		} else {
			this.cacheData[section][index] = size;
		}
	},
	readCache: function (section, index) {
		if (!this.cacheData[section] || this.cacheData[section].length <= index) {
			return undefined;
		} else {
			return this.cacheData[section][index];
		}
	},
	generateRenderers: function() {
		this.renderers = [];
		let self = this;
		$('#mdpreview .frame .katex-block:not(.qmarkdown-cache)').each(function(i, block) {
			self.renderers.push(function (){
				renderMathInElement(block);
				$(block).removeClass("qmarkdown-rendering");
				// block.removeAttribute('style');
				self.cache("katex-block", i, block)
				// {
				// 	width: $(block).find(".katex-display").width(), 
				// 	height: $(block).find(".katex-display").height() + 2 * parseInt($(block).find(".katex-display").css("marginTop"))
				// })
				//$(block).find(".katex-html").height()
			})
		})
		$('#mdpreview .frame .katex-inline-block:not(.qmarkdown-cache)').each(function(i, block) {
			self.renderers.push(function (){
				renderMathInElement(block);
				$(block).removeClass("qmarkdown-rendering");
				// block.removeAttribute('style');
				self.cache("katex-inline-block", i, block)
				// 	width: $(block).width(), 
				// 	height: $(block).height()
				// })
			})
		})
		$('#mdpreview .frame pre code:not(.qmarkdown-cache').each(function(i, block) {
			self.renderers.push(function (){
				hljs.highlightBlock(block);
				$(block).removeClass("qmarkdown-rendering");
				self.cache("code", i, block);
				// {
				// 	width: $(block).width(), 
				// 	height: $(block).height()
				// })
			})
		})
	},
	preloadHtml: function (html) {
		let self = this;
		function modClass(x) {
			x = x.split(/(<!--qtag-begin\|(?:(?:(?:[^-]|-(?=-->))|-[^-]|--[^>])*)-->|<!--qtag-end-->)/g);
			var l = [x[0]], br = [], cr;
			for (let i = 1; i < x.length; i += 2) {
				let cap;
				if (cap = /^<!--qtag-begin\|((?:(?:[^-]|-(?=-->))|-[^-]|--[^>])*)-->/.exec(x[i])) {
					br.push(cap[1]);
					l.push(x[i + 1]);
				} else {
					if (l.length == 1) {
						l[l.length - 1] += x[i + 1];
					} else {
						let y = $('<div></div>');
						y.html(l.pop());
						y.children().addClass(br.pop());
						l[l.length - 1] += y.html() + x[i + 1];
					}
				}
			}
			return $(l[0]);
		}
		let dom = modClass(html);
		dom.find('.frame .katex-block:not(.qmarkdown-cache)').each(function(i, block) {
			let obj = self.readCache("katex-block", i);
			if (obj) {
				$(obj).addClass("qmarkdown-cache");
				$(block).addClass("qmarkdown-rendering");
				$(block).after(obj);
				// $(obj).prependTo(block);
			}
		})
		dom.find('.frame .katex-inline-block:not(.qmarkdown-cache)').each(function(i, block) {
			let obj = self.readCache("katex-inline-block", i);
			if (obj) {
				$(obj).addClass("qmarkdown-cache");
				$(block).addClass("qmarkdown-rendering");
				$(block).after(obj);
				// $(obj).prependTo(block)
			}
		})
		dom.find('.frame pre code:not(.qmarkdown-cache)').each(function(i, block) {
			let obj = self.readCache("code", i);
			if (obj) {
				$(obj).addClass("qmarkdown-cache");
				$(block).addClass("qmarkdown-rendering");
				$(block).after(obj);
				// $(obj).prependTo(block)
			}
			// let size = self.readCache("code", i);
			// if (size) {
			// 	block.setAttribute('style', 'width:' + size.width + 'px;height:' + size.height + 'px;display:block;overflow:hidden')
			// }
		})
		return dom;
	},
	render: function (whole) {
		let self = this;
		setTimeout(function () {
			$("#mdpreview").html(self.preloadHtml(md2html(editor.getValue())));
			if (whole) {
				self.generateRenderers();
				self.confirm = false;
				self.rendering = true;
				asyncEach(self.renderers, function (i, renderer) {
					renderer();
				}, function () {
					if (!self.rendering) {
						console.log("terminated");
					}
					return !self.rendering;
				}, function () {
					self.rendering = false;
					self.confirm = true;
				}/*, function () {
					$("#mdpreview").get(0).scrollTop = scrollPos;
				}*/);
			}
		}, 0);
	}
}

function renderFile() {
	renderer.toggle();
}

function renderPages() {
	let destWidth = $("#mdpreview").width() - 16;// - 2 * parseInt($("div.page").css("marginLeft"));
	let srcWidth = $("div.page").width() + 2 * parseInt($("div.page").css("marginLeft"));
	let e = destWidth / srcWidth;
	renderFile();
	$("head style.paper-zoom").get(0).innerHTML = ".qmarkdown-preview-frame{transform: scale(" + e + "," + e + ")}";
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
		// callback();
		setTimeout(function() {
			callback();
		}, 0.2);
	}
	else {
		setTimeout(function() {
			poll(node, callback);
		}, 0.2);
	}
}

let sideBar = {
	dom: $("div.side-bar").get(0),
	showing: false,
	width: "300px",
	toggle: function () {
		if (this.showing = !this.showing) {
			this.dom.style.left = "0";
			$(this.dom).focus();
		} else {
			this.dom.style.left = "-" + this.width;
			editor.focus();
		}
	}
}

let configure = {
	data: {},
	defaultConf: {},
	lock: {},
	setter: {},
	images: [],
	dump: function () {
		// console.log(this.images);
		for (x in this.data) {
			if (x[0] == '$') {
				if (!~this.images.indexOf(x)) {
					delete this.data[x];
				}
			}
		}
		return "<!--|" + JSON.stringify(this.data) + "|-->\n";
	},
	set: function (key, val) {
		let origin = this.data;
		let l = key.split(".");
		let k = l.pop();
		for (let x of l) {
			origin = !origin[x] ? (origin[x] = {}) : origin[x];
		}
		if (this.setter[key]) {
			this.setter[key](val, origin[k]);
		}
		origin[k] = val;
	},
	get: function (key) {
		let origin = this.data;
		let l = key.split(".");
		let k = l.pop();
		for (let x of l) {
			origin = !origin[x] ? (origin[x] = {}) : origin[x];
		}
		return origin[k];
	},
	load: function(conf) {
		let self = this;
		this.images = [];
		(function iter(keys, conf) {
			for (x in conf) {
				if (typeof conf[x] == "object" && !(conf[x] instanceof Array)) {
					iter((keys ? keys + "." : "") + x, conf[x]);
				} else {
					if (x[0] != '$') {
						self.set((keys ? keys + "." : "") + x, conf[x]);
					} else {
						self.setImage((keys ? keys + "." : "") + x, conf[x]);
					}
				}
			}
		}) ("", conf);
	},
	reloadImageList: function() {
		this.images = [];
	},
	getNextImageIndex: function() {
		for (var i = 0; i != 65536; ++i) {
			if (!~this.images.indexOf('$' + i)) {
				return '$' + i;
			}
		}
		return '$';
	},
	setImage: function(key, val) {
		let self = this;
		!function (url, callback, outputFormat){
			var canvas = document.createElement('CANVAS'),
			  ctx = canvas.getContext('2d'),
			  img = new Image;
			img.crossOrigin = 'Anonymous';
			img.onload = function(){
				canvas.height = img.height;
				canvas.width = img.width;
				ctx.drawImage(img,0,0);
				var dataURL = canvas.toDataURL(outputFormat || 'image/png');
				callback.call(this, dataURL);
				canvas = null; 
			};
			img.src = url;
		} (val, function (base64URL) {
			self.set(key, base64URL);
		});
	},
	getImage: function(href) {
		let h = this.get(href);
		if (h) {
			if (!~this.images.indexOf(href)) {
				this.images.push(href);
			}
			return h;
		} else {
			return "";
		}
	},
	bind: function (selector, key, options) {
		let self = this;
		!function () {
			if (!('setter' in options)) {
				options.setter = function () {}
			}
			let k = key;
			let e = $(selector);
			let f = options.setter;
			let v = options.default
			e.bind("input propertychange", function () {
				if (!self.lock[k]) {
					self.lock[k] = true;
					self.set(k, getval());
					self.lock[k] = false;
				}
			});
			if (v instanceof Array) {
				if (typeof v[0] != "function") {
					let y = v[0];
					v[0] = (x) => { return x == undefined || x == y; };
				}
			} else {
				v = [(x) => { return x == undefined || x == ""; }, v];
			}
			let origin = self.defaultConf;
			let l = k.split(".");
			let ky = l.pop();
			for (let x of l) {
				origin = !origin[x] ? (origin[x] = {}) : origin[x];
			}
			origin[ky] = undefined;
			switch (options.type) {
			case "value": {
				let getval = () => e.val();
				self.setter[k] = function (value) {
					if (v[0](value)) { value = v[1]; }
					e.val(value);
					f(value);
				}; } break;
			case "href": {
				let getval = () => e.href;
				self.setter[k] = function (value) {
					if (v[0](value)) { value = v[1]; }
					e.get(0).setAttribute("href", value);
					f(value);
				}; } break;
			default:
				throw "not defined";
			}
		} ();
	},
	init: function () {
		this.load(this.defaultConf);
	}
}

$("#mdpreview").click(function () {
	let dom = $("#mdpreview .frame .marked-elem:hover");
	if (dom) {
		dom = $(dom.get(dom.length - 1));
		let start = dom.attr("data-start"), end = dom.attr("data-end");
		if (start && end) {
			start = parseInt(start), end = parseInt(end);
			let text = editor.getValue();
			let text1 = text.substr(0, start);
			let text2 = text.substr(0, end);
			let s = text1.split('\n').length - 1;
			let t = text2.split('\n').length - 1;
			let s1 = s ? start - text1.lastIndexOf('\n') - 1 : start;
			let t1 = t ? end - text2.lastIndexOf('\n') - 1 : end;
			// $("#mdinput").get(0).setSelectionRange(, dom.attr("data-end"));
			editor.setSelection({
				line: t,
				ch: t1
			}, {
				line: s,
				ch: s1
			})
			editor.focus();
		}
	}
})

$("#mdpreview").mousemove(function () {
	let v = $("#mdpreview .marked-elem:hover");
	if (v.length) {
		let s = $("#mdpreview .marked-elem-hover");
		if (v[v.length - 1] != s[0]) {
			s.removeClass("marked-elem-hover");
			$(v[v.length - 1]).addClass("marked-elem-hover");
		}
	} else {
		$("#mdpreview .marked-elem-hover").removeClass("marked-elem-hover");
	}
})

editor.on("change", function (self, changeObj) {
	renderFile();
	fileState[0] = editor.getValue() == fileContent;
});

// Properties

configure.bind("#page-margin-top", "page.margin.top", {
	type: "value",
	default: "2.54",
	setter: function (value) {
		$("head style.page-padding-top").get(0).innerHTML =
		"div.page div.padding {padding-top:" + value + "cm} @page {margin-top:" + value + "cm}";
		renderFile();
	}
});

configure.bind("#page-margin-bottom", "page.margin.bottom", {
	type: "value",
	default: "2.54",
	setter: function (value) {
		$("head style.page-padding-bottom").get(0).innerHTML =
		  "div.page div.padding {padding-bottom:" + value + "cm} @page {margin-bottom:" + value + "cm}";
		renderFile();
	}
});

configure.bind("#page-margin-left", "page.margin.left", {
	type: "value",
	default: "1.91",
	setter: function (value) {
		$("head style.page-padding-left").get(0).innerHTML =
		  "div.page div.padding {padding-left:" + value + "cm} @page {margin-left:" + value + "cm}";
		$("head style.print-padding").get(0).innerHTML = 
		  "@media print {div.frame {padding-right:" + (parseFloat(value) + parseFloat(configure.get("page.margin.right"))) + "cm !important; box-sizing: border-box !important}}";
		renderFile();
	}
});

configure.bind("#page-margin-right", "page.margin.right", {
	type: "value",
	default: "1.91",
	setter: function (value) {
		$("head style.page-padding-right").get(0).innerHTML =
		  "div.page div.padding {padding-right:" + value + "cm} @page {margin-right:" + value + "cm}";
		$("head style.print-padding").get(0).innerHTML = 
		  "@media print {div.frame {padding-right:" + (parseFloat(value) + parseFloat(configure.get("page.margin.left"))) + "cm !important; box-sizing: border-box !important}}";
		renderFile();
	}
});

configure.bind("head link.paper-size", "page.paper", {
	type: "href",
	default: "paper\\A4.css",
	setter: function (value) {
		styleOnload($("head link.paper-size").get(0), renderPages);
	}
});

configure.bind("head link.code-flavour", "flavour.code", {
	type: "href",
	default: "flavour\\code\\github.css"
});

configure.bind("head link.flavour", "flavour.document", {
	type: "href",
	default: "flavour\\default.css"
});

// Event listeners

ipcRenderer.on('changeCodeFlavour', (event, arg) => {
	configure.set("flavour.code", arg);
})

ipcRenderer.on('changeDocumentFlavour', (event, arg) => {
	configure.set("flavour.document", arg);
})

ipcRenderer.on('changePaperSize', (event, arg) => {
	configure.set("page.paper", arg);
})

ipcRenderer.on('setAutoHeight', (event, arg) => {
	let link = $("head link.auto-height").get(0);
	link.setAttribute('href', arg);
	if (arg != "") {
		styleOnload(link, renderPages);
	} else {
		renderPages();
	}
})

ipcRenderer.on('save', (event, arg, after) => {
	fileState[0] = true, fileState[1] = true;
	ipcRenderer.send('save', configure.dump() + editor.getValue(), arg, after);
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
					let file = xhr.responseText;
					let conf = file.match(/^<!--\|[^\|]*\|-->[\n]/);
					if (conf) {
						conf = JSON.parse(conf[0].match(/\|([^\|]*)\|/)[1]);
						configure.init();
						configure.load(conf);
						editor.setValue(file.replace(/^<!--\|[^\|]*\|-->[\n]/, ""));
						fileState = [true, true];
						fileContent = editor.getValue();
					} else {
						editor.setValue(file);
						fileState = [true, false];
						fileContent = editor.getValue();
					}
				} else {
					throw xhr.status;
				}
			}
		}
		xhr.send(null);
	} else {
		configure.init();
		editor.setValue("");
		fileState = [true, true];
		fileContent = editor.getValue();
	}
	editor.clearHistory()
	renderFile();
})

ipcRenderer.on('toggleSideBar', () => {
	sideBar.toggle()
})

ipcRenderer.on('checkFileState', (event, arg) => {
	ipcRenderer.send('checkFileState', arg, fileState);
})

ipcRenderer.on('insertImage', (event, arg) => {
	!function (img, callback) {
		var xhr = new XMLHttpRequest(); 
		img = "file:///" + img;
		xhr.responseType = 'blob'; 
		xhr.onload = function () {
			r = new FileReader();
			r.onload = function(){
				callback(r.result);
			}
			r.readAsDataURL(xhr.response);
		}
		xhr.open('GET', img, true);
		xhr.send();
	} (arg, function(base64) {
		let ix = configure.getNextImageIndex();
		configure.setImage(ix, base64);
		editor.replaceSelections(['![](' + ix + ')'])
	})
})

ipcRenderer.on('showPreview', (event, arg) => {
	if (arg) {
		$(".main").css("width", "50%");
		$("#mdpreview").css("display", "block");
	} else {
		$("#mdpreview").css("display", "none");
		$(".main").css("width", "100%");
	}
})

ipcRenderer.on('immersion', (event, arg) => {
	if (arg) {
		$("head link.immersion").get(0).setAttribute("href", "./src/css/immersion.css");
	} else {
		$("head link.immersion").get(0).setAttribute("href", "");
	}
})

$(function () {
	editor.focus();
	(window.onresize = renderPages)();
	configure.init();
})