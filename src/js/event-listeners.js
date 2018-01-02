const { ipcRenderer } = require('electron');

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
		$(".qmrkdown-editor").css("width", "50%");
		$("#mdpreview").css("display", "block");
		renderPages();
	} else {
		$("#mdpreview").css("display", "none");
		$(".qmrkdown-editor").css("width", "100%");
	}
})

ipcRenderer.on('immersion', (event, arg) => {
	if (arg) {
		$("head link.immersion").get(0).setAttribute("href", "./src/css/immersion.css");
	} else {
		$("head link.immersion").get(0).setAttribute("href", "");
	}
})

ipcRenderer.on('outline', (event, arg) => {
	if (arg) {
		$(".qmarkdown-view").addClass("span9")
		$(".outline").removeClass("hidden");
	} else {
		$(".qmarkdown-view").removeClass("span9");
		$(".outline").addClass("hidden");
	}
	renderPages();
})

ipcRenderer.on('init-finish', function () {
	$("body > .cover").remove();
})

ipcRenderer.send('load-events');