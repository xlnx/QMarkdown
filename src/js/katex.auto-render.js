(function (e) {
	if (typeof exports === "object" && typeof module !== "undefined") {
		module.exports = e()
	} else if (typeof define === "function" && define.amd) {
		define([], e)
	} else {
		var t;
		if (typeof window !== "undefined") {
			t = window
		} else if (typeof global !== "undefined") {
			t = global
		} else if (typeof self !== "undefined") {
			t = self
		} else {
			t = this
		}
		t.renderMathInElement = e()
	}
})(function () {
	var e, t, r;
	return function e(t, r, n) {
		function o(a, c) {
			if (!r[a]) {
				if (!t[a]) {
					var u = typeof require == "function" && require;
					if (!c && u) return u(a, !0);
					if (i) return i(a, !0);
					var f = new Error("Cannot find module '" + a + "'");
					throw f.code = "MODULE_NOT_FOUND", f
				}
				var s = r[a] = {
					exports: {}
				};
				t[a][0].call(s.exports, function (e) {
					var r = t[a][1][e];
					return o(r ? r : e)
				}, s, s.exports, e, t, r, n)
			}
			return r[a].exports
		}
		var i = typeof require == "function" && require;
		for (var a = 0; a < n.length; a++) o(n[a]);
		return o
	}({
		1: [function (e, t, r) {
			"use strict";
			var n = e("babel-runtime/core-js/object/assign");
			var o = c(n);
			var i = e("./splitAtDelimiters");
			var a = c(i);

			function c(e) {
				return e && e.__esModule ? e : {
					default: e
				}
			}
			var u = function e(t, r) {
				var n = [{
					type: "text",
					data: t
				}];
				for (var o = 0; o < r.length; o++) {
					var i = r[o];
					n = (0, a.default)(n, i.left, i.right, i.display || false)
				}
				return n
			};
			var f = function e(t, r) {
				var n = u(t, r.delimiters);
				var o = document.createDocumentFragment();
				for (var i = 0; i < n.length; i++) {
					if (n[i].type === "text") {
						o.appendChild(document.createTextNode(n[i].data))
					} else {
						var a = document.createElement("span");
						var c = n[i].data;
						r.displayMode = n[i].display;
						try {
							katex.render(c, a, r)
						} catch (e) {
							if (!(e instanceof katex.ParseError)) {
								throw e
							}
							r.errorCallback("KaTeX auto-render: Failed to parse `" + n[i].data + "` with ", e);
							o.appendChild(document.createTextNode(n[i].rawData));
							continue
						}
						o.appendChild(a)
					}
				}
				return o
			};
			var s = function e(t, r) {
				for (var n = 0; n < t.childNodes.length; n++) {
					var o = t.childNodes[n];
					if (o.nodeType === 3) {
						var i = f(o.textContent, r);
						n += i.childNodes.length - 1;
						t.replaceChild(i, o)
					} else if (o.nodeType === 1) {
						var a = r.ignoredTags.indexOf(o.nodeName.toLowerCase()) === -1;
						if (a) {
							e(o, r)
						}
					}
				}
			};
			var l = {
				delimiters: [{
					left: "$$",
					right: "$$",
					display: true
				}, {
					left: "\\[",
					right: "\\]",
					display: true
				}, {
					left: "\\(",
					right: "\\)",
					display: false
				}],
				ignoredTags: ["script", "noscript", "style", "textarea", "pre", "code"],
				errorCallback: function e(t, r) {
					console.error(t, r)
				}
			};
			var p = function e(t, r) {
				if (!t) {
					throw new Error("No element provided to render")
				}
				var n = (0, o.default)({}, l, r);
				s(t, n)
			};
			t.exports = p
		}, {
			"./splitAtDelimiters": 2,
			"babel-runtime/core-js/object/assign": 3
		}],
		2: [function (e, t, r) {
			"use strict";
			Object.defineProperty(r, "__esModule", {
				value: true
			});
			var n = function e(t, r, n) {
				var o = n;
				var i = 0;
				var a = t.length;
				while (o < r.length) {
					var c = r[o];
					if (i <= 0 && r.slice(o, o + a) === t) {
						return o
					} else if (c === "\\") {
						o++
					} else if (c === "{") {
						i++
					} else if (c === "}") {
						i--
					}
					o++
				}
				return -1
			};
			var o = function e(t, r, o, i) {
				var a = [];
				for (var c = 0; c < t.length; c++) {
					if (t[c].type === "text") {
						var u = t[c].data;
						var f = true;
						var s = 0;
						var l = void 0;
						l = u.indexOf(r);
						if (l !== -1) {
							s = l;
							a.push({
								type: "text",
								data: u.slice(0, s)
							});
							f = false
						}
						while (true) {
							if (f) {
								l = u.indexOf(r, s);
								if (l === -1) {
									break
								}
								a.push({
									type: "text",
									data: u.slice(s, l)
								});
								s = l
							} else {
								l = n(o, u, s + r.length);
								if (l === -1) {
									break
								}
								a.push({
									type: "math",
									data: u.slice(s + r.length, l),
									rawData: u.slice(s, l + o.length),
									display: i
								});
								s = l + o.length
							}
							f = !f
						}
						a.push({
							type: "text",
							data: u.slice(s)
						})
					} else {
						a.push(t[c])
					}
				}
				return a
			};
			r.default = o
		}, {}],
		3: [function (e, t, r) {
			t.exports = {
				default: e("core-js/library/fn/object/assign"),
				__esModule: true
			}
		}, {
			"core-js/library/fn/object/assign": 4
		}],
		4: [function (e, t, r) {
			e("../../modules/es6.object.assign");
			t.exports = e("../../modules/_core").Object.assign
		}, {
			"../../modules/_core": 9,
			"../../modules/es6.object.assign": 39
		}],
		5: [function (e, t, r) {
			t.exports = function (e) {
				if (typeof e != "function") throw TypeError(e + " is not a function!");
				return e
			}
		}, {}],
		6: [function (e, t, r) {
			var n = e("./_is-object");
			t.exports = function (e) {
				if (!n(e)) throw TypeError(e + " is not an object!");
				return e
			}
		}, {
			"./_is-object": 22
		}],
		7: [function (e, t, r) {
			var n = e("./_to-iobject");
			var o = e("./_to-length");
			var i = e("./_to-absolute-index");
			t.exports = function (e) {
				return function (t, r, a) {
					var c = n(t);
					var u = o(c.length);
					var f = i(a, u);
					var s;
					if (e && r != r)
						while (u > f) {
							s = c[f++];
							if (s != s) return true
						} else
							for (; u > f; f++)
								if (e || f in c) {
									if (c[f] === r) return e || f || 0
								}
					return !e && -1
				}
			}
		}, {
			"./_to-absolute-index": 32,
			"./_to-iobject": 34,
			"./_to-length": 35
		}],
		8: [function (e, t, r) {
			var n = {}.toString;
			t.exports = function (e) {
				return n.call(e).slice(8, -1)
			}
		}, {}],
		9: [function (e, t, r) {
			var n = t.exports = {
				version: "2.5.1"
			};
			if (typeof __e == "number") __e = n
		}, {}],
		10: [function (e, t, r) {
			var n = e("./_a-function");
			t.exports = function (e, t, r) {
				n(e);
				if (t === undefined) return e;
				switch (r) {
					case 1:
						return function (r) {
							return e.call(t, r)
						};
					case 2:
						return function (r, n) {
							return e.call(t, r, n)
						};
					case 3:
						return function (r, n, o) {
							return e.call(t, r, n, o)
						}
				}
				return function () {
					return e.apply(t, arguments)
				}
			}
		}, {
			"./_a-function": 5
		}],
		11: [function (e, t, r) {
			t.exports = function (e) {
				if (e == undefined) throw TypeError("Can't call method on  " + e);
				return e
			}
		}, {}],
		12: [function (e, t, r) {
			t.exports = !e("./_fails")(function () {
				return Object.defineProperty({}, "a", {
					get: function () {
						return 7
					}
				}).a != 7
			})
		}, {
			"./_fails": 16
		}],
		13: [function (e, t, r) {
			var n = e("./_is-object");
			var o = e("./_global").document;
			var i = n(o) && n(o.createElement);
			t.exports = function (e) {
				return i ? o.createElement(e) : {}
			}
		}, {
			"./_global": 17,
			"./_is-object": 22
		}],
		14: [function (e, t, r) {
			t.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")
		}, {}],
		15: [function (e, t, r) {
			var n = e("./_global");
			var o = e("./_core");
			var i = e("./_ctx");
			var a = e("./_hide");
			var c = "prototype";
			var u = function (e, t, r) {
				var f = e & u.F;
				var s = e & u.G;
				var l = e & u.S;
				var p = e & u.P;
				var d = e & u.B;
				var v = e & u.W;
				var _ = s ? o : o[t] || (o[t] = {});
				var b = _[c];
				var h = s ? n : l ? n[t] : (n[t] || {})[c];
				var y, g, j;
				if (s) r = t;
				for (y in r) {
					g = !f && h && h[y] !== undefined;
					if (g && y in _) continue;
					j = g ? h[y] : r[y];
					_[y] = s && typeof h[y] != "function" ? r[y] : d && g ? i(j, n) : v && h[y] == j ? function (e) {
						var t = function (t, r, n) {
							if (this instanceof e) {
								switch (arguments.length) {
									case 0:
										return new e;
									case 1:
										return new e(t);
									case 2:
										return new e(t, r)
								}
								return new e(t, r, n)
							}
							return e.apply(this, arguments)
						};
						t[c] = e[c];
						return t
					}(j) : p && typeof j == "function" ? i(Function.call, j) : j;
					if (p) {
						(_.virtual || (_.virtual = {}))[y] = j;
						if (e & u.R && b && !b[y]) a(b, y, j)
					}
				}
			};
			u.F = 1;
			u.G = 2;
			u.S = 4;
			u.P = 8;
			u.B = 16;
			u.W = 32;
			u.U = 64;
			u.R = 128;
			t.exports = u
		}, {
			"./_core": 9,
			"./_ctx": 10,
			"./_global": 17,
			"./_hide": 19
		}],
		16: [function (e, t, r) {
			t.exports = function (e) {
				try {
					return !!e()
				} catch (e) {
					return true
				}
			}
		}, {}],
		17: [function (e, t, r) {
			var n = t.exports = typeof window != "undefined" && window.Math == Math ? window : typeof self != "undefined" && self.Math == Math ? self : Function("return this")();
			if (typeof __g == "number") __g = n
		}, {}],
		18: [function (e, t, r) {
			var n = {}.hasOwnProperty;
			t.exports = function (e, t) {
				return n.call(e, t)
			}
		}, {}],
		19: [function (e, t, r) {
			var n = e("./_object-dp");
			var o = e("./_property-desc");
			t.exports = e("./_descriptors") ? function (e, t, r) {
				return n.f(e, t, o(1, r))
			} : function (e, t, r) {
				e[t] = r;
				return e
			}
		}, {
			"./_descriptors": 12,
			"./_object-dp": 24,
			"./_property-desc": 29
		}],
		20: [function (e, t, r) {
			t.exports = !e("./_descriptors") && !e("./_fails")(function () {
				return Object.defineProperty(e("./_dom-create")("div"), "a", {
					get: function () {
						return 7
					}
				}).a != 7
			})
		}, {
			"./_descriptors": 12,
			"./_dom-create": 13,
			"./_fails": 16
		}],
		21: [function (e, t, r) {
			var n = e("./_cof");
			t.exports = Object("z").propertyIsEnumerable(0) ? Object : function (e) {
				return n(e) == "String" ? e.split("") : Object(e)
			}
		}, {
			"./_cof": 8
		}],
		22: [function (e, t, r) {
			t.exports = function (e) {
				return typeof e === "object" ? e !== null : typeof e === "function"
			}
		}, {}],
		23: [function (e, t, r) {
			"use strict";
			var n = e("./_object-keys");
			var o = e("./_object-gops");
			var i = e("./_object-pie");
			var a = e("./_to-object");
			var c = e("./_iobject");
			var u = Object.assign;
			t.exports = !u || e("./_fails")(function () {
				var e = {};
				var t = {};
				var r = Symbol();
				var n = "abcdefghijklmnopqrst";
				e[r] = 7;
				n.split("").forEach(function (e) {
					t[e] = e
				});
				return u({}, e)[r] != 7 || Object.keys(u({}, t)).join("") != n
			}) ? function e(t, r) {
				var u = a(t);
				var f = arguments.length;
				var s = 1;
				var l = o.f;
				var p = i.f;
				while (f > s) {
					var d = c(arguments[s++]);
					var v = l ? n(d).concat(l(d)) : n(d);
					var _ = v.length;
					var b = 0;
					var h;
					while (_ > b)
						if (p.call(d, h = v[b++])) u[h] = d[h]
				}
				return u
			} : u
		}, {
			"./_fails": 16,
			"./_iobject": 21,
			"./_object-gops": 25,
			"./_object-keys": 27,
			"./_object-pie": 28,
			"./_to-object": 36
		}],
		24: [function (e, t, r) {
			var n = e("./_an-object");
			var o = e("./_ie8-dom-define");
			var i = e("./_to-primitive");
			var a = Object.defineProperty;
			r.f = e("./_descriptors") ? Object.defineProperty : function e(t, r, c) {
				n(t);
				r = i(r, true);
				n(c);
				if (o) try {
					return a(t, r, c)
				} catch (e) {}
				if ("get" in c || "set" in c) throw TypeError("Accessors not supported!");
				if ("value" in c) t[r] = c.value;
				return t
			}
		}, {
			"./_an-object": 6,
			"./_descriptors": 12,
			"./_ie8-dom-define": 20,
			"./_to-primitive": 37
		}],
		25: [function (e, t, r) {
			r.f = Object.getOwnPropertySymbols
		}, {}],
		26: [function (e, t, r) {
			var n = e("./_has");
			var o = e("./_to-iobject");
			var i = e("./_array-includes")(false);
			var a = e("./_shared-key")("IE_PROTO");
			t.exports = function (e, t) {
				var r = o(e);
				var c = 0;
				var u = [];
				var f;
				for (f in r)
					if (f != a) n(r, f) && u.push(f);
				while (t.length > c)
					if (n(r, f = t[c++])) {
						~i(u, f) || u.push(f)
					}
				return u
			}
		}, {
			"./_array-includes": 7,
			"./_has": 18,
			"./_shared-key": 30,
			"./_to-iobject": 34
		}],
		27: [function (e, t, r) {
			var n = e("./_object-keys-internal");
			var o = e("./_enum-bug-keys");
			t.exports = Object.keys || function e(t) {
				return n(t, o)
			}
		}, {
			"./_enum-bug-keys": 14,
			"./_object-keys-internal": 26
		}],
		28: [function (e, t, r) {
			r.f = {}.propertyIsEnumerable
		}, {}],
		29: [function (e, t, r) {
			t.exports = function (e, t) {
				return {
					enumerable: !(e & 1),
					configurable: !(e & 2),
					writable: !(e & 4),
					value: t
				}
			}
		}, {}],
		30: [function (e, t, r) {
			var n = e("./_shared")("keys");
			var o = e("./_uid");
			t.exports = function (e) {
				return n[e] || (n[e] = o(e))
			}
		}, {
			"./_shared": 31,
			"./_uid": 38
		}],
		31: [function (e, t, r) {
			var n = e("./_global");
			var o = "__core-js_shared__";
			var i = n[o] || (n[o] = {});
			t.exports = function (e) {
				return i[e] || (i[e] = {})
			}
		}, {
			"./_global": 17
		}],
		32: [function (e, t, r) {
			var n = e("./_to-integer");
			var o = Math.max;
			var i = Math.min;
			t.exports = function (e, t) {
				e = n(e);
				return e < 0 ? o(e + t, 0) : i(e, t)
			}
		}, {
			"./_to-integer": 33
		}],
		33: [function (e, t, r) {
			var n = Math.ceil;
			var o = Math.floor;
			t.exports = function (e) {
				return isNaN(e = +e) ? 0 : (e > 0 ? o : n)(e)
			}
		}, {}],
		34: [function (e, t, r) {
			var n = e("./_iobject");
			var o = e("./_defined");
			t.exports = function (e) {
				return n(o(e))
			}
		}, {
			"./_defined": 11,
			"./_iobject": 21
		}],
		35: [function (e, t, r) {
			var n = e("./_to-integer");
			var o = Math.min;
			t.exports = function (e) {
				return e > 0 ? o(n(e), 9007199254740991) : 0
			}
		}, {
			"./_to-integer": 33
		}],
		36: [function (e, t, r) {
			var n = e("./_defined");
			t.exports = function (e) {
				return Object(n(e))
			}
		}, {
			"./_defined": 11
		}],
		37: [function (e, t, r) {
			var n = e("./_is-object");
			t.exports = function (e, t) {
				if (!n(e)) return e;
				var r, o;
				if (t && typeof (r = e.toString) == "function" && !n(o = r.call(e))) return o;
				if (typeof (r = e.valueOf) == "function" && !n(o = r.call(e))) return o;
				if (!t && typeof (r = e.toString) == "function" && !n(o = r.call(e))) return o;
				throw TypeError("Can't convert object to primitive value")
			}
		}, {
			"./_is-object": 22
		}],
		38: [function (e, t, r) {
			var n = 0;
			var o = Math.random();
			t.exports = function (e) {
				return "Symbol(".concat(e === undefined ? "" : e, ")_", (++n + o).toString(36))
			}
		}, {}],
		39: [function (e, t, r) {
			var n = e("./_export");
			n(n.S + n.F, "Object", {
				assign: e("./_object-assign")
			})
		}, {
			"./_export": 15,
			"./_object-assign": 23
		}]
	}, {}, [1])(1)
});