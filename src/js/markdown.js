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

		return this.token(src, true, 0);
	};
	
	/**
	 * Lexing
	 */
	
	Lexer.prototype.token = function(src, top, startPos, adj, bq) {
		if (!adj) {
			adj = function (x) {return x};
		}
		function seekReg(reg, inputStr) {
			reg.lastIndex=0; let cap=[], idx=[];
			while ((result = reg.exec(inputStr)) != null){
			   cap.push(result[0]); 
			   var fIndex=reg.firstIndex;
			   var lIndex=reg.lastIndex-result[0].length;
			   idx.push(lIndex);
			} 
			return [cap, idx];
		}
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
				type: 'space',
				start: adj(startPos),
				end: adj(startPos += cap[0].length)
			});
			} else {
				startPos += cap[0].length;
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
				: cap,
				start: adj(startPos),
				end: adj(startPos += cap[0].length)
			});
			continue;
		}
	
		// fences (gfm)
		if (cap = this.rules.fences.exec(src)) {
			src = src.substring(cap[0].length);
			this.tokens.push({
			type: 'code',
			lang: cap[2],
			text: cap[3] || '',
			start: adj(startPos),
			end: adj(startPos += cap[0].length)
			});
			continue;
		}
	
		// heading
		if (cap = this.rules.heading.exec(src)) {
			src = src.substring(cap[0].length);
			this.tokens.push({
			type: 'heading',
			depth: cap[1].length,
			text: cap[2],
			start: adj(startPos),
			end: adj(startPos += cap[0].length)
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
			cells: cap[3].replace(/\n$/, '').split('\n'),
			start: adj(startPos),
			end: adj(startPos += cap[0].length)
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
			text: cap[1],
			start: adj(startPos),
			end: adj(startPos += cap[0].length)
			});
			continue;
		}
	
		// hr
		if (cap = this.rules.hr.exec(src)) {
			src = src.substring(cap[0].length);
			this.tokens.push({
			type: 'hr',
			start: adj(startPos),
			end: adj(startPos += cap[0].length)
			});
			continue;
		}
	
		// blockquote
		if (cap = this.rules.blockquote.exec(src)) {
			var caplen = cap[0].length;
			src = src.substring(cap[0].length);
	
			this.tokens.push({
			type: 'blockquote_start',
			start: adj(startPos),
			end: adj(startPos)
			});
	
			var reg = /^ *> ?/gm;
			lo = seekReg(reg, cap[0]), acc = 0, adjust;
			if (lo[0].length > 0) {
				for (var id = 0; id < lo[0].length - 1; ++id) {
					acc += lo[0][id].length;
					lo[1][id + 1] -= acc;
					lo[0][id] = acc;
				}
				lo[0][lo[0].length - 1] = acc + lo[0][lo[0].length - 1].length;
				lo[1].push(Infinity);
				adjust = function (lo) {
					return function (index) {
						var i = 0, j = lo[1].length - 1, mid;
						if (index >= lo[1][0]) {
							// lo[1][i] <= index < lo[1][i+1]
							while (i + 1 < j) {
								mid = parseInt((i+j)/2);
								if (lo[1][mid] <= index) {
									i = mid;
								} else {
									j = mid;
								}
							}
							return adj(index + lo[0][i]);
						} else {
							return adj(index);
						}
					}
				} (lo);
				cap = cap[0].replace(/^ *> ?/gm, '');
				
				for (var id = 0; id < lo[1].length - 1; ++id) {
					lo[1][id] += startPos;
				}
			}
			// cap.startPos = startPos;
	
			// Pass `top` to keep the current
			// "toplevel" state. This is exactly
			// how markdown.pl works.
			this.token(cap, top, startPos, adjust ? adjust : adj, true);
	
			this.tokens.push({
			type: 'blockquote_end',
			start: adj(startPos += caplen),
			end: adj(startPos)
			});
	
			continue;
		}
	
		// list
		if (cap = this.rules.list.exec(src)) {
			var start = startPos, pos;
			src = src.substring(cap[0].length);
			bull = cap[2];
	
			let tok = {
				type: 'list_start',
				ordered: bull.length > 1,
				start: adj(startPos),
				end: adj(startPos += cap[0].length)
			}
			this.tokens.push(tok);
	
			// Get each top-level item.
			var o = seekReg(this.rules.item, cap[0]);
			var positions = o[1];
			for (i = 0; i < positions.length; ++i) {
				positions[i] += start;
			}
			cap = o[0];//cap[0].match(this.rules.item);
	
			next = false;
			l = cap.length;
			i = 0;
	
			for (; i < l; i++) {
			item = cap[i];
			pos = positions[i];
			pos += item.length;
	
			// Remove the list item's bullet
			// so it is seen as the next token.
			space = item.length;
			item = item.replace(/^ *([*+-]|\d+\.) +/, '');
	
			// Outdent whatever the
			// list item contains. Hacky.
			var adjust, lo, offset;
			if (~item.indexOf('\n ')) {
				space -= item.length;
				var reg = !this.options.pedantic ? new RegExp('^ {1,' + space + '}', 'gm') : /^ {1,4}/gm;
				lo = seekReg(reg, item), acc = 0;
				if (lo[0].length > 0) {
					for (var id = 0; id < lo[0].length - 1; ++id) {
						acc += lo[0][id].length;
						lo[1][id + 1] -= acc;
						lo[0][id] = acc;
					}
					lo[0][lo[0].length - 1] = acc + lo[0][lo[0].length - 1].length;
					lo[1].push(Infinity);
					adjust = function (lo) {
						return function (index) {
							var i = 0, j = lo[1].length - 1, mid;
							if (index >= lo[1][0]) {
								// lo[1][i] <= index < lo[1][i+1]
								while (i + 1 < j) {
									mid = parseInt((i+j)/2);
									if (lo[1][mid] <= index) {
										i = mid;
									} else {
										j = mid;
									}
								}
								return adj(index + lo[0][i]);
							} else {
								return adj(index);
							}
						}
					} (lo);
					item = item.replace(reg, '');
					
					pos -= item.length + (offset = lo[0][lo[0].length - 1]);
					for (var id = 0; id < lo[1].length - 1; ++id) {
						lo[1][id] += pos;
					}
				}
			} else {
				pos -= item.length;
				offset = 0;
			}
	
			// Determine whether the next list item belongs here.
			// Backpedal if it does not belong in this list.
			if (this.options.smartLists && i !== l - 1) {
				b = block.bullet.exec(cap[i + 1])[0];
				if (bull !== b && !(bull.length > 1 && b.length > 1)) {
				var spp = cap.slice(i + 1).join('\n');
				src = spp + src;
				startPos -= spp.length;
				tok.end = startPos;
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
				: 'list_item_start',
				start: adj(pos),
				end: adj(pos + item.length + offset)
			});

			// Recurse.
			this.token(item, false, pos, adjust ? adjust : adj, bq);
	
			this.tokens.push({
				type: 'list_item_end',
				start: adj(pos),
				end: adj(pos + item.length + offset)
			});
			}
	
			this.tokens.push({
			type: 'list_end',
			start: adj(startPos),
			end: adj(startPos)
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
			text: cap[0],
			start: adj(startPos),
			end: adj(startPos += cap[0].length)
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
			cells: cap[3].replace(/(?: *\| *)?\n$/, '').split('\n'),
			start: adj(startPos),
			end: adj(startPos += cap[0].length)
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
				: cap[1],
			start: adj(startPos),
			end: adj(startPos += cap[0].length)
			});
			continue;
		}
	
		// text
		if (cap = this.rules.text.exec(src)) {
			// Top-level should never reach here.
			src = src.substring(cap[0].length);
			this.tokens.push({
			type: 'text',
			text: cap[0],
			start: adj(startPos),
			end: adj(startPos += cap[0].length)
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
		escape: /^\\([`*{}\[\]()#+\-.!_>\$]|\\(?![\]\[\(\)]))/,
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
		text: /^[\s\S]+?(?=\$\$|[\\<!\[_*`]| {2,}\n|$)/,
		//qtag
		qtag: /^<!--:([:><\+\|\.]*)((?:(?:[^-]|-(?=-->))|-[^-]|--[^>])*)-->/
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
		(),
		//katex
		inlinekatex: /^ *\\\\\(((?:[^\\]|(?:\\[^\\]|\\\\(?!\))))*)\\\\\)/,
		//katex
		katex: /^ *(?:\$\$((?:[^\$]|\\\$)*)\$\$|\\\\\[((?:[^\\]|(?:\\[^\\]|\\\\(?!\])))*)\\\\\])/
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
	
	InlineLexer.output = function(src, startPos, links, options) {
		var inline = new InlineLexer(links, options);
		return inline.output(src, startPos);
	};
	
	/**
	 * Lexing/Compiling
	 */
	
	InlineLexer.prototype.output = function(src, startPos) {
		var out = ''
		, link
		, text
		, href
		, cap;
	
		while (src) {
		// escape
		if (cap = this.rules.escape.exec(src)) {
			startPos += cap[0].length;
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
			out += this.renderer.link(href, null, text, startPos, startPos += cap[0].length);
			continue;
		}
	
		// url (gfm)
		if (!this.inLink && (cap = this.rules.url.exec(src))) {
			src = src.substring(cap[0].length);
			text = escape(cap[1]);
			href = text;
			out += this.renderer.link(href, null, text, startPos, startPos += cap[0].length);
			continue;
		}
		
		//qtag
		if (cap = this.rules.qtag.exec(src)) {
			src= src.substring(cap[0].length);
			out += this.renderer.qtag(cap[1], cap[2], startPos, startPos += cap[0].length);
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
			out += this.renderer.strong(this.output(cap[2] || cap[1], startPos + 2), startPos, startPos += cap[0].length);
			continue;
		}
	
		// em
		if (cap = this.rules.em.exec(src)) {
			src = src.substring(cap[0].length);
			out += this.renderer.em(this.output(cap[2] || cap[1], startPos + 1), startPos, startPos += cap[0].length);
			continue;
		}
	
		// code
		if (cap = this.rules.code.exec(src)) {
			src = src.substring(cap[0].length);
			out += this.renderer.codespan(escape(cap[2], true), startPos, startPos += cap[0].length);
			continue;
		}
	
		// br
		if (cap = this.rules.br.exec(src)) {
			src = src.substring(cap[0].length);
			out += this.renderer.br(startPos, startPos += cap[0].length);
			continue;
		}
	
		// del (gfm)
		if (cap = this.rules.del.exec(src)) {
			src = src.substring(cap[0].length);
			out += this.renderer.del(this.output(cap[1], startPos), startPos, startPos += cap[0].length);
			continue;
		}

		// inlinekatex
		if (cap = this.rules.inlinekatex.exec(src)) {
			src = src.substring(cap[0].length);
			out += this.renderer.inlinekatex(cap[1], startPos, startPos += cap[0].length);
			continue;
		}

		//katex
		if (cap = this.rules.katex.exec(src)) {
			src = src.substring(cap[0].length);
			out += this.renderer.katex(cap[1], startPos, startPos += cap[0].length);
			continue;
		}
	
		// text
		if (cap = this.rules.text.exec(src)) {
			src = src.substring(cap[0].length);
			out += this.renderer.text(escape(this.smartypants(cap[0])), startPos, startPos += cap[0].length);
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
	
	Renderer.prototype.code = function(code, lang, escaped, start, end) {
		if (this.options.highlight) {
		var out = this.options.highlight(code, lang);
		if (out != null && out !== code) {
			escaped = true;
			code = out;
		}
		}
	
		if (!lang) {
		return '<pre class="marked-elem" data-start="' 
			+ start + '" data-end="' + end + '"><code>'
			+ (escaped ? code : escape(code, true))
			+ '\n</code></pre>';
		}
	
		return '<pre class="marked-elem" data-start="' 
		+ start + '" data-end="' + end + '"><code class="'
		+ this.options.langPrefix
		+ escape(lang, true)
		+ '">'
		+ (escaped ? code : escape(code, true))
		+ '\n</code></pre>\n';
	};

	//katex
	Renderer.prototype.katex = function(text, start, end) {
		return '<div class="katex-block marked-elem" style="display: block" data-start="' 
		+ start + '" data-end="' + end + '">$$'
		+ text
		+ '$$</div>';
	};

	Renderer.prototype.inlinekatex = function(text, start, end) {
		return '<span class="katex-inline-block marked-elem" data-start="' 
		+ start + '" data-end="' + end + '">\\('
		+ text
		+ '\\)</span>';
	};
	
	Renderer.prototype.blockquote = function(quote, start, end) {
		return '<blockquote class="marked-elem" data-start="' 
		+ start + '" data-end="' + end + '">\n' + quote + '</blockquote>\n';
	};
	
	//qtag
	Renderer.prototype.qtag = function(category, classes, start, end) {
		var tag = "";
		var close = category[category.length - 1] == ".";
		switch (category) {
			case ":": tag = "div"; break;
			default: tag = "span"; break;
		}
		return "<" + (close?"/":"") + tag + ' class="' + classes + ' marked-elem" data-start="' 
		+ start + '" data-end="' + end + '">';
	}

	Renderer.prototype.html = function(html, start, end) {
		return html;
	};
	
	Renderer.prototype.heading = function(text, level, raw, start, end) {
		return '<h'
		+ level
		+ ' id="'
		+ this.options.headerPrefix
		+ raw.toLowerCase().replace(/[^\w]+/g, '-')
		+ '" class="marked-elem" data-start="' 
		+ start + '" data-end="' + end + '">'
		+ text
		+ '</h'
		+ level
		+ '>\n';
	};
	
	Renderer.prototype.hr = function(start, end) {
		return this.options.xhtml ? '<hr class="marked-elem" data-start="' 
		+ start + '" data-end="' + end + '"/>\n' : '<hr class="marked-elem" data-start="' 
		+ start + '" data-end="' + end + '">\n';
	};
	
	Renderer.prototype.list = function(body, ordered, start, end) {
		var type = ordered ? 'ol' : 'ul';
		return '<' + type + ' class="marked-elem" data-start="' 
		+ start + '" data-end="' + end + '">\n' + body + '</' + type + '>\n';
	};
	
	Renderer.prototype.listitem = function(text, start, end) {
		return '<li class="marked-elem" data-start="' 
		+ start + '" data-end="' + end + '">' + text + '</li>\n';
	};
	
	Renderer.prototype.paragraph = function(text, start, end) {
		return '<p class="marked-elem" data-start="' 
		+ start + '" data-end="' + end + '">' + text + '</p>\n';
	};
	
	Renderer.prototype.table = function(header, body, start, end) {
		return '<table class="marked-elem" data-start="' 
		+ start + '" data-end="' + end + '">\n'
		+ '<thead>\n'
		+ header
		+ '</thead>\n'
		+ '<tbody>\n'
		+ body
		+ '</tbody>\n'
		+ '</table>\n';
	};
	
	Renderer.prototype.tablerow = function(content, start, end) {
		return '<tr class="marked-elem" data-start="' 
		+ start + '" data-end="' + end + '">\n' + content + '</tr>\n';
	};
	
	Renderer.prototype.tablecell = function(content, flags, start, end) {
		var type = flags.header ? 'th' : 'td';
		var tag = flags.align
		? '<' + type + ' style="text-align:' + flags.align + '" class="marked-elem" data-start="' 
		+ start + '" data-end="' + end + '">'
		: '<' + type + ' class="marked-elem" data-start="' 
		+ start + '" data-end="' + end + '">';
		return tag + content + '</' + type + '>\n';
	};
	
	// span level renderer
	Renderer.prototype.strong = function(text, start, end) {
		return '<strong class="marked-elem" data-start="' 
		+ start + '" data-end="' + end + '">' + text + '</strong>';
	};
	
	Renderer.prototype.em = function(text, start, end) {
		return '<em class="marked-elem" data-start="' 
		+ start + '" data-end="' + end + '">' + text + '</em>';
	};
	
	Renderer.prototype.codespan = function(text, start, end) {
		return '<code class="marked-elem" data-start="' 
		+ start + '" data-end="' + end + '">' + text + '</code>';
	};
	
	Renderer.prototype.br = function(start, end) {
		return this.options.xhtml ? '<br class="marked-elem" data-start="' 
		+ start + '" data-end="' + end + '"/>' : '<br class="marked-elem" data-start="' 
		+ start + '" data-end="' + end + '">';
	};
	
	Renderer.prototype.del = function(start, end) {
		return '<del class="marked-elem" data-start="' 
		+ start + '" data-end="' + end + '">' + text + '</del>';
	};
	
	Renderer.prototype.link = function(href, title, text, start, end) {
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
		out += ' class="marked-elem" data-start="' 
		+ start + '" data-end="' + end + '">' + text + '</a>';
		return out;
	};
	
	Renderer.prototype.image = function(href, title, text, start, end) {
		var out = '<img src="' + href + '" alt="' + text + '"';
		if (title) {
		out += ' title="' + title + '"';
		}
		out += this.options.xhtml ? ' class="marked-elem" data-start="' 
		+ start + '" data-end="' + end + '"/>' : ' class="marked-elem" data-start="' 
		+ start + '" data-end="' + end + '">';
		return out;
	};
	
	Renderer.prototype.text = function(text, start, end) {
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
		var start = this.token.start;
		var body = this.token.text;
	
		while (this.peek().type === 'text') {
		body += '\n' + this.next().text;
		}
	
		return this.inline.output(body, start);
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
			return this.renderer.hr(this.token.start, this.token.end);
		}
		case 'heading': {
			return this.renderer.heading(
			this.inline.output(this.token.text, this.token.start),
			this.token.depth,
			this.token.text,
			this.token.start, this.token.end);
		}
		case 'code': {
			return this.renderer.code(this.token.text,
			this.token.lang,
			this.token.escaped,
			this.token.start, this.token.end);
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
				this.inline.output(this.token.header[i], this.token.start),
				{ header: true, align: this.token.align[i] }
			);
			}
			header += this.renderer.tablerow(cell);
	
			for (i = 0; i < this.token.cells.length; i++) {
			row = this.token.cells[i];
	
			cell = '';
			for (j = 0; j < row.length; j++) {
				cell += this.renderer.tablecell(
				this.inline.output(row[j], this.token.start),
				{ header: false, align: this.token.align[j] }
				);
			}
	
			body += this.renderer.tablerow(cell);
			}
			return this.renderer.table(header, body, this.token.start, this.token.end);
		}
		case 'blockquote_start': {
			var start = this.token.start;
			var body = '';
	
			while (this.next().type !== 'blockquote_end') {
			body += this.tok();
			}
	
			return this.renderer.blockquote(body, start, this.token.end);
		}
		case 'list_start': {
			var start = this.token.start;
			var body = ''
			, ordered = this.token.ordered;
	
			while (this.next().type !== 'list_end') {
			body += this.tok();
			}
	
			return this.renderer.list(body, ordered, start, this.token.end);
		}
		case 'list_item_start': {
			var start = this.token.start;
			var body = '';
	
			while (this.next().type !== 'list_item_end') {
			body += this.token.type === 'text'
				? this.parseText()
				: this.tok();
			}
	
			return this.renderer.listitem(body, start, this.token.end);
		}
		case 'loose_item_start': {
			var start = this.token.start;
			var body = '';
	
			while (this.next().type !== 'list_item_end') {
			body += this.tok();
			}
	
			return this.renderer.listitem(body, start, this.token.end);
		}
		case 'html': {
			var html = !this.token.pre && !this.options.pedantic
			? this.inline.output(this.token.text, this.token.start)
			: this.token.text;
			return this.renderer.html(html, this.token.start, this.token.end);
		}
		case 'paragraph': {
			return this.renderer.paragraph(this.inline.output(this.token.text, this.token.start), this.token.start, this.token.end);
		}
		case 'text': {
			return this.renderer.paragraph(this.parseText(), this.token.start, this.token.end);
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
