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
	var html = '<div class="page">' + marked(md) + '</div>';
	html = html.replace(/<!--page-->/g, '</div><div class="page">');
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
	})
}

function previewResize() {
	console.log($("div.page").width());
	let destWidth = ($("#mdpreview").width() - 2.5 * parseInt($("div.page").css("marginLeft")));
	let srcWidth = $("div.page").width();
	let e = destWidth / srcWidth;
	$("head style.paper-zoom").get(0).innerHTML = "div.page{transform: scale(" + e + "," + e + ")}"
}

$("#mdinput").get(0).addEventListener('input', function () {
	renderFile();
});

$("#mdinput").get(0).addEventListener('propertychange', function () {
	renderFile();
});

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
	$("head link.paper-size").get(0).setAttribute('href', arg);
})
