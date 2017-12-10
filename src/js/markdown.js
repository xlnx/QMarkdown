/**
 * marked - a markdown parser
 * Copyright (c) 2011-2014, Christopher Jeffrey. (MIT Licensed)
 * https://github.com/chjj/marked
 */

;(function() {
	
	/**
	 * Block-Level Grammar
	 */
	
	var block = {
		newline: /^\n+/,
		code: /^( {4}[^\n]+\n*)+/,
		fences: noop,
		hr: /^( *[-*_]){3,} *(?:\n+|$)/,
		heading: /^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,
		nptable: noop,
		lheading: /^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,
		blockquote: /^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,
		list: /^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
		html: /^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,
		def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,
		table: noop,
		paragraph: /^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,
		text: /^[^\n]+/
	};
	
	block.bullet = /(?:[*+-]|\d+\.)/;
	block.item = /^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/;
	block.item = replace(block.item, 'gm')
		(/bull/g, block.bullet)
		();
	
	block.list = replace(block.list)
		(/bull/g, block.bullet)
		('hr', '\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))')
		('def', '\\n+(?=' + block.def.source + ')')
		();
	
	block.blockquote = replace(block.blockquote)
		('def', block.def)
		();
	
	block._tag = '(?!(?:'
		+ 'a|em|strong|small|s|cite|q|dfn|abbr|data|time|code'
		+ '|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo'
		+ '|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b';
	
	block.html = replace(block.html)
		('comment', /<!--[\s\S]*?-->/)
		('closed', /<(tag)[\s\S]+?<\/\1>/)
		('closing', /<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)
		(/tag/g, block._tag)
		();
	
	block.paragraph = replace(block.paragraph)
		('hr', block.hr)
		('heading', block.heading)
		('lheading', block.lheading)
		('blockquote', block.blockquote)
		('tag', '<' + block._tag)
		('def', block.def)
		();
	
	/**
	 * Normal Block Grammar
	 */
	
	block.normal = merge({}, block);
	
	/**
	 * GFM Block Grammar
	 */
	
	block.gfm = merge({}, block.normal, {
		fences: /^ *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]*?)\s*\1 *(?:\n+|$)/,
		paragraph: /^/,
		heading: /^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/
	});
	
	block.gfm.paragraph = replace(block.paragraph)
		('(?!', '(?!'
		+ block.gfm.fences.source.replace('\\1', '\\2') + '|'
		+ block.list.source.replace('\\1', '\\3') + '|')
		();
	
	/**
	 * GFM + Tables Block Grammar
	 */
	
	block.tables = merge({}, block.gfm, {
		nptable: /^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,
		table: /^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/
	});
	
	/**
	 * Block Lexer
	 */
	
	function Lexer(options) {
		this.tokens = [];
		this.tokens.links = {};
		this.options = options || marked.defaults;
		this.rules = block.normal;
	
		if (this.options.gfm) {
		if (this.options.tables) {
			this.rules = block.tables;
		} else {
			this.rules = block.gfm;
		}
		}
	}
	
	/**
	 * Expose Block Rules
	 */
	
	Lexer.rules = block;
	
	/**
	 * Static Lex Method
	 */
	
	Lexer.lex = function(src, options) {
		var lexer = new Lexer(options);
		return lexer.lex(src);
	};
	
	/**
	 * Preprocessing
	 */
	
	Lexer.prototype.lex = function(src) {
		src = src
		.replace(/\r\n|\r/g, '\n')
		.replace(/\t/g, '    ')
		.replace(/\u00a0/g, ' ')
		.replace(/\u2424/g, '\n');
	
		return this.token(src, true);
	};
	
	/**
	 * Lexing
	 */
	
	Lexer.prototype.token = function(src, top, bq) {
		var src = src.replace(/^ +$/gm, '')
		, next
		, loose
		, cap
		, bull
		, b
		, item
		, space
		, i
		, l;
	
		while (src) {
		// newline
		if (cap = this.rules.newline.exec(src)) {
			src = src.substring(cap[0].length);
			if (cap[0].length > 1) {
			this.tokens.push({
				type: 'space'
			});
			}
		}
	
		// code
		if (cap = this.rules.code.exec(src)) {
			src = src.substring(cap[0].length);
			cap = cap[0].replace(/^ {4}/gm, '');
			this.tokens.push({
			type: 'code',
			text: !this.options.pedantic
				? cap.replace(/\n+$/, '')
				: cap
			});
			continue;
		}
	
		// fences (gfm)
		if (cap = this.rules.fences.exec(src)) {
			src = src.substring(cap[0].length);
			this.tokens.push({
			type: 'code',
			lang: cap[2],
			text: cap[3] || ''
			});
			continue;
		}
	
		// heading
		if (cap = this.rules.heading.exec(src)) {
			src = src.substring(cap[0].length);
			this.tokens.push({
			type: 'heading',
			depth: cap[1].length,
			text: cap[2]
			});
			continue;
		}
	
		// table no leading pipe (gfm)
		if (top && (cap = this.rules.nptable.exec(src))) {
			src = src.substring(cap[0].length);
	
			item = {
			type: 'table',
			header: cap[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),
			align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
			cells: cap[3].replace(/\n$/, '').split('\n')
			};
	
			for (i = 0; i < item.align.length; i++) {
			if (/^ *-+: *$/.test(item.align[i])) {
				item.align[i] = 'right';
			} else if (/^ *:-+: *$/.test(item.align[i])) {
				item.align[i] = 'center';
			} else if (/^ *:-+ *$/.test(item.align[i])) {
				item.align[i] = 'left';
			} else {
				item.align[i] = null;
			}
			}
	
			for (i = 0; i < item.cells.length; i++) {
			item.cells[i] = item.cells[i].split(/ *\| */);
			}
	
			this.tokens.push(item);
	
			continue;
		}
	
		// lheading
		if (cap = this.rules.lheading.exec(src)) {
			src = src.substring(cap[0].length);
			this.tokens.push({
			type: 'heading',
			depth: cap[2] === '=' ? 1 : 2,
			text: cap[1]
			});
			continue;
		}
	
		// hr
		if (cap = this.rules.hr.exec(src)) {
			src = src.substring(cap[0].length);
			this.tokens.push({
			type: 'hr'
			});
			continue;
		}
	
		// blockquote
		if (cap = this.rules.blockquote.exec(src)) {
			src = src.substring(cap[0].length);
	
			this.tokens.push({
			type: 'blockquote_start'
			});
	
			cap = cap[0].replace(/^ *> ?/gm, '');
	
			// Pass `top` to keep the current
			// "toplevel" state. This is exactly
			// how markdown.pl works.
			this.token(cap, top, true);
	
			this.tokens.push({
			type: 'blockquote_end'
			});
	
			continue;
		}
	
		// list
		if (cap = this.rules.list.exec(src)) {
			src = src.substring(cap[0].length);
			bull = cap[2];
	
			this.tokens.push({
			type: 'list_start',
			ordered: bull.length > 1
			});
	
			// Get each top-level item.
			cap = cap[0].match(this.rules.item);
	
			next = false;
			l = cap.length;
			i = 0;
	
			for (; i < l; i++) {
			item = cap[i];
	
			// Remove the list item's bullet
			// so it is seen as the next token.
			space = item.length;
			item = item.replace(/^ *([*+-]|\d+\.) +/, '');
	
			// Outdent whatever the
			// list item contains. Hacky.
			if (~item.indexOf('\n ')) {
				space -= item.length;
				item = !this.options.pedantic
				? item.replace(new RegExp('^ {1,' + space + '}', 'gm'), '')
				: item.replace(/^ {1,4}/gm, '');
			}
	
			// Determine whether the next list item belongs here.
			// Backpedal if it does not belong in this list.
			if (this.options.smartLists && i !== l - 1) {
				b = block.bullet.exec(cap[i + 1])[0];
				if (bull !== b && !(bull.length > 1 && b.length > 1)) {
				src = cap.slice(i + 1).join('\n') + src;
				i = l - 1;
				}
			}
	
			// Determine whether item is loose or not.
			// Use: /(^|\n)(?! )[^\n]+\n\n(?!\s*$)/
			// for discount behavior.
			loose = next || /\n\n(?!\s*$)/.test(item);
			if (i !== l - 1) {
				next = item.charAt(item.length - 1) === '\n';
				if (!loose) loose = next;
			}
	
			this.tokens.push({
				type: loose
				? 'loose_item_start'
				: 'list_item_start'
			});
	
			// Recurse.
			this.token(item, false, bq);
	
			this.tokens.push({
				type: 'list_item_end'
			});
			}
	
			this.tokens.push({
			type: 'list_end'
			});
	
			continue;
		}
	
		// html
		if (cap = this.rules.html.exec(src)) {
			src = src.substring(cap[0].length);
			this.tokens.push({
			type: this.options.sanitize
				? 'paragraph'
				: 'html',
			pre: !this.options.sanitizer
				&& (cap[1] === 'pre' || cap[1] === 'script' || cap[1] === 'style'),
			text: cap[0]
			});
			continue;
		}
	
		// def
		if ((!bq && top) && (cap = this.rules.def.exec(src))) {
			src = src.substring(cap[0].length);
			this.tokens.links[cap[1].toLowerCase()] = {
			href: cap[2],
			title: cap[3]
			};
			continue;
		}
	
		// table (gfm)
		if (top && (cap = this.rules.table.exec(src))) {
			src = src.substring(cap[0].length);
	
			item = {
			type: 'table',
			header: cap[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),
			align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
			cells: cap[3].replace(/(?: *\| *)?\n$/, '').split('\n')
			};
	
			for (i = 0; i < item.align.length; i++) {
			if (/^ *-+: *$/.test(item.align[i])) {
				item.align[i] = 'right';
			} else if (/^ *:-+: *$/.test(item.align[i])) {
				item.align[i] = 'center';
			} else if (/^ *:-+ *$/.test(item.align[i])) {
				item.align[i] = 'left';
			} else {
				item.align[i] = null;
			}
			}
	
			for (i = 0; i < item.cells.length; i++) {
			item.cells[i] = item.cells[i]
				.replace(/^ *\| *| *\| *$/g, '')
				.split(/ *\| */);
			}
	
			this.tokens.push(item);
	
			continue;
		}
	
		// top-level paragraph
		if (top && (cap = this.rules.paragraph.exec(src))) {
			src = src.substring(cap[0].length);
			this.tokens.push({
			type: 'paragraph',
			text: cap[1].charAt(cap[1].length - 1) === '\n'
				? cap[1].slice(0, -1)
				: cap[1]
			});
			continue;
		}
	
		// text
		if (cap = this.rules.text.exec(src)) {
			// Top-level should never reach here.
			src = src.substring(cap[0].length);
			this.tokens.push({
			type: 'text',
			text: cap[0]
			});
			continue;
		}
	
		if (src) {
			throw new
			Error('Infinite loop on byte: ' + src.charCodeAt(0));
		}
		}
	
		return this.tokens;
	};
	
	/**
	 * Inline-Level Grammar
	 */
	
	var inline = {
		escape: /^\\([\\`*{}\[\]()#+\-.!_>])/,
		autolink: /^<([^ >]+(@|:\/)[^ >]+)>/,
		url: noop,
		tag: /^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,
		link: /^!?\[(inside)\]\(href\)/,
		reflink: /^!?\[(inside)\]\s*\[([^\]]*)\]/,
		nolink: /^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,
		strong: /^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,
		em: /^\b_((?:[^_]|__)+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,
		code: /^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,
		br: /^ {2,}\n(?!\s*$)/,
		del: noop,
		text: /^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/
	};
	
	inline._inside = /(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/;
	inline._href = /\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/;
	
	inline.link = replace(inline.link)
		('inside', inline._inside)
		('href', inline._href)
		();
	
	inline.reflink = replace(inline.reflink)
		('inside', inline._inside)
		();
	
	/**
	 * Normal Inline Grammar
	 */
	
	inline.normal = merge({}, inline);
	
	/**
	 * Pedantic Inline Grammar
	 */
	
	inline.pedantic = merge({}, inline.normal, {
		strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
		em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/
	});
	
	/**
	 * GFM Inline Grammar
	 */
	
	inline.gfm = merge({}, inline.normal, {
		escape: replace(inline.escape)('])', '~|])')(),
		url: /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,
		del: /^~~(?=\S)([\s\S]*?\S)~~/,
		text: replace(inline.text)
		(']|', '~]|')
		('|', '|https?://|')
		()
	});
	
	/**
	 * GFM + Line Breaks Inline Grammar
	 */
	
	inline.breaks = merge({}, inline.gfm, {
		br: replace(inline.br)('{2,}', '*')(),
		text: replace(inline.gfm.text)('{2,}', '*')()
	});
	
	/**
	 * Inline Lexer & Compiler
	 */
	
	function InlineLexer(links, options) {
		this.options = options || marked.defaults;
		this.links = links;
		this.rules = inline.normal;
		this.renderer = this.options.renderer || new Renderer;
		this.renderer.options = this.options;
	
		if (!this.links) {
		throw new
			Error('Tokens array requires a `links` property.');
		}
	
		if (this.options.gfm) {
		if (this.options.breaks) {
			this.rules = inline.breaks;
		} else {
			this.rules = inline.gfm;
		}
		} else if (this.options.pedantic) {
		this.rules = inline.pedantic;
		}
	}
	
	/**
	 * Expose Inline Rules
	 */
	
	InlineLexer.rules = inline;
	
	/**
	 * Static Lexing/Compiling Method
	 */
	
	InlineLexer.output = function(src, links, options) {
		var inline = new InlineLexer(links, options);
		return inline.output(src);
	};
	
	/**
	 * Lexing/Compiling
	 */
	
	InlineLexer.prototype.output = function(src) {
		var out = ''
		, link
		, text
		, href
		, cap;
	
		while (src) {
		// escape
		if (cap = this.rules.escape.exec(src)) {
			src = src.substring(cap[0].length);
			out += cap[1];
			continue;
		}
	
		// autolink
		if (cap = this.rules.autolink.exec(src)) {
			src = src.substring(cap[0].length);
			if (cap[2] === '@') {
			text = cap[1].charAt(6) === ':'
				? this.mangle(cap[1].substring(7))
				: this.mangle(cap[1]);
			href = this.mangle('mailto:') + text;
			} else {
			text = escape(cap[1]);
			href = text;
			}
			out += this.renderer.link(href, null, text);
			continue;
		}
	
		// url (gfm)
		if (!this.inLink && (cap = this.rules.url.exec(src))) {
			src = src.substring(cap[0].length);
			text = escape(cap[1]);
			href = text;
			out += this.renderer.link(href, null, text);
			continue;
		}
	
		// tag
		if (cap = this.rules.tag.exec(src)) {
			if (!this.inLink && /^<a /i.test(cap[0])) {
			this.inLink = true;
			} else if (this.inLink && /^<\/a>/i.test(cap[0])) {
			this.inLink = false;
			}
			src = src.substring(cap[0].length);
			out += this.options.sanitize
			? this.options.sanitizer
				? this.options.sanitizer(cap[0])
				: escape(cap[0])
			: cap[0]
			continue;
		}
	
		// link
		if (cap = this.rules.link.exec(src)) {
			src = src.substring(cap[0].length);
			this.inLink = true;
			out += this.outputLink(cap, {
			href: cap[2],
			title: cap[3]
			});
			this.inLink = false;
			continue;
		}
	
		// reflink, nolink
		if ((cap = this.rules.reflink.exec(src))
			|| (cap = this.rules.nolink.exec(src))) {
			src = src.substring(cap[0].length);
			link = (cap[2] || cap[1]).replace(/\s+/g, ' ');
			link = this.links[link.toLowerCase()];
			if (!link || !link.href) {
			out += cap[0].charAt(0);
			src = cap[0].substring(1) + src;
			continue;
			}
			this.inLink = true;
			out += this.outputLink(cap, link);
			this.inLink = false;
			continue;
		}
	
		// strong
		if (cap = this.rules.strong.exec(src)) {
			src = src.substring(cap[0].length);
			out += this.renderer.strong(this.output(cap[2] || cap[1]));
			continue;
		}
	
		// em
		if (cap = this.rules.em.exec(src)) {
			src = src.substring(cap[0].length);
			out += this.renderer.em(this.output(cap[2] || cap[1]));
			continue;
		}
	
		// code
		if (cap = this.rules.code.exec(src)) {
			src = src.substring(cap[0].length);
			out += this.renderer.codespan(escape(cap[2], true));
			continue;
		}
	
		// br
		if (cap = this.rules.br.exec(src)) {
			src = src.substring(cap[0].length);
			out += this.renderer.br();
			continue;
		}
	
		// del (gfm)
		if (cap = this.rules.del.exec(src)) {
			src = src.substring(cap[0].length);
			out += this.renderer.del(this.output(cap[1]));
			continue;
		}
	
		// text
		if (cap = this.rules.text.exec(src)) {
			src = src.substring(cap[0].length);
			out += this.renderer.text(escape(this.smartypants(cap[0])));
			continue;
		}
	
		if (src) {
			throw new
			Error('Infinite loop on byte: ' + src.charCodeAt(0));
		}
		}
	
		return out;
	};
	
	/**
	 * Compile Link
	 */
	
	InlineLexer.prototype.outputLink = function(cap, link) {
		var href = escape(link.href)
		, title = link.title ? escape(link.title) : null;
	
		return cap[0].charAt(0) !== '!'
		? this.renderer.link(href, title, this.output(cap[1]))
		: this.renderer.image(href, title, escape(cap[1]));
	};
	
	/**
	 * Smartypants Transformations
	 */
	
	InlineLexer.prototype.smartypants = function(text) {
		if (!this.options.smartypants) return text;
		return text
		// em-dashes
		.replace(/---/g, '\u2014')
		// en-dashes
		.replace(/--/g, '\u2013')
		// opening singles
		.replace(/(^|[-\u2014/(\[{"\s])'/g, '$1\u2018')
		// closing singles & apostrophes
		.replace(/'/g, '\u2019')
		// opening doubles
		.replace(/(^|[-\u2014/(\[{\u2018\s])"/g, '$1\u201c')
		// closing doubles
		.replace(/"/g, '\u201d')
		// ellipses
		.replace(/\.{3}/g, '\u2026');
	};
	
	/**
	 * Mangle Links
	 */
	
	InlineLexer.prototype.mangle = function(text) {
		if (!this.options.mangle) return text;
		var out = ''
		, l = text.length
		, i = 0
		, ch;
	
		for (; i < l; i++) {
		ch = text.charCodeAt(i);
		if (Math.random() > 0.5) {
			ch = 'x' + ch.toString(16);
		}
		out += '&#' + ch + ';';
		}
	
		return out;
	};
	
	/**
	 * Renderer
	 */
	
	function Renderer(options) {
		this.options = options || {};
	}
	
	Renderer.prototype.code = function(code, lang, escaped) {
		if (this.options.highlight) {
		var out = this.options.highlight(code, lang);
		if (out != null && out !== code) {
			escaped = true;
			code = out;
		}
		}
	
		if (!lang) {
		return '<pre><code>'
			+ (escaped ? code : escape(code, true))
			+ '\n</code></pre>';
		}
	
		return '<pre><code class="'
		+ this.options.langPrefix
		+ escape(lang, true)
		+ '">'
		+ (escaped ? code : escape(code, true))
		+ '\n</code></pre>\n';
	};
	
	Renderer.prototype.blockquote = function(quote) {
		return '<blockquote>\n' + quote + '</blockquote>\n';
	};
	
	Renderer.prototype.html = function(html) {
		return html;
	};
	
	Renderer.prototype.heading = function(text, level, raw) {
		return '<h'
		+ level
		+ ' id="'
		+ this.options.headerPrefix
		+ raw.toLowerCase().replace(/[^\w]+/g, '-')
		+ '">'
		+ text
		+ '</h'
		+ level
		+ '>\n';
	};
	
	Renderer.prototype.hr = function() {
		return this.options.xhtml ? '<hr/>\n' : '<hr>\n';
	};
	
	Renderer.prototype.list = function(body, ordered) {
		var type = ordered ? 'ol' : 'ul';
		return '<' + type + '>\n' + body + '</' + type + '>\n';
	};
	
	Renderer.prototype.listitem = function(text) {
		return '<li>' + text + '</li>\n';
	};
	
	Renderer.prototype.paragraph = function(text) {
		return '<p>' + text + '</p>\n';
	};
	
	Renderer.prototype.table = function(header, body) {
		return '<table>\n'
		+ '<thead>\n'
		+ header
		+ '</thead>\n'
		+ '<tbody>\n'
		+ body
		+ '</tbody>\n'
		+ '</table>\n';
	};
	
	Renderer.prototype.tablerow = function(content) {
		return '<tr>\n' + content + '</tr>\n';
	};
	
	Renderer.prototype.tablecell = function(content, flags) {
		var type = flags.header ? 'th' : 'td';
		var tag = flags.align
		? '<' + type + ' style="text-align:' + flags.align + '">'
		: '<' + type + '>';
		return tag + content + '</' + type + '>\n';
	};
	
	// span level renderer
	Renderer.prototype.strong = function(text) {
		return '<strong>' + text + '</strong>';
	};
	
	Renderer.prototype.em = function(text) {
		return '<em>' + text + '</em>';
	};
	
	Renderer.prototype.codespan = function(text) {
		return '<code>' + text + '</code>';
	};
	
	Renderer.prototype.br = function() {
		return this.options.xhtml ? '<br/>' : '<br>';
	};
	
	Renderer.prototype.del = function(text) {
		return '<del>' + text + '</del>';
	};
	
	Renderer.prototype.link = function(href, title, text) {
		if (this.options.sanitize) {
		try {
			var prot = decodeURIComponent(unescape(href))
			.replace(/[^\w:]/g, '')
			.toLowerCase();
		} catch (e) {
			return '';
		}
		if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0 || prot.indexOf('data:') === 0) {
			return '';
		}
		}
		var out = '<a href="' + href + '"';
		if (title) {
		out += ' title="' + title + '"';
		}
		out += '>' + text + '</a>';
		return out;
	};
	
	Renderer.prototype.image = function(href, title, text) {
		var out = '<img src="' + href + '" alt="' + text + '"';
		if (title) {
		out += ' title="' + title + '"';
		}
		out += this.options.xhtml ? '/>' : '>';
		return out;
	};
	
	Renderer.prototype.text = function(text) {
		return text;
	};
	
	/**
	 * Parsing & Compiling
	 */
	
	function Parser(options) {
		this.tokens = [];
		this.token = null;
		this.options = options || marked.defaults;
		this.options.renderer = this.options.renderer || new Renderer;
		this.renderer = this.options.renderer;
		this.renderer.options = this.options;
	}
	
	/**
	 * Static Parse Method
	 */
	
	Parser.parse = function(src, options, renderer) {
		var parser = new Parser(options, renderer);
		return parser.parse(src);
	};
	
	/**
	 * Parse Loop
	 */
	
	Parser.prototype.parse = function(src) {
		this.inline = new InlineLexer(src.links, this.options, this.renderer);
		this.tokens = src.reverse();
	
		var out = '';
		while (this.next()) {
		out += this.tok();
		}
	
		return out;
	};
	
	/**
	 * Next Token
	 */
	
	Parser.prototype.next = function() {
		return this.token = this.tokens.pop();
	};
	
	/**
	 * Preview Next Token
	 */
	
	Parser.prototype.peek = function() {
		return this.tokens[this.tokens.length - 1] || 0;
	};
	
	/**
	 * Parse Text Tokens
	 */
	
	Parser.prototype.parseText = function() {
		var body = this.token.text;
	
		while (this.peek().type === 'text') {
		body += '\n' + this.next().text;
		}
	
		return this.inline.output(body);
	};
	
	/**
	 * Parse Current Token
	 */
	
	Parser.prototype.tok = function() {
		switch (this.token.type) {
		case 'space': {
			return '';
		}
		case 'hr': {
			return this.renderer.hr();
		}
		case 'heading': {
			return this.renderer.heading(
			this.inline.output(this.token.text),
			this.token.depth,
			this.token.text);
		}
		case 'code': {
			return this.renderer.code(this.token.text,
			this.token.lang,
			this.token.escaped);
		}
		case 'table': {
			var header = ''
			, body = ''
			, i
			, row
			, cell
			, flags
			, j;
	
			// header
			cell = '';
			for (i = 0; i < this.token.header.length; i++) {
			flags = { header: true, align: this.token.align[i] };
			cell += this.renderer.tablecell(
				this.inline.output(this.token.header[i]),
				{ header: true, align: this.token.align[i] }
			);
			}
			header += this.renderer.tablerow(cell);
	
			for (i = 0; i < this.token.cells.length; i++) {
			row = this.token.cells[i];
	
			cell = '';
			for (j = 0; j < row.length; j++) {
				cell += this.renderer.tablecell(
				this.inline.output(row[j]),
				{ header: false, align: this.token.align[j] }
				);
			}
	
			body += this.renderer.tablerow(cell);
			}
			return this.renderer.table(header, body);
		}
		case 'blockquote_start': {
			var body = '';
	
			while (this.next().type !== 'blockquote_end') {
			body += this.tok();
			}
	
			return this.renderer.blockquote(body);
		}
		case 'list_start': {
			var body = ''
			, ordered = this.token.ordered;
	
			while (this.next().type !== 'list_end') {
			body += this.tok();
			}
	
			return this.renderer.list(body, ordered);
		}
		case 'list_item_start': {
			var body = '';
	
			while (this.next().type !== 'list_item_end') {
			body += this.token.type === 'text'
				? this.parseText()
				: this.tok();
			}
	
			return this.renderer.listitem(body);
		}
		case 'loose_item_start': {
			var body = '';
	
			while (this.next().type !== 'list_item_end') {
			body += this.tok();
			}
	
			return this.renderer.listitem(body);
		}
		case 'html': {
			var html = !this.token.pre && !this.options.pedantic
			? this.inline.output(this.token.text)
			: this.token.text;
			return this.renderer.html(html);
		}
		case 'paragraph': {
			return this.renderer.paragraph(this.inline.output(this.token.text));
		}
		case 'text': {
			return this.renderer.paragraph(this.parseText());
		}
		}
	};
	
	/**
	 * Helpers
	 */
	
	function escape(html, encode) {
		return html
		.replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');
	}
	
	function unescape(html) {
		// explicitly match decimal, hex, and named HTML entities 
		return html.replace(/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/g, function(_, n) {
		n = n.toLowerCase();
		if (n === 'colon') return ':';
		if (n.charAt(0) === '#') {
			return n.charAt(1) === 'x'
			? String.fromCharCode(parseInt(n.substring(2), 16))
			: String.fromCharCode(+n.substring(1));
		}
		return '';
		});
	}
	
	function replace(regex, opt) {
		regex = regex.source;
		opt = opt || '';
		return function self(name, val) {
		if (!name) return new RegExp(regex, opt);
		val = val.source || val;
		val = val.replace(/(^|[^\[])\^/g, '$1');
		regex = regex.replace(name, val);
		return self;
		};
	}
	
	function noop() {}
	noop.exec = noop;
	
	function merge(obj) {
		var i = 1
		, target
		, key;
	
		for (; i < arguments.length; i++) {
		target = arguments[i];
		for (key in target) {
			if (Object.prototype.hasOwnProperty.call(target, key)) {
			obj[key] = target[key];
			}
		}
		}
	
		return obj;
	}
	
	
	/**
	 * Marked
	 */
	
	function marked(src, opt, callback) {
		if (callback || typeof opt === 'function') {
		if (!callback) {
			callback = opt;
			opt = null;
		}
	
		opt = merge({}, marked.defaults, opt || {});
	
		var highlight = opt.highlight
			, tokens
			, pending
			, i = 0;
	
		try {
			tokens = Lexer.lex(src, opt)
		} catch (e) {
			return callback(e);
		}
	
		pending = tokens.length;
	
		var done = function(err) {
			if (err) {
			opt.highlight = highlight;
			return callback(err);
			}
	
			var out;
	
			try {
			out = Parser.parse(tokens, opt);
			} catch (e) {
			err = e;
			}
	
			opt.highlight = highlight;
	
			return err
			? callback(err)
			: callback(null, out);
		};
	
		if (!highlight || highlight.length < 3) {
			return done();
		}
	
		delete opt.highlight;
	
		if (!pending) return done();
	
		for (; i < tokens.length; i++) {
			(function(token) {
			if (token.type !== 'code') {
				return --pending || done();
			}
			return highlight(token.text, token.lang, function(err, code) {
				if (err) return done(err);
				if (code == null || code === token.text) {
				return --pending || done();
				}
				token.text = code;
				token.escaped = true;
				--pending || done();
			});
			})(tokens[i]);
		}
	
		return;
		}
		try {
		if (opt) opt = merge({}, marked.defaults, opt);
		return Parser.parse(Lexer.lex(src, opt), opt);
		} catch (e) {
		e.message += '\nPlease report this to https://github.com/chjj/marked.';
		if ((opt || marked.defaults).silent) {
			return '<p>An error occured:</p><pre>'
			+ escape(e.message + '', true)
			+ '</pre>';
		}
		throw e;
		}
	}
	
	/**
	 * Options
	 */
	
	marked.options =
	marked.setOptions = function(opt) {
		merge(marked.defaults, opt);
		return marked;
	};
	
	marked.defaults = {
		gfm: true,
		tables: true,
		breaks: false,
		pedantic: false,
		sanitize: false,
		sanitizer: null,
		mangle: true,
		smartLists: false,
		silent: false,
		highlight: null,
		langPrefix: 'lang-',
		smartypants: false,
		headerPrefix: '',
		renderer: new Renderer,
		xhtml: false
	};
	
	/**
	 * Expose
	 */
	
	marked.Parser = Parser;
	marked.parser = Parser.parse;
	
	marked.Renderer = Renderer;
	
	marked.Lexer = Lexer;
	marked.lexer = Lexer.lex;
	
	marked.InlineLexer = InlineLexer;
	marked.inlineLexer = InlineLexer.output;
	
	marked.parse = marked;
	
	if (typeof module !== 'undefined' && typeof exports === 'object') {
		module.exports = marked;
	} else if (typeof define === 'function' && define.amd) {
		define(function() { return marked; });
	} else {
		this.marked = marked;
	}
	
	}).call(function() {
		return this || (typeof window !== 'undefined' ? window : global);
	}());
		
	
	// !function(a) {
	//     function b() {
	//         return "Markdown.mk_block( " + uneval(this.toString()) + ", " + uneval(this.trailing) + ", " + uneval(this.lineNumber) + " )"
	//     }
	//     function c() {
	//         var a = require("util");
	//         return "Markdown.mk_block( " + a.inspect(this.toString()) + ", " + a.inspect(this.trailing) + ", " + a.inspect(this.lineNumber) + " )"
	//     }
	//     function d(a) {
	//         for (var b = 0, c = -1; -1 !== (c = a.indexOf("\n", c + 1)); )
	//             b++;
	//         return b
	//     }
	//     function e(a) {
	//         return a.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;")
	//     }
	//     function f(a) {
	//         if ("string" == typeof a)
	//             return e(a);
	//         var b = a.shift()
	//           , c = {}
	//           , d = [];
	//         for (!a.length || "object" != typeof a[0] || a[0]instanceof Array || (c = a.shift()); a.length; )
	//             d.push(f(a.shift()));
	//         var g = "";
	//         for (var h in c)
	//             g += " " + h + '="' + e(c[h]) + '"';
	//         return "img" === b || "br" === b || "hr" === b ? "<" + b + g + "/>" : "<" + b + g + ">" + d.join("") + "</" + b + ">"
	//     }
	//     function g(a, b, c) {
	//         var d;
	//         c = c || {};
	//         var e = a.slice(0);
	//         "function" == typeof c.preprocessTreeNode && (e = c.preprocessTreeNode(e, b));
	//         var f = o(e);
	//         if (f) {
	//             e[1] = {};
	//             for (d in f)
	//                 e[1][d] = f[d];
	//             f = e[1]
	//         }
	//         if ("string" == typeof e)
	//             return e;
	//         switch (e[0]) {
	//         case "header":
	//             e[0] = "h" + e[1].level,
	//             delete e[1].level;
	//             break;
	//         case "bulletlist":
	//             e[0] = "ul";
	//             break;
	//         case "numberlist":
	//             e[0] = "ol";
	//             break;
	//         case "listitem":
	//             e[0] = "li";
	//             break;
	//         case "para":
	//             e[0] = "p";
	//             break;
	//         case "markdown":
	//             e[0] = "html",
	//             f && delete f.references;
	//             break;
	//         case "code_block":
	//             e[0] = "pre",
	//             d = f ? 2 : 1;
	//             var h = ["code"];
	//             h.push.apply(h, e.splice(d, e.length - d)),
	//             e[d] = h;
	//             break;
	//         case "inlinecode":
	//             e[0] = "code";
	//             break;
	//         case "img":
	//             e[1].src = e[1].href,
	//             delete e[1].href;
	//             break;
	//         case "linebreak":
	//             e[0] = "br";
	//             break;
	//         case "link":
	//             e[0] = "a";
	//             break;
	//         case "link_ref":
	//             e[0] = "a";
	//             var i = b[f.ref];
	//             if (!i)
	//                 return f.original;
	//             delete f.ref,
	//             f.href = i.href,
	//             i.title && (f.title = i.title),
	//             delete f.original;
	//             break;
	//         case "img_ref":
	//             e[0] = "img";
	//             var i = b[f.ref];
	//             if (!i)
	//                 return f.original;
	//             delete f.ref,
	//             f.src = i.href,
	//             i.title && (f.title = i.title),
	//             delete f.original
	//         }
	//         if (d = 1,
	//         f) {
	//             for (var j in e[1]) {
	//                 d = 2;
	//                 break
	//             }
	//             1 === d && e.splice(d, 1)
	//         }
	//         for (; d < e.length; ++d)
	//             e[d] = g(e[d], b, c);
	//         return e
	//     }
	//     function h(a) {
	//         for (var b = o(a) ? 2 : 1; b < a.length; )
	//             "string" == typeof a[b] ? b + 1 < a.length && "string" == typeof a[b + 1] ? a[b] += a.splice(b + 1, 1)[0] : ++b : (h(a[b]),
	//             ++b)
	//     }
	//     function i(a, b) {
	//         function c(a) {
	//             this.len_after = a,
	//             this.name = "close_" + b
	//         }
	//         var d = a + "_state"
	//           , e = "strong" === a ? "em_state" : "strong_state";
	//         return function(f) {
	//             if (this[d][0] === b)
	//                 return this[d].shift(),
	//                 [f.length, new c(f.length - b.length)];
	//             var g = this[e].slice()
	//               , h = this[d].slice();
	//             this[d].unshift(b);
	//             var i = this.processInline(f.substr(b.length))
	//               , j = i[i.length - 1];
	//             if (this[d].shift(),
	//             j instanceof c) {
	//                 i.pop();
	//                 var k = f.length - j.len_after;
	//                 return [k, [a].concat(i)]
	//             }
	//             return this[e] = g,
	//             this[d] = h,
	//             [b.length, b]
	//         }
	//     }
	//     function j(a) {
	//         for (var b = a.split(""), c = [""], d = !1; b.length; ) {
	//             var e = b.shift();
	//             switch (e) {
	//             case " ":
	//                 d ? c[c.length - 1] += e : c.push("");
	//                 break;
	//             case "'":
	//             case '"':
	//                 d = !d;
	//                 break;
	//             case "\\":
	//                 e = b.shift();
	//             default:
	//                 c[c.length - 1] += e
	//             }
	//         }
	//         return c
	//     }
	//     var k = {};
	//     k.mk_block = function(a, d, e) {
	//         1 === arguments.length && (d = "\n\n");
	//         var f = new String(a);
	//         return f.trailing = d,
	//         f.inspect = c,
	//         f.toSource = b,
	//         void 0 !== e && (f.lineNumber = e),
	//         f
	//     }
	//     ;
	//     var l = k.isArray = Array.isArray || function(a) {
	//         return "[object Array]" === Object.prototype.toString.call(a)
	//     }
	//     ;
	//     k.forEach = Array.prototype.forEach ? function(a, b, c) {
	//         return a.forEach(b, c)
	//     }
	//     : function(a, b, c) {
	//         for (var d = 0; d < a.length; d++)
	//             b.call(c || a, a[d], d, a)
	//     }
	//     ,
	//     k.isEmpty = function(a) {
	//         for (var b in a)
	//             if (hasOwnProperty.call(a, b))
	//                 return !1;
	//         return !0
	//     }
	//     ,
	//     k.extract_attr = function(a) {
	//         return l(a) && a.length > 1 && "object" == typeof a[1] && !l(a[1]) ? a[1] : void 0
	//     }
	//     ;
	//     var m = function(a) {
	//         switch (typeof a) {
	//         case "undefined":
	//             this.dialect = m.dialects.Gruber;
	//             break;
	//         case "object":
	//             this.dialect = a;
	//             break;
	//         default:
	//             if (!(a in m.dialects))
	//                 throw new Error("Unknown Markdown dialect '" + String(a) + "'");
	//             this.dialect = m.dialects[a]
	//         }
	//         this.em_state = [],
	//         this.strong_state = [],
	//         this.debug_indent = ""
	//     };
	//     m.dialects = {};
	//     var n = m.mk_block = k.mk_block
	//       , l = k.isArray;
	//     m.parse = function(a, b) {
	//         var c = new m(b);
	//         return c.toTree(a)
	//     }
	//     ,
	//     m.prototype.split_blocks = function(a) {
	//         a = a.replace(/(\r\n|\n|\r)/g, "\n");
	//         var b, c = /([\s\S]+?)($|\n#|\n(?:\s*\n|$)+)/g, e = [], f = 1;
	//         for (null !== (b = /^(\s*\n)/.exec(a)) && (f += d(b[0]),
	//         c.lastIndex = b[0].length); null !== (b = c.exec(a)); )
	//             "\n#" === b[2] && (b[2] = "\n",
	//             c.lastIndex--),
	//             e.push(n(b[1], b[2], f)),
	//             f += d(b[0]);
	//         return e
	//     }
	//     ,
	//     m.prototype.processBlock = function(a, b) {
	//         var c = this.dialect.block
	//           , d = c.__order__;
	//         if ("__call__"in c)
	//             return c.__call__.call(this, a, b);
	//         for (var e = 0; e < d.length; e++) {
	//             var f = c[d[e]].call(this, a, b);
	//             if (f)
	//                 return (!l(f) || f.length > 0 && !l(f[0])) && this.debug(d[e], "didn't return a proper array"),
	//                 f
	//         }
	//         return []
	//     }
	//     ,
	//     m.prototype.processInline = function(a) {
	//         return this.dialect.inline.__call__.call(this, String(a))
	//     }
	//     ,
	//     m.prototype.toTree = function(a, b) {
	//         var c = a instanceof Array ? a : this.split_blocks(a)
	//           , d = this.tree;
	//         try {
	//             for (this.tree = b || this.tree || ["markdown"]; c.length; ) {
	//                 var e = this.processBlock(c.shift(), c);
	//                 e.length && this.tree.push.apply(this.tree, e)
	//             }
	//             return this.tree
	//         } finally {
	//             b && (this.tree = d)
	//         }
	//     }
	//     ,
	//     m.prototype.debug = function() {
	//         var a = Array.prototype.slice.call(arguments);
	//         a.unshift(this.debug_indent),
	//         "undefined" != typeof print && print.apply(print, a),
	//         "undefined" != typeof console && "undefined" != typeof console.log && console.log.apply(null, a)
	//     }
	//     ,
	//     m.prototype.loop_re_over_block = function(a, b, c) {
	//         for (var d, e = b.valueOf(); e.length && null !== (d = a.exec(e)); )
	//             e = e.substr(d[0].length),
	//             c.call(this, d);
	//         return e
	//     }
	//     ,
	//     m.buildBlockOrder = function(a) {
	//         var b = [];
	//         for (var c in a)
	//             "__order__" !== c && "__call__" !== c && b.push(c);
	//         a.__order__ = b
	//     }
	//     ,
	//     m.buildInlinePatterns = function(a) {
	//         var b = [];
	//         for (var c in a)
	//             if (!c.match(/^__.*__$/)) {
	//                 var d = c.replace(/([\\.*+?|()\[\]{}])/g, "\\$1").replace(/\n/, "\\n");
	//                 b.push(1 === c.length ? d : "(?:" + d + ")")
	//             }
	//         b = b.join("|"),
	//         a.__patterns__ = b;
	//         var e = a.__call__;
	//         a.__call__ = function(a, c) {
	//             return void 0 !== c ? e.call(this, a, c) : e.call(this, a, b)
	//         }
	//     }
	//     ;
	//     var o = k.extract_attr;
	//     m.renderJsonML = function(a, b) {
	//         b = b || {},
	//         b.root = b.root || !1;
	//         var c = [];
	//         if (b.root)
	//             c.push(f(a));
	//         else
	//             for (a.shift(),
	//             !a.length || "object" != typeof a[0] || a[0]instanceof Array || a.shift(); a.length; )
	//                 c.push(f(a.shift()));
	//         return c.join("\n\n")
	//     }
	//     ,
	//     m.toHTMLTree = function(a, b, c) {
	//         "string" == typeof a && (a = this.parse(a, b));
	//         var d = o(a)
	//           , e = {};
	//         d && d.references && (e = d.references);
	//         var f = g(a, e, c);
	//         return h(f),
	//         f
	//     }
	//     ,
	//     m.toHTML = function(a, b, c) {
	//         var d = this.toHTMLTree(a, b, c);
	//         return this.renderJsonML(d)
	//     }
	//     ;
	//     var p = {};
	//     p.inline_until_char = function(a, b) {
	//         for (var c = 0, d = []; ; ) {
	//             if (a.charAt(c) === b)
	//                 return c++,
	//                 [c, d];
	//             if (c >= a.length)
	//                 return null;
	//             var e = this.dialect.inline.__oneElement__.call(this, a.substr(c));
	//             c += e[0],
	//             d.push.apply(d, e.slice(1))
	//         }
	//     }
	//     ,
	//     p.subclassDialect = function(a) {
	//         function b() {}
	//         function c() {}
	//         return b.prototype = a.block,
	//         c.prototype = a.inline,
	//         {
	//             block: new b,
	//             inline: new c
	//         }
	//     }
	//     ;
	//     var q = k.forEach
	//       , o = k.extract_attr
	//       , n = k.mk_block
	//       , r = k.isEmpty
	//       , s = p.inline_until_char
	//       , t = {
	//         block: {
	//             atxHeader: function(a, b) {
	//                 var c = a.match(/^(#{1,6})\s*(.*?)\s*#*\s*(?:\n|$)/);
	//                 if (!c)
	//                     return void 0;
	//                 var d = ["header", {
	//                     level: c[1].length
	//                 }];
	//                 return Array.prototype.push.apply(d, this.processInline(c[2])),
	//                 c[0].length < a.length && b.unshift(n(a.substr(c[0].length), a.trailing, a.lineNumber + 2)),
	//                 [d]
	//             },
	//             setextHeader: function(a, b) {
	//                 var c = a.match(/^(.*)\n([-=])\2\2+(?:\n|$)/);
	//                 if (!c)
	//                     return void 0;
	//                 var d = "=" === c[2] ? 1 : 2
	//                   , e = ["header", {
	//                     level: d
	//                 }, c[1]];
	//                 return c[0].length < a.length && b.unshift(n(a.substr(c[0].length), a.trailing, a.lineNumber + 2)),
	//                 [e]
	//             },
	//             code: function(a, b) {
	//                 var c = []
	//                   , d = /^(?: {0,3}\t| {4})(.*)\n?/;
	//                 if (!a.match(d))
	//                     return void 0;
	//                 a: for (; ; ) {
	//                     var e = this.loop_re_over_block(d, a.valueOf(), function(a) {
	//                         c.push(a[1])
	//                     });
	//                     if (e.length) {
	//                         b.unshift(n(e, a.trailing));
	//                         break a
	//                     }
	//                     if (!b.length)
	//                         break a;
	//                     if (!b[0].match(d))
	//                         break a;
	//                     c.push(a.trailing.replace(/[^\n]/g, "").substring(2)),
	//                     a = b.shift()
	//                 }
	//                 return [["code_block", c.join("\n")]]
	//             },
	//             horizRule: function(a, b) {
	//                 var c = a.match(/^(?:([\s\S]*?)\n)?[ \t]*([-_*])(?:[ \t]*\2){2,}[ \t]*(?:\n([\s\S]*))?$/);
	//                 if (!c)
	//                     return void 0;
	//                 var d = [["hr"]];
	//                 if (c[1]) {
	//                     var e = n(c[1], "", a.lineNumber);
	//                     d.unshift.apply(d, this.toTree(e, []))
	//                 }
	//                 return c[3] && b.unshift(n(c[3], a.trailing, a.lineNumber + 1)),
	//                 d
	//             },
	//             lists: function() {
	//                 function a(a) {
	//                     return new RegExp("(?:^(" + i + "{0," + a + "} {0,3})(" + f + ")\\s+)|" + "(^" + i + "{0," + (a - 1) + "}[ ]{0,4})")
	//                 }
	//                 function b(a) {
	//                     return a.replace(/ {0,3}\t/g, "    ")
	//                 }
	//                 function c(a, b, c, d) {
	//                     if (b)
	//                         return a.push(["para"].concat(c)),
	//                         void 0;
	//                     var e = a[a.length - 1]instanceof Array && "para" === a[a.length - 1][0] ? a[a.length - 1] : a;
	//                     d && a.length > 1 && c.unshift(d);
	//                     for (var f = 0; f < c.length; f++) {
	//                         var g = c[f]
	//                           , h = "string" == typeof g;
	//                         h && e.length > 1 && "string" == typeof e[e.length - 1] ? e[e.length - 1] += g : e.push(g)
	//                     }
	//                 }
	//                 function d(a, b) {
	//                     for (var c = new RegExp("^(" + i + "{" + a + "}.*?\\n?)*$"), d = new RegExp("^" + i + "{" + a + "}","gm"), e = []; b.length > 0 && c.exec(b[0]); ) {
	//                         var f = b.shift()
	//                           , g = f.replace(d, "");
	//                         e.push(n(g, f.trailing, f.lineNumber))
	//                     }
	//                     return e
	//                 }
	//                 function e(a, b, c) {
	//                     var d = a.list
	//                       , e = d[d.length - 1];
	//                     if (!(e[1]instanceof Array && "para" === e[1][0]))
	//                         if (b + 1 === c.length)
	//                             e.push(["para"].concat(e.splice(1, e.length - 1)));
	//                         else {
	//                             var f = e.pop();
	//                             e.push(["para"].concat(e.splice(1, e.length - 1)), f)
	//                         }
	//                 }
	//                 var f = "[*+-]|\\d+\\."
	//                   , g = /[*+-]/
	//                   , h = new RegExp("^( {0,3})(" + f + ")[ 	]+")
	//                   , i = "(?: {0,3}\\t| {4})";
	//                 return function(f, i) {
	//                     function j(a) {
	//                         var b = g.exec(a[2]) ? ["bulletlist"] : ["numberlist"];
	//                         return n.push({
	//                             list: b,
	//                             indent: a[1]
	//                         }),
	//                         b
	//                     }
	//                     var k = f.match(h);
	//                     if (!k)
	//                         return void 0;
	//                     for (var l, m, n = [], o = j(k), p = !1, r = [n[0].list]; ; ) {
	//                         for (var s = f.split(/(?=\n)/), t = "", u = "", v = 0; v < s.length; v++) {
	//                             u = "";
	//                             var w = s[v].replace(/^\n/, function(a) {
	//                                 return u = a,
	//                                 ""
	//                             })
	//                               , x = a(n.length);
	//                             if (k = w.match(x),
	//                             void 0 !== k[1]) {
	//                                 t.length && (c(l, p, this.processInline(t), u),
	//                                 p = !1,
	//                                 t = ""),
	//                                 k[1] = b(k[1]);
	//                                 var y = Math.floor(k[1].length / 4) + 1;
	//                                 if (y > n.length)
	//                                     o = j(k),
	//                                     l.push(o),
	//                                     l = o[1] = ["listitem"];
	//                                 else {
	//                                     var z = !1;
	//                                     for (m = 0; m < n.length; m++)
	//                                         if (n[m].indent === k[1]) {
	//                                             o = n[m].list,
	//                                             n.splice(m + 1, n.length - (m + 1)),
	//                                             z = !0;
	//                                             break
	//                                         }
	//                                     z || (y++,
	//                                     y <= n.length ? (n.splice(y, n.length - y),
	//                                     o = n[y - 1].list) : (o = j(k),
	//                                     l.push(o))),
	//                                     l = ["listitem"],
	//                                     o.push(l)
	//                                 }
	//                                 u = ""
	//                             }
	//                             w.length > k[0].length && (t += u + w.substr(k[0].length))
	//                         }
	//                         t.length && (c(l, p, this.processInline(t), u),
	//                         p = !1,
	//                         t = "");
	//                         var A = d(n.length, i);
	//                         A.length > 0 && (q(n, e, this),
	//                         l.push.apply(l, this.toTree(A, [])));
	//                         var B = i[0] && i[0].valueOf() || "";
	//                         if (!B.match(h) && !B.match(/^ /))
	//                             break;
	//                         f = i.shift();
	//                         var C = this.dialect.block.horizRule(f, i);
	//                         if (C) {
	//                             r.push.apply(r, C);
	//                             break
	//                         }
	//                         q(n, e, this),
	//                         p = !0
	//                     }
	//                     return r
	//                 }
	//             }(),
	//             blockquote: function(a, b) {
	//                 if (!a.match(/^>/m))
	//                     return void 0;
	//                 var c = [];
	//                 if (">" !== a[0]) {
	//                     for (var d = a.split(/\n/), e = [], f = a.lineNumber; d.length && ">" !== d[0][0]; )
	//                         e.push(d.shift()),
	//                         f++;
	//                     var g = n(e.join("\n"), "\n", a.lineNumber);
	//                     c.push.apply(c, this.processBlock(g, [])),
	//                     a = n(d.join("\n"), a.trailing, f)
	//                 }
	//                 for (; b.length && ">" === b[0][0]; ) {
	//                     var h = b.shift();
	//                     a = n(a + a.trailing + h, h.trailing, a.lineNumber)
	//                 }
	//                 var i = a.replace(/^> ?/gm, "")
	//                   , j = (this.tree,
	//                 this.toTree(i, ["blockquote"]))
	//                   , k = o(j);
	//                 return k && k.references && (delete k.references,
	//                 r(k) && j.splice(1, 1)),
	//                 c.push(j),
	//                 c
	//             },
	//             referenceDefn: function(a, b) {
	//                 var c = /^\s*\[(.*?)\]:\s*(\S+)(?:\s+(?:(['"])(.*?)\3|\((.*?)\)))?\n?/;
	//                 if (!a.match(c))
	//                     return void 0;
	//                 o(this.tree) || this.tree.splice(1, 0, {});
	//                 var d = o(this.tree);
	//                 void 0 === d.references && (d.references = {});
	//                 var e = this.loop_re_over_block(c, a, function(a) {
	//                     a[2] && "<" === a[2][0] && ">" === a[2][a[2].length - 1] && (a[2] = a[2].substring(1, a[2].length - 1));
	//                     var b = d.references[a[1].toLowerCase()] = {
	//                         href: a[2]
	//                     };
	//                     void 0 !== a[4] ? b.title = a[4] : void 0 !== a[5] && (b.title = a[5])
	//                 });
	//                 return e.length && b.unshift(n(e, a.trailing)),
	//                 []
	//             },
	//             para: function(a) {
	//                 return [["para"].concat(this.processInline(a))]
	//             }
	//         },
	//         inline: {
	//             __oneElement__: function(a, b, c) {
	//                 var d, e;
	//                 b = b || this.dialect.inline.__patterns__;
	//                 var f = new RegExp("([\\s\\S]*?)(" + (b.source || b) + ")");
	//                 if (d = f.exec(a),
	//                 !d)
	//                     return [a.length, a];
	//                 if (d[1])
	//                     return [d[1].length, d[1]];
	//                 var e;
	//                 return d[2]in this.dialect.inline && (e = this.dialect.inline[d[2]].call(this, a.substr(d.index), d, c || [])),
	//                 e = e || [d[2].length, d[2]]
	//             },
	//             __call__: function(a, b) {
	//                 function c(a) {
	//                     "string" == typeof a && "string" == typeof e[e.length - 1] ? e[e.length - 1] += a : e.push(a)
	//                 }
	//                 for (var d, e = []; a.length > 0; )
	//                     d = this.dialect.inline.__oneElement__.call(this, a, b, e),
	//                     a = a.substr(d.shift()),
	//                     q(d, c);
	//                 return e
	//             },
	//             "]": function() {},
	//             "}": function() {},
	//             __escape__: /^\\[\\`\*_{}\[\]()#\+.!\-]/,
	//             "\\": function(a) {
	//                 return this.dialect.inline.__escape__.exec(a) ? [2, a.charAt(1)] : [1, "\\"]
	//             },
	//             "![": function(a) {
	//                 var b = a.match(/^!\[(.*?)\][ \t]*\([ \t]*([^")]*?)(?:[ \t]+(["'])(.*?)\3)?[ \t]*\)/);
	//                 if (b) {
	//                     b[2] && "<" === b[2][0] && ">" === b[2][b[2].length - 1] && (b[2] = b[2].substring(1, b[2].length - 1)),
	//                     b[2] = this.dialect.inline.__call__.call(this, b[2], /\\/)[0];
	//                     var c = {
	//                         alt: b[1],
	//                         href: b[2] || ""
	//                     };
	//                     return void 0 !== b[4] && (c.title = b[4]),
	//                     [b[0].length, ["img", c]]
	//                 }
	//                 return b = a.match(/^!\[(.*?)\][ \t]*\[(.*?)\]/),
	//                 b ? [b[0].length, ["img_ref", {
	//                     alt: b[1],
	//                     ref: b[2].toLowerCase(),
	//                     original: b[0]
	//                 }]] : [2, "!["]
	//             },
	//             "[": function v(a) {
	//                 var b = String(a)
	//                   , c = s.call(this, a.substr(1), "]");
	//                 if (!c)
	//                     return [1, "["];
	//                 var v, d, e = 1 + c[0], f = c[1];
	//                 a = a.substr(e);
	//                 var g = a.match(/^\s*\([ \t]*([^"']*)(?:[ \t]+(["'])(.*?)\2)?[ \t]*\)/);
	//                 if (g) {
	//                     var h = g[1];
	//                     if (e += g[0].length,
	//                     h && "<" === h[0] && ">" === h[h.length - 1] && (h = h.substring(1, h.length - 1)),
	//                     !g[3])
	//                         for (var i = 1, j = 0; j < h.length; j++)
	//                             switch (h[j]) {
	//                             case "(":
	//                                 i++;
	//                                 break;
	//                             case ")":
	//                                 0 === --i && (e -= h.length - j,
	//                                 h = h.substring(0, j))
	//                             }
	//                     return h = this.dialect.inline.__call__.call(this, h, /\\/)[0],
	//                     d = {
	//                         href: h || ""
	//                     },
	//                     void 0 !== g[3] && (d.title = g[3]),
	//                     v = ["link", d].concat(f),
	//                     [e, v]
	//                 }
	//                 return g = a.match(/^\s*\[(.*?)\]/),
	//                 g ? (e += g[0].length,
	//                 d = {
	//                     ref: (g[1] || String(f)).toLowerCase(),
	//                     original: b.substr(0, e)
	//                 },
	//                 v = ["link_ref", d].concat(f),
	//                 [e, v]) : 1 === f.length && "string" == typeof f[0] ? (d = {
	//                     ref: f[0].toLowerCase(),
	//                     original: b.substr(0, e)
	//                 },
	//                 v = ["link_ref", d, f[0]],
	//                 [e, v]) : [1, "["]
	//             },
	//             "<": function(a) {
	//                 var b;
	//                 return null !== (b = a.match(/^<(?:((https?|ftp|mailto):[^>]+)|(.*?@.*?\.[a-zA-Z]+))>/)) ? b[3] ? [b[0].length, ["link", {
	//                     href: "mailto:" + b[3]
	//                 }, b[3]]] : "mailto" === b[2] ? [b[0].length, ["link", {
	//                     href: b[1]
	//                 }, b[1].substr("mailto:".length)]] : [b[0].length, ["link", {
	//                     href: b[1]
	//                 }, b[1]]] : [1, "<"]
	//             },
	//             "`": function(a) {
	//                 var b = a.match(/(`+)(([\s\S]*?)\1)/);
	//                 return b && b[2] ? [b[1].length + b[2].length, ["inlinecode", b[3]]] : [1, "`"]
	//             },
	//             "  \n": function() {
	//                 return [3, ["linebreak"]]
	//             }
	//         }
	//     };
	//     t.inline["**"] = i("strong", "**"),
	//     t.inline.__ = i("strong", "__"),
	//     t.inline["*"] = i("em", "*"),
	//     t.inline._ = i("em", "_"),
	//     m.dialects.Gruber = t,
	//     m.buildBlockOrder(m.dialects.Gruber.block),
	//     m.buildInlinePatterns(m.dialects.Gruber.inline);
	//     var u = p.subclassDialect(t)
	//       , o = k.extract_attr
	//       , q = k.forEach;
	//     u.processMetaHash = function(a) {
	//         for (var b = j(a), c = {}, d = 0; d < b.length; ++d)
	//             if (/^#/.test(b[d]))
	//                 c.id = b[d].substring(1);
	//             else if (/^\./.test(b[d]))
	//                 c["class"] = c["class"] ? c["class"] + b[d].replace(/./, " ") : b[d].substring(1);
	//             else if (/\=/.test(b[d])) {
	//                 var e = b[d].split(/\=/);
	//                 c[e[0]] = e[1]
	//             }
	//         return c
	//     }
	//     ,
	//     u.block.document_meta = function(a) {
	//         if (a.lineNumber > 1)
	//             return void 0;
	//         if (!a.match(/^(?:\w+:.*\n)*\w+:.*$/))
	//             return void 0;
	//         o(this.tree) || this.tree.splice(1, 0, {});
	//         var b = a.split(/\n/);
	//         for (var c in b) {
	//             var d = b[c].match(/(\w+):\s*(.*)$/)
	//               , e = d[1].toLowerCase()
	//               , f = d[2];
	//             this.tree[1][e] = f
	//         }
	//         return []
	//     }
	//     ,
	//     u.block.block_meta = function(a) {
	//         var b = a.match(/(^|\n) {0,3}\{:\s*((?:\\\}|[^\}])*)\s*\}$/);
	//         if (!b)
	//             return void 0;
	//         var c, d = this.dialect.processMetaHash(b[2]);
	//         if ("" === b[1]) {
	//             var e = this.tree[this.tree.length - 1];
	//             if (c = o(e),
	//             "string" == typeof e)
	//                 return void 0;
	//             c || (c = {},
	//             e.splice(1, 0, c));
	//             for (var f in d)
	//                 c[f] = d[f];
	//             return []
	//         }
	//         var g = a.replace(/\n.*$/, "")
	//           , h = this.processBlock(g, []);
	//         c = o(h[0]),
	//         c || (c = {},
	//         h[0].splice(1, 0, c));
	//         for (var f in d)
	//             c[f] = d[f];
	//         return h
	//     }
	//     ,
	//     u.block.definition_list = function(a, b) {
	//         var c, d, e = /^((?:[^\s:].*\n)+):\s+([\s\S]+)$/, f = ["dl"];
	//         if (!(d = a.match(e)))
	//             return void 0;
	//         for (var g = [a]; b.length && e.exec(b[0]); )
	//             g.push(b.shift());
	//         for (var h = 0; h < g.length; ++h) {
	//             var d = g[h].match(e)
	//               , i = d[1].replace(/\n$/, "").split(/\n/)
	//               , j = d[2].split(/\n:\s+/);
	//             for (c = 0; c < i.length; ++c)
	//                 f.push(["dt", i[c]]);
	//             for (c = 0; c < j.length; ++c)
	//                 f.push(["dd"].concat(this.processInline(j[c].replace(/(\n)\s+/, "$1"))))
	//         }
	//         return [f]
	//     }
	//     ,
	//     u.block.table = function w(a) {
	//         var b, c, d = function(a, b) {
	//             b = b || "\\s",
	//             b.match(/^[\\|\[\]{}?*.+^$]$/) && (b = "\\" + b);
	//             for (var c, d = [], e = new RegExp("^((?:\\\\.|[^\\\\" + b + "])*)" + b + "(.*)"); c = a.match(e); )
	//                 d.push(c[1]),
	//                 a = c[2];
	//             return d.push(a),
	//             d
	//         }, e = /^ {0,3}\|(.+)\n {0,3}\|\s*([\-:]+[\-| :]*)\n((?:\s*\|.*(?:\n|$))*)(?=\n|$)/, f = /^ {0,3}(\S(?:\\.|[^\\|])*\|.*)\n {0,3}([\-:]+\s*\|[\-| :]*)\n((?:(?:\\.|[^\\|])*\|.*(?:\n|$))*)(?=\n|$)/;
	//         if (c = a.match(e))
	//             c[3] = c[3].replace(/^\s*\|/gm, "");
	//         else if (!(c = a.match(f)))
	//             return void 0;
	//         var w = ["table", ["thead", ["tr"]], ["tbody"]];
	//         c[2] = c[2].replace(/\|\s*$/, "").split("|");
	//         var g = [];
	//         for (q(c[2], function(a) {
	//             a.match(/^\s*-+:\s*$/) ? g.push({
	//                 align: "right"
	//             }) : a.match(/^\s*:-+\s*$/) ? g.push({
	//                 align: "left"
	//             }) : a.match(/^\s*:-+:\s*$/) ? g.push({
	//                 align: "center"
	//             }) : g.push({})
	//         }),
	//         c[1] = d(c[1].replace(/\|\s*$/, ""), "|"),
	//         b = 0; b < c[1].length; b++)
	//             w[1][1].push(["th", g[b] || {}].concat(this.processInline(c[1][b].trim())));
	//         return q(c[3].replace(/\|\s*$/gm, "").split("\n"), function(a) {
	//             var c = ["tr"];
	//             for (a = d(a, "|"),
	//             b = 0; b < a.length; b++)
	//                 c.push(["td", g[b] || {}].concat(this.processInline(a[b].trim())));
	//             w[2].push(c)
	//         }, this),
	//         [w]
	//     }
	//     ,
	//     u.inline["{:"] = function(a, b, c) {
	//         if (!c.length)
	//             return [2, "{:"];
	//         var d = c[c.length - 1];
	//         if ("string" == typeof d)
	//             return [2, "{:"];
	//         var e = a.match(/^\{:\s*((?:\\\}|[^\}])*)\s*\}/);
	//         if (!e)
	//             return [2, "{:"];
	//         var f = this.dialect.processMetaHash(e[1])
	//           , g = o(d);
	//         g || (g = {},
	//         d.splice(1, 0, g));
	//         for (var h in f)
	//             g[h] = f[h];
	//         return [e[0].length, ""]
	//     }
	//     ,
	//     m.dialects.Maruku = u,
	//     m.dialects.Maruku.inline.__escape__ = /^\\[\\`\*_{}\[\]()#\+.!\-|:]/,
	//     m.buildBlockOrder(m.dialects.Maruku.block),
	//     m.buildInlinePatterns(m.dialects.Maruku.inline),
	//     a.Markdown = m,
	//     a.parse = m.parse,
	//     a.toHTML = m.toHTML,
	//     a.toHTMLTree = m.toHTMLTree,
	//     a.renderJsonML = m.renderJsonML
	// }(function() {
	//     return window.markdown = {},
	//     window.markdown
	// }());
	