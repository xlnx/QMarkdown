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
		t.katex = e()
	}
})(function () {
	var e, t, r;
	return function e(t, r, a) {
		function n(l, u) {
			if (!r[l]) {
				if (!t[l]) {
					var o = typeof require == "function" && require;
					if (!u && o) return o(l, !0);
					if (i) return i(l, !0);
					var s = new Error("Cannot find module '" + l + "'");
					throw s.code = "MODULE_NOT_FOUND", s
				}
				var f = r[l] = {
					exports: {}
				};
				t[l][0].call(f.exports, function (e) {
					var r = t[l][1][e];
					return n(r ? r : e)
				}, f, f.exports, e, t, r, a)
			}
			return r[l].exports
		}
		var i = typeof require == "function" && require;
		for (var l = 0; l < a.length; l++) n(a[l]);
		return n
	}({
		1: [function (e, t, r) {
			"use strict";
			var a = e("./src/ParseError");
			var n = v(a);
			var i = e("./src/Settings");
			var l = v(i);
			var u = e("./src/buildTree");
			var o = v(u);
			var s = e("./src/parseTree");
			var f = v(s);
			var d = e("./src/utils");
			var c = v(d);

			function v(e) {
				return e && e.__esModule ? e : {
					default: e
				}
			}
			var h = function e(t, r, a) {
				c.default.clearNode(r);
				var n = new l.default(a);
				var i = (0, f.default)(t, n);
				var u = (0, o.default)(i, t, n).toNode();
				r.appendChild(u)
			};
			if (typeof document !== "undefined") {
				if (document.compatMode !== "CSS1Compat") {
					typeof console !== "undefined" && console.warn("Warning: KaTeX doesn't work in quirks mode. Make sure your " + "website has a suitable doctype.");
					h = function e() {
						throw new n.default("KaTeX doesn't work in quirks mode.")
					}
				}
			}
			var p = function e(t, r) {
				var a = new l.default(r);
				var n = (0, f.default)(t, a);
				return (0, o.default)(n, t, a).toMarkup()
			};
			var m = function e(t, r) {
				var a = new l.default(r);
				return (0, f.default)(t, a)
			};
			t.exports = {
				render: h,
				renderToString: p,
				__parse: m,
				ParseError: n.default
			}
		}, {
			"./src/ParseError": 84,
			"./src/Settings": 87,
			"./src/buildTree": 94,
			"./src/parseTree": 117,
			"./src/utils": 123
		}],
		2: [function (e, t, r) {
			t.exports = {
				default: e("core-js/library/fn/array/from"),
				__esModule: true
			}
		}, {
			"core-js/library/fn/array/from": 12
		}],
		3: [function (e, t, r) {
			t.exports = {
				default: e("core-js/library/fn/get-iterator"),
				__esModule: true
			}
		}, {
			"core-js/library/fn/get-iterator": 13
		}],
		4: [function (e, t, r) {
			t.exports = {
				default: e("core-js/library/fn/is-iterable"),
				__esModule: true
			}
		}, {
			"core-js/library/fn/is-iterable": 14
		}],
		5: [function (e, t, r) {
			t.exports = {
				default: e("core-js/library/fn/json/stringify"),
				__esModule: true
			}
		}, {
			"core-js/library/fn/json/stringify": 15
		}],
		6: [function (e, t, r) {
			t.exports = {
				default: e("core-js/library/fn/object/define-property"),
				__esModule: true
			}
		}, {
			"core-js/library/fn/object/define-property": 16
		}],
		7: [function (e, t, r) {
			t.exports = {
				default: e("core-js/library/fn/object/freeze"),
				__esModule: true
			}
		}, {
			"core-js/library/fn/object/freeze": 17
		}],
		8: [function (e, t, r) {
			"use strict";
			r.__esModule = true;
			r.default = function (e, t) {
				if (!(e instanceof t)) {
					throw new TypeError("Cannot call a class as a function")
				}
			}
		}, {}],
		9: [function (e, t, r) {
			"use strict";
			r.__esModule = true;
			var a = e("../core-js/object/define-property");
			var n = i(a);

			function i(e) {
				return e && e.__esModule ? e : {
					default: e
				}
			}
			r.default = function () {
				function e(e, t) {
					for (var r = 0; r < t.length; r++) {
						var a = t[r];
						a.enumerable = a.enumerable || false;
						a.configurable = true;
						if ("value" in a) a.writable = true;
						(0, n.default)(e, a.key, a)
					}
				}
				return function (t, r, a) {
					if (r) e(t.prototype, r);
					if (a) e(t, a);
					return t
				}
			}()
		}, {
			"../core-js/object/define-property": 6
		}],
		10: [function (e, t, r) {
			"use strict";
			r.__esModule = true;
			var a = e("../core-js/is-iterable");
			var n = u(a);
			var i = e("../core-js/get-iterator");
			var l = u(i);

			function u(e) {
				return e && e.__esModule ? e : {
					default: e
				}
			}
			r.default = function () {
				function e(e, t) {
					var r = [];
					var a = true;
					var n = false;
					var i = undefined;
					try {
						for (var u = (0, l.default)(e), o; !(a = (o = u.next()).done); a = true) {
							r.push(o.value);
							if (t && r.length === t) break
						}
					} catch (e) {
						n = true;
						i = e
					} finally {
						try {
							if (!a && u["return"]) u["return"]()
						} finally {
							if (n) throw i
						}
					}
					return r
				}
				return function (t, r) {
					if (Array.isArray(t)) {
						return t
					} else if ((0, n.default)(Object(t))) {
						return e(t, r)
					} else {
						throw new TypeError("Invalid attempt to destructure non-iterable instance")
					}
				}
			}()
		}, {
			"../core-js/get-iterator": 3,
			"../core-js/is-iterable": 4
		}],
		11: [function (e, t, r) {
			"use strict";
			r.__esModule = true;
			var a = e("../core-js/array/from");
			var n = i(a);

			function i(e) {
				return e && e.__esModule ? e : {
					default: e
				}
			}
			r.default = function (e) {
				if (Array.isArray(e)) {
					for (var t = 0, r = Array(e.length); t < e.length; t++) {
						r[t] = e[t]
					}
					return r
				} else {
					return (0, n.default)(e)
				}
			}
		}, {
			"../core-js/array/from": 2
		}],
		12: [function (e, t, r) {
			e("../../modules/es6.string.iterator");
			e("../../modules/es6.array.from");
			t.exports = e("../../modules/_core").Array.from
		}, {
			"../../modules/_core": 24,
			"../../modules/es6.array.from": 73,
			"../../modules/es6.string.iterator": 77
		}],
		13: [function (e, t, r) {
			e("../modules/web.dom.iterable");
			e("../modules/es6.string.iterator");
			t.exports = e("../modules/core.get-iterator")
		}, {
			"../modules/core.get-iterator": 71,
			"../modules/es6.string.iterator": 77,
			"../modules/web.dom.iterable": 78
		}],
		14: [function (e, t, r) {
			e("../modules/web.dom.iterable");
			e("../modules/es6.string.iterator");
			t.exports = e("../modules/core.is-iterable")
		}, {
			"../modules/core.is-iterable": 72,
			"../modules/es6.string.iterator": 77,
			"../modules/web.dom.iterable": 78
		}],
		15: [function (e, t, r) {
			var a = e("../../modules/_core");
			var n = a.JSON || (a.JSON = {
				stringify: JSON.stringify
			});
			t.exports = function e(t) {
				return n.stringify.apply(n, arguments)
			}
		}, {
			"../../modules/_core": 24
		}],
		16: [function (e, t, r) {
			e("../../modules/es6.object.define-property");
			var a = e("../../modules/_core").Object;
			t.exports = function e(t, r, n) {
				return a.defineProperty(t, r, n)
			}
		}, {
			"../../modules/_core": 24,
			"../../modules/es6.object.define-property": 75
		}],
		17: [function (e, t, r) {
			e("../../modules/es6.object.freeze");
			t.exports = e("../../modules/_core").Object.freeze
		}, {
			"../../modules/_core": 24,
			"../../modules/es6.object.freeze": 76
		}],
		18: [function (e, t, r) {
			t.exports = function (e) {
				if (typeof e != "function") throw TypeError(e + " is not a function!");
				return e
			}
		}, {}],
		19: [function (e, t, r) {
			t.exports = function () {}
		}, {}],
		20: [function (e, t, r) {
			var a = e("./_is-object");
			t.exports = function (e) {
				if (!a(e)) throw TypeError(e + " is not an object!");
				return e
			}
		}, {
			"./_is-object": 40
		}],
		21: [function (e, t, r) {
			var a = e("./_to-iobject");
			var n = e("./_to-length");
			var i = e("./_to-absolute-index");
			t.exports = function (e) {
				return function (t, r, l) {
					var u = a(t);
					var o = n(u.length);
					var s = i(l, o);
					var f;
					if (e && r != r)
						while (o > s) {
							f = u[s++];
							if (f != f) return true
						} else
							for (; o > s; s++)
								if (e || s in u) {
									if (u[s] === r) return e || s || 0
								}
					return !e && -1
				}
			}
		}, {
			"./_to-absolute-index": 62,
			"./_to-iobject": 64,
			"./_to-length": 65
		}],
		22: [function (e, t, r) {
			var a = e("./_cof");
			var n = e("./_wks")("toStringTag");
			var i = a(function () {
				return arguments
			}()) == "Arguments";
			var l = function (e, t) {
				try {
					return e[t]
				} catch (e) {}
			};
			t.exports = function (e) {
				var t, r, u;
				return e === undefined ? "Undefined" : e === null ? "Null" : typeof (r = l(t = Object(e), n)) == "string" ? r : i ? a(t) : (u = a(t)) == "Object" && typeof t.callee == "function" ? "Arguments" : u
			}
		}, {
			"./_cof": 23,
			"./_wks": 69
		}],
		23: [function (e, t, r) {
			var a = {}.toString;
			t.exports = function (e) {
				return a.call(e).slice(8, -1)
			}
		}, {}],
		24: [function (e, t, r) {
			var a = t.exports = {
				version: "2.5.1"
			};
			if (typeof __e == "number") __e = a
		}, {}],
		25: [function (e, t, r) {
			"use strict";
			var a = e("./_object-dp");
			var n = e("./_property-desc");
			t.exports = function (e, t, r) {
				if (t in e) a.f(e, t, n(0, r));
				else e[t] = r
			}
		}, {
			"./_object-dp": 50,
			"./_property-desc": 56
		}],
		26: [function (e, t, r) {
			var a = e("./_a-function");
			t.exports = function (e, t, r) {
				a(e);
				if (t === undefined) return e;
				switch (r) {
					case 1:
						return function (r) {
							return e.call(t, r)
						};
					case 2:
						return function (r, a) {
							return e.call(t, r, a)
						};
					case 3:
						return function (r, a, n) {
							return e.call(t, r, a, n)
						}
				}
				return function () {
					return e.apply(t, arguments)
				}
			}
		}, {
			"./_a-function": 18
		}],
		27: [function (e, t, r) {
			t.exports = function (e) {
				if (e == undefined) throw TypeError("Can't call method on  " + e);
				return e
			}
		}, {}],
		28: [function (e, t, r) {
			t.exports = !e("./_fails")(function () {
				return Object.defineProperty({}, "a", {
					get: function () {
						return 7
					}
				}).a != 7
			})
		}, {
			"./_fails": 32
		}],
		29: [function (e, t, r) {
			var a = e("./_is-object");
			var n = e("./_global").document;
			var i = a(n) && a(n.createElement);
			t.exports = function (e) {
				return i ? n.createElement(e) : {}
			}
		}, {
			"./_global": 33,
			"./_is-object": 40
		}],
		30: [function (e, t, r) {
			t.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")
		}, {}],
		31: [function (e, t, r) {
			var a = e("./_global");
			var n = e("./_core");
			var i = e("./_ctx");
			var l = e("./_hide");
			var u = "prototype";
			var o = function (e, t, r) {
				var s = e & o.F;
				var f = e & o.G;
				var d = e & o.S;
				var c = e & o.P;
				var v = e & o.B;
				var h = e & o.W;
				var p = f ? n : n[t] || (n[t] = {});
				var m = p[u];
				var g = f ? a : d ? a[t] : (a[t] || {})[u];
				var b, y, x;
				if (f) r = t;
				for (b in r) {
					y = !s && g && g[b] !== undefined;
					if (y && b in p) continue;
					x = y ? g[b] : r[b];
					p[b] = f && typeof g[b] != "function" ? r[b] : v && y ? i(x, a) : h && g[b] == x ? function (e) {
						var t = function (t, r, a) {
							if (this instanceof e) {
								switch (arguments.length) {
									case 0:
										return new e;
									case 1:
										return new e(t);
									case 2:
										return new e(t, r)
								}
								return new e(t, r, a)
							}
							return e.apply(this, arguments)
						};
						t[u] = e[u];
						return t
					}(x) : c && typeof x == "function" ? i(Function.call, x) : x;
					if (c) {
						(p.virtual || (p.virtual = {}))[b] = x;
						if (e & o.R && m && !m[b]) l(m, b, x)
					}
				}
			};
			o.F = 1;
			o.G = 2;
			o.S = 4;
			o.P = 8;
			o.B = 16;
			o.W = 32;
			o.U = 64;
			o.R = 128;
			t.exports = o
		}, {
			"./_core": 24,
			"./_ctx": 26,
			"./_global": 33,
			"./_hide": 35
		}],
		32: [function (e, t, r) {
			t.exports = function (e) {
				try {
					return !!e()
				} catch (e) {
					return true
				}
			}
		}, {}],
		33: [function (e, t, r) {
			var a = t.exports = typeof window != "undefined" && window.Math == Math ? window : typeof self != "undefined" && self.Math == Math ? self : Function("return this")();
			if (typeof __g == "number") __g = a
		}, {}],
		34: [function (e, t, r) {
			var a = {}.hasOwnProperty;
			t.exports = function (e, t) {
				return a.call(e, t)
			}
		}, {}],
		35: [function (e, t, r) {
			var a = e("./_object-dp");
			var n = e("./_property-desc");
			t.exports = e("./_descriptors") ? function (e, t, r) {
				return a.f(e, t, n(1, r))
			} : function (e, t, r) {
				e[t] = r;
				return e
			}
		}, {
			"./_descriptors": 28,
			"./_object-dp": 50,
			"./_property-desc": 56
		}],
		36: [function (e, t, r) {
			var a = e("./_global").document;
			t.exports = a && a.documentElement
		}, {
			"./_global": 33
		}],
		37: [function (e, t, r) {
			t.exports = !e("./_descriptors") && !e("./_fails")(function () {
				return Object.defineProperty(e("./_dom-create")("div"), "a", {
					get: function () {
						return 7
					}
				}).a != 7
			})
		}, {
			"./_descriptors": 28,
			"./_dom-create": 29,
			"./_fails": 32
		}],
		38: [function (e, t, r) {
			var a = e("./_cof");
			t.exports = Object("z").propertyIsEnumerable(0) ? Object : function (e) {
				return a(e) == "String" ? e.split("") : Object(e)
			}
		}, {
			"./_cof": 23
		}],
		39: [function (e, t, r) {
			var a = e("./_iterators");
			var n = e("./_wks")("iterator");
			var i = Array.prototype;
			t.exports = function (e) {
				return e !== undefined && (a.Array === e || i[n] === e)
			}
		}, {
			"./_iterators": 46,
			"./_wks": 69
		}],
		40: [function (e, t, r) {
			t.exports = function (e) {
				return typeof e === "object" ? e !== null : typeof e === "function"
			}
		}, {}],
		41: [function (e, t, r) {
			var a = e("./_an-object");
			t.exports = function (e, t, r, n) {
				try {
					return n ? t(a(r)[0], r[1]) : t(r)
				} catch (t) {
					var i = e["return"];
					if (i !== undefined) a(i.call(e));
					throw t
				}
			}
		}, {
			"./_an-object": 20
		}],
		42: [function (e, t, r) {
			"use strict";
			var a = e("./_object-create");
			var n = e("./_property-desc");
			var i = e("./_set-to-string-tag");
			var l = {};
			e("./_hide")(l, e("./_wks")("iterator"), function () {
				return this
			});
			t.exports = function (e, t, r) {
				e.prototype = a(l, {
					next: n(1, r)
				});
				i(e, t + " Iterator")
			}
		}, {
			"./_hide": 35,
			"./_object-create": 49,
			"./_property-desc": 56,
			"./_set-to-string-tag": 58,
			"./_wks": 69
		}],
		43: [function (e, t, r) {
			"use strict";
			var a = e("./_library");
			var n = e("./_export");
			var i = e("./_redefine");
			var l = e("./_hide");
			var u = e("./_has");
			var o = e("./_iterators");
			var s = e("./_iter-create");
			var f = e("./_set-to-string-tag");
			var d = e("./_object-gpo");
			var c = e("./_wks")("iterator");
			var v = !([].keys && "next" in [].keys());
			var h = "@@iterator";
			var p = "keys";
			var m = "values";
			var g = function () {
				return this
			};
			t.exports = function (e, t, r, b, y, x, w) {
				s(r, t, b);
				var k = function (e) {
					if (!v && e in z) return z[e];
					switch (e) {
						case p:
							return function t() {
								return new r(this, e)
							};
						case m:
							return function t() {
								return new r(this, e)
							}
					}
					return function t() {
						return new r(this, e)
					}
				};
				var M = t + " Iterator";
				var _ = y == m;
				var S = false;
				var z = e.prototype;
				var T = z[c] || z[h] || y && z[y];
				var C = T || k(y);
				var A = y ? !_ ? C : k("entries") : undefined;
				var O = t == "Array" ? z.entries || T : T;
				var N, L, j;
				if (O) {
					j = d(O.call(new e));
					if (j !== Object.prototype && j.next) {
						f(j, M, true);
						if (!a && !u(j, c)) l(j, c, g)
					}
				}
				if (_ && T && T.name !== m) {
					S = true;
					C = function e() {
						return T.call(this)
					}
				}
				if ((!a || w) && (v || S || !z[c])) {
					l(z, c, C)
				}
				o[t] = C;
				o[M] = g;
				if (y) {
					N = {
						values: _ ? C : k(m),
						keys: x ? C : k(p),
						entries: A
					};
					if (w)
						for (L in N) {
							if (!(L in z)) i(z, L, N[L])
						} else n(n.P + n.F * (v || S), t, N)
				}
				return N
			}
		}, {
			"./_export": 31,
			"./_has": 34,
			"./_hide": 35,
			"./_iter-create": 42,
			"./_iterators": 46,
			"./_library": 47,
			"./_object-gpo": 52,
			"./_redefine": 57,
			"./_set-to-string-tag": 58,
			"./_wks": 69
		}],
		44: [function (e, t, r) {
			var a = e("./_wks")("iterator");
			var n = false;
			try {
				var i = [7][a]();
				i["return"] = function () {
					n = true
				};
				Array.from(i, function () {
					throw 2
				})
			} catch (e) {}
			t.exports = function (e, t) {
				if (!t && !n) return false;
				var r = false;
				try {
					var i = [7];
					var l = i[a]();
					l.next = function () {
						return {
							done: r = true
						}
					};
					i[a] = function () {
						return l
					};
					e(i)
				} catch (e) {}
				return r
			}
		}, {
			"./_wks": 69
		}],
		45: [function (e, t, r) {
			t.exports = function (e, t) {
				return {
					value: t,
					done: !!e
				}
			}
		}, {}],
		46: [function (e, t, r) {
			t.exports = {}
		}, {}],
		47: [function (e, t, r) {
			t.exports = true
		}, {}],
		48: [function (e, t, r) {
			var a = e("./_uid")("meta");
			var n = e("./_is-object");
			var i = e("./_has");
			var l = e("./_object-dp").f;
			var u = 0;
			var o = Object.isExtensible || function () {
				return true
			};
			var s = !e("./_fails")(function () {
				return o(Object.preventExtensions({}))
			});
			var f = function (e) {
				l(e, a, {
					value: {
						i: "O" + ++u,
						w: {}
					}
				})
			};
			var d = function (e, t) {
				if (!n(e)) return typeof e == "symbol" ? e : (typeof e == "string" ? "S" : "P") + e;
				if (!i(e, a)) {
					if (!o(e)) return "F";
					if (!t) return "E";
					f(e)
				}
				return e[a].i
			};
			var c = function (e, t) {
				if (!i(e, a)) {
					if (!o(e)) return true;
					if (!t) return false;
					f(e)
				}
				return e[a].w
			};
			var v = function (e) {
				if (s && h.NEED && o(e) && !i(e, a)) f(e);
				return e
			};
			var h = t.exports = {
				KEY: a,
				NEED: false,
				fastKey: d,
				getWeak: c,
				onFreeze: v
			}
		}, {
			"./_fails": 32,
			"./_has": 34,
			"./_is-object": 40,
			"./_object-dp": 50,
			"./_uid": 68
		}],
		49: [function (e, t, r) {
			var a = e("./_an-object");
			var n = e("./_object-dps");
			var i = e("./_enum-bug-keys");
			var l = e("./_shared-key")("IE_PROTO");
			var u = function () {};
			var o = "prototype";
			var s = function () {
				var t = e("./_dom-create")("iframe");
				var r = i.length;
				var a = "<";
				var n = ">";
				var l;
				t.style.display = "none";
				e("./_html").appendChild(t);
				t.src = "javascript:";
				l = t.contentWindow.document;
				l.open();
				l.write(a + "script" + n + "document.F=Object" + a + "/script" + n);
				l.close();
				s = l.F;
				while (r--) delete s[o][i[r]];
				return s()
			};
			t.exports = Object.create || function e(t, r) {
				var i;
				if (t !== null) {
					u[o] = a(t);
					i = new u;
					u[o] = null;
					i[l] = t
				} else i = s();
				return r === undefined ? i : n(i, r)
			}
		}, {
			"./_an-object": 20,
			"./_dom-create": 29,
			"./_enum-bug-keys": 30,
			"./_html": 36,
			"./_object-dps": 51,
			"./_shared-key": 59
		}],
		50: [function (e, t, r) {
			var a = e("./_an-object");
			var n = e("./_ie8-dom-define");
			var i = e("./_to-primitive");
			var l = Object.defineProperty;
			r.f = e("./_descriptors") ? Object.defineProperty : function e(t, r, u) {
				a(t);
				r = i(r, true);
				a(u);
				if (n) try {
					return l(t, r, u)
				} catch (e) {}
				if ("get" in u || "set" in u) throw TypeError("Accessors not supported!");
				if ("value" in u) t[r] = u.value;
				return t
			}
		}, {
			"./_an-object": 20,
			"./_descriptors": 28,
			"./_ie8-dom-define": 37,
			"./_to-primitive": 67
		}],
		51: [function (e, t, r) {
			var a = e("./_object-dp");
			var n = e("./_an-object");
			var i = e("./_object-keys");
			t.exports = e("./_descriptors") ? Object.defineProperties : function e(t, r) {
				n(t);
				var l = i(r);
				var u = l.length;
				var o = 0;
				var s;
				while (u > o) a.f(t, s = l[o++], r[s]);
				return t
			}
		}, {
			"./_an-object": 20,
			"./_descriptors": 28,
			"./_object-dp": 50,
			"./_object-keys": 54
		}],
		52: [function (e, t, r) {
			var a = e("./_has");
			var n = e("./_to-object");
			var i = e("./_shared-key")("IE_PROTO");
			var l = Object.prototype;
			t.exports = Object.getPrototypeOf || function (e) {
				e = n(e);
				if (a(e, i)) return e[i];
				if (typeof e.constructor == "function" && e instanceof e.constructor) {
					return e.constructor.prototype
				}
				return e instanceof Object ? l : null
			}
		}, {
			"./_has": 34,
			"./_shared-key": 59,
			"./_to-object": 66
		}],
		53: [function (e, t, r) {
			var a = e("./_has");
			var n = e("./_to-iobject");
			var i = e("./_array-includes")(false);
			var l = e("./_shared-key")("IE_PROTO");
			t.exports = function (e, t) {
				var r = n(e);
				var u = 0;
				var o = [];
				var s;
				for (s in r)
					if (s != l) a(r, s) && o.push(s);
				while (t.length > u)
					if (a(r, s = t[u++])) {
						~i(o, s) || o.push(s)
					}
				return o
			}
		}, {
			"./_array-includes": 21,
			"./_has": 34,
			"./_shared-key": 59,
			"./_to-iobject": 64
		}],
		54: [function (e, t, r) {
			var a = e("./_object-keys-internal");
			var n = e("./_enum-bug-keys");
			t.exports = Object.keys || function e(t) {
				return a(t, n)
			}
		}, {
			"./_enum-bug-keys": 30,
			"./_object-keys-internal": 53
		}],
		55: [function (e, t, r) {
			var a = e("./_export");
			var n = e("./_core");
			var i = e("./_fails");
			t.exports = function (e, t) {
				var r = (n.Object || {})[e] || Object[e];
				var l = {};
				l[e] = t(r);
				a(a.S + a.F * i(function () {
					r(1)
				}), "Object", l)
			}
		}, {
			"./_core": 24,
			"./_export": 31,
			"./_fails": 32
		}],
		56: [function (e, t, r) {
			t.exports = function (e, t) {
				return {
					enumerable: !(e & 1),
					configurable: !(e & 2),
					writable: !(e & 4),
					value: t
				}
			}
		}, {}],
		57: [function (e, t, r) {
			t.exports = e("./_hide")
		}, {
			"./_hide": 35
		}],
		58: [function (e, t, r) {
			var a = e("./_object-dp").f;
			var n = e("./_has");
			var i = e("./_wks")("toStringTag");
			t.exports = function (e, t, r) {
				if (e && !n(e = r ? e : e.prototype, i)) a(e, i, {
					configurable: true,
					value: t
				})
			}
		}, {
			"./_has": 34,
			"./_object-dp": 50,
			"./_wks": 69
		}],
		59: [function (e, t, r) {
			var a = e("./_shared")("keys");
			var n = e("./_uid");
			t.exports = function (e) {
				return a[e] || (a[e] = n(e))
			}
		}, {
			"./_shared": 60,
			"./_uid": 68
		}],
		60: [function (e, t, r) {
			var a = e("./_global");
			var n = "__core-js_shared__";
			var i = a[n] || (a[n] = {});
			t.exports = function (e) {
				return i[e] || (i[e] = {})
			}
		}, {
			"./_global": 33
		}],
		61: [function (e, t, r) {
			var a = e("./_to-integer");
			var n = e("./_defined");
			t.exports = function (e) {
				return function (t, r) {
					var i = String(n(t));
					var l = a(r);
					var u = i.length;
					var o, s;
					if (l < 0 || l >= u) return e ? "" : undefined;
					o = i.charCodeAt(l);
					return o < 55296 || o > 56319 || l + 1 === u || (s = i.charCodeAt(l + 1)) < 56320 || s > 57343 ? e ? i.charAt(l) : o : e ? i.slice(l, l + 2) : (o - 55296 << 10) + (s - 56320) + 65536
				}
			}
		}, {
			"./_defined": 27,
			"./_to-integer": 63
		}],
		62: [function (e, t, r) {
			var a = e("./_to-integer");
			var n = Math.max;
			var i = Math.min;
			t.exports = function (e, t) {
				e = a(e);
				return e < 0 ? n(e + t, 0) : i(e, t)
			}
		}, {
			"./_to-integer": 63
		}],
		63: [function (e, t, r) {
			var a = Math.ceil;
			var n = Math.floor;
			t.exports = function (e) {
				return isNaN(e = +e) ? 0 : (e > 0 ? n : a)(e)
			}
		}, {}],
		64: [function (e, t, r) {
			var a = e("./_iobject");
			var n = e("./_defined");
			t.exports = function (e) {
				return a(n(e))
			}
		}, {
			"./_defined": 27,
			"./_iobject": 38
		}],
		65: [function (e, t, r) {
			var a = e("./_to-integer");
			var n = Math.min;
			t.exports = function (e) {
				return e > 0 ? n(a(e), 9007199254740991) : 0
			}
		}, {
			"./_to-integer": 63
		}],
		66: [function (e, t, r) {
			var a = e("./_defined");
			t.exports = function (e) {
				return Object(a(e))
			}
		}, {
			"./_defined": 27
		}],
		67: [function (e, t, r) {
			var a = e("./_is-object");
			t.exports = function (e, t) {
				if (!a(e)) return e;
				var r, n;
				if (t && typeof (r = e.toString) == "function" && !a(n = r.call(e))) return n;
				if (typeof (r = e.valueOf) == "function" && !a(n = r.call(e))) return n;
				if (!t && typeof (r = e.toString) == "function" && !a(n = r.call(e))) return n;
				throw TypeError("Can't convert object to primitive value")
			}
		}, {
			"./_is-object": 40
		}],
		68: [function (e, t, r) {
			var a = 0;
			var n = Math.random();
			t.exports = function (e) {
				return "Symbol(".concat(e === undefined ? "" : e, ")_", (++a + n).toString(36))
			}
		}, {}],
		69: [function (e, t, r) {
			var a = e("./_shared")("wks");
			var n = e("./_uid");
			var i = e("./_global").Symbol;
			var l = typeof i == "function";
			var u = t.exports = function (e) {
				return a[e] || (a[e] = l && i[e] || (l ? i : n)("Symbol." + e))
			};
			u.store = a
		}, {
			"./_global": 33,
			"./_shared": 60,
			"./_uid": 68
		}],
		70: [function (e, t, r) {
			var a = e("./_classof");
			var n = e("./_wks")("iterator");
			var i = e("./_iterators");
			t.exports = e("./_core").getIteratorMethod = function (e) {
				if (e != undefined) return e[n] || e["@@iterator"] || i[a(e)]
			}
		}, {
			"./_classof": 22,
			"./_core": 24,
			"./_iterators": 46,
			"./_wks": 69
		}],
		71: [function (e, t, r) {
			var a = e("./_an-object");
			var n = e("./core.get-iterator-method");
			t.exports = e("./_core").getIterator = function (e) {
				var t = n(e);
				if (typeof t != "function") throw TypeError(e + " is not iterable!");
				return a(t.call(e))
			}
		}, {
			"./_an-object": 20,
			"./_core": 24,
			"./core.get-iterator-method": 70
		}],
		72: [function (e, t, r) {
			var a = e("./_classof");
			var n = e("./_wks")("iterator");
			var i = e("./_iterators");
			t.exports = e("./_core").isIterable = function (e) {
				var t = Object(e);
				return t[n] !== undefined || "@@iterator" in t || i.hasOwnProperty(a(t))
			}
		}, {
			"./_classof": 22,
			"./_core": 24,
			"./_iterators": 46,
			"./_wks": 69
		}],
		73: [function (e, t, r) {
			"use strict";
			var a = e("./_ctx");
			var n = e("./_export");
			var i = e("./_to-object");
			var l = e("./_iter-call");
			var u = e("./_is-array-iter");
			var o = e("./_to-length");
			var s = e("./_create-property");
			var f = e("./core.get-iterator-method");
			n(n.S + n.F * !e("./_iter-detect")(function (e) {
				Array.from(e)
			}), "Array", {
				from: function e(t) {
					var r = i(t);
					var n = typeof this == "function" ? this : Array;
					var d = arguments.length;
					var c = d > 1 ? arguments[1] : undefined;
					var v = c !== undefined;
					var h = 0;
					var p = f(r);
					var m, g, b, y;
					if (v) c = a(c, d > 2 ? arguments[2] : undefined, 2);
					if (p != undefined && !(n == Array && u(p))) {
						for (y = p.call(r), g = new n; !(b = y.next()).done; h++) {
							s(g, h, v ? l(y, c, [b.value, h], true) : b.value)
						}
					} else {
						m = o(r.length);
						for (g = new n(m); m > h; h++) {
							s(g, h, v ? c(r[h], h) : r[h])
						}
					}
					g.length = h;
					return g
				}
			})
		}, {
			"./_create-property": 25,
			"./_ctx": 26,
			"./_export": 31,
			"./_is-array-iter": 39,
			"./_iter-call": 41,
			"./_iter-detect": 44,
			"./_to-length": 65,
			"./_to-object": 66,
			"./core.get-iterator-method": 70
		}],
		74: [function (e, t, r) {
			"use strict";
			var a = e("./_add-to-unscopables");
			var n = e("./_iter-step");
			var i = e("./_iterators");
			var l = e("./_to-iobject");
			t.exports = e("./_iter-define")(Array, "Array", function (e, t) {
				this._t = l(e);
				this._i = 0;
				this._k = t
			}, function () {
				var e = this._t;
				var t = this._k;
				var r = this._i++;
				if (!e || r >= e.length) {
					this._t = undefined;
					return n(1)
				}
				if (t == "keys") return n(0, r);
				if (t == "values") return n(0, e[r]);
				return n(0, [r, e[r]])
			}, "values");
			i.Arguments = i.Array;
			a("keys");
			a("values");
			a("entries")
		}, {
			"./_add-to-unscopables": 19,
			"./_iter-define": 43,
			"./_iter-step": 45,
			"./_iterators": 46,
			"./_to-iobject": 64
		}],
		75: [function (e, t, r) {
			var a = e("./_export");
			a(a.S + a.F * !e("./_descriptors"), "Object", {
				defineProperty: e("./_object-dp").f
			})
		}, {
			"./_descriptors": 28,
			"./_export": 31,
			"./_object-dp": 50
		}],
		76: [function (e, t, r) {
			var a = e("./_is-object");
			var n = e("./_meta").onFreeze;
			e("./_object-sap")("freeze", function (e) {
				return function t(r) {
					return e && a(r) ? e(n(r)) : r
				}
			})
		}, {
			"./_is-object": 40,
			"./_meta": 48,
			"./_object-sap": 55
		}],
		77: [function (e, t, r) {
			"use strict";
			var a = e("./_string-at")(true);
			e("./_iter-define")(String, "String", function (e) {
				this._t = String(e);
				this._i = 0
			}, function () {
				var e = this._t;
				var t = this._i;
				var r;
				if (t >= e.length) return {
					value: undefined,
					done: true
				};
				r = a(e, t);
				this._i += r.length;
				return {
					value: r,
					done: false
				}
			})
		}, {
			"./_iter-define": 43,
			"./_string-at": 61
		}],
		78: [function (e, t, r) {
			e("./es6.array.iterator");
			var a = e("./_global");
			var n = e("./_hide");
			var i = e("./_iterators");
			var l = e("./_wks")("toStringTag");
			var u = ("CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList," + "DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement," + "MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList," + "SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList," + "TextTrackList,TouchList").split(",");
			for (var o = 0; o < u.length; o++) {
				var s = u[o];
				var f = a[s];
				var d = f && f.prototype;
				if (d && !d[l]) n(d, l, s);
				i[s] = i.Array
			}
		}, {
			"./_global": 33,
			"./_hide": 35,
			"./_iterators": 46,
			"./_wks": 69,
			"./es6.array.iterator": 74
		}],
		79: [function (e, t, r) {
			function a(e) {
				if (!e.__matchAtRelocatable) {
					var t = e.source + "|()";
					var r = "g" + (e.ignoreCase ? "i" : "") + (e.multiline ? "m" : "") + (e.unicode ? "u" : "");
					e.__matchAtRelocatable = new RegExp(t, r)
				}
				return e.__matchAtRelocatable
			}

			function n(e, t, r) {
				if (e.global || e.sticky) {
					throw new Error("matchAt(...): Only non-global regexes are supported")
				}
				var n = a(e);
				n.lastIndex = r;
				var i = n.exec(t);
				if (i[i.length - 1] == null) {
					i.length = i.length - 1;
					return i
				} else {
					return null
				}
			}
			t.exports = n
		}, {}],
		80: [function (e, t, r) {
			"use strict";
			var a = Object.getOwnPropertySymbols;
			var n = Object.prototype.hasOwnProperty;
			var i = Object.prototype.propertyIsEnumerable;

			function l(e) {
				if (e === null || e === undefined) {
					throw new TypeError("Object.assign cannot be called with null or undefined")
				}
				return Object(e)
			}

			function u() {
				try {
					if (!Object.assign) {
						return false
					}
					var e = new String("abc");
					e[5] = "de";
					if (Object.getOwnPropertyNames(e)[0] === "5") {
						return false
					}
					var t = {};
					for (var r = 0; r < 10; r++) {
						t["_" + String.fromCharCode(r)] = r
					}
					var a = Object.getOwnPropertyNames(t).map(function (e) {
						return t[e]
					});
					if (a.join("") !== "0123456789") {
						return false
					}
					var n = {};
					"abcdefghijklmnopqrst".split("").forEach(function (e) {
						n[e] = e
					});
					if (Object.keys(Object.assign({}, n)).join("") !== "abcdefghijklmnopqrst") {
						return false
					}
					return true
				} catch (e) {
					return false
				}
			}
			t.exports = u() ? Object.assign : function (e, t) {
				var r;
				var u = l(e);
				var o;
				for (var s = 1; s < arguments.length; s++) {
					r = Object(arguments[s]);
					for (var f in r) {
						if (n.call(r, f)) {
							u[f] = r[f]
						}
					}
					if (a) {
						o = a(r);
						for (var d = 0; d < o.length; d++) {
							if (i.call(r, o[d])) {
								u[o[d]] = r[o[d]]
							}
						}
					}
				}
				return u
			}
		}, {}],
		81: [function (e, t, r) {
			"use strict";
			Object.defineProperty(r, "__esModule", {
				value: true
			});
			r.controlWordRegex = undefined;
			var a = e("babel-runtime/helpers/classCallCheck");
			var n = h(a);
			var i = e("babel-runtime/helpers/createClass");
			var l = h(i);
			var u = e("match-at");
			var o = h(u);
			var s = e("./ParseError");
			var f = h(s);
			var d = e("./SourceLocation");
			var c = h(d);
			var v = e("./Token");

			function h(e) {
				return e && e.__esModule ? e : {
					default: e
				}
			}
			var p = "%[^\n]*[\n]";
			var m = "\\\\[a-zA-Z@]+";
			var g = "\\\\[^\ud800-\udfff]";
			var b = new RegExp("([ \r\n\t]+)|" + ("(" + p + "|") + "[!-\\[\\]-\u2027\u202a-\ud7ff\uf900-\uffff]" + "|[\ud800-\udbff][\udc00-\udfff]" + "|\\\\verb\\*([^]).*?\\3" + "|\\\\verb([^*a-zA-Z]).*?\\4" + ("|" + m) + ("|" + g) + ")");
			var y = r.controlWordRegex = new RegExp("^" + m);
			var x = new RegExp("^" + p);
			var w = function () {
				function e(t) {
					(0, n.default)(this, e);
					this.input = t;
					this.pos = 0
				}(0, l.default)(e, [{
					key: "lex",
					value: function e() {
						var t = this.input;
						var r = this.pos;
						if (r === t.length) {
							return new v.Token("EOF", new c.default(this, r, r))
						}
						var a = (0, o.default)(b, t, r);
						if (a === null) {
							throw new f.default("Unexpected character: '" + t[r] + "'", new v.Token(t[r], new c.default(this, r, r + 1)))
						}
						var n = a[2] || " ";
						var i = this.pos;
						this.pos += a[0].length;
						var l = this.pos;
						if (x.test(n)) {
							return this.lex()
						} else {
							return new v.Token(n, new c.default(this, i, l))
						}
					}
				}]);
				return e
			}();
			r.default = w
		}, {
			"./ParseError": 84,
			"./SourceLocation": 88,
			"./Token": 90,
			"babel-runtime/helpers/classCallCheck": 8,
			"babel-runtime/helpers/createClass": 9,
			"match-at": 79
		}],
		82: [function (e, t, r) {
			"use strict";
			Object.defineProperty(r, "__esModule", {
				value: true
			});
			var a = e("babel-runtime/helpers/toConsumableArray");
			var n = b(a);
			var i = e("babel-runtime/helpers/classCallCheck");
			var l = b(i);
			var u = e("babel-runtime/helpers/createClass");
			var o = b(u);
			var s = e("./Lexer");
			var f = b(s);
			var d = e("./Token");
			var c = e("./macros");
			var v = b(c);
			var h = e("./ParseError");
			var p = b(h);
			var m = e("object-assign");
			var g = b(m);

			function b(e) {
				return e && e.__esModule ? e : {
					default: e
				}
			}
			var y = function () {
				function e(t, r) {
					(0, l.default)(this, e);
					this.lexer = new f.default(t);
					this.macros = (0, g.default)({}, v.default, r);
					this.stack = []
				}(0, o.default)(e, [{
					key: "future",
					value: function e() {
						if (this.stack.length === 0) {
							this.pushToken(this.lexer.lex())
						}
						return this.stack[this.stack.length - 1]
					}
				}, {
					key: "popToken",
					value: function e() {
						this.future();
						return this.stack.pop()
					}
				}, {
					key: "pushToken",
					value: function e(t) {
						this.stack.push(t)
					}
				}, {
					key: "pushTokens",
					value: function e(t) {
						var r;
						(r = this.stack).push.apply(r, (0, n.default)(t))
					}
				}, {
					key: "consumeSpaces",
					value: function e() {
						for (;;) {
							var t = this.future();
							if (t.text === " ") {
								this.stack.pop()
							} else {
								break
							}
						}
					}
				}, {
					key: "consumeArgs",
					value: function e(t) {
						var r = [];
						for (var a = 0; a < t; ++a) {
							this.consumeSpaces();
							var n = this.popToken();
							if (n.text === "{") {
								var i = [];
								var l = 1;
								while (l !== 0) {
									var u = this.popToken();
									i.push(u);
									if (u.text === "{") {
										++l
									} else if (u.text === "}") {
										--l
									} else if (u.text === "EOF") {
										throw new p.default("End of input in macro argument", n)
									}
								}
								i.pop();
								i.reverse();
								r[a] = i
							} else if (n.text === "EOF") {
								throw new p.default("End of input expecting macro argument")
							} else {
								r[a] = [n]
							}
						}
						return r
					}
				}, {
					key: "expandOnce",
					value: function e() {
						var t = this.popToken();
						var r = t.text;
						var a = r.charAt(0) === "\\";
						if (a && s.controlWordRegex.test(r)) {
							this.consumeSpaces()
						}
						if (!this.macros.hasOwnProperty(r)) {
							this.pushToken(t);
							return t
						}
						var i = this._getExpansion(r),
							l = i.tokens,
							u = i.numArgs;
						var o = l;
						if (u) {
							var f = this.consumeArgs(u);
							o = o.slice();
							for (var d = o.length - 1; d >= 0; --d) {
								var c = o[d];
								if (c.text === "#") {
									if (d === 0) {
										throw new p.default("Incomplete placeholder at end of macro body", c)
									}
									c = o[--d];
									if (c.text === "#") {
										o.splice(d + 1, 1)
									} else if (/^[1-9]$/.test(c.text)) {
										var v;
										(v = o).splice.apply(v, [d, 2].concat((0, n.default)(f[+c.text - 1])))
									} else {
										throw new p.default("Not a valid argument number", c)
									}
								}
							}
						}
						this.pushTokens(o);
						return o
					}
				}, {
					key: "expandAfterFuture",
					value: function e() {
						this.expandOnce();
						return this.future()
					}
				}, {
					key: "expandNextToken",
					value: function e() {
						for (;;) {
							var t = this.expandOnce();
							if (t instanceof d.Token) {
								if (t.text === "\\relax") {
									this.stack.pop()
								} else {
									return this.stack.pop()
								}
							}
						}
						throw new Error
					}
				}, {
					key: "_getExpansion",
					value: function e(t) {
						var r = this.macros[t];
						var a = typeof r === "function" ? r(this) : r;
						if (typeof a === "string") {
							var n = 0;
							if (a.indexOf("#") !== -1) {
								var i = a.replace(/##/g, "");
								while (i.indexOf("#" + (n + 1)) !== -1) {
									++n
								}
							}
							var l = new f.default(a);
							var u = [];
							var o = l.lex();
							while (o.text !== "EOF") {
								u.push(o);
								o = l.lex()
							}
							u.reverse();
							var s = {
								tokens: u,
								numArgs: n
							};
							if (typeof r !== "function") {
								this.macros[t] = s
							}
							return s
						}
						return a
					}
				}]);
				return e
			}();
			r.default = y
		}, {
			"./Lexer": 81,
			"./ParseError": 84,
			"./Token": 90,
			"./macros": 115,
			"babel-runtime/helpers/classCallCheck": 8,
			"babel-runtime/helpers/createClass": 9,
			"babel-runtime/helpers/toConsumableArray": 11,
			"object-assign": 80
		}],
		83: [function (e, t, r) {
			"use strict";
			Object.defineProperty(r, "__esModule", {
				value: true
			});
			var a = e("babel-runtime/helpers/classCallCheck");
			var n = s(a);
			var i = e("babel-runtime/helpers/createClass");
			var l = s(i);
			var u = e("./fontMetrics");
			var o = s(u);

			function s(e) {
				return e && e.__esModule ? e : {
					default: e
				}
			}
			var f = [
				[1, 1, 1],
				[2, 1, 1],
				[3, 1, 1],
				[4, 2, 1],
				[5, 2, 1],
				[6, 3, 1],
				[7, 4, 2],
				[8, 6, 3],
				[9, 7, 6],
				[10, 8, 7],
				[11, 10, 9]
			];
			var d = [.5, .6, .7, .8, .9, 1, 1.2, 1.44, 1.728, 2.074, 2.488];
			var c = function e(t, r) {
				return r.size < 2 ? t : f[t - 1][r.size - 1]
			};
			var v = function () {
				function e(t) {
					(0, n.default)(this, e);
					this.style = t.style;
					this.color = t.color;
					this.size = t.size || e.BASESIZE;
					this.textSize = t.textSize || this.size;
					this.phantom = !!t.phantom;
					this.font = t.font;
					this.sizeMultiplier = d[this.size - 1];
					this.maxSize = t.maxSize;
					this._fontMetrics = undefined
				}(0, l.default)(e, [{
					key: "extend",
					value: function t(r) {
						var a = {
							style: this.style,
							size: this.size,
							textSize: this.textSize,
							color: this.color,
							phantom: this.phantom,
							font: this.font,
							maxSize: this.maxSize
						};
						for (var n in r) {
							if (r.hasOwnProperty(n)) {
								a[n] = r[n]
							}
						}
						return new e(a)
					}
				}, {
					key: "havingStyle",
					value: function e(t) {
						if (this.style === t) {
							return this
						} else {
							return this.extend({
								style: t,
								size: c(this.textSize, t)
							})
						}
					}
				}, {
					key: "havingCrampedStyle",
					value: function e() {
						return this.havingStyle(this.style.cramp())
					}
				}, {
					key: "havingSize",
					value: function e(t) {
						if (this.size === t && this.textSize === t) {
							return this
						} else {
							return this.extend({
								style: this.style.text(),
								size: t,
								textSize: t
							})
						}
					}
				}, {
					key: "havingBaseStyle",
					value: function t(r) {
						r = r || this.style.text();
						var a = c(e.BASESIZE, r);
						if (this.size === a && this.textSize === e.BASESIZE && this.style === r) {
							return this
						} else {
							return this.extend({
								style: r,
								size: a
							})
						}
					}
				}, {
					key: "withColor",
					value: function e(t) {
						return this.extend({
							color: t
						})
					}
				}, {
					key: "withPhantom",
					value: function e() {
						return this.extend({
							phantom: true
						})
					}
				}, {
					key: "withFont",
					value: function e(t) {
						return this.extend({
							font: t || this.font
						})
					}
				}, {
					key: "sizingClasses",
					value: function e(t) {
						if (t.size !== this.size) {
							return ["sizing", "reset-size" + t.size, "size" + this.size]
						} else {
							return []
						}
					}
				}, {
					key: "baseSizingClasses",
					value: function t() {
						if (this.size !== e.BASESIZE) {
							return ["sizing", "reset-size" + this.size, "size" + e.BASESIZE]
						} else {
							return []
						}
					}
				}, {
					key: "fontMetrics",
					value: function e() {
						if (!this._fontMetrics) {
							this._fontMetrics = o.default.getFontMetrics(this.size)
						}
						return this._fontMetrics
					}
				}, {
					key: "getColor",
					value: function t() {
						if (this.phantom) {
							return "transparent"
						} else if (this.color != null && e.colorMap.hasOwnProperty(this.color)) {
							return e.colorMap[this.color]
						} else {
							return this.color
						}
					}
				}]);
				return e
			}();
			v.BASESIZE = 6;
			v.colorMap = {
				"katex-blue": "#6495ed",
				"katex-orange": "#ffa500",
				"katex-pink": "#ff00af",
				"katex-red": "#df0030",
				"katex-green": "#28ae7b",
				"katex-gray": "gray",
				"katex-purple": "#9d38bd",
				"katex-blueA": "#ccfaff",
				"katex-blueB": "#80f6ff",
				"katex-blueC": "#63d9ea",
				"katex-blueD": "#11accd",
				"katex-blueE": "#0c7f99",
				"katex-tealA": "#94fff5",
				"katex-tealB": "#26edd5",
				"katex-tealC": "#01d1c1",
				"katex-tealD": "#01a995",
				"katex-tealE": "#208170",
				"katex-greenA": "#b6ffb0",
				"katex-greenB": "#8af281",
				"katex-greenC": "#74cf70",
				"katex-greenD": "#1fab54",
				"katex-greenE": "#0d923f",
				"katex-goldA": "#ffd0a9",
				"katex-goldB": "#ffbb71",
				"katex-goldC": "#ff9c39",
				"katex-goldD": "#e07d10",
				"katex-goldE": "#a75a05",
				"katex-redA": "#fca9a9",
				"katex-redB": "#ff8482",
				"katex-redC": "#f9685d",
				"katex-redD": "#e84d39",
				"katex-redE": "#bc2612",
				"katex-maroonA": "#ffbde0",
				"katex-maroonB": "#ff92c6",
				"katex-maroonC": "#ed5fa6",
				"katex-maroonD": "#ca337c",
				"katex-maroonE": "#9e034e",
				"katex-purpleA": "#ddd7ff",
				"katex-purpleB": "#c6b9fc",
				"katex-purpleC": "#aa87ff",
				"katex-purpleD": "#7854ab",
				"katex-purpleE": "#543b78",
				"katex-mintA": "#f5f9e8",
				"katex-mintB": "#edf2df",
				"katex-mintC": "#e0e5cc",
				"katex-grayA": "#f6f7f7",
				"katex-grayB": "#f0f1f2",
				"katex-grayC": "#e3e5e6",
				"katex-grayD": "#d6d8da",
				"katex-grayE": "#babec2",
				"katex-grayF": "#888d93",
				"katex-grayG": "#626569",
				"katex-grayH": "#3b3e40",
				"katex-grayI": "#21242c",
				"katex-kaBlue": "#314453",
				"katex-kaGreen": "#71B307"
			};
			r.default = v
		}, {
			"./fontMetrics": 101,
			"babel-runtime/helpers/classCallCheck": 8,
			"babel-runtime/helpers/createClass": 9
		}],
		84: [function (e, t, r) {
			"use strict";
			Object.defineProperty(r, "__esModule", {
				value: true
			});
			var a = e("babel-runtime/helpers/classCallCheck");
			var n = o(a);
			var i = e("./ParseNode");
			var l = o(i);
			var u = e("./Token");

			function o(e) {
				return e && e.__esModule ? e : {
					default: e
				}
			}
			var s = function e(t, r) {
				(0, n.default)(this, e);
				var a = "KaTeX parse error: " + t;
				var i = void 0;
				var l = r && r.loc;
				if (l && l.start <= l.end) {
					var u = l.lexer.input;
					i = l.start;
					var o = l.end;
					if (i === u.length) {
						a += " at end of input: "
					} else {
						a += " at position " + (i + 1) + ": "
					}
					var s = u.slice(i, o).replace(/[^]/g, "$&\u0332");
					var f = void 0;
					if (i > 15) {
						f = "\u2026" + u.slice(i - 15, i)
					} else {
						f = u.slice(0, i)
					}
					var d = void 0;
					if (o + 15 < u.length) {
						d = u.slice(o, o + 15) + "\u2026"
					} else {
						d = u.slice(o)
					}
					a += f + s + d
				}
				var c = new Error(a);
				c.name = "ParseError";
				c.__proto__ = e.prototype;
				c.position = i;
				return c
			};
			s.prototype.__proto__ = Error.prototype;
			r.default = s
		}, {
			"./ParseNode": 85,
			"./Token": 90,
			"babel-runtime/helpers/classCallCheck": 8
		}],
		85: [function (e, t, r) {
			"use strict";
			Object.defineProperty(r, "__esModule", {
				value: true
			});
			var a = e("babel-runtime/helpers/classCallCheck");
			var n = o(a);
			var i = e("./Token");
			var l = e("./SourceLocation");
			var u = o(l);

			function o(e) {
				return e && e.__esModule ? e : {
					default: e
				}
			}
			var s = function e(t, r, a, i, l) {
				(0, n.default)(this, e);
				this.type = t;
				this.value = r;
				this.mode = a;
				this.loc = u.default.range(i, l)
			};
			r.default = s
		}, {
			"./SourceLocation": 88,
			"./Token": 90,
			"babel-runtime/helpers/classCallCheck": 8
		}],
		86: [function (e, t, r) {
			"use strict";
			Object.defineProperty(r, "__esModule", {
				value: true
			});
			var a = e("babel-runtime/helpers/classCallCheck");
			var n = M(a);
			var i = e("babel-runtime/helpers/createClass");
			var l = M(i);
			var u = e("./functions");
			var o = M(u);
			var s = e("./environments");
			var f = M(s);
			var d = e("./MacroExpander");
			var c = M(d);
			var v = e("./symbols");
			var h = M(v);
			var p = e("./utils");
			var m = M(p);
			var g = e("./units");
			var b = e("./unicodeRegexes");
			var y = e("./ParseNode");
			var x = M(y);
			var w = e("./ParseError");
			var k = M(w);

			function M(e) {
				return e && e.__esModule ? e : {
					default: e
				}
			}

			function _(e, t) {
				return {
					type: "arg",
					result: e,
					token: t
				}
			}

			function S(e) {
				return {
					type: "fn",
					result: e.text,
					token: e
				}
			}

			function z(e) {
				return {
					type: "$",
					result: "$",
					token: e
				}
			}

			function T(e) {
				if (e.type === "$") {
					throw new k.default("Unexpected $", e.token)
				}
				return e
			}
			var C = function () {
				function e(t, r) {
					(0, n.default)(this, e);
					this.gullet = new c.default(t, r.macros);
					if (r.colorIsTextColor) {
						this.gullet.macros["\\color"] = "\\textcolor"
					}
					this.settings = r;
					this.leftrightDepth = 0
				}(0, l.default)(e, [{
					key: "expect",
					value: function e(t, r) {
						if (this.nextToken.text !== t) {
							throw new k.default("Expected '" + t + "', got '" + this.nextToken.text + "'", this.nextToken)
						}
						if (r !== false) {
							this.consume()
						}
					}
				}, {
					key: "consume",
					value: function e() {
						this.nextToken = this.gullet.expandNextToken()
					}
				}, {
					key: "switchMode",
					value: function e(t) {
						this.mode = t
					}
				}, {
					key: "parse",
					value: function e() {
						this.mode = "math";
						this.consume();
						var e = this.parseInput();
						return e
					}
				}, {
					key: "parseInput",
					value: function e() {
						var t = this.parseExpression(false);
						this.expect("EOF", false);
						return t
					}
				}, {
					key: "parseExpression",
					value: function t(r, a) {
						var n = [];
						while (true) {
							if (this.mode === "math") {
								this.consumeSpaces()
							}
							var i = this.nextToken;
							if (e.endOfExpression.indexOf(i.text) !== -1) {
								break
							}
							if (a && i.text === a) {
								break
							}
							if (r && o.default[i.text] && o.default[i.text].infix) {
								break
							}
							var l = this.parseAtom(a);
							if (!l) {
								if (!this.settings.throwOnError && i.text[0] === "\\") {
									var u = this.handleUnsupportedCmd();
									n.push(u);
									continue
								}
								break
							}
							n.push(l)
						}
						return this.handleInfixNodes(n)
					}
				}, {
					key: "handleInfixNodes",
					value: function e(t) {
						var r = -1;
						var a = void 0;
						for (var n = 0; n < t.length; n++) {
							var i = t[n];
							if (i.type === "infix") {
								if (r !== -1) {
									throw new k.default("only one infix operator per group", i.value.token)
								}
								r = n;
								a = i.value.replaceWith
							}
						}
						if (r !== -1) {
							var l = void 0;
							var u = void 0;
							var o = t.slice(0, r);
							var s = t.slice(r + 1);
							if (o.length === 1 && o[0].type === "ordgroup") {
								l = o[0]
							} else {
								l = new x.default("ordgroup", o, this.mode)
							}
							if (s.length === 1 && s[0].type === "ordgroup") {
								u = s[0]
							} else {
								u = new x.default("ordgroup", s, this.mode)
							}
							var f = this.callFunction(a, [l, u], []);
							return [new x.default(f.type, f, this.mode)]
						} else {
							return t
						}
					}
				}, {
					key: "handleSupSubscript",
					value: function t(r) {
						var a = this.nextToken;
						var n = a.text;
						this.consume();
						this.consumeSpaces();
						var i = this.parseGroup();
						if (!i) {
							if (!this.settings.throwOnError && this.nextToken.text[0] === "\\") {
								return this.handleUnsupportedCmd()
							} else {
								throw new k.default("Expected group after '" + n + "'", a)
							}
						}
						var l = T(i);
						if (l.type === "fn") {
							var u = o.default[i.result].greediness;
							if (u > e.SUPSUB_GREEDINESS) {
								return this.parseGivenFunction(i)
							} else {
								throw new k.default("Got function '" + i.result + "' with no arguments " + "as " + r, a)
							}
						} else {
							return i.result
						}
					}
				}, {
					key: "handleUnsupportedCmd",
					value: function e() {
						var t = this.nextToken.text;
						var r = [];
						for (var a = 0; a < t.length; a++) {
							r.push(new x.default("textord", t[a], "text"))
						}
						var n = new x.default("text", {
							body: r,
							type: "text"
						}, this.mode);
						var i = new x.default("color", {
							color: this.settings.errorColor,
							value: [n],
							type: "color"
						}, this.mode);
						this.consume();
						return i
					}
				}, {
					key: "parseAtom",
					value: function e(t) {
						var r = this.parseImplicitGroup(t);
						if (this.mode === "text") {
							return r
						}
						var a = void 0;
						var n = void 0;
						while (true) {
							this.consumeSpaces();
							var i = this.nextToken;
							if (i.text === "\\limits" || i.text === "\\nolimits") {
								if (!r || r.type !== "op") {
									throw new k.default("Limit controls must follow a math operator", i)
								} else {
									var l = i.text === "\\limits";
									r.value.limits = l;
									r.value.alwaysHandleSupSub = true
								}
								this.consume()
							} else if (i.text === "^") {
								if (a) {
									throw new k.default("Double superscript", i)
								}
								a = this.handleSupSubscript("superscript")
							} else if (i.text === "_") {
								if (n) {
									throw new k.default("Double subscript", i)
								}
								n = this.handleSupSubscript("subscript")
							} else if (i.text === "'") {
								if (a) {
									throw new k.default("Double superscript", i)
								}
								var u = new x.default("textord", "\\prime", this.mode);
								var o = [u];
								this.consume();
								while (this.nextToken.text === "'") {
									o.push(u);
									this.consume()
								}
								if (this.nextToken.text === "^") {
									o.push(this.handleSupSubscript("superscript"))
								}
								a = new x.default("ordgroup", o, this.mode)
							} else {
								break
							}
						}
						if (a || n) {
							return new x.default("supsub", {
								base: r,
								sup: a,
								sub: n
							}, this.mode)
						} else {
							return r
						}
					}
				}, {
					key: "parseImplicitGroup",
					value: function t(r) {
						var a = this.parseSymbol();
						if (a == null) {
							return this.parseFunction()
						}
						var n = a.result;
						if (n === "\\left") {
							var i = this.parseGivenFunction(a);
							++this.leftrightDepth;
							var l = this.parseExpression(false);
							--this.leftrightDepth;
							this.expect("\\right", false);
							var u = this.parseFunction();
							return new x.default("leftright", {
								body: l,
								left: i.value.value,
								right: u.value.value
							}, this.mode)
						} else if (n === "\\begin") {
							var o = this.parseGivenFunction(a);
							var s = o.value.name;
							if (!f.default.has(s)) {
								throw new k.default("No such environment: " + s, o.value.nameGroup)
							}
							var d = f.default.get(s);
							var c = this.parseArguments("\\begin{" + s + "}", d),
								v = c.args,
								h = c.optArgs;
							var p = {
								mode: this.mode,
								envName: s,
								parser: this
							};
							var g = d.handler(p, v, h);
							this.expect("\\end", false);
							var b = this.nextToken;
							var y = this.parseFunction();
							if (y.value.name !== s) {
								throw new k.default("Mismatch: \\begin{" + s + "} matched " + "by \\end{" + y.value.name + "}", b)
							}
							g.position = y.position;
							return g
						} else if (m.default.contains(e.sizeFuncs, n)) {
							this.consumeSpaces();
							var w = this.parseExpression(false, r);
							return new x.default("sizing", {
								size: m.default.indexOf(e.sizeFuncs, n) + 1,
								value: w
							}, this.mode)
						} else if (m.default.contains(e.styleFuncs, n)) {
							this.consumeSpaces();
							var M = this.parseExpression(true, r);
							return new x.default("styling", {
								style: n.slice(1, n.length - 5),
								value: M
							}, this.mode)
						} else if (n in e.oldFontFuncs) {
							var _ = e.oldFontFuncs[n];
							this.consumeSpaces();
							var S = this.parseExpression(true, r);
							if (_.slice(0, 4) === "text") {
								return new x.default("text", {
									style: _,
									body: new x.default("ordgroup", S, this.mode)
								}, this.mode)
							} else {
								return new x.default("font", {
									font: _,
									body: new x.default("ordgroup", S, this.mode)
								}, this.mode)
							}
						} else if (n === "\\color") {
							var z = this.parseColorGroup(false);
							if (!z) {
								throw new k.default("\\color not followed by color")
							}
							var T = this.parseExpression(true, r);
							return new x.default("color", {
								type: "color",
								color: z.result.value,
								value: T
							}, this.mode)
						} else if (n === "$") {
							if (this.mode === "math") {
								throw new k.default("$ within math mode")
							}
							this.consume();
							var C = this.mode;
							this.switchMode("math");
							var A = this.parseExpression(false, "$");
							this.expect("$", true);
							this.switchMode(C);
							return new x.default("styling", {
								style: "text",
								value: A
							}, "math")
						} else {
							return this.parseGivenFunction(a)
						}
					}
				}, {
					key: "parseFunction",
					value: function e() {
						var t = this.parseGroup();
						return t ? this.parseGivenFunction(t) : null
					}
				}, {
					key: "parseGivenFunction",
					value: function e(t) {
						t = T(t);
						if (t.type === "fn") {
							var r = t.result;
							var a = o.default[r];
							if (this.mode === "text" && !a.allowedInText) {
								throw new k.default("Can't use function '" + r + "' in text mode", t.token)
							} else if (this.mode === "math" && a.allowedInMath === false) {
								throw new k.default("Can't use function '" + r + "' in math mode", t.token)
							}
							var n = this.parseArguments(r, a),
								i = n.args,
								l = n.optArgs;
							var u = t.token;
							var s = this.callFunction(r, i, l, u);
							return new x.default(s.type, s, this.mode)
						} else {
							return t.result
						}
					}
				}, {
					key: "callFunction",
					value: function e(t, r, a, n) {
						var i = {
							funcName: t,
							parser: this,
							token: n
						};
						return o.default[t].handler(i, r, a)
					}
				}, {
					key: "parseArguments",
					value: function e(t, r) {
						var a = r.numArgs + r.numOptionalArgs;
						if (a === 0) {
							return {
								args: [],
								optArgs: []
							}
						}
						var n = r.greediness;
						var i = [];
						var l = [];
						for (var u = 0; u < a; u++) {
							var s = r.argTypes && r.argTypes[u];
							var f = u < r.numOptionalArgs;
							if (u > 0 && !f) {
								this.consumeSpaces()
							}
							if (u === 0 && !f && this.mode === "math") {
								this.consumeSpaces()
							}
							var d = this.nextToken;
							var c = s ? this.parseGroupOfType(s, f) : this.parseGroup(f);
							if (!c) {
								if (f) {
									l.push(null);
									continue
								}
								if (!this.settings.throwOnError && this.nextToken.text[0] === "\\") {
									c = _(this.handleUnsupportedCmd(), d)
								} else {
									throw new k.default("Expected group after '" + t + "'", d)
								}
							}
							var v = void 0;
							c = T(c);
							if (c.type === "fn") {
								var h = o.default[c.result].greediness;
								if (h > n) {
									v = this.parseGivenFunction(c)
								} else {
									throw new k.default("Got function '" + c.result + "' as " + "argument to '" + t + "'", d)
								}
							} else {
								v = c.result
							}(f ? l : i).push(v)
						}
						return {
							args: i,
							optArgs: l
						}
					}
				}, {
					key: "parseGroupOfType",
					value: function e(t, r) {
						var a = this.mode;
						if (t === "original") {
							t = a
						}
						if (t === "color") {
							return this.parseColorGroup(r)
						}
						if (t === "size") {
							return this.parseSizeGroup(r)
						}
						if (t === "url") {
							return this.parseUrlGroup(r)
						}
						this.switchMode(t);
						var n = this.parseGroup(r);
						this.switchMode(a);
						return n
					}
				}, {
					key: "consumeSpaces",
					value: function e() {
						while (this.nextToken.text === " ") {
							this.consume()
						}
					}
				}, {
					key: "parseStringGroup",
					value: function e(t, r) {
						if (r && this.nextToken.text !== "[") {
							return null
						}
						var a = this.mode;
						this.mode = "text";
						this.expect(r ? "[" : "{");
						var n = "";
						var i = this.nextToken;
						var l = i;
						while (this.nextToken.text !== (r ? "]" : "}")) {
							if (this.nextToken.text === "EOF") {
								throw new k.default("Unexpected end of input in " + t, i.range(this.nextToken, n))
							}
							l = this.nextToken;
							n += l.text;
							this.consume()
						}
						this.mode = a;
						this.expect(r ? "]" : "}");
						return i.range(l, n)
					}
				}, {
					key: "parseStringGroupWithBalancedBraces",
					value: function e(t, r) {
						if (r && this.nextToken.text !== "[") {
							return null
						}
						var a = this.mode;
						this.mode = "text";
						this.expect(r ? "[" : "{");
						var n = "";
						var i = 0;
						var l = this.nextToken;
						var u = l;
						while (i > 0 || this.nextToken.text !== (r ? "]" : "}")) {
							if (this.nextToken.text === "EOF") {
								throw new k.default("Unexpected end of input in " + t, l.range(this.nextToken, n))
							}
							u = this.nextToken;
							n += u.text;
							if (u.text === "{") {
								i += 1
							} else if (u.text === "}") {
								if (i <= 0) {
									throw new k.default("Unbalanced brace of input in " + t, l.range(this.nextToken, n))
								} else {
									i -= 1
								}
							}
							this.consume()
						}
						this.mode = a;
						this.expect(r ? "]" : "}");
						return l.range(u, n)
					}
				}, {
					key: "parseRegexGroup",
					value: function e(t, r) {
						var a = this.mode;
						this.mode = "text";
						var n = this.nextToken;
						var i = n;
						var l = "";
						while (this.nextToken.text !== "EOF" && t.test(l + this.nextToken.text)) {
							i = this.nextToken;
							l += i.text;
							this.consume()
						}
						if (l === "") {
							throw new k.default("Invalid " + r + ": '" + n.text + "'", n)
						}
						this.mode = a;
						return n.range(i, l)
					}
				}, {
					key: "parseColorGroup",
					value: function e(t) {
						var r = this.parseStringGroup("color", t);
						if (!r) {
							return null
						}
						var a = /^(#[a-f0-9]{3}|#[a-f0-9]{6}|[a-z]+)$/i.exec(r.text);
						if (!a) {
							throw new k.default("Invalid color: '" + r.text + "'", r)
						}
						return _(new x.default("color", a[0], this.mode), r)
					}
				}, {
					key: "parseUrlGroup",
					value: function e(t) {
						var r = this.parseStringGroupWithBalancedBraces("url", t);
						if (!r) {
							return null
						}
						var a = r.text;
						var n = a.replace(/\\([#$%&~_^{}])/g, "$1");
						return _(new x.default("url", n, this.mode), r)
					}
				}, {
					key: "parseSizeGroup",
					value: function e(t) {
						var r = void 0;
						if (!t && this.nextToken.text !== "{") {
							r = this.parseRegexGroup(/^[-+]? *(?:$|\d+|\d+\.\d*|\.\d*) *[a-z]{0,2} *$/, "size")
						} else {
							r = this.parseStringGroup("size", t)
						}
						if (!r) {
							return null
						}
						var a = /([-+]?) *(\d+(?:\.\d*)?|\.\d+) *([a-z]{2})/.exec(r.text);
						if (!a) {
							throw new k.default("Invalid size: '" + r.text + "'", r)
						}
						var n = {
							number: +(a[1] + a[2]),
							unit: a[3]
						};
						if (!(0, g.validUnit)(n)) {
							throw new k.default("Invalid unit: '" + n.unit + "'", r)
						}
						return _(new x.default("size", n, this.mode), r)
					}
				}, {
					key: "parseGroup",
					value: function e(t) {
						var r = this.nextToken;
						if (this.nextToken.text === (t ? "[" : "{")) {
							this.consume();
							var a = this.parseExpression(false, t ? "]" : "}");
							var n = this.nextToken;
							this.expect(t ? "]" : "}");
							if (this.mode === "text") {
								this.formLigatures(a)
							}
							return _(new x.default("ordgroup", a, this.mode, r, n), r.range(n, r.text))
						} else {
							return t ? null : this.parseSymbol()
						}
					}
				}, {
					key: "formLigatures",
					value: function e(t) {
						var r = t.length - 1;
						for (var a = 0; a < r; ++a) {
							var n = t[a];
							var i = n.value;
							if (i === "-" && t[a + 1].value === "-") {
								if (a + 1 < r && t[a + 2].value === "-") {
									t.splice(a, 3, new x.default("textord", "---", "text", n, t[a + 2]));
									r -= 2
								} else {
									t.splice(a, 2, new x.default("textord", "--", "text", n, t[a + 1]));
									r -= 1
								}
							}
							if ((i === "'" || i === "`") && t[a + 1].value === i) {
								t.splice(a, 2, new x.default("textord", i + i, "text", n, t[a + 1]));
								r -= 1
							}
						}
					}
				}, {
					key: "parseSymbol",
					value: function e() {
						var t = this.nextToken;
						if (o.default[t.text]) {
							this.consume();
							return S(t)
						} else if (h.default[this.mode][t.text]) {
							this.consume();
							return _(new x.default(h.default[this.mode][t.text].group, t.text, this.mode, t), t)
						} else if (this.mode === "text" && b.cjkRegex.test(t.text)) {
							this.consume();
							return _(new x.default("textord", t.text, this.mode, t), t)
						} else if (t.text === "$") {
							return z(t)
						} else if (/^\\verb[^a-zA-Z]/.test(t.text)) {
							this.consume();
							var r = t.text.slice(5);
							var a = r.charAt(0) === "*";
							if (a) {
								r = r.slice(1)
							}
							if (r.length < 2 || r.charAt(0) !== r.slice(-1)) {
								throw new k.default("\\verb assertion failed --\n                    please report what input caused this bug")
							}
							r = r.slice(1, -1);
							return _(new x.default("verb", {
								body: r,
								star: a
							}, "text"), t)
						} else {
							return null
						}
					}
				}]);
				return e
			}();
			C.endOfExpression = ["}", "\\end", "\\right", "&", "\\\\", "\\cr"];
			C.SUPSUB_GREEDINESS = 1;
			C.sizeFuncs = ["\\tiny", "\\sixptsize", "\\scriptsize", "\\footnotesize", "\\small", "\\normalsize", "\\large", "\\Large", "\\LARGE", "\\huge", "\\Huge"];
			C.styleFuncs = ["\\displaystyle", "\\textstyle", "\\scriptstyle", "\\scriptscriptstyle"];
			C.oldFontFuncs = {
				"\\rm": "mathrm",
				"\\sf": "mathsf",
				"\\tt": "mathtt",
				"\\bf": "mathbf",
				"\\it": "mathit"
			};
			r.default = C
		}, {
			"./MacroExpander": 82,
			"./ParseError": 84,
			"./ParseNode": 85,
			"./environments": 99,
			"./functions": 103,
			"./symbols": 120,
			"./unicodeRegexes": 121,
			"./units": 122,
			"./utils": 123,
			"babel-runtime/helpers/classCallCheck": 8,
			"babel-runtime/helpers/createClass": 9
		}],
		87: [function (e, t, r) {
			"use strict";
			Object.defineProperty(r, "__esModule", {
				value: true
			});
			var a = e("babel-runtime/helpers/classCallCheck");
			var n = u(a);
			var i = e("./utils");
			var l = u(i);

			function u(e) {
				return e && e.__esModule ? e : {
					default: e
				}
			}
			var o = function e(t) {
				(0, n.default)(this, e);
				t = t || {};
				this.displayMode = l.default.deflt(t.displayMode, false);
				this.throwOnError = l.default.deflt(t.throwOnError, true);
				this.errorColor = l.default.deflt(t.errorColor, "#cc0000");
				this.macros = t.macros || {};
				this.colorIsTextColor = l.default.deflt(t.colorIsTextColor, false);
				this.maxSize = Math.max(0, l.default.deflt(t.maxSize, Infinity))
			};
			r.default = o
		}, {
			"./utils": 123,
			"babel-runtime/helpers/classCallCheck": 8
		}],
		88: [function (e, t, r) {
			"use strict";
			Object.defineProperty(r, "__esModule", {
				value: true
			});
			var a = e("babel-runtime/core-js/object/freeze");
			var n = s(a);
			var i = e("babel-runtime/helpers/classCallCheck");
			var l = s(i);
			var u = e("babel-runtime/helpers/createClass");
			var o = s(u);

			function s(e) {
				return e && e.__esModule ? e : {
					default: e
				}
			}
			var f = function () {
				function e(t, r, a) {
					(0, l.default)(this, e);
					this.lexer = t;
					this.start = r;
					this.end = a;
					(0, n.default)(this)
				}(0, o.default)(e, null, [{
					key: "range",
					value: function t(r, a) {
						if (!a) {
							return r && r.loc
						} else if (!r || !r.loc || !a.loc || r.loc.lexer !== a.loc.lexer) {
							return null
						} else {
							return new e(r.loc.lexer, r.loc.start, a.loc.end)
						}
					}
				}]);
				return e
			}();
			r.default = f
		}, {
			"babel-runtime/core-js/object/freeze": 7,
			"babel-runtime/helpers/classCallCheck": 8,
			"babel-runtime/helpers/createClass": 9
		}],
		89: [function (e, t, r) {
			"use strict";
			Object.defineProperty(r, "__esModule", {
				value: true
			});
			var a = e("babel-runtime/helpers/classCallCheck");
			var n = u(a);
			var i = e("babel-runtime/helpers/createClass");
			var l = u(i);

			function u(e) {
				return e && e.__esModule ? e : {
					default: e
				}
			}
			var o = function () {
				function e(t, r, a) {
					(0, n.default)(this, e);
					this.id = t;
					this.size = r;
					this.cramped = a
				}(0, l.default)(e, [{
					key: "sup",
					value: function e() {
						return g[b[this.id]]
					}
				}, {
					key: "sub",
					value: function e() {
						return g[y[this.id]]
					}
				}, {
					key: "fracNum",
					value: function e() {
						return g[x[this.id]]
					}
				}, {
					key: "fracDen",
					value: function e() {
						return g[w[this.id]]
					}
				}, {
					key: "cramp",
					value: function e() {
						return g[k[this.id]]
					}
				}, {
					key: "text",
					value: function e() {
						return g[M[this.id]]
					}
				}, {
					key: "isTight",
					value: function e() {
						return this.size >= 2
					}
				}]);
				return e
			}();
			var s = 0;
			var f = 1;
			var d = 2;
			var c = 3;
			var v = 4;
			var h = 5;
			var p = 6;
			var m = 7;
			var g = [new o(s, 0, false), new o(f, 0, true), new o(d, 1, false), new o(c, 1, true), new o(v, 2, false), new o(h, 2, true), new o(p, 3, false), new o(m, 3, true)];
			var b = [v, h, v, h, p, m, p, m];
			var y = [h, h, h, h, m, m, m, m];
			var x = [d, c, v, h, p, m, p, m];
			var w = [c, c, h, h, m, m, m, m];
			var k = [f, f, c, c, h, h, m, m];
			var M = [s, f, d, c, d, c, d, c];
			r.default = {
				DISPLAY: g[s],
				TEXT: g[d],
				SCRIPT: g[v],
				SCRIPTSCRIPT: g[p]
			}
		}, {
			"babel-runtime/helpers/classCallCheck": 8,
			"babel-runtime/helpers/createClass": 9
		}],
		90: [function (e, t, r) {
			"use strict";
			Object.defineProperty(r, "__esModule", {
				value: true
			});
			r.Token = undefined;
			var a = e("babel-runtime/helpers/classCallCheck");
			var n = s(a);
			var i = e("babel-runtime/helpers/createClass");
			var l = s(i);
			var u = e("./SourceLocation");
			var o = s(u);

			function s(e) {
				return e && e.__esModule ? e : {
					default: e
				}
			}
			var f = r.Token = function () {
				function e(t, r) {
					(0, n.default)(this, e);
					this.text = t;
					this.loc = r
				}(0, l.default)(e, [{
					key: "range",
					value: function t(r, a) {
						return new e(a, o.default.range(this, r))
					}
				}]);
				return e
			}()
		}, {
			"./SourceLocation": 88,
			"babel-runtime/helpers/classCallCheck": 8,
			"babel-runtime/helpers/createClass": 9
		}],
		91: [function (e, t, r) {
			"use strict";
			Object.defineProperty(r, "__esModule", {
				value: true
			});
			var a = e("babel-runtime/core-js/get-iterator");
			var n = v(a);
			var i = e("./domTree");
			var l = v(i);
			var u = e("./fontMetrics");
			var o = v(u);
			var s = e("./symbols");
			var f = v(s);
			var d = e("./utils");
			var c = v(d);

			function v(e) {
				return e && e.__esModule ? e : {
					default: e
				}
			}
			var h = ["\\imath", "\\jmath", "\\pounds"];
			var p = function e(t, r, a) {
				if (f.default[a][t] && f.default[a][t].replace) {
					t = f.default[a][t].replace
				}
				return {
					value: t,
					metrics: o.default.getCharacterMetrics(t, r)
				}
			};
			var m = function e(t, r, a, n, i) {
				var u = p(t, r, a);
				var o = u.metrics;
				t = u.value;
				var s = void 0;
				if (o) {
					var f = o.italic;
					if (a === "text") {
						f = 0
					}
					s = new l.default.symbolNode(t, o.height, o.depth, f, o.skew, i)
				} else {
					typeof console !== "undefined" && console.warn("No character metrics for '" + t + "' in style '" + r + "'");
					s = new l.default.symbolNode(t, 0, 0, 0, 0, i)
				}
				if (n) {
					s.maxFontSize = n.sizeMultiplier;
					if (n.style.isTight()) {
						s.classes.push("mtight")
					}
					var d = n.getColor();
					if (d) {
						s.style.color = d
					}
				}
				return s
			};
			var g = function e(t, r, a) {
				var n = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
				if (t === "\\" || f.default[r][t].font === "main") {
					return m(t, "Main-Regular", r, a, n)
				} else {
					return m(t, "AMS-Regular", r, a, n.concat(["amsrm"]))
				}
			};
			var b = function e(t, r, a, n, i) {
				if (i === "mathord") {
					var l = y(t, r, a, n);
					return m(t, l.fontName, r, a, n.concat([l.fontClass]))
				} else if (i === "textord") {
					var u = f.default[r][t] && f.default[r][t].font;
					if (u === "ams") {
						return m(t, "AMS-Regular", r, a, n.concat(["amsrm"]))
					} else {
						return m(t, "Main-Regular", r, a, n.concat(["mathrm"]))
					}
				} else {
					throw new Error("unexpected type: " + i + " in mathDefault")
				}
			};
			var y = function e(t, r, a, n) {
				if (/[0-9]/.test(t.charAt(0)) || c.default.contains(h, t)) {
					return {
						fontName: "Main-Italic",
						fontClass: "mainit"
					}
				} else {
					return {
						fontName: "Math-Italic",
						fontClass: "mathit"
					}
				}
			};
			var x = function e(t, r, a) {
				var n = t.mode;
				var i = t.value;
				var l = ["mord"];
				var u = r.font;
				if (u) {
					var o = void 0;
					if (u === "mathit" || c.default.contains(h, i)) {
						o = y(i, n, r, l)
					} else {
						o = N[u]
					}
					if (p(i, o.fontName, n).metrics) {
						return m(i, o.fontName, n, r, l.concat([o.fontClass || u]))
					} else {
						return b(i, n, r, l, a)
					}
				} else {
					return b(i, n, r, l, a)
				}
			};
			var w = function e(t) {
				for (var r = 0; r < t.length - 1; r++) {
					if (t[r].tryCombine(t[r + 1])) {
						t.splice(r + 1, 1);
						r--
					}
				}
				return t
			};
			var k = function e(t) {
				var r = 0;
				var a = 0;
				var i = 0;
				var l = true;
				var u = false;
				var o = undefined;
				try {
					for (var s = (0, n.default)(t.children), f; !(l = (f = s.next()).done); l = true) {
						var d = f.value;
						if (d.height > r) {
							r = d.height
						}
						if (d.depth > a) {
							a = d.depth
						}
						if (d.maxFontSize > i) {
							i = d.maxFontSize
						}
					}
				} catch (e) {
					u = true;
					o = e
				} finally {
					try {
						if (!l && s.return) {
							s.return()
						}
					} finally {
						if (u) {
							throw o
						}
					}
				}
				t.height = r;
				t.depth = a;
				t.maxFontSize = i
			};
			var M = function e(t, r, a) {
				var n = new l.default.span(t, r, a);
				k(n);
				return n
			};
			var _ = function e(t, r, a, n) {
				var i = new l.default.anchor(t, r, a, n);
				k(i);
				return i
			};
			var S = function e(t, r) {
				t.children = r.concat(t.children);
				k(t)
			};
			var z = function e(t) {
				var r = new l.default.documentFragment(t);
				k(r);
				return r
			};
			var T = function e(t) {
				if (t.positionType === "individualShift") {
					var r = t.children;
					var a = [r[0]];
					var i = -r[0].shift - r[0].elem.depth;
					var l = i;
					for (var u = 1; u < r.length; u++) {
						var o = -r[u].shift - l - r[u].elem.depth;
						var s = o - (r[u - 1].elem.height + r[u - 1].elem.depth);
						l = l + o;
						a.push({
							type: "kern",
							size: s
						});
						a.push(r[u])
					}
					return {
						children: a,
						depth: i
					}
				}
				var f = void 0;
				if (t.positionType === "top") {
					var d = t.positionData;
					var c = true;
					var v = false;
					var h = undefined;
					try {
						for (var p = (0, n.default)(t.children), m; !(c = (m = p.next()).done); c = true) {
							var g = m.value;
							d -= g.type === "kern" ? g.size : g.elem.height + g.elem.depth
						}
					} catch (e) {
						v = true;
						h = e
					} finally {
						try {
							if (!c && p.return) {
								p.return()
							}
						} finally {
							if (v) {
								throw h
							}
						}
					}
					f = d
				} else if (t.positionType === "bottom") {
					f = -t.positionData
				} else {
					var b = t.children[0];
					if (b.type !== "elem") {
						throw new Error('First child must have type "elem".')
					}
					if (t.positionType === "shift") {
						f = -b.elem.depth - t.positionData
					} else if (t.positionType === "firstBaseline") {
						f = -b.elem.depth
					} else {
						throw new Error("Invalid positionType " + t.positionType + ".")
					}
				}
				return {
					children: t.children,
					depth: f
				}
			};
			var C = function e(t, r) {
				var a = T(t),
					i = a.children,
					u = a.depth;
				var o = 0;
				var s = true;
				var f = false;
				var d = undefined;
				try {
					for (var c = (0, n.default)(i), v; !(s = (v = c.next()).done); s = true) {
						var h = v.value;
						if (h.type === "elem") {
							var p = h.elem;
							o = Math.max(o, p.maxFontSize, p.height)
						}
					}
				} catch (e) {
					f = true;
					d = e
				} finally {
					try {
						if (!s && c.return) {
							c.return()
						}
					} finally {
						if (f) {
							throw d
						}
					}
				}
				o += 2;
				var m = M(["pstrut"], []);
				m.style.height = o + "em";
				var g = [];
				var b = u;
				var y = u;
				var x = u;
				var w = true;
				var k = false;
				var _ = undefined;
				try {
					for (var S = (0, n.default)(i), z; !(w = (z = S.next()).done); w = true) {
						var C = z.value;
						if (C.type === "kern") {
							x += C.size
						} else {
							var A = C.elem;
							var O = M([], [m, A]);
							O.style.top = -o - x - A.depth + "em";
							if (C.marginLeft) {
								O.style.marginLeft = C.marginLeft
							}
							if (C.marginRight) {
								O.style.marginRight = C.marginRight
							}
							g.push(O);
							x += A.height + A.depth
						}
						b = Math.min(b, x);
						y = Math.max(y, x)
					}
				} catch (e) {
					k = true;
					_ = e
				} finally {
					try {
						if (!w && S.return) {
							S.return()
						}
					} finally {
						if (k) {
							throw _
						}
					}
				}
				var N = M(["vlist"], g);
				N.style.height = y + "em";
				var L = void 0;
				if (b < 0) {
					var j = M(["vlist"], []);
					j.style.height = -b + "em";
					var E = M(["vlist-s"], [new l.default.symbolNode("\u200b")]);
					L = [M(["vlist-r"], [N, E]), M(["vlist-r"], [j])]
				} else {
					L = [M(["vlist-r"], [N])]
				}
				var q = M(["vlist-t"], L);
				if (L.length === 2) {
					q.classes.push("vlist-t2")
				}
				q.height = y;
				q.depth = -b;
				return q
			};
			var A = function e(t, r) {
				var a = t.value.body;
				if (t.value.star) {
					a = a.replace(/ /g, "\u2423")
				} else {
					a = a.replace(/ /g, "\xa0")
				}
				return a
			};
			var O = {
				"\\qquad": {
					size: "2em",
					className: "qquad"
				},
				"\\quad": {
					size: "1em",
					className: "quad"
				},
				"\\enspace": {
					size: "0.5em",
					className: "enspace"
				},
				"\\;": {
					size: "0.277778em",
					className: "thickspace"
				},
				"\\:": {
					size: "0.22222em",
					className: "mediumspace"
				},
				"\\,": {
					size: "0.16667em",
					className: "thinspace"
				},
				"\\!": {
					size: "-0.16667em",
					className: "negativethinspace"
				}
			};
			var N = {
				mathbf: {
					variant: "bold",
					fontName: "Main-Bold"
				},
				mathrm: {
					variant: "normal",
					fontName: "Main-Regular"
				},
				textit: {
					variant: "italic",
					fontName: "Main-Italic"
				},
				mathbb: {
					variant: "double-struck",
					fontName: "AMS-Regular"
				},
				mathcal: {
					variant: "script",
					fontName: "Caligraphic-Regular"
				},
				mathfrak: {
					variant: "fraktur",
					fontName: "Fraktur-Regular"
				},
				mathscr: {
					variant: "script",
					fontName: "Script-Regular"
				},
				mathsf: {
					variant: "sans-serif",
					fontName: "SansSerif-Regular"
				},
				mathtt: {
					variant: "monospace",
					fontName: "Typewriter-Regular"
				}
			};
			r.default = {
				fontMap: N,
				makeSymbol: m,
				mathsym: g,
				makeSpan: M,
				makeAnchor: _,
				makeFragment: z,
				makeVList: C,
				makeOrd: x,
				makeVerb: A,
				tryCombineChars: w,
				prependChildren: S,
				spacingFunctions: O
			}
		}, {
			"./domTree": 98,
			"./fontMetrics": 101,
			"./symbols": 120,
			"./utils": 123,
			"babel-runtime/core-js/get-iterator": 3
		}],
		92: [function (e, t, r) {
			"use strict";
			Object.defineProperty(r, "__esModule", {
				value: true
			});
			r.buildGroup = r.makeLineSpan = r.groupTypes = r.makeNullDelimiter = r.getTypeOfDomTree = r.buildExpression = r.spliceSpaces = undefined;
			var a = e("babel-runtime/core-js/json/stringify");
			var n = x(a);
			r.default = B;
			var i = e("./ParseError");
			var l = x(i);
			var u = e("./Style");
			var o = x(u);
			var s = e("./buildCommon");
			var f = x(s);
			var d = e("./delimiter");
			var c = x(d);
			var v = e("./domTree");
			var h = x(v);
			var p = e("./units");
			var m = e("./utils");
			var g = x(m);
			var b = e("./stretchy");
			var y = x(b);

			function x(e) {
				return e && e.__esModule ? e : {
					default: e
				}
			}
			var w = f.default.makeSpan;
			var k = function e(t) {
				return t instanceof h.default.span && t.classes[0] === "mspace"
			};
			var M = function e(t) {
				return t && t.classes[0] === "mbin"
			};
			var _ = function e(t, r) {
				if (t) {
					return g.default.contains(["mbin", "mopen", "mrel", "mop", "mpunct"], t.classes[0])
				} else {
					return r
				}
			};
			var S = function e(t, r) {
				if (t) {
					return g.default.contains(["mrel", "mclose", "mpunct"], t.classes[0])
				} else {
					return r
				}
			};
			var z = r.spliceSpaces = function e(t, r) {
				var a = r;
				while (a < t.length && k(t[a])) {
					a++
				}
				if (a === r) {
					return null
				} else {
					return t.splice(r, a - r)
				}
			};
			var T = r.buildExpression = function e(t, r, a) {
				var n = [];
				for (var i = 0; i < t.length; i++) {
					var l = t[i];
					var u = P(l, r);
					if (u instanceof h.default.documentFragment) {
						Array.prototype.push.apply(n, u.children)
					} else {
						n.push(u)
					}
				}
				for (var o = 0; o < n.length; o++) {
					var s = z(n, o);
					if (s) {
						if (o < n.length) {
							if (n[o] instanceof h.default.symbolNode) {
								n[o] = w([].concat(n[o].classes), [n[o]])
							}
							f.default.prependChildren(n[o], s)
						} else {
							Array.prototype.push.apply(n, s);
							break
						}
					}
				}
				for (var d = 0; d < n.length; d++) {
					if (M(n[d]) && (_(n[d - 1], a) || S(n[d + 1], a))) {
						n[d].classes[0] = "mord"
					}
				}
				for (var c = 0; c < n.length; c++) {
					if (n[c].value === "\u0338" && c + 1 < n.length) {
						var v = n.slice(c, c + 2);
						v[0].classes = ["mainrm"];
						v[0].style.position = "absolute";
						v[0].style.right = "0";
						var p = n[c + 1].classes;
						var m = w(p, v);
						if (p.indexOf("mord") !== -1) {
							m.style.paddingLeft = "0.277771em"
						}
						m.style.position = "relative";
						n.splice(c, 2, m)
					}
				}
				return n
			};
			var C = r.getTypeOfDomTree = function e(t) {
				if (t instanceof h.default.documentFragment) {
					if (t.children.length) {
						return e(t.children[t.children.length - 1])
					}
				} else {
					if (g.default.contains(["mord", "mop", "mbin", "mrel", "mopen", "mclose", "mpunct", "minner"], t.classes[0])) {
						return t.classes[0]
					}
				}
				return null
			};
			var A = function e(t, r) {
				if (!t.value.base) {
					return false
				} else {
					var a = t.value.base;
					if (a.type === "op") {
						return a.value.limits && (r.style.size === o.default.DISPLAY.size || a.value.alwaysHandleSupSub)
					} else if (a.type === "accent") {
						return N(a.value.base)
					} else if (a.type === "horizBrace") {
						var n = t.value.sub ? false : true;
						return n === a.value.isOver
					} else {
						return null
					}
				}
			};
			var O = function e(t) {
				if (!t) {
					return false
				} else if (t.type === "ordgroup") {
					if (t.value.length === 1) {
						return e(t.value[0])
					} else {
						return t
					}
				} else if (t.type === "color") {
					if (t.value.value.length === 1) {
						return e(t.value.value[0])
					} else {
						return t
					}
				} else if (t.type === "font") {
					return e(t.value.body)
				} else {
					return t
				}
			};
			var N = function e(t) {
				var r = O(t);
				return r.type === "mathord" || r.type === "textord" || r.type === "bin" || r.type === "rel" || r.type === "inner" || r.type === "open" || r.type === "close" || r.type === "punct"
			};
			var L = r.makeNullDelimiter = function e(t, r) {
				var a = ["nulldelimiter"].concat(t.baseSizingClasses());
				return w(r.concat(a))
			};
			var j = r.groupTypes = {};
			j.mathord = function (e, t) {
				return f.default.makeOrd(e, t, "mathord")
			};
			j.textord = function (e, t) {
				return f.default.makeOrd(e, t, "textord")
			};
			j.bin = function (e, t) {
				return f.default.mathsym(e.value, e.mode, t, ["mbin"])
			};
			j.rel = function (e, t) {
				return f.default.mathsym(e.value, e.mode, t, ["mrel"])
			};
			j.open = function (e, t) {
				return f.default.mathsym(e.value, e.mode, t, ["mopen"])
			};
			j.close = function (e, t) {
				return f.default.mathsym(e.value, e.mode, t, ["mclose"])
			};
			j.inner = function (e, t) {
				return f.default.mathsym(e.value, e.mode, t, ["minner"])
			};
			j.punct = function (e, t) {
				return f.default.mathsym(e.value, e.mode, t, ["mpunct"])
			};
			j.ordgroup = function (e, t) {
				return w(["mord"], T(e.value, t, true), t)
			};
			j.text = function (e, t) {
				var r = t.withFont(e.value.font);
				var a = T(e.value.body, r, true);
				f.default.tryCombineChars(a);
				return w(["mord", "text"], a, r)
			};
			j.color = function (e, t) {
				var r = T(e.value.value, t.withColor(e.value.color), false);
				return new f.default.makeFragment(r)
			};
			j.supsub = function (e, t) {
				if (A(e, t)) {
					return j[e.value.base.type](e, t)
				}
				var r = P(e.value.base, t);
				var a = void 0;
				var n = void 0;
				var i = t.fontMetrics();
				var l = void 0;
				var u = 0;
				var s = 0;
				if (e.value.sup) {
					l = t.havingStyle(t.style.sup());
					a = P(e.value.sup, l, t);
					if (!N(e.value.base)) {
						u = r.height - l.fontMetrics().supDrop * l.sizeMultiplier / t.sizeMultiplier
					}
				}
				if (e.value.sub) {
					l = t.havingStyle(t.style.sub());
					n = P(e.value.sub, l, t);
					if (!N(e.value.base)) {
						s = r.depth + l.fontMetrics().subDrop * l.sizeMultiplier / t.sizeMultiplier
					}
				}
				var d = void 0;
				if (t.style === o.default.DISPLAY) {
					d = i.sup1
				} else if (t.style.cramped) {
					d = i.sup3
				} else {
					d = i.sup2
				}
				var c = t.sizeMultiplier;
				var v = .5 / i.ptPerEm / c + "em";
				var p = void 0;
				if (!e.value.sup) {
					s = Math.max(s, i.sub1, n.height - .8 * i.xHeight);
					var m = [{
						type: "elem",
						elem: n,
						marginRight: v
					}];
					if (r instanceof h.default.symbolNode) {
						m[0].marginLeft = -r.italic + "em"
					}
					p = f.default.makeVList({
						positionType: "shift",
						positionData: s,
						children: m
					}, t)
				} else if (!e.value.sub) {
					u = Math.max(u, d, a.depth + .25 * i.xHeight);
					p = f.default.makeVList({
						positionType: "shift",
						positionData: -u,
						children: [{
							type: "elem",
							elem: a,
							marginRight: v
						}]
					}, t)
				} else {
					u = Math.max(u, d, a.depth + .25 * i.xHeight);
					s = Math.max(s, i.sub2);
					var g = i.defaultRuleThickness;
					if (u - a.depth - (n.height - s) < 4 * g) {
						s = 4 * g - (u - a.depth) + n.height;
						var b = .8 * i.xHeight - (u - a.depth);
						if (b > 0) {
							u += b;
							s -= b
						}
					}
					var y = [{
						type: "elem",
						elem: n,
						shift: s,
						marginRight: v
					}, {
						type: "elem",
						elem: a,
						shift: -u,
						marginRight: v
					}];
					if (r instanceof h.default.symbolNode) {
						y[0].marginLeft = -r.italic + "em"
					}
					p = f.default.makeVList({
						positionType: "individualShift",
						children: y
					}, t)
				}
				var x = C(r) || "mord";
				return w([x], [r, w(["msupsub"], [p])], t)
			};
			j.spacing = function (e, t) {
				if (e.value === "\\ " || e.value === "\\space" || e.value === " " || e.value === "~") {
					if (e.mode === "text") {
						return f.default.makeOrd(e, t, "textord")
					} else {
						return w(["mspace"], [f.default.mathsym(e.value, e.mode, t)], t)
					}
				} else {
					return w(["mspace", f.default.spacingFunctions[e.value].className], [], t)
				}
			};
			var E = r.makeLineSpan = function e(t, r, a) {
				var n = y.default.ruleSpan(t, r);
				n.height = a || r.fontMetrics().defaultRuleThickness;
				n.style.height = n.height + "em";
				n.maxFontSize = 1;
				return n
			};
			j.overline = function (e, t) {
				var r = P(e.value.body, t.havingCrampedStyle());
				var a = E("overline-line", t);
				var n = f.default.makeVList({
					positionType: "firstBaseline",
					children: [{
						type: "elem",
						elem: r
					}, {
						type: "kern",
						size: 3 * a.height
					}, {
						type: "elem",
						elem: a
					}, {
						type: "kern",
						size: a.height
					}]
				}, t);
				return w(["mord", "overline"], [n], t)
			};
			j.underline = function (e, t) {
				var r = P(e.value.body, t);
				var a = E("underline-line", t);
				var n = f.default.makeVList({
					positionType: "top",
					positionData: r.height,
					children: [{
						type: "kern",
						size: a.height
					}, {
						type: "elem",
						elem: a
					}, {
						type: "kern",
						size: 3 * a.height
					}, {
						type: "elem",
						elem: r
					}]
				}, t);
				return w(["mord", "underline"], [n], t)
			};
			j.sqrt = function (e, t) {
				var r = P(e.value.body, t.havingCrampedStyle());
				if (r.height === 0) {
					r.height = t.fontMetrics().xHeight
				}
				if (r instanceof h.default.documentFragment) {
					r = w([], [r], t)
				}
				var a = t.fontMetrics();
				var n = a.defaultRuleThickness;
				var i = n;
				if (t.style.id < o.default.TEXT.id) {
					i = t.fontMetrics().xHeight
				}
				var l = n + i / 4;
				var u = (r.height + r.depth + l + n) * t.sizeMultiplier;
				var s = c.default.customSizedDelim("\\surd", u, false, t, e.mode);
				var d = t.fontMetrics().sqrtRuleThickness * s.sizeMultiplier;
				var v = s.height - d;
				if (v > r.height + r.depth + l) {
					l = (l + v - r.height - r.depth) / 2
				}
				var p = s.height - r.height - l - d;
				r.style.paddingLeft = s.advanceWidth + "em";
				var m = f.default.makeVList({
					positionType: "firstBaseline",
					children: [{
						type: "elem",
						elem: r
					}, {
						type: "kern",
						size: -(r.height + p)
					}, {
						type: "elem",
						elem: s
					}, {
						type: "kern",
						size: d
					}]
				}, t);
				m.children[0].children[0].classes.push("svg-align");
				if (!e.value.index) {
					return w(["mord", "sqrt"], [m], t)
				} else {
					var g = t.havingStyle(o.default.SCRIPTSCRIPT);
					var b = P(e.value.index, g, t);
					var y = .6 * (m.height - m.depth);
					var x = f.default.makeVList({
						positionType: "shift",
						positionData: -y,
						children: [{
							type: "elem",
							elem: b
						}]
					}, t);
					var k = w(["root"], [x]);
					return w(["mord", "sqrt"], [k, m], t)
				}
			};

			function q(e, t, r) {
				var a = T(e, t, false);
				var n = t.sizeMultiplier / r.sizeMultiplier;
				for (var i = 0; i < a.length; i++) {
					var l = g.default.indexOf(a[i].classes, "sizing");
					if (l < 0) {
						Array.prototype.push.apply(a[i].classes, t.sizingClasses(r))
					} else if (a[i].classes[l + 1] === "reset-size" + t.size) {
						a[i].classes[l + 1] = "reset-size" + r.size
					}
					a[i].height *= n;
					a[i].depth *= n
				}
				return f.default.makeFragment(a)
			}
			j.sizing = function (e, t) {
				var r = t.havingSize(e.value.size);
				return q(e.value.value, r, t)
			};
			j.styling = function (e, t) {
				var r = {
					display: o.default.DISPLAY,
					text: o.default.TEXT,
					script: o.default.SCRIPT,
					scriptscript: o.default.SCRIPTSCRIPT
				};
				var a = r[e.value.style];
				var n = t.havingStyle(a);
				return q(e.value.value, n, t)
			};
			j.font = function (e, t) {
				var r = e.value.font;
				return P(e.value.body, t.withFont(r))
			};
			j.verb = function (e, t) {
				var r = f.default.makeVerb(e, t);
				var a = [];
				var n = t.havingStyle(t.style.text());
				for (var i = 0; i < r.length; i++) {
					if (r[i] === "\xa0") {
						var l = w(["mord", "rule"], [], n);
						l.style.marginLeft = "0.525em";
						a.push(l)
					} else {
						a.push(f.default.makeSymbol(r[i], "Typewriter-Regular", e.mode, n, ["mathtt"]))
					}
				}
				f.default.tryCombineChars(a);
				return w(["mord", "text"].concat(n.sizingClasses(t)), a, n)
			};
			j.rule = function (e, t) {
				var r = w(["mord", "rule"], [], t);
				var a = 0;
				if (e.value.shift) {
					a = (0, p.calculateSize)(e.value.shift, t)
				}
				var n = (0, p.calculateSize)(e.value.width, t);
				var i = (0, p.calculateSize)(e.value.height, t);
				r.style.borderRightWidth = n + "em";
				r.style.borderTopWidth = i + "em";
				r.style.bottom = a + "em";
				r.width = n;
				r.height = i + a;
				r.depth = -a;
				r.maxFontSize = i * 1.125 * t.sizeMultiplier;
				return r
			};
			j.kern = function (e, t) {
				var r = w(["mord", "rule"], [], t);
				if (e.value.dimension) {
					var a = (0, p.calculateSize)(e.value.dimension, t);
					r.style.marginLeft = a + "em"
				}
				return r
			};
			j.accent = function (e, t) {
				var r = e.value.base;
				var a = void 0;
				if (e.type === "supsub") {
					var n = e;
					e = n.value.base;
					r = e.value.base;
					n.value.base = r;
					a = P(n, t)
				}
				var i = P(r, t.havingCrampedStyle());
				var l = e.value.isShifty && N(r);
				var u = 0;
				if (l) {
					var o = O(r);
					var s = P(o, t.havingCrampedStyle());
					u = s.skew
				}
				var d = Math.min(i.height, t.fontMetrics().xHeight);
				var c = void 0;
				if (!e.value.isStretchy) {
					var v = f.default.makeSymbol(e.value.label, "Main-Regular", e.mode, t);
					v.italic = 0;
					var h = null;
					if (e.value.label === "\\vec") {
						h = "accent-vec"
					} else if (e.value.label === "\\H") {
						h = "accent-hungarian"
					}
					c = w([], [v]);
					c = w(["accent-body", h], [c]);
					c.style.marginLeft = 2 * u + "em";
					c = f.default.makeVList({
						positionType: "firstBaseline",
						children: [{
							type: "elem",
							elem: i
						}, {
							type: "kern",
							size: -d
						}, {
							type: "elem",
							elem: c
						}]
					}, t)
				} else {
					c = y.default.svgSpan(e, t);
					c = f.default.makeVList({
						positionType: "firstBaseline",
						children: [{
							type: "elem",
							elem: i
						}, {
							type: "elem",
							elem: c
						}]
					}, t);
					var p = c.children[0].children[0].children[1];
					p.classes.push("svg-align");
					if (u > 0) {
						p.style.width = "calc(100% - " + 2 * u + "em)";
						p.style.marginLeft = 2 * u + "em"
					}
				}
				var m = w(["mord", "accent"], [c], t);
				if (a) {
					a.children[0] = m;
					a.height = Math.max(m.height, a.height);
					a.classes[0] = "mord";
					return a
				} else {
					return m
				}
			};
			j.horizBrace = function (e, t) {
				var r = t.style;
				var a = e.type === "supsub";
				var n = void 0;
				var i = void 0;
				if (a) {
					if (e.value.sup) {
						i = t.havingStyle(r.sup());
						n = P(e.value.sup, i, t)
					} else {
						i = t.havingStyle(r.sub());
						n = P(e.value.sub, i, t)
					}
					e = e.value.base
				}
				var l = P(e.value.base, t.havingBaseStyle(o.default.DISPLAY));
				var u = y.default.svgSpan(e, t);
				var s = void 0;
				if (e.value.isOver) {
					s = f.default.makeVList({
						positionType: "firstBaseline",
						children: [{
							type: "elem",
							elem: l
						}, {
							type: "kern",
							size: .1
						}, {
							type: "elem",
							elem: u
						}]
					}, t);
					s.children[0].children[0].children[1].classes.push("svg-align")
				} else {
					s = f.default.makeVList({
						positionType: "bottom",
						positionData: l.depth + .1 + u.height,
						children: [{
							type: "elem",
							elem: u
						}, {
							type: "kern",
							size: .1
						}, {
							type: "elem",
							elem: l
						}]
					}, t);
					s.children[0].children[0].children[0].classes.push("svg-align")
				}
				if (a) {
					var d = w(["mord", e.value.isOver ? "mover" : "munder"], [s], t);
					if (e.value.isOver) {
						s = f.default.makeVList({
							positionType: "firstBaseline",
							children: [{
								type: "elem",
								elem: d
							}, {
								type: "kern",
								size: .2
							}, {
								type: "elem",
								elem: n
							}]
						}, t)
					} else {
						s = f.default.makeVList({
							positionType: "bottom",
							positionData: d.depth + .2 + n.height,
							children: [{
								type: "elem",
								elem: n
							}, {
								type: "kern",
								size: .2
							}, {
								type: "elem",
								elem: d
							}]
						}, t)
					}
				}
				return w(["mord", e.value.isOver ? "mover" : "munder"], [s], t)
			};
			j.accentUnder = function (e, t) {
				var r = P(e.value.base, t);
				var a = y.default.svgSpan(e, t);
				var n = /tilde/.test(e.value.label) ? .12 : 0;
				var i = f.default.makeVList({
					positionType: "bottom",
					positionData: a.height + n,
					children: [{
						type: "elem",
						elem: a
					}, {
						type: "kern",
						size: n
					}, {
						type: "elem",
						elem: r
					}]
				}, t);
				i.children[0].children[0].children[0].classes.push("svg-align");
				return w(["mord", "accentunder"], [i], t)
			};
			j.enclose = function (e, t) {
				var r = P(e.value.body, t);
				var a = e.value.label.substr(1);
				var n = t.sizeMultiplier;
				var i = void 0;
				var l = 0;
				var u = /color/.test(a);
				if (a === "sout") {
					i = w(["stretchy", "sout"]);
					i.height = t.fontMetrics().defaultRuleThickness / n;
					l = -.5 * t.fontMetrics().xHeight
				} else {
					r.classes.push(/cancel/.test(a) ? "cancel-pad" : "boxpad");
					var o = 0;
					if (/box/.test(a)) {
						o = a === "colorbox" ? .3 : .34
					} else {
						o = N(e.value.body) ? .2 : 0
					}
					i = y.default.encloseSpan(r, a, o, t);
					l = r.depth + o;
					if (u) {
						i.style.backgroundColor = e.value.backgroundColor.value;
						if (a === "fcolorbox") {
							i.style.borderColor = e.value.borderColor.value
						}
					}
				}
				var s = void 0;
				if (u) {
					s = f.default.makeVList({
						positionType: "individualShift",
						children: [{
							type: "elem",
							elem: i,
							shift: l
						}, {
							type: "elem",
							elem: r,
							shift: 0
						}]
					}, t)
				} else {
					s = f.default.makeVList({
						positionType: "individualShift",
						children: [{
							type: "elem",
							elem: r,
							shift: 0
						}, {
							type: "elem",
							elem: i,
							shift: l
						}]
					}, t)
				}
				if (/cancel/.test(a)) {
					s.children[0].children[0].children[1].classes.push("svg-align");
					return w(["mord", "cancel-lap"], [s], t)
				} else {
					return w(["mord"], [s], t)
				}
			};
			j.xArrow = function (e, t) {
				var r = t.style;
				var a = t.havingStyle(r.sup());
				var n = P(e.value.body, a, t);
				n.classes.push("x-arrow-pad");
				var i = void 0;
				if (e.value.below) {
					a = t.havingStyle(r.sub());
					i = P(e.value.below, a, t);
					i.classes.push("x-arrow-pad")
				}
				var l = y.default.svgSpan(e, t);
				var u = -t.fontMetrics().axisHeight + .5 * l.height;
				var o = -t.fontMetrics().axisHeight - .5 * l.height - .111;
				var s = void 0;
				if (e.value.below) {
					var d = -t.fontMetrics().axisHeight + i.height + .5 * l.height + .111;
					s = f.default.makeVList({
						positionType: "individualShift",
						children: [{
							type: "elem",
							elem: n,
							shift: o
						}, {
							type: "elem",
							elem: l,
							shift: u
						}, {
							type: "elem",
							elem: i,
							shift: d
						}]
					}, t)
				} else {
					s = f.default.makeVList({
						positionType: "individualShift",
						children: [{
							type: "elem",
							elem: n,
							shift: o
						}, {
							type: "elem",
							elem: l,
							shift: u
						}]
					}, t)
				}
				s.children[0].children[0].children[1].classes.push("svg-align");
				return w(["mrel", "x-arrow"], [s], t)
			};
			j.mclass = function (e, t) {
				var r = T(e.value.value, t, true);
				return w([e.value.mclass], r, t)
			};
			j.raisebox = function (e, t) {
				var r = j.sizing({
					value: {
						value: [{
							type: "text",
							value: {
								body: e.value.value,
								font: "mathrm"
							}
						}],
						size: 6
					}
				}, t);
				var a = (0, p.calculateSize)(e.value.dy.value, t);
				return f.default.makeVList({
					positionType: "shift",
					positionData: -a,
					children: [{
						type: "elem",
						elem: r
					}]
				}, t)
			};
			var P = r.buildGroup = function e(t, r, a) {
				if (!t) {
					return w()
				}
				if (j[t.type]) {
					var n = j[t.type](t, r);
					if (a && r.size !== a.size) {
						n = w(r.sizingClasses(a), [n], r);
						var i = r.sizeMultiplier / a.sizeMultiplier;
						n.height *= i;
						n.depth *= i
					}
					return n
				} else {
					throw new l.default("Got group of unknown type: '" + t.type + "'")
				}
			};

			function B(e, t) {
				e = JSON.parse((0, n.default)(e));
				var r = T(e, t, true);
				var a = w(["base"], r, t);
				var i = w(["strut"]);
				var l = w(["strut", "bottom"]);
				i.style.height = a.height + "em";
				l.style.height = a.height + a.depth + "em";
				l.style.verticalAlign = -a.depth + "em";
				var u = w(["katex-html"], [i, l, a]);
				u.setAttribute("aria-hidden", "true");
				return u
			}
		}, {
			"./ParseError": 84,
			"./Style": 89,
			"./buildCommon": 91,
			"./delimiter": 97,
			"./domTree": 98,
			"./stretchy": 118,
			"./units": 122,
			"./utils": 123,
			"babel-runtime/core-js/json/stringify": 5
		}],
		93: [function (e, t, r) {
			"use strict";
			Object.defineProperty(r, "__esModule", {
				value: true
			});
			r.buildGroup = r.buildExpression = r.groupTypes = r.makeText = undefined;
			r.default = z;
			var a = e("./buildCommon");
			var n = y(a);
			var i = e("./fontMetrics");
			var l = y(i);
			var u = e("./mathMLTree");
			var o = y(u);
			var s = e("./ParseError");
			var f = y(s);
			var d = e("./Style");
			var c = y(d);
			var v = e("./symbols");
			var h = y(v);
			var p = e("./utils");
			var m = y(p);
			var g = e("./stretchy");
			var b = y(g);

			function y(e) {
				return e && e.__esModule ? e : {
					default: e
				}
			}
			var x = r.makeText = function e(t, r) {
				if (h.default[r][t] && h.default[r][t].replace) {
					t = h.default[r][t].replace
				}
				return new o.default.TextNode(t)
			};
			var w = function e(t, r) {
				var a = r.font;
				if (!a) {
					return null
				}
				var i = t.mode;
				if (a === "mathit") {
					return "italic"
				}
				var u = t.value;
				if (m.default.contains(["\\imath", "\\jmath"], u)) {
					return null
				}
				if (h.default[i][u] && h.default[i][u].replace) {
					u = h.default[i][u].replace
				}
				var o = n.default.fontMap[a].fontName;
				if (l.default.getCharacterMetrics(u, o)) {
					return n.default.fontMap[r.font].variant
				}
				return null
			};
			var k = r.groupTypes = {};
			var M = {
				mi: "italic",
				mn: "normal",
				mtext: "normal"
			};
			k.mathord = function (e, t) {
				var r = new o.default.MathNode("mi", [x(e.value, e.mode)]);
				var a = w(e, t) || "italic";
				if (a !== M[r.type]) {
					r.setAttribute("mathvariant", a)
				}
				return r
			};
			k.textord = function (e, t) {
				var r = x(e.value, e.mode);
				var a = w(e, t) || "normal";
				var n = void 0;
				if (e.mode === "text") {
					n = new o.default.MathNode("mtext", [r])
				} else if (/[0-9]/.test(e.value)) {
					n = new o.default.MathNode("mn", [r])
				} else if (e.value === "\\prime") {
					n = new o.default.MathNode("mo", [r])
				} else {
					n = new o.default.MathNode("mi", [r])
				}
				if (a !== M[n.type]) {
					n.setAttribute("mathvariant", a)
				}
				return n
			};
			k.bin = function (e) {
				var t = new o.default.MathNode("mo", [x(e.value, e.mode)]);
				return t
			};
			k.rel = function (e) {
				var t = new o.default.MathNode("mo", [x(e.value, e.mode)]);
				return t
			};
			k.open = function (e) {
				var t = new o.default.MathNode("mo", [x(e.value, e.mode)]);
				return t
			};
			k.close = function (e) {
				var t = new o.default.MathNode("mo", [x(e.value, e.mode)]);
				return t
			};
			k.inner = function (e) {
				var t = new o.default.MathNode("mo", [x(e.value, e.mode)]);
				return t
			};
			k.punct = function (e) {
				var t = new o.default.MathNode("mo", [x(e.value, e.mode)]);
				t.setAttribute("separator", "true");
				return t
			};
			k.ordgroup = function (e, t) {
				var r = _(e.value, t);
				var a = new o.default.MathNode("mrow", r);
				return a
			};
			k.text = function (e, t) {
				var r = e.value.body;
				var a = [];
				var n = null;
				for (var i = 0; i < r.length; i++) {
					var l = S(r[i], t);
					if (l.type === "mtext" && n != null) {
						Array.prototype.push.apply(n.children, l.children)
					} else {
						a.push(l);
						if (l.type === "mtext") {
							n = l
						}
					}
				}
				if (a.length === 1) {
					return a[0]
				} else {
					return new o.default.MathNode("mrow", a)
				}
			};
			k.color = function (e, t) {
				var r = _(e.value.value, t);
				var a = new o.default.MathNode("mstyle", r);
				a.setAttribute("mathcolor", e.value.color);
				return a
			};
			k.supsub = function (e, t) {
				var r = false;
				var a = void 0;
				var n = void 0;
				if (e.value.base) {
					if (e.value.base.value.type === "horizBrace") {
						n = e.value.sup ? true : false;
						if (n === e.value.base.value.isOver) {
							r = true;
							a = e.value.base.value.isOver
						}
					}
				}
				var i = true;
				var l = [S(e.value.base, t, i)];
				if (e.value.sub) {
					l.push(S(e.value.sub, t, i))
				}
				if (e.value.sup) {
					l.push(S(e.value.sup, t, i))
				}
				var u = void 0;
				if (r) {
					u = a ? "mover" : "munder"
				} else if (!e.value.sub) {
					u = "msup"
				} else if (!e.value.sup) {
					u = "msub"
				} else {
					var s = e.value.base;
					if (s && s.value.limits && t.style === c.default.DISPLAY) {
						u = "munderover"
					} else {
						u = "msubsup"
					}
				}
				var f = new o.default.MathNode(u, l);
				return f
			};
			k.sqrt = function (e, t) {
				var r = void 0;
				if (e.value.index) {
					r = new o.default.MathNode("mroot", [S(e.value.body, t), S(e.value.index, t)])
				} else {
					r = new o.default.MathNode("msqrt", [S(e.value.body, t)])
				}
				return r
			};
			k.accent = function (e, t) {
				var r = void 0;
				if (e.value.isStretchy) {
					r = b.default.mathMLnode(e.value.label)
				} else {
					r = new o.default.MathNode("mo", [x(e.value.label, e.mode)])
				}
				var a = new o.default.MathNode("mover", [S(e.value.base, t), r]);
				a.setAttribute("accent", "true");
				return a
			};
			k.spacing = function (e) {
				var t = void 0;
				if (e.value === "\\ " || e.value === "\\space" || e.value === " " || e.value === "~") {
					t = new o.default.MathNode("mtext", [new o.default.TextNode("\xa0")])
				} else {
					t = new o.default.MathNode("mspace");
					t.setAttribute("width", n.default.spacingFunctions[e.value].size)
				}
				return t
			};
			k.font = function (e, t) {
				var r = e.value.font;
				return S(e.value.body, t.withFont(r))
			};
			k.styling = function (e, t) {
				var r = {
					display: c.default.DISPLAY,
					text: c.default.TEXT,
					script: c.default.SCRIPT,
					scriptscript: c.default.SCRIPTSCRIPT
				};
				var a = r[e.value.style];
				var n = t.havingStyle(a);
				var i = _(e.value.value, n);
				var l = new o.default.MathNode("mstyle", i);
				var u = {
					display: ["0", "true"],
					text: ["0", "false"],
					script: ["1", "false"],
					scriptscript: ["2", "false"]
				};
				var s = u[e.value.style];
				l.setAttribute("scriptlevel", s[0]);
				l.setAttribute("displaystyle", s[1]);
				return l
			};
			k.sizing = function (e, t) {
				var r = t.havingSize(e.value.size);
				var a = _(e.value.value, r);
				var n = new o.default.MathNode("mstyle", a);
				n.setAttribute("mathsize", r.sizeMultiplier + "em");
				return n
			};
			k.verb = function (e, t) {
				var r = new o.default.TextNode(n.default.makeVerb(e, t));
				var a = new o.default.MathNode("mtext", [r]);
				a.setAttribute("mathvariant", n.default.fontMap["mathtt"].variant);
				return a
			};
			k.overline = function (e, t) {
				var r = new o.default.MathNode("mo", [new o.default.TextNode("\u203e")]);
				r.setAttribute("stretchy", "true");
				var a = new o.default.MathNode("mover", [S(e.value.body, t), r]);
				a.setAttribute("accent", "true");
				return a
			};
			k.underline = function (e, t) {
				var r = new o.default.MathNode("mo", [new o.default.TextNode("\u203e")]);
				r.setAttribute("stretchy", "true");
				var a = new o.default.MathNode("munder", [S(e.value.body, t), r]);
				a.setAttribute("accentunder", "true");
				return a
			};
			k.accentUnder = function (e, t) {
				var r = b.default.mathMLnode(e.value.label);
				var a = new o.default.MathNode("munder", [S(e.value.body, t), r]);
				a.setAttribute("accentunder", "true");
				return a
			};
			k.enclose = function (e, t) {
				var r = new o.default.MathNode("menclose", [S(e.value.body, t)]);
				switch (e.value.label) {
					case "\\cancel":
						r.setAttribute("notation", "updiagonalstrike");
						break;
					case "\\bcancel":
						r.setAttribute("notation", "downdiagonalstrike");
						break;
					case "\\sout":
						r.setAttribute("notation", "horizontalstrike");
						break;
					case "\\fbox":
						r.setAttribute("notation", "box");
						break;
					case "\\colorbox":
						r.setAttribute("mathbackground", e.value.backgroundColor.value);
						break;
					case "\\fcolorbox":
						r.setAttribute("mathbackground", e.value.backgroundColor.value);
						r.setAttribute("notation", "box");
						break;
					default:
						r.setAttribute("notation", "updiagonalstrike downdiagonalstrike")
				}
				return r
			};
			k.horizBrace = function (e, t) {
				var r = b.default.mathMLnode(e.value.label);
				return new o.default.MathNode(e.value.isOver ? "mover" : "munder", [S(e.value.base, t), r])
			};
			k.xArrow = function (e, t) {
				var r = b.default.mathMLnode(e.value.label);
				var a = void 0;
				var n = void 0;
				if (e.value.body) {
					var i = S(e.value.body, t);
					if (e.value.below) {
						n = S(e.value.below, t);
						a = new o.default.MathNode("munderover", [r, n, i])
					} else {
						a = new o.default.MathNode("mover", [r, i])
					}
				} else if (e.value.below) {
					n = S(e.value.below, t);
					a = new o.default.MathNode("munder", [r, n])
				} else {
					a = new o.default.MathNode("mover", [r])
				}
				return a
			};
			k.rule = function (e) {
				var t = new o.default.MathNode("mrow");
				return t
			};
			k.kern = function (e) {
				var t = new o.default.MathNode("mrow");
				return t
			};
			k.mclass = function (e, t) {
				var r = _(e.value.value, t);
				return new o.default.MathNode("mstyle", r)
			};
			k.raisebox = function (e, t) {
				var r = new o.default.MathNode("mpadded", [S(e.value.body, t)]);
				var a = e.value.dy.value.number + e.value.dy.value.unit;
				r.setAttribute("voffset", a);
				return r
			};
			var _ = r.buildExpression = function e(t, r) {
				var a = [];
				for (var n = 0; n < t.length; n++) {
					var i = t[n];
					a.push(S(i, r))
				}
				return a
			};
			var S = r.buildGroup = function e(t, r) {
				var a = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
				if (!t) {
					return new o.default.MathNode("mrow")
				}
				if (k[t.type]) {
					var n = k[t.type](t, r);
					if (a) {
						if (n.type === "mrow" && n.children.length === 1) {
							return n.children[0]
						}
					}
					return n
				} else {
					throw new f.default("Got group of unknown type: '" + t.type + "'")
				}
			};

			function z(e, t, r) {
				var a = _(e, r);
				var i = new o.default.MathNode("mrow", a);
				var l = new o.default.MathNode("annotation", [new o.default.TextNode(t)]);
				l.setAttribute("encoding", "application/x-tex");
				var u = new o.default.MathNode("semantics", [i, l]);
				var s = new o.default.MathNode("math", [u]);
				return n.default.makeSpan(["katex-mathml"], [s])
			}
		}, {
			"./ParseError": 84,
			"./Style": 89,
			"./buildCommon": 91,
			"./fontMetrics": 101,
			"./mathMLTree": 116,
			"./stretchy": 118,
			"./symbols": 120,
			"./utils": 123
		}],
		94: [function (e, t, r) {
			"use strict";
			Object.defineProperty(r, "__esModule", {
				value: true
			});
			var a = e("./buildHTML");
			var n = p(a);
			var i = e("./buildMathML");
			var l = p(i);
			var u = e("./buildCommon");
			var o = p(u);
			var s = e("./Options");
			var f = p(s);
			var d = e("./Settings");
			var c = p(d);
			var v = e("./Style");
			var h = p(v);

			function p(e) {
				return e && e.__esModule ? e : {
					default: e
				}
			}
			var m = function e(t, r, a) {
				a = a || new c.default({});
				var i = h.default.TEXT;
				if (a.displayMode) {
					i = h.default.DISPLAY
				}
				var u = new f.default({
					style: i,
					maxSize: a.maxSize
				});
				var s = (0, l.default)(t, r, u);
				var d = (0, n.default)(t, u);
				var v = o.default.makeSpan(["katex"], [s, d]);
				if (a.displayMode) {
					return o.default.makeSpan(["katex-display"], [v])
				} else {
					return v
				}
			};
			r.default = m
		}, {
			"./Options": 83,
			"./Settings": 87,
			"./Style": 89,
			"./buildCommon": 91,
			"./buildHTML": 92,
			"./buildMathML": 93
		}],
		95: [function (e, t, r) {
			"use strict";
			Object.defineProperty(r, "__esModule", {
				value: true
			});
			r._environments = undefined;
			r.default = d;
			var a = e("./buildHTML");
			var n = e("./buildMathML");
			var i = e("./Options");
			var l = s(i);
			var u = e("./ParseNode");
			var o = s(u);

			function s(e) {
				return e && e.__esModule ? e : {
					default: e
				}
			}
			var f = r._environments = {};

			function d(e) {
				var t = e.type,
					r = e.names,
					i = e.props,
					l = e.handler,
					u = e.htmlBuilder,
					o = e.mathmlBuilder;
				var s = {
					numArgs: i.numArgs || 0,
					greediness: 1,
					allowedInText: false,
					numOptionalArgs: 0,
					handler: l
				};
				for (var d = 0; d < r.length; ++d) {
					f[r[d]] = s
				}
				if (u) {
					a.groupTypes[t] = u
				}
				if (o) {
					n.groupTypes[t] = o
				}
			}
		}, {
			"./Options": 83,
			"./ParseNode": 85,
			"./buildHTML": 92,
			"./buildMathML": 93
		}],
		96: [function (e, t, r) {
			"use strict";
			Object.defineProperty(r, "__esModule", {
				value: true
			});
			r.ordargument = r._functions = undefined;
			r.default = l;
			var a = e("./buildHTML");
			var n = e("./buildMathML");
			var i = r._functions = {};

			function l(e) {
				var t = e.type,
					r = e.names,
					l = e.props,
					u = e.handler,
					o = e.htmlBuilder,
					s = e.mathmlBuilder;
				var f = {
					numArgs: l.numArgs,
					argTypes: l.argTypes,
					greediness: l.greediness === undefined ? 1 : l.greediness,
					allowedInText: !!l.allowedInText,
					allowedInMath: l.allowedInMath === undefined ? true : l.allowedInMath,
					numOptionalArgs: l.numOptionalArgs || 0,
					infix: !!l.infix,
					handler: u
				};
				for (var d = 0; d < r.length; ++d) {
					i[r[d]] = f
				}
				if (t) {
					if (o) {
						a.groupTypes[t] = o
					}
					if (s) {
						n.groupTypes[t] = s
					}
				}
			}
			var u = r.ordargument = function e(t) {
				if (t.type === "ordgroup") {
					return t.value
				} else {
					return [t]
				}
			}
		}, {
			"./buildHTML": 92,
			"./buildMathML": 93
		}],
		97: [function (e, t, r) {
			"use strict";
			Object.defineProperty(r, "__esModule", {
				value: true
			});
			var a = e("./ParseError");
			var n = g(a);
			var i = e("./Style");
			var l = g(i);
			var u = e("./domTree");
			var o = g(u);
			var s = e("./buildCommon");
			var f = g(s);
			var d = e("./fontMetrics");
			var c = g(d);
			var v = e("./symbols");
			var h = g(v);
			var p = e("./utils");
			var m = g(p);

			function g(e) {
				return e && e.__esModule ? e : {
					default: e
				}
			}
			var b = function e(t, r) {
				if (h.default.math[t] && h.default.math[t].replace) {
					return c.default.getCharacterMetrics(h.default.math[t].replace, r)
				} else {
					return c.default.getCharacterMetrics(t, r)
				}
			};
			var y = function e(t, r, a, n) {
				var i = a.havingBaseStyle(r);
				var l = f.default.makeSpan((n || []).concat(i.sizingClasses(a)), [t], a);
				l.delimSizeMultiplier = i.sizeMultiplier / a.sizeMultiplier;
				l.height *= l.delimSizeMultiplier;
				l.depth *= l.delimSizeMultiplier;
				l.maxFontSize = i.sizeMultiplier;
				return l
			};
			var x = function e(t, r, a) {
				var n = r.havingBaseStyle(a);
				var i = (1 - r.sizeMultiplier / n.sizeMultiplier) * r.fontMetrics().axisHeight;
				t.classes.push("delimcenter");
				t.style.top = i + "em";
				t.height -= i;
				t.depth += i
			};
			var w = function e(t, r, a, n, i, l) {
				var u = f.default.makeSymbol(t, "Main-Regular", i, n);
				var o = y(u, r, n, l);
				if (a) {
					x(o, n, r)
				}
				return o
			};
			var k = function e(t, r, a, n) {
				return f.default.makeSymbol(t, "Size" + r + "-Regular", a, n)
			};
			var M = function e(t, r, a, n, i, u) {
				var o = k(t, r, i, n);
				var s = y(f.default.makeSpan(["delimsizing", "size" + r], [o], n), l.default.TEXT, n, u);
				if (a) {
					x(s, n, l.default.TEXT)
				}
				return s
			};
			var _ = function e(t, r, a) {
				var n = void 0;
				if (r === "Size1-Regular") {
					n = "delim-size1"
				} else if (r === "Size4-Regular") {
					n = "delim-size4"
				}
				var i = f.default.makeSpan(["delimsizinginner", n], [f.default.makeSpan([], [f.default.makeSymbol(t, r, a)])]);
				return {
					type: "elem",
					elem: i
				}
			};
			var S = function e(t, r, a, n, i, u) {
				var o = void 0;
				var s = void 0;
				var d = void 0;
				var c = void 0;
				o = d = c = t;
				s = null;
				var v = "Size1-Regular";
				if (t === "\\uparrow") {
					d = c = "\u23d0"
				} else if (t === "\\Uparrow") {
					d = c = "\u2016"
				} else if (t === "\\downarrow") {
					o = d = "\u23d0"
				} else if (t === "\\Downarrow") {
					o = d = "\u2016"
				} else if (t === "\\updownarrow") {
					o = "\\uparrow";
					d = "\u23d0";
					c = "\\downarrow"
				} else if (t === "\\Updownarrow") {
					o = "\\Uparrow";
					d = "\u2016";
					c = "\\Downarrow"
				} else if (t === "[" || t === "\\lbrack") {
					o = "\u23a1";
					d = "\u23a2";
					c = "\u23a3";
					v = "Size4-Regular"
				} else if (t === "]" || t === "\\rbrack") {
					o = "\u23a4";
					d = "\u23a5";
					c = "\u23a6";
					v = "Size4-Regular"
				} else if (t === "\\lfloor") {
					d = o = "\u23a2";
					c = "\u23a3";
					v = "Size4-Regular"
				} else if (t === "\\lceil") {
					o = "\u23a1";
					d = c = "\u23a2";
					v = "Size4-Regular"
				} else if (t === "\\rfloor") {
					d = o = "\u23a5";
					c = "\u23a6";
					v = "Size4-Regular"
				} else if (t === "\\rceil") {
					o = "\u23a4";
					d = c = "\u23a5";
					v = "Size4-Regular"
				} else if (t === "(") {
					o = "\u239b";
					d = "\u239c";
					c = "\u239d";
					v = "Size4-Regular"
				} else if (t === ")") {
					o = "\u239e";
					d = "\u239f";
					c = "\u23a0";
					v = "Size4-Regular"
				} else if (t === "\\{" || t === "\\lbrace") {
					o = "\u23a7";
					s = "\u23a8";
					c = "\u23a9";
					d = "\u23aa";
					v = "Size4-Regular"
				} else if (t === "\\}" || t === "\\rbrace") {
					o = "\u23ab";
					s = "\u23ac";
					c = "\u23ad";
					d = "\u23aa";
					v = "Size4-Regular"
				} else if (t === "\\lgroup") {
					o = "\u23a7";
					c = "\u23a9";
					d = "\u23aa";
					v = "Size4-Regular"
				} else if (t === "\\rgroup") {
					o = "\u23ab";
					c = "\u23ad";
					d = "\u23aa";
					v = "Size4-Regular"
				} else if (t === "\\lmoustache") {
					o = "\u23a7";
					c = "\u23ad";
					d = "\u23aa";
					v = "Size4-Regular"
				} else if (t === "\\rmoustache") {
					o = "\u23ab";
					c = "\u23a9";
					d = "\u23aa";
					v = "Size4-Regular"
				}
				var h = b(o, v);
				var p = h.height + h.depth;
				var m = b(d, v);
				var g = m.height + m.depth;
				var x = b(c, v);
				var w = x.height + x.depth;
				var k = 0;
				var M = 1;
				if (s !== null) {
					var S = b(s, v);
					k = S.height + S.depth;
					M = 2
				}
				var z = p + w + k;
				var T = Math.ceil((r - z) / (M * g));
				var C = z + T * M * g;
				var A = n.fontMetrics().axisHeight;
				if (a) {
					A *= n.sizeMultiplier
				}
				var O = C / 2 - A;
				var N = [];
				N.push(_(c, v, i));
				if (s === null) {
					for (var L = 0; L < T; L++) {
						N.push(_(d, v, i))
					}
				} else {
					for (var j = 0; j < T; j++) {
						N.push(_(d, v, i))
					}
					N.push(_(s, v, i));
					for (var E = 0; E < T; E++) {
						N.push(_(d, v, i))
					}
				}
				N.push(_(o, v, i));
				var q = n.havingBaseStyle(l.default.TEXT);
				var P = f.default.makeVList({
					positionType: "bottom",
					positionData: O,
					children: N
				}, q);
				return y(f.default.makeSpan(["delimsizing", "mult"], [P], q), l.default.TEXT, n, u)
			};
			var z = function e(t, r, a, n) {
				var i = void 0;
				if (t === "sqrtTall") {
					var l = a - 54;
					i = "M702 0H400000v40H742v" + l + "l-4 4-4 4c-.667.667\n-2 1.5-4 2.5s-4.167 1.833-6.5 2.5-5.5 1-9.5 1h-12l-28-84c-16.667-52-96.667\n-294.333-240-727l-212 -643 -85 170c-4-3.333-8.333-7.667-13 -13l-13-13l77-155\n 77-156c66 199.333 139 419.667 219 661 l218 661zM702 0H400000v40H742z"
				}
				var u = new o.default.pathNode(t, i);
				var s = new o.default.svgNode([u], {
					width: "400em",
					height: r + "em",
					viewBox: "0 0 400000 " + a,
					preserveAspectRatio: "xMinYMin slice"
				});
				return f.default.makeSpan(["hide-tail"], [s], n)
			};
			var T = function e(t, r, a) {
				var n = void 0;
				var i = a.sizeMultiplier;
				var l = void 0;
				var u = void 0;
				if (r.type === "small") {
					u = 1e3;
					var o = a.havingBaseStyle(r.style);
					i = o.sizeMultiplier / a.sizeMultiplier;
					l = 1 * i;
					n = z("sqrtMain", l, u, a);
					n.style.minWidth = "0.853em";
					n.advanceWidth = .833 * i
				} else if (r.type === "large") {
					u = 1e3 * N[r.size];
					l = N[r.size] / i;
					n = z("sqrtSize" + r.size, l, u, a);
					n.style.minWidth = "1.02em";
					n.advanceWidth = 1 / i
				} else {
					l = t / i;
					u = Math.floor(1e3 * t);
					n = z("sqrtTall", l, u, a);
					n.style.minWidth = "0.742em";
					n.advanceWidth = 1.056 / i
				}
				n.height = l;
				n.style.height = l + "em";
				n.sizeMultiplier = i;
				return n
			};
			var C = ["(", ")", "[", "\\lbrack", "]", "\\rbrack", "\\{", "\\lbrace", "\\}", "\\rbrace", "\\lfloor", "\\rfloor", "\\lceil", "\\rceil", "\\surd"];
			var A = ["\\uparrow", "\\downarrow", "\\updownarrow", "\\Uparrow", "\\Downarrow", "\\Updownarrow", "|", "\\|", "\\vert", "\\Vert", "\\lvert", "\\rvert", "\\lVert", "\\rVert", "\\lgroup", "\\rgroup", "\\lmoustache", "\\rmoustache"];
			var O = ["<", ">", "\\langle", "\\rangle", "/", "\\backslash", "\\lt", "\\gt"];
			var N = [0, 1.2, 1.8, 2.4, 3];
			var L = function e(t, r, a, i, l) {
				if (t === "<" || t === "\\lt") {
					t = "\\langle"
				} else if (t === ">" || t === "\\gt") {
					t = "\\rangle"
				}
				if (m.default.contains(C, t) || m.default.contains(O, t)) {
					return M(t, r, false, a, i, l)
				} else if (m.default.contains(A, t)) {
					return S(t, N[r], false, a, i, l)
				} else {
					throw new n.default("Illegal delimiter: '" + t + "'")
				}
			};
			var j = [{
				type: "small",
				style: l.default.SCRIPTSCRIPT
			}, {
				type: "small",
				style: l.default.SCRIPT
			}, {
				type: "small",
				style: l.default.TEXT
			}, {
				type: "large",
				size: 1
			}, {
				type: "large",
				size: 2
			}, {
				type: "large",
				size: 3
			}, {
				type: "large",
				size: 4
			}];
			var E = [{
				type: "small",
				style: l.default.SCRIPTSCRIPT
			}, {
				type: "small",
				style: l.default.SCRIPT
			}, {
				type: "small",
				style: l.default.TEXT
			}, {
				type: "stack"
			}];
			var q = [{
				type: "small",
				style: l.default.SCRIPTSCRIPT
			}, {
				type: "small",
				style: l.default.SCRIPT
			}, {
				type: "small",
				style: l.default.TEXT
			}, {
				type: "large",
				size: 1
			}, {
				type: "large",
				size: 2
			}, {
				type: "large",
				size: 3
			}, {
				type: "large",
				size: 4
			}, {
				type: "stack"
			}];
			var P = function e(t) {
				if (t.type === "small") {
					return "Main-Regular"
				} else if (t.type === "large") {
					return "Size" + t.size + "-Regular"
				} else if (t.type === "stack") {
					return "Size4-Regular"
				}
			};
			var B = function e(t, r, a, n) {
				var i = Math.min(2, 3 - n.style.size);
				for (var l = i; l < a.length; l++) {
					if (a[l].type === "stack") {
						break
					}
					var u = b(t, P(a[l]));
					var o = u.height + u.depth;
					if (a[l].type === "small") {
						var s = n.havingBaseStyle(a[l].style);
						o *= s.sizeMultiplier
					}
					if (o > r) {
						return a[l]
					}
				}
				return a[a.length - 1]
			};
			var R = function e(t, r, a, n, i, l) {
				if (t === "<" || t === "\\lt") {
					t = "\\langle"
				} else if (t === ">" || t === "\\gt") {
					t = "\\rangle"
				}
				var u = void 0;
				if (m.default.contains(O, t)) {
					u = j
				} else if (m.default.contains(C, t)) {
					u = q
				} else {
					u = E
				}
				var o = B(t, r, u, n);
				if (t === "\\surd") {
					return T(r, o, n)
				} else {
					if (o.type === "small") {
						return w(t, o.style, a, n, i, l)
					} else if (o.type === "large") {
						return M(t, o.size, a, n, i, l)
					} else if (o.type === "stack") {
						return S(t, r, a, n, i, l)
					}
				}
			};
			var D = function e(t, r, a, n, i, l) {
				var u = n.fontMetrics().axisHeight * n.sizeMultiplier;
				var o = 901;
				var s = 5 / n.fontMetrics().ptPerEm;
				var f = Math.max(r - u, a + u);
				var d = Math.max(f / 500 * o, 2 * f - s);
				return R(t, d, true, n, i, l)
			};
			r.default = {
				sizedDelim: L,
				customSizedDelim: R,
				leftRightDelim: D
			}
		}, {
			"./ParseError": 84,
			"./Style": 89,
			"./buildCommon": 91,
			"./domTree": 98,
			"./fontMetrics": 101,
			"./symbols": 120,
			"./utils": 123
		}],
		98: [function (e, t, r) {
			"use strict";
			Object.defineProperty(r, "__esModule", {
				value: true
			});
			var a = e("babel-runtime/core-js/get-iterator");
			var n = h(a);
			var i = e("babel-runtime/helpers/classCallCheck");
			var l = h(i);
			var u = e("babel-runtime/helpers/createClass");
			var o = h(u);
			var s = e("./unicodeRegexes");
			var f = e("./utils");
			var d = h(f);
			var c = e("./svgGeometry");
			var v = h(c);

			function h(e) {
				return e && e.__esModule ? e : {
					default: e
				}
			}
			var p = function e(t) {
				t = t.slice();
				for (var r = t.length - 1; r >= 0; r--) {
					if (!t[r]) {
						t.splice(r, 1)
					}
				}
				return t.join(" ")
			};
			var m = function () {
				function e(t, r, a) {
					(0, l.default)(this, e);
					this.classes = t || [];
					this.children = r || [];
					this.height = 0;
					this.depth = 0;
					this.maxFontSize = 0;
					this.style = {};
					this.attributes = {};
					if (a) {
						if (a.style.isTight()) {
							this.classes.push("mtight")
						}
						var n = a.getColor();
						if (n) {
							this.style.color = n
						}
					}
				}(0, o.default)(e, [{
					key: "setAttribute",
					value: function e(t, r) {
						this.attributes[t] = r
					}
				}, {
					key: "tryCombine",
					value: function e(t) {
						return false
					}
				}, {
					key: "toNode",
					value: function e() {
						var t = document.createElement("span");
						t.className = p(this.classes);
						for (var r in this.style) {
							if (Object.prototype.hasOwnProperty.call(this.style, r)) {
								t.style[r] = this.style[r]
							}
						}
						for (var a in this.attributes) {
							if (Object.prototype.hasOwnProperty.call(this.attributes, a)) {
								t.setAttribute(a, this.attributes[a])
							}
						}
						for (var n = 0; n < this.children.length; n++) {
							t.appendChild(this.children[n].toNode())
						}
						return t
					}
				}, {
					key: "toMarkup",
					value: function e() {
						var t = "<span";
						if (this.classes.length) {
							t += ' class="';
							t += d.default.escape(p(this.classes));
							t += '"'
						}
						var r = "";
						for (var a in this.style) {
							if (this.style.hasOwnProperty(a)) {
								r += d.default.hyphenate(a) + ":" + this.style[a] + ";"
							}
						}
						if (r) {
							t += ' style="' + d.default.escape(r) + '"'
						}
						for (var n in this.attributes) {
							if (Object.prototype.hasOwnProperty.call(this.attributes, n)) {
								t += " " + n + '="';
								t += d.default.escape(this.attributes[n]);
								t += '"'
							}
						}
						t += ">";
						for (var i = 0; i < this.children.length; i++) {
							t += this.children[i].toMarkup()
						}
						t += "</span>";
						return t
					}
				}]);
				return e
			}();
			var g = function () {
				function e(t, r, a, n) {
					(0, l.default)(this, e);
					this.href = t;
					this.classes = r;
					this.children = a;
					this.height = 0;
					this.depth = 0;
					this.maxFontSize = 0;
					this.style = {};
					this.attributes = {};
					if (n.style.isTight()) {
						this.classes.push("mtight")
					}
					var i = n.getColor();
					if (i) {
						this.style.color = i
					}
				}(0, o.default)(e, [{
					key: "setAttribute",
					value: function e(t, r) {
						this.attributes[t] = r
					}
				}, {
					key: "tryCombine",
					value: function e(t) {
						return false
					}
				}, {
					key: "toNode",
					value: function e() {
						var t = document.createElement("a");
						t.setAttribute("href", this.href);
						if (this.classes.length) {
							t.className = p(this.classes)
						}
						for (var r in this.style) {
							if (Object.prototype.hasOwnProperty.call(this.style, r)) {
								t.style[r] = this.style[r]
							}
						}
						for (var a in this.attributes) {
							if (Object.prototype.hasOwnProperty.call(this.attributes, a)) {
								t.setAttribute(a, this.attributes[a])
							}
						}
						for (var n = 0; n < this.children.length; n++) {
							t.appendChild(this.children[n].toNode())
						}
						return t
					}
				}, {
					key: "toMarkup",
					value: function e() {
						var t = "<a";
						t += 'href="' + (t += d.default.escape(this.href)) + '"';
						if (this.classes.length) {
							t += ' class="' + d.default.escape(p(this.classes)) + '"'
						}
						var r = "";
						for (var a in this.style) {
							if (this.style.hasOwnProperty(a)) {
								r += d.default.hyphenate(a) + ":" + this.style[a] + ";"
							}
						}
						if (r) {
							t += ' style="' + d.default.escape(r) + '"'
						}
						for (var i in this.attributes) {
							if (i !== "href" && Object.prototype.hasOwnProperty.call(this.attributes, i)) {
								t += " " + i + '="' + d.default.escape(this.attributes[i]) + '"'
							}
						}
						t += ">";
						var l = true;
						var u = false;
						var o = undefined;
						try {
							for (var s = (0, n.default)(this.children), f; !(l = (f = s.next()).done); l = true) {
								var c = f.value;
								t += c.toMarkup()
							}
						} catch (e) {
							u = true;
							o = e
						} finally {
							try {
								if (!l && s.return) {
									s.return()
								}
							} finally {
								if (u) {
									throw o
								}
							}
						}
						t += "</a>";
						return t
					}
				}]);
				return e
			}();
			var b = function () {
				function e(t) {
					(0, l.default)(this, e);
					this.children = t || [];
					this.height = 0;
					this.depth = 0;
					this.maxFontSize = 0
				}(0, o.default)(e, [{
					key: "toNode",
					value: function e() {
						var t = document.createDocumentFragment();
						for (var r = 0; r < this.children.length; r++) {
							t.appendChild(this.children[r].toNode())
						}
						return t
					}
				}, {
					key: "toMarkup",
					value: function e() {
						var t = "";
						for (var r = 0; r < this.children.length; r++) {
							t += this.children[r].toMarkup()
						}
						return t
					}
				}]);
				return e
			}();
			var y = {
				"\xee": "\u0131\u0302",
				"\xef": "\u0131\u0308",
				"\xed": "\u0131\u0301",
				"\xec": "\u0131\u0300"
			};
			var x = function () {
				function e(t, r, a, n, i, u, o) {
					(0, l.default)(this, e);
					this.value = t;
					this.height = r || 0;
					this.depth = a || 0;
					this.italic = n || 0;
					this.skew = i || 0;
					this.classes = u || [];
					this.style = o || {};
					this.maxFontSize = 0;
					if (s.cjkRegex.test(this.value)) {
						if (s.hangulRegex.test(this.value)) {
							this.classes.push("hangul_fallback")
						} else {
							this.classes.push("cjk_fallback")
						}
					}
					if (/[\xee\xef\xed\xec]/.test(this.value)) {
						this.value = y[this.value]
					}
				}(0, o.default)(e, [{
					key: "tryCombine",
					value: function t(r) {
						if (!r || !(r instanceof e) || this.italic > 0 || p(this.classes) !== p(r.classes) || this.skew !== r.skew || this.maxFontSize !== r.maxFontSize) {
							return false
						}
						for (var a in this.style) {
							if (this.style.hasOwnProperty(a) && this.style[a] !== r.style[a]) {
								return false
							}
						}
						for (var n in r.style) {
							if (r.style.hasOwnProperty(n) && this.style[n] !== r.style[n]) {
								return false
							}
						}
						this.value += r.value;
						this.height = Math.max(this.height, r.height);
						this.depth = Math.max(this.depth, r.depth);
						this.italic = r.italic;
						return true
					}
				}, {
					key: "toNode",
					value: function e() {
						var t = document.createTextNode(this.value);
						var r = null;
						if (this.italic > 0) {
							r = document.createElement("span");
							r.style.marginRight = this.italic + "em"
						}
						if (this.classes.length > 0) {
							r = r || document.createElement("span");
							r.className = p(this.classes)
						}
						for (var a in this.style) {
							if (this.style.hasOwnProperty(a)) {
								r = r || document.createElement("span");
								r.style[a] = this.style[a]
							}
						}
						if (r) {
							r.appendChild(t);
							return r
						} else {
							return t
						}
					}
				}, {
					key: "toMarkup",
					value: function e() {
						var t = false;
						var r = "<span";
						if (this.classes.length) {
							t = true;
							r += ' class="';
							r += d.default.escape(p(this.classes));
							r += '"'
						}
						var a = "";
						if (this.italic > 0) {
							a += "margin-right:" + this.italic + "em;"
						}
						for (var n in this.style) {
							if (this.style.hasOwnProperty(n)) {
								a += d.default.hyphenate(n) + ":" + this.style[n] + ";"
							}
						}
						if (a) {
							t = true;
							r += ' style="' + d.default.escape(a) + '"'
						}
						var i = d.default.escape(this.value);
						if (t) {
							r += ">";
							r += i;
							r += "</span>";
							return r
						} else {
							return i
						}
					}
				}]);
				return e
			}();
			var w = function () {
				function e(t, r) {
					(0, l.default)(this, e);
					this.children = t || [];
					this.attributes = r || {};
					this.height = 0;
					this.depth = 0;
					this.maxFontSize = 0
				}(0, o.default)(e, [{
					key: "toNode",
					value: function e() {
						var t = "http://www.w3.org/2000/svg";
						var r = document.createElementNS(t, "svg");
						for (var a in this.attributes) {
							if (Object.prototype.hasOwnProperty.call(this.attributes, a)) {
								r.setAttribute(a, this.attributes[a])
							}
						}
						for (var n = 0; n < this.children.length; n++) {
							r.appendChild(this.children[n].toNode())
						}
						return r
					}
				}, {
					key: "toMarkup",
					value: function e() {
						var t = "<svg";
						for (var r in this.attributes) {
							if (Object.prototype.hasOwnProperty.call(this.attributes, r)) {
								t += " " + r + "='" + this.attributes[r] + "'"
							}
						}
						t += ">";
						for (var a = 0; a < this.children.length; a++) {
							t += this.children[a].toMarkup()
						}
						t += "</svg>";
						return t
					}
				}]);
				return e
			}();
			var k = function () {
				function e(t, r) {
					(0, l.default)(this, e);
					this.pathName = t;
					this.alternate = r
				}(0, o.default)(e, [{
					key: "toNode",
					value: function e() {
						var t = "http://www.w3.org/2000/svg";
						var r = document.createElementNS(t, "path");
						if (this.alternate) {
							r.setAttribute("d", this.alternate)
						} else {
							r.setAttribute("d", v.default.path[this.pathName])
						}
						return r
					}
				}, {
					key: "toMarkup",
					value: function e() {
						if (this.alternate) {
							return "<path d='" + this.alternate + "'/>"
						} else {
							return "<path d='" + v.default.path[this.pathName] + "'/>"
						}
					}
				}]);
				return e
			}();
			var M = function () {
				function e(t) {
					(0, l.default)(this, e);
					this.attributes = t || {}
				}(0, o.default)(e, [{
					key: "toNode",
					value: function e() {
						var t = "http://www.w3.org/2000/svg";
						var r = document.createElementNS(t, "line");
						for (var a in this.attributes) {
							if (Object.prototype.hasOwnProperty.call(this.attributes, a)) {
								r.setAttribute(a, this.attributes[a])
							}
						}
						return r
					}
				}, {
					key: "toMarkup",
					value: function e() {
						var t = "<line";
						for (var r in this.attributes) {
							if (Object.prototype.hasOwnProperty.call(this.attributes, r)) {
								t += " " + r + "='" + this.attributes[r] + "'"
							}
						}
						t += "/>";
						return t
					}
				}]);
				return e
			}();
			r.default = {
				span: m,
				anchor: g,
				documentFragment: b,
				symbolNode: x,
				svgNode: w,
				pathNode: k,
				lineNode: M
			}
		}, {
			"./svgGeometry": 119,
			"./unicodeRegexes": 121,
			"./utils": 123,
			"babel-runtime/core-js/get-iterator": 3,
			"babel-runtime/helpers/classCallCheck": 8,
			"babel-runtime/helpers/createClass": 9
		}],
		99: [function (e, t, r) {
			"use strict";
			Object.defineProperty(r, "__esModule", {
				value: true
			});
			var a = e("./defineEnvironment");
			e("./environments/array.js");
			var n = {
				has: function e(t) {
					return a._environments.hasOwnProperty(t)
				},
				get: function e(t) {
					return a._environments[t]
				}
			};
			r.default = n
		}, {
			"./defineEnvironment": 95,
			"./environments/array.js": 100
		}],
		100: [function (e, t, r) {
			"use strict";
			var a = e("../buildCommon");
			var n = M(a);
			var i = e("../defineEnvironment");
			var l = M(i);
			var u = e("../mathMLTree");
			var o = M(u);
			var s = e("../ParseError");
			var f = M(s);
			var d = e("../ParseNode");
			var c = M(d);
			var v = e("../units");
			var h = e("../utils");
			var p = M(h);
			var m = e("../stretchy");
			var g = M(m);
			var b = e("../buildHTML");
			var y = k(b);
			var x = e("../buildMathML");
			var w = k(x);

			function k(e) {
				if (e && e.__esModule) {
					return e
				} else {
					var t = {};
					if (e != null) {
						for (var r in e) {
							if (Object.prototype.hasOwnProperty.call(e, r)) t[r] = e[r]
						}
					}
					t.default = e;
					return t
				}
			}

			function M(e) {
				return e && e.__esModule ? e : {
					default: e
				}
			}

			function _(e, t, r) {
				var a = [];
				var n = [a];
				var i = [];
				while (true) {
					var l = e.parseExpression(false, null);
					l = new c.default("ordgroup", l, e.mode);
					if (r) {
						l = new c.default("styling", {
							style: r,
							value: [l]
						}, e.mode)
					}
					a.push(l);
					var u = e.nextToken.text;
					if (u === "&") {
						e.consume()
					} else if (u === "\\end") {
						var o = n[n.length - 1];
						if (n.length > 1 && o.length === 1 && o[0].value.value[0].value.length === 0) {
							n.pop()
						}
						break
					} else if (u === "\\\\" || u === "\\cr") {
						var s = e.parseFunction();
						i.push(s.value.size);
						a = [];
						n.push(a)
					} else {
						throw new f.default("Expected & or \\\\ or \\end", e.nextToken)
					}
				}
				t.body = n;
				t.rowGaps = i;
				return new c.default(t.type, t, e.mode)
			}

			function S(e) {
				if (e.substr(0, 1) === "d") {
					return "display"
				} else {
					return "text"
				}
			}
			var z = function e(t, r) {
				var a = void 0;
				var i = void 0;
				var l = t.value.body.length;
				var u = 0;
				var o = new Array(l);
				var s = 1 / r.fontMetrics().ptPerEm;
				var d = 5 * s;
				var c = 12 * s;
				var h = 3 * s;
				var m = p.default.deflt(t.value.arraystretch, 1);
				var b = m * c;
				var x = .7 * b;
				var w = .3 * b;
				var k = 0;
				for (a = 0; a < t.value.body.length; ++a) {
					var M = t.value.body[a];
					var _ = x;
					var S = w;
					if (u < M.length) {
						u = M.length
					}
					var z = new Array(M.length);
					for (i = 0; i < M.length; ++i) {
						var T = y.buildGroup(M[i], r);
						if (S < T.depth) {
							S = T.depth
						}
						if (_ < T.height) {
							_ = T.height
						}
						z[i] = T
					}
					var C = 0;
					if (t.value.rowGaps[a]) {
						C = (0, v.calculateSize)(t.value.rowGaps[a].value, r);
						if (C > 0) {
							C += w;
							if (S < C) {
								S = C
							}
							C = 0
						}
					}
					if (t.value.addJot) {
						S += h
					}
					z.height = _;
					z.depth = S;
					k += _;
					z.pos = k;
					k += S + C;
					o[a] = z
				}
				var A = k / 2 + r.fontMetrics().axisHeight;
				var O = t.value.cols || [];
				var N = [];
				var L = void 0;
				var j = void 0;
				for (i = 0, j = 0; i < u || j < O.length; ++i, ++j) {
					var E = O[j] || {};
					var q = true;
					while (E.type === "separator") {
						if (!q) {
							L = n.default.makeSpan(["arraycolsep"], []);
							L.style.width = r.fontMetrics().doubleRuleSep + "em";
							N.push(L)
						}
						if (E.separator === "|") {
							var P = g.default.ruleSpan("vertical-separator", r);
							P.style.height = k + "em";
							P.style.verticalAlign = -(k - A) + "em";
							N.push(P)
						} else {
							throw new f.default("Invalid separator type: " + E.separator)
						}
						j++;
						E = O[j] || {};
						q = false
					}
					if (i >= u) {
						continue
					}
					var B = void 0;
					if (i > 0 || t.value.hskipBeforeAndAfter) {
						B = p.default.deflt(E.pregap, d);
						if (B !== 0) {
							L = n.default.makeSpan(["arraycolsep"], []);
							L.style.width = B + "em";
							N.push(L)
						}
					}
					var R = [];
					for (a = 0; a < l; ++a) {
						var D = o[a];
						var F = D[i];
						if (!F) {
							continue
						}
						var H = D.pos - A;
						F.depth = D.depth;
						F.height = D.height;
						R.push({
							type: "elem",
							elem: F,
							shift: H
						})
					}
					R = n.default.makeVList({
						positionType: "individualShift",
						children: R
					}, r);
					R = n.default.makeSpan(["col-align-" + (E.align || "c")], [R]);
					N.push(R);
					if (i < u - 1 || t.value.hskipBeforeAndAfter) {
						B = p.default.deflt(E.postgap, d);
						if (B !== 0) {
							L = n.default.makeSpan(["arraycolsep"], []);
							L.style.width = B + "em";
							N.push(L)
						}
					}
				}
				o = n.default.makeSpan(["mtable"], N);
				return n.default.makeSpan(["mord"], [o], r)
			};
			var T = function e(t, r) {
				return new o.default.MathNode("mtable", t.value.body.map(function (e) {
					return new o.default.MathNode("mtr", e.map(function (e) {
						return new o.default.MathNode("mtd", [w.buildGroup(e, r)])
					}))
				}))
			};
			var C = function e(t, r) {
				var a = {
					type: "array",
					cols: [],
					addJot: true
				};
				a = _(t.parser, a, "display");
				var n = void 0;
				var i = 0;
				var l = new c.default("ordgroup", [], t.mode);
				if (r[0] && r[0].value) {
					var u = "";
					for (var o = 0; o < r[0].value.length; o++) {
						u += r[0].value[o].value
					}
					n = Number(u);
					i = n * 2
				}
				var s = !i;
				a.value.body.forEach(function (e) {
					for (var t = 1; t < e.length; t += 2) {
						var r = e[t].value.value[0];
						r.value.unshift(l)
					}
					if (!s) {
						var a = e.length / 2;
						if (n < a) {
							throw new f.default("Too many math in a row: " + ("expected " + n + ", but got " + a), e)
						}
					} else if (i < e.length) {
						i = e.length
					}
				});
				for (var d = 0; d < i; ++d) {
					var v = "r";
					var h = 0;
					if (d % 2 === 1) {
						v = "l"
					} else if (d > 0 && s) {
						h = 1
					}
					a.value.cols[d] = {
						type: "align",
						align: v,
						pregap: h,
						postgap: 0
					}
				}
				return a
			};
			(0, l.default)({
				type: "array",
				names: ["array", "darray"],
				props: {
					numArgs: 1
				},
				handler: function e(t, r) {
					var a = r[0];
					a = a.value.map ? a.value : [a];
					var n = a.map(function (e) {
						var t = e.value;
						if ("lcr".indexOf(t) !== -1) {
							return {
								type: "align",
								align: t
							}
						} else if (t === "|") {
							return {
								type: "separator",
								separator: "|"
							}
						}
						throw new f.default("Unknown column alignment: " + e.value, e)
					});
					var i = {
						type: "array",
						cols: n,
						hskipBeforeAndAfter: true
					};
					i = _(t.parser, i, S(t.envName));
					return i
				},
				htmlBuilder: z,
				mathmlBuilder: T
			});
			(0, l.default)({
				type: "array",
				names: ["matrix", "pmatrix", "bmatrix", "Bmatrix", "vmatrix", "Vmatrix"],
				props: {
					numArgs: 0
				},
				handler: function e(t) {
					var r = {
						matrix: null,
						pmatrix: ["(", ")"],
						bmatrix: ["[", "]"],
						Bmatrix: ["\\{", "\\}"],
						vmatrix: ["|", "|"],
						Vmatrix: ["\\Vert", "\\Vert"]
					}[t.envName];
					var a = {
						type: "array",
						hskipBeforeAndAfter: false
					};
					a = _(t.parser, a, S(t.envName));
					if (r) {
						a = new c.default("leftright", {
							body: [a],
							left: r[0],
							right: r[1]
						}, t.mode)
					}
					return a
				},
				htmlBuilder: z,
				mathmlBuilder: T
			});
			(0, l.default)({
				type: "array",
				names: ["cases", "dcases"],
				props: {
					numArgs: 0
				},
				handler: function e(t) {
					var r = {
						type: "array",
						arraystretch: 1.2,
						cols: [{
							type: "align",
							align: "l",
							pregap: 0,
							postgap: 1
						}, {
							type: "align",
							align: "l",
							pregap: 0,
							postgap: 0
						}]
					};
					r = _(t.parser, r, S(t.envName));
					r = new c.default("leftright", {
						body: [r],
						left: "\\{",
						right: "."
					}, t.mode);
					return r
				},
				htmlBuilder: z,
				mathmlBuilder: T
			});
			(0, l.default)({
				type: "array",
				names: ["aligned"],
				props: {
					numArgs: 0
				},
				handler: C,
				htmlBuilder: z,
				mathmlBuilder: T
			});
			(0, l.default)({
				type: "array",
				names: ["gathered"],
				props: {
					numArgs: 0
				},
				handler: function e(t) {
					var r = {
						type: "array",
						cols: [{
							type: "align",
							align: "c"
						}],
						addJot: true
					};
					r = _(t.parser, r, "display");
					return r
				},
				htmlBuilder: z,
				mathmlBuilder: T
			});
			(0, l.default)({
				type: "array",
				names: ["alignedat"],
				props: {
					numArgs: 1
				},
				handler: C,
				htmlBuilder: z,
				mathmlBuilder: T
			})
		}, {
			"../ParseError": 84,
			"../ParseNode": 85,
			"../buildCommon": 91,
			"../buildHTML": 92,
			"../buildMathML": 93,
			"../defineEnvironment": 95,
			"../mathMLTree": 116,
			"../stretchy": 118,
			"../units": 122,
			"../utils": 123
		}],
		101: [function (e, t, r) {
			"use strict";
			Object.defineProperty(r, "__esModule", {
				value: true
			});
			var a = e("./unicodeRegexes");
			var n = e("./fontMetricsData");
			var i = l(n);

			function l(e) {
				return e && e.__esModule ? e : {
					default: e
				}
			}
			var u = {
				slant: [.25, .25, .25],
				space: [0, 0, 0],
				stretch: [0, 0, 0],
				shrink: [0, 0, 0],
				xHeight: [.431, .431, .431],
				quad: [1, 1.171, 1.472],
				extraSpace: [0, 0, 0],
				num1: [.677, .732, .925],
				num2: [.394, .384, .387],
				num3: [.444, .471, .504],
				denom1: [.686, .752, 1.025],
				denom2: [.345, .344, .532],
				sup1: [.413, .503, .504],
				sup2: [.363, .431, .404],
				sup3: [.289, .286, .294],
				sub1: [.15, .143, .2],
				sub2: [.247, .286, .4],
				supDrop: [.386, .353, .494],
				subDrop: [.05, .071, .1],
				delim1: [2.39, 1.7, 1.98],
				delim2: [1.01, 1.157, 1.42],
				axisHeight: [.25, .25, .25],
				defaultRuleThickness: [.04, .049, .049],
				bigOpSpacing1: [.111, .111, .111],
				bigOpSpacing2: [.166, .166, .166],
				bigOpSpacing3: [.2, .2, .2],
				bigOpSpacing4: [.6, .611, .611],
				bigOpSpacing5: [.1, .143, .143],
				sqrtRuleThickness: [.04, .04, .04],
				ptPerEm: [10, 10, 10],
				doubleRuleSep: [.2, .2, .2]
			};
			var o = {
				"\xc0": "A",
				"\xc1": "A",
				"\xc2": "A",
				"\xc3": "A",
				"\xc4": "A",
				"\xc5": "A",
				"\xc6": "A",
				"\xc7": "C",
				"\xc8": "E",
				"\xc9": "E",
				"\xca": "E",
				"\xcb": "E",
				"\xcc": "I",
				"\xcd": "I",
				"\xce": "I",
				"\xcf": "I",
				"\xd0": "D",
				"\xd1": "N",
				"\xd2": "O",
				"\xd3": "O",
				"\xd4": "O",
				"\xd5": "O",
				"\xd6": "O",
				"\xd8": "O",
				"\xd9": "U",
				"\xda": "U",
				"\xdb": "U",
				"\xdc": "U",
				"\xdd": "Y",
				"\xde": "o",
				"\xdf": "B",
				"\xe0": "a",
				"\xe1": "a",
				"\xe2": "a",
				"\xe3": "a",
				"\xe4": "a",
				"\xe5": "a",
				"\xe6": "a",
				"\xe7": "c",
				"\xe8": "e",
				"\xe9": "e",
				"\xea": "e",
				"\xeb": "e",
				"\xec": "i",
				"\xed": "i",
				"\xee": "i",
				"\xef": "i",
				"\xf0": "d",
				"\xf1": "n",
				"\xf2": "o",
				"\xf3": "o",
				"\xf4": "o",
				"\xf5": "o",
				"\xf6": "o",
				"\xf8": "o",
				"\xf9": "u",
				"\xfa": "u",
				"\xfb": "u",
				"\xfc": "u",
				"\xfd": "y",
				"\xfe": "o",
				"\xff": "y",
				"\u0410": "A",
				"\u0411": "B",
				"\u0412": "B",
				"\u0413": "F",
				"\u0414": "A",
				"\u0415": "E",
				"\u0416": "K",
				"\u0417": "3",
				"\u0418": "N",
				"\u0419": "N",
				"\u041a": "K",
				"\u041b": "N",
				"\u041c": "M",
				"\u041d": "H",
				"\u041e": "O",
				"\u041f": "N",
				"\u0420": "P",
				"\u0421": "C",
				"\u0422": "T",
				"\u0423": "y",
				"\u0424": "O",
				"\u0425": "X",
				"\u0426": "U",
				"\u0427": "h",
				"\u0428": "W",
				"\u0429": "W",
				"\u042a": "B",
				"\u042b": "X",
				"\u042c": "B",
				"\u042d": "3",
				"\u042e": "X",
				"\u042f": "R",
				"\u0430": "a",
				"\u0431": "b",
				"\u0432": "a",
				"\u0433": "r",
				"\u0434": "y",
				"\u0435": "e",
				"\u0436": "m",
				"\u0437": "e",
				"\u0438": "n",
				"\u0439": "n",
				"\u043a": "n",
				"\u043b": "n",
				"\u043c": "m",
				"\u043d": "n",
				"\u043e": "o",
				"\u043f": "n",
				"\u0440": "p",
				"\u0441": "c",
				"\u0442": "o",
				"\u0443": "y",
				"\u0444": "b",
				"\u0445": "x",
				"\u0446": "n",
				"\u0447": "n",
				"\u0448": "w",
				"\u0449": "w",
				"\u044a": "a",
				"\u044b": "m",
				"\u044c": "a",
				"\u044d": "e",
				"\u044e": "m",
				"\u044f": "r"
			};
			var s = function e(t, r) {
				var n = t.charCodeAt(0);
				if (t[0] in o) {
					n = o[t[0]].charCodeAt(0)
				} else if (a.cjkRegex.test(t[0])) {
					n = "M".charCodeAt(0)
				}
				var l = i.default[r]["" + n];
				if (l) {
					return {
						depth: l[0],
						height: l[1],
						italic: l[2],
						skew: l[3],
						width: l[4]
					}
				}
			};
			var f = {};
			var d = function e(t) {
				var r = void 0;
				if (t >= 5) {
					r = 0
				} else if (t >= 3) {
					r = 1
				} else {
					r = 2
				}
				if (!f[r]) {
					var a = f[r] = {
						cssEmPerMu: u.quad[r] / 18
					};
					for (var n in u) {
						if (u.hasOwnProperty(n)) {
							a[n] = u[n][r]
						}
					}
				}
				return f[r]
			};
			r.default = {
				getFontMetrics: d,
				getCharacterMetrics: s
			}
		}, {
			"./fontMetricsData": 102,
			"./unicodeRegexes": 121
		}],
		102: [function (e, t, r) {
			"use strict";
			Object.defineProperty(r, "__esModule", {
				value: true
			});
			var a = {
				"AMS-Regular": {
					65: [0, .68889, 0, 0],
					66: [0, .68889, 0, 0],
					67: [0, .68889, 0, 0],
					68: [0, .68889, 0, 0],
					69: [0, .68889, 0, 0],
					70: [0, .68889, 0, 0],
					71: [0, .68889, 0, 0],
					72: [0, .68889, 0, 0],
					73: [0, .68889, 0, 0],
					74: [.16667, .68889, 0, 0],
					75: [0, .68889, 0, 0],
					76: [0, .68889, 0, 0],
					77: [0, .68889, 0, 0],
					78: [0, .68889, 0, 0],
					79: [.16667, .68889, 0, 0],
					80: [0, .68889, 0, 0],
					81: [.16667, .68889, 0, 0],
					82: [0, .68889, 0, 0],
					83: [0, .68889, 0, 0],
					84: [0, .68889, 0, 0],
					85: [0, .68889, 0, 0],
					86: [0, .68889, 0, 0],
					87: [0, .68889, 0, 0],
					88: [0, .68889, 0, 0],
					89: [0, .68889, 0, 0],
					90: [0, .68889, 0, 0],
					107: [0, .68889, 0, 0],
					165: [0, .675, .025, 0],
					174: [.15559, .69224, 0, 0],
					240: [0, .68889, 0, 0],
					295: [0, .68889, 0, 0],
					710: [0, .825, 0, 0],
					732: [0, .9, 0, 0],
					770: [0, .825, 0, 0],
					771: [0, .9, 0, 0],
					989: [.08167, .58167, 0, 0],
					1008: [0, .43056, .04028, 0],
					8245: [0, .54986, 0, 0],
					8463: [0, .68889, 0, 0],
					8487: [0, .68889, 0, 0],
					8498: [0, .68889, 0, 0],
					8502: [0, .68889, 0, 0],
					8503: [0, .68889, 0, 0],
					8504: [0, .68889, 0, 0],
					8513: [0, .68889, 0, 0],
					8592: [-.03598, .46402, 0, 0],
					8594: [-.03598, .46402, 0, 0],
					8602: [-.13313, .36687, 0, 0],
					8603: [-.13313, .36687, 0, 0],
					8606: [.01354, .52239, 0, 0],
					8608: [.01354, .52239, 0, 0],
					8610: [.01354, .52239, 0, 0],
					8611: [.01354, .52239, 0, 0],
					8619: [0, .54986, 0, 0],
					8620: [0, .54986, 0, 0],
					8621: [-.13313, .37788, 0, 0],
					8622: [-.13313, .36687, 0, 0],
					8624: [0, .69224, 0, 0],
					8625: [0, .69224, 0, 0],
					8630: [0, .43056, 0, 0],
					8631: [0, .43056, 0, 0],
					8634: [.08198, .58198, 0, 0],
					8635: [.08198, .58198, 0, 0],
					8638: [.19444, .69224, 0, 0],
					8639: [.19444, .69224, 0, 0],
					8642: [.19444, .69224, 0, 0],
					8643: [.19444, .69224, 0, 0],
					8644: [.1808, .675, 0, 0],
					8646: [.1808, .675, 0, 0],
					8647: [.1808, .675, 0, 0],
					8648: [.19444, .69224, 0, 0],
					8649: [.1808, .675, 0, 0],
					8650: [.19444, .69224, 0, 0],
					8651: [.01354, .52239, 0, 0],
					8652: [.01354, .52239, 0, 0],
					8653: [-.13313, .36687, 0, 0],
					8654: [-.13313, .36687, 0, 0],
					8655: [-.13313, .36687, 0, 0],
					8666: [.13667, .63667, 0, 0],
					8667: [.13667, .63667, 0, 0],
					8669: [-.13313, .37788, 0, 0],
					8672: [-.064, .437, 0, 0],
					8674: [-.064, .437, 0, 0],
					8705: [0, .825, 0, 0],
					8708: [0, .68889, 0, 0],
					8709: [.08167, .58167, 0, 0],
					8717: [0, .43056, 0, 0],
					8722: [-.03598, .46402, 0, 0],
					8724: [.08198, .69224, 0, 0],
					8726: [.08167, .58167, 0, 0],
					8733: [0, .69224, 0, 0],
					8736: [0, .69224, 0, 0],
					8737: [0, .69224, 0, 0],
					8738: [.03517, .52239, 0, 0],
					8739: [.08167, .58167, 0, 0],
					8740: [.25142, .74111, 0, 0],
					8741: [.08167, .58167, 0, 0],
					8742: [.25142, .74111, 0, 0],
					8756: [0, .69224, 0, 0],
					8757: [0, .69224, 0, 0],
					8764: [-.13313, .36687, 0, 0],
					8765: [-.13313, .37788, 0, 0],
					8769: [-.13313, .36687, 0, 0],
					8770: [-.03625, .46375, 0, 0],
					8774: [.30274, .79383, 0, 0],
					8776: [-.01688, .48312, 0, 0],
					8778: [.08167, .58167, 0, 0],
					8782: [.06062, .54986, 0, 0],
					8783: [.06062, .54986, 0, 0],
					8785: [.08198, .58198, 0, 0],
					8786: [.08198, .58198, 0, 0],
					8787: [.08198, .58198, 0, 0],
					8790: [0, .69224, 0, 0],
					8791: [.22958, .72958, 0, 0],
					8796: [.08198, .91667, 0, 0],
					8806: [.25583, .75583, 0, 0],
					8807: [.25583, .75583, 0, 0],
					8808: [.25142, .75726, 0, 0],
					8809: [.25142, .75726, 0, 0],
					8812: [.25583, .75583, 0, 0],
					8814: [.20576, .70576, 0, 0],
					8815: [.20576, .70576, 0, 0],
					8816: [.30274, .79383, 0, 0],
					8817: [.30274, .79383, 0, 0],
					8818: [.22958, .72958, 0, 0],
					8819: [.22958, .72958, 0, 0],
					8822: [.1808, .675, 0, 0],
					8823: [.1808, .675, 0, 0],
					8828: [.13667, .63667, 0, 0],
					8829: [.13667, .63667, 0, 0],
					8830: [.22958, .72958, 0, 0],
					8831: [.22958, .72958, 0, 0],
					8832: [.20576, .70576, 0, 0],
					8833: [.20576, .70576, 0, 0],
					8840: [.30274, .79383, 0, 0],
					8841: [.30274, .79383, 0, 0],
					8842: [.13597, .63597, 0, 0],
					8843: [.13597, .63597, 0, 0],
					8847: [.03517, .54986, 0, 0],
					8848: [.03517, .54986, 0, 0],
					8858: [.08198, .58198, 0, 0],
					8859: [.08198, .58198, 0, 0],
					8861: [.08198, .58198, 0, 0],
					8862: [0, .675, 0, 0],
					8863: [0, .675, 0, 0],
					8864: [0, .675, 0, 0],
					8865: [0, .675, 0, 0],
					8872: [0, .69224, 0, 0],
					8873: [0, .69224, 0, 0],
					8874: [0, .69224, 0, 0],
					8876: [0, .68889, 0, 0],
					8877: [0, .68889, 0, 0],
					8878: [0, .68889, 0, 0],
					8879: [0, .68889, 0, 0],
					8882: [.03517, .54986, 0, 0],
					8883: [.03517, .54986, 0, 0],
					8884: [.13667, .63667, 0, 0],
					8885: [.13667, .63667, 0, 0],
					8888: [0, .54986, 0, 0],
					8890: [.19444, .43056, 0, 0],
					8891: [.19444, .69224, 0, 0],
					8892: [.19444, .69224, 0, 0],
					8901: [0, .54986, 0, 0],
					8903: [.08167, .58167, 0, 0],
					8905: [.08167, .58167, 0, 0],
					8906: [.08167, .58167, 0, 0],
					8907: [0, .69224, 0, 0],
					8908: [0, .69224, 0, 0],
					8909: [-.03598, .46402, 0, 0],
					8910: [0, .54986, 0, 0],
					8911: [0, .54986, 0, 0],
					8912: [.03517, .54986, 0, 0],
					8913: [.03517, .54986, 0, 0],
					8914: [0, .54986, 0, 0],
					8915: [0, .54986, 0, 0],
					8916: [0, .69224, 0, 0],
					8918: [.0391, .5391, 0, 0],
					8919: [.0391, .5391, 0, 0],
					8920: [.03517, .54986, 0, 0],
					8921: [.03517, .54986, 0, 0],
					8922: [.38569, .88569, 0, 0],
					8923: [.38569, .88569, 0, 0],
					8926: [.13667, .63667, 0, 0],
					8927: [.13667, .63667, 0, 0],
					8928: [.30274, .79383, 0, 0],
					8929: [.30274, .79383, 0, 0],
					8934: [.23222, .74111, 0, 0],
					8935: [.23222, .74111, 0, 0],
					8936: [.23222, .74111, 0, 0],
					8937: [.23222, .74111, 0, 0],
					8938: [.20576, .70576, 0, 0],
					8939: [.20576, .70576, 0, 0],
					8940: [.30274, .79383, 0, 0],
					8941: [.30274, .79383, 0, 0],
					8994: [.19444, .69224, 0, 0],
					8995: [.19444, .69224, 0, 0],
					9416: [.15559, .69224, 0, 0],
					9484: [0, .69224, 0, 0],
					9488: [0, .69224, 0, 0],
					9492: [0, .37788, 0, 0],
					9496: [0, .37788, 0, 0],
					9585: [.19444, .68889, 0, 0],
					9586: [.19444, .74111, 0, 0],
					9632: [0, .675, 0, 0],
					9633: [0, .675, 0, 0],
					9650: [0, .54986, 0, 0],
					9651: [0, .54986, 0, 0],
					9654: [.03517, .54986, 0, 0],
					9660: [0, .54986, 0, 0],
					9661: [0, .54986, 0, 0],
					9664: [.03517, .54986, 0, 0],
					9674: [.11111, .69224, 0, 0],
					9733: [.19444, .69224, 0, 0],
					10003: [0, .69224, 0, 0],
					10016: [0, .69224, 0, 0],
					10731: [.11111, .69224, 0, 0],
					10846: [.19444, .75583, 0, 0],
					10877: [.13667, .63667, 0, 0],
					10878: [.13667, .63667, 0, 0],
					10885: [.25583, .75583, 0, 0],
					10886: [.25583, .75583, 0, 0],
					10887: [.13597, .63597, 0, 0],
					10888: [.13597, .63597, 0, 0],
					10889: [.26167, .75726, 0, 0],
					10890: [.26167, .75726, 0, 0],
					10891: [.48256, .98256, 0, 0],
					10892: [.48256, .98256, 0, 0],
					10901: [.13667, .63667, 0, 0],
					10902: [.13667, .63667, 0, 0],
					10933: [.25142, .75726, 0, 0],
					10934: [.25142, .75726, 0, 0],
					10935: [.26167, .75726, 0, 0],
					10936: [.26167, .75726, 0, 0],
					10937: [.26167, .75726, 0, 0],
					10938: [.26167, .75726, 0, 0],
					10949: [.25583, .75583, 0, 0],
					10950: [.25583, .75583, 0, 0],
					10955: [.28481, .79383, 0, 0],
					10956: [.28481, .79383, 0, 0],
					57350: [.08167, .58167, 0, 0],
					57351: [.08167, .58167, 0, 0],
					57352: [.08167, .58167, 0, 0],
					57353: [0, .43056, .04028, 0],
					57356: [.25142, .75726, 0, 0],
					57357: [.25142, .75726, 0, 0],
					57358: [.41951, .91951, 0, 0],
					57359: [.30274, .79383, 0, 0],
					57360: [.30274, .79383, 0, 0],
					57361: [.41951, .91951, 0, 0],
					57366: [.25142, .75726, 0, 0],
					57367: [.25142, .75726, 0, 0],
					57368: [.25142, .75726, 0, 0],
					57369: [.25142, .75726, 0, 0],
					57370: [.13597, .63597, 0, 0],
					57371: [.13597, .63597, 0, 0]
				},
				"Caligraphic-Regular": {
					48: [0, .43056, 0, 0],
					49: [0, .43056, 0, 0],
					50: [0, .43056, 0, 0],
					51: [.19444, .43056, 0, 0],
					52: [.19444, .43056, 0, 0],
					53: [.19444, .43056, 0, 0],
					54: [0, .64444, 0, 0],
					55: [.19444, .43056, 0, 0],
					56: [0, .64444, 0, 0],
					57: [.19444, .43056, 0, 0],
					65: [0, .68333, 0, .19445],
					66: [0, .68333, .03041, .13889],
					67: [0, .68333, .05834, .13889],
					68: [0, .68333, .02778, .08334],
					69: [0, .68333, .08944, .11111],
					70: [0, .68333, .09931, .11111],
					71: [.09722, .68333, .0593, .11111],
					72: [0, .68333, .00965, .11111],
					73: [0, .68333, .07382, 0],
					74: [.09722, .68333, .18472, .16667],
					75: [0, .68333, .01445, .05556],
					76: [0, .68333, 0, .13889],
					77: [0, .68333, 0, .13889],
					78: [0, .68333, .14736, .08334],
					79: [0, .68333, .02778, .11111],
					80: [0, .68333, .08222, .08334],
					81: [.09722, .68333, 0, .11111],
					82: [0, .68333, 0, .08334],
					83: [0, .68333, .075, .13889],
					84: [0, .68333, .25417, 0],
					85: [0, .68333, .09931, .08334],
					86: [0, .68333, .08222, 0],
					87: [0, .68333, .08222, .08334],
					88: [0, .68333, .14643, .13889],
					89: [.09722, .68333, .08222, .08334],
					90: [0, .68333, .07944, .13889]
				},
				"Fraktur-Regular": {
					33: [0, .69141, 0, 0],
					34: [0, .69141, 0, 0],
					38: [0, .69141, 0, 0],
					39: [0, .69141, 0, 0],
					40: [.24982, .74947, 0, 0],
					41: [.24982, .74947, 0, 0],
					42: [0, .62119, 0, 0],
					43: [.08319, .58283, 0, 0],
					44: [0, .10803, 0, 0],
					45: [.08319, .58283, 0, 0],
					46: [0, .10803, 0, 0],
					47: [.24982, .74947, 0, 0],
					48: [0, .47534, 0, 0],
					49: [0, .47534, 0, 0],
					50: [0, .47534, 0, 0],
					51: [.18906, .47534, 0, 0],
					52: [.18906, .47534, 0, 0],
					53: [.18906, .47534, 0, 0],
					54: [0, .69141, 0, 0],
					55: [.18906, .47534, 0, 0],
					56: [0, .69141, 0, 0],
					57: [.18906, .47534, 0, 0],
					58: [0, .47534, 0, 0],
					59: [.12604, .47534, 0, 0],
					61: [-.13099, .36866, 0, 0],
					63: [0, .69141, 0, 0],
					65: [0, .69141, 0, 0],
					66: [0, .69141, 0, 0],
					67: [0, .69141, 0, 0],
					68: [0, .69141, 0, 0],
					69: [0, .69141, 0, 0],
					70: [.12604, .69141, 0, 0],
					71: [0, .69141, 0, 0],
					72: [.06302, .69141, 0, 0],
					73: [0, .69141, 0, 0],
					74: [.12604, .69141, 0, 0],
					75: [0, .69141, 0, 0],
					76: [0, .69141, 0, 0],
					77: [0, .69141, 0, 0],
					78: [0, .69141, 0, 0],
					79: [0, .69141, 0, 0],
					80: [.18906, .69141, 0, 0],
					81: [.03781, .69141, 0, 0],
					82: [0, .69141, 0, 0],
					83: [0, .69141, 0, 0],
					84: [0, .69141, 0, 0],
					85: [0, .69141, 0, 0],
					86: [0, .69141, 0, 0],
					87: [0, .69141, 0, 0],
					88: [0, .69141, 0, 0],
					89: [.18906, .69141, 0, 0],
					90: [.12604, .69141, 0, 0],
					91: [.24982, .74947, 0, 0],
					93: [.24982, .74947, 0, 0],
					94: [0, .69141, 0, 0],
					97: [0, .47534, 0, 0],
					98: [0, .69141, 0, 0],
					99: [0, .47534, 0, 0],
					100: [0, .62119, 0, 0],
					101: [0, .47534, 0, 0],
					102: [.18906, .69141, 0, 0],
					103: [.18906, .47534, 0, 0],
					104: [.18906, .69141, 0, 0],
					105: [0, .69141, 0, 0],
					106: [0, .69141, 0, 0],
					107: [0, .69141, 0, 0],
					108: [0, .69141, 0, 0],
					109: [0, .47534, 0, 0],
					110: [0, .47534, 0, 0],
					111: [0, .47534, 0, 0],
					112: [.18906, .52396, 0, 0],
					113: [.18906, .47534, 0, 0],
					114: [0, .47534, 0, 0],
					115: [0, .47534, 0, 0],
					116: [0, .62119, 0, 0],
					117: [0, .47534, 0, 0],
					118: [0, .52396, 0, 0],
					119: [0, .52396, 0, 0],
					120: [.18906, .47534, 0, 0],
					121: [.18906, .47534, 0, 0],
					122: [.18906, .47534, 0, 0],
					8216: [0, .69141, 0, 0],
					8217: [0, .69141, 0, 0],
					58112: [0, .62119, 0, 0],
					58113: [0, .62119, 0, 0],
					58114: [.18906, .69141, 0, 0],
					58115: [.18906, .69141, 0, 0],
					58116: [.18906, .47534, 0, 0],
					58117: [0, .69141, 0, 0],
					58118: [0, .62119, 0, 0],
					58119: [0, .47534, 0, 0]
				},
				"Main-Bold": {
					33: [0, .69444, 0, 0],
					34: [0, .69444, 0, 0],
					35: [.19444, .69444, 0, 0],
					36: [.05556, .75, 0, 0],
					37: [.05556, .75, 0, 0],
					38: [0, .69444, 0, 0],
					39: [0, .69444, 0, 0],
					40: [.25, .75, 0, 0],
					41: [.25, .75, 0, 0],
					42: [0, .75, 0, 0],
					43: [.13333, .63333, 0, 0],
					44: [.19444, .15556, 0, 0],
					45: [0, .44444, 0, 0],
					46: [0, .15556, 0, 0],
					47: [.25, .75, 0, 0],
					48: [0, .64444, 0, 0],
					49: [0, .64444, 0, 0],
					50: [0, .64444, 0, 0],
					51: [0, .64444, 0, 0],
					52: [0, .64444, 0, 0],
					53: [0, .64444, 0, 0],
					54: [0, .64444, 0, 0],
					55: [0, .64444, 0, 0],
					56: [0, .64444, 0, 0],
					57: [0, .64444, 0, 0],
					58: [0, .44444, 0, 0],
					59: [.19444, .44444, 0, 0],
					60: [.08556, .58556, 0, 0],
					61: [-.10889, .39111, 0, 0],
					62: [.08556, .58556, 0, 0],
					63: [0, .69444, 0, 0],
					64: [0, .69444, 0, 0],
					65: [0, .68611, 0, 0],
					66: [0, .68611, 0, 0],
					67: [0, .68611, 0, 0],
					68: [0, .68611, 0, 0],
					69: [0, .68611, 0, 0],
					70: [0, .68611, 0, 0],
					71: [0, .68611, 0, 0],
					72: [0, .68611, 0, 0],
					73: [0, .68611, 0, 0],
					74: [0, .68611, 0, 0],
					75: [0, .68611, 0, 0],
					76: [0, .68611, 0, 0],
					77: [0, .68611, 0, 0],
					78: [0, .68611, 0, 0],
					79: [0, .68611, 0, 0],
					80: [0, .68611, 0, 0],
					81: [.19444, .68611, 0, 0],
					82: [0, .68611, 0, 0],
					83: [0, .68611, 0, 0],
					84: [0, .68611, 0, 0],
					85: [0, .68611, 0, 0],
					86: [0, .68611, .01597, 0],
					87: [0, .68611, .01597, 0],
					88: [0, .68611, 0, 0],
					89: [0, .68611, .02875, 0],
					90: [0, .68611, 0, 0],
					91: [.25, .75, 0, 0],
					92: [.25, .75, 0, 0],
					93: [.25, .75, 0, 0],
					94: [0, .69444, 0, 0],
					95: [.31, .13444, .03194, 0],
					96: [0, .69444, 0, 0],
					97: [0, .44444, 0, 0],
					98: [0, .69444, 0, 0],
					99: [0, .44444, 0, 0],
					100: [0, .69444, 0, 0],
					101: [0, .44444, 0, 0],
					102: [0, .69444, .10903, 0],
					103: [.19444, .44444, .01597, 0],
					104: [0, .69444, 0, 0],
					105: [0, .69444, 0, 0],
					106: [.19444, .69444, 0, 0],
					107: [0, .69444, 0, 0],
					108: [0, .69444, 0, 0],
					109: [0, .44444, 0, 0],
					110: [0, .44444, 0, 0],
					111: [0, .44444, 0, 0],
					112: [.19444, .44444, 0, 0],
					113: [.19444, .44444, 0, 0],
					114: [0, .44444, 0, 0],
					115: [0, .44444, 0, 0],
					116: [0, .63492, 0, 0],
					117: [0, .44444, 0, 0],
					118: [0, .44444, .01597, 0],
					119: [0, .44444, .01597, 0],
					120: [0, .44444, 0, 0],
					121: [.19444, .44444, .01597, 0],
					122: [0, .44444, 0, 0],
					123: [.25, .75, 0, 0],
					124: [.25, .75, 0, 0],
					125: [.25, .75, 0, 0],
					126: [.35, .34444, 0, 0],
					168: [0, .69444, 0, 0],
					172: [0, .44444, 0, 0],
					175: [0, .59611, 0, 0],
					176: [0, .69444, 0, 0],
					177: [.13333, .63333, 0, 0],
					180: [0, .69444, 0, 0],
					215: [.13333, .63333, 0, 0],
					247: [.13333, .63333, 0, 0],
					305: [0, .44444, 0, 0],
					567: [.19444, .44444, 0, 0],
					710: [0, .69444, 0, 0],
					711: [0, .63194, 0, 0],
					713: [0, .59611, 0, 0],
					714: [0, .69444, 0, 0],
					715: [0, .69444, 0, 0],
					728: [0, .69444, 0, 0],
					729: [0, .69444, 0, 0],
					730: [0, .69444, 0, 0],
					732: [0, .69444, 0, 0],
					768: [0, .69444, 0, 0],
					769: [0, .69444, 0, 0],
					770: [0, .69444, 0, 0],
					771: [0, .69444, 0, 0],
					772: [0, .59611, 0, 0],
					774: [0, .69444, 0, 0],
					775: [0, .69444, 0, 0],
					776: [0, .69444, 0, 0],
					778: [0, .69444, 0, 0],
					779: [0, .69444, 0, 0],
					780: [0, .63194, 0, 0],
					824: [.19444, .69444, 0, 0],
					915: [0, .68611, 0, 0],
					916: [0, .68611, 0, 0],
					920: [0, .68611, 0, 0],
					923: [0, .68611, 0, 0],
					926: [0, .68611, 0, 0],
					928: [0, .68611, 0, 0],
					931: [0, .68611, 0, 0],
					933: [0, .68611, 0, 0],
					934: [0, .68611, 0, 0],
					936: [0, .68611, 0, 0],
					937: [0, .68611, 0, 0],
					8211: [0, .44444, .03194, 0],
					8212: [0, .44444, .03194, 0],
					8216: [0, .69444, 0, 0],
					8217: [0, .69444, 0, 0],
					8220: [0, .69444, 0, 0],
					8221: [0, .69444, 0, 0],
					8224: [.19444, .69444, 0, 0],
					8225: [.19444, .69444, 0, 0],
					8242: [0, .55556, 0, 0],
					8407: [0, .72444, .15486, 0],
					8463: [0, .69444, 0, 0],
					8465: [0, .69444, 0, 0],
					8467: [0, .69444, 0, 0],
					8472: [.19444, .44444, 0, 0],
					8476: [0, .69444, 0, 0],
					8501: [0, .69444, 0, 0],
					8592: [-.10889, .39111, 0, 0],
					8593: [.19444, .69444, 0, 0],
					8594: [-.10889, .39111, 0, 0],
					8595: [.19444, .69444, 0, 0],
					8596: [-.10889, .39111, 0, 0],
					8597: [.25, .75, 0, 0],
					8598: [.19444, .69444, 0, 0],
					8599: [.19444, .69444, 0, 0],
					8600: [.19444, .69444, 0, 0],
					8601: [.19444, .69444, 0, 0],
					8636: [-.10889, .39111, 0, 0],
					8637: [-.10889, .39111, 0, 0],
					8640: [-.10889, .39111, 0, 0],
					8641: [-.10889, .39111, 0, 0],
					8656: [-.10889, .39111, 0, 0],
					8657: [.19444, .69444, 0, 0],
					8658: [-.10889, .39111, 0, 0],
					8659: [.19444, .69444, 0, 0],
					8660: [-.10889, .39111, 0, 0],
					8661: [.25, .75, 0, 0],
					8704: [0, .69444, 0, 0],
					8706: [0, .69444, .06389, 0],
					8707: [0, .69444, 0, 0],
					8709: [.05556, .75, 0, 0],
					8711: [0, .68611, 0, 0],
					8712: [.08556, .58556, 0, 0],
					8715: [.08556, .58556, 0, 0],
					8722: [.13333, .63333, 0, 0],
					8723: [.13333, .63333, 0, 0],
					8725: [.25, .75, 0, 0],
					8726: [.25, .75, 0, 0],
					8727: [-.02778, .47222, 0, 0],
					8728: [-.02639, .47361, 0, 0],
					8729: [-.02639, .47361, 0, 0],
					8730: [.18, .82, 0, 0],
					8733: [0, .44444, 0, 0],
					8734: [0, .44444, 0, 0],
					8736: [0, .69224, 0, 0],
					8739: [.25, .75, 0, 0],
					8741: [.25, .75, 0, 0],
					8743: [0, .55556, 0, 0],
					8744: [0, .55556, 0, 0],
					8745: [0, .55556, 0, 0],
					8746: [0, .55556, 0, 0],
					8747: [.19444, .69444, .12778, 0],
					8764: [-.10889, .39111, 0, 0],
					8768: [.19444, .69444, 0, 0],
					8771: [.00222, .50222, 0, 0],
					8776: [.02444, .52444, 0, 0],
					8781: [.00222, .50222, 0, 0],
					8801: [.00222, .50222, 0, 0],
					8804: [.19667, .69667, 0, 0],
					8805: [.19667, .69667, 0, 0],
					8810: [.08556, .58556, 0, 0],
					8811: [.08556, .58556, 0, 0],
					8826: [.08556, .58556, 0, 0],
					8827: [.08556, .58556, 0, 0],
					8834: [.08556, .58556, 0, 0],
					8835: [.08556, .58556, 0, 0],
					8838: [.19667, .69667, 0, 0],
					8839: [.19667, .69667, 0, 0],
					8846: [0, .55556, 0, 0],
					8849: [.19667, .69667, 0, 0],
					8850: [.19667, .69667, 0, 0],
					8851: [0, .55556, 0, 0],
					8852: [0, .55556, 0, 0],
					8853: [.13333, .63333, 0, 0],
					8854: [.13333, .63333, 0, 0],
					8855: [.13333, .63333, 0, 0],
					8856: [.13333, .63333, 0, 0],
					8857: [.13333, .63333, 0, 0],
					8866: [0, .69444, 0, 0],
					8867: [0, .69444, 0, 0],
					8868: [0, .69444, 0, 0],
					8869: [0, .69444, 0, 0],
					8900: [-.02639, .47361, 0, 0],
					8901: [-.02639, .47361, 0, 0],
					8902: [-.02778, .47222, 0, 0],
					8968: [.25, .75, 0, 0],
					8969: [.25, .75, 0, 0],
					8970: [.25, .75, 0, 0],
					8971: [.25, .75, 0, 0],
					8994: [-.13889, .36111, 0, 0],
					8995: [-.13889, .36111, 0, 0],
					9651: [.19444, .69444, 0, 0],
					9657: [-.02778, .47222, 0, 0],
					9661: [.19444, .69444, 0, 0],
					9667: [-.02778, .47222, 0, 0],
					9711: [.19444, .69444, 0, 0],
					9824: [.12963, .69444, 0, 0],
					9825: [.12963, .69444, 0, 0],
					9826: [.12963, .69444, 0, 0],
					9827: [.12963, .69444, 0, 0],
					9837: [0, .75, 0, 0],
					9838: [.19444, .69444, 0, 0],
					9839: [.19444, .69444, 0, 0],
					10216: [.25, .75, 0, 0],
					10217: [.25, .75, 0, 0],
					10815: [0, .68611, 0, 0],
					10927: [.19667, .69667, 0, 0],
					10928: [.19667, .69667, 0, 0]
				},
				"Main-Italic": {
					33: [0, .69444, .12417, 0],
					34: [0, .69444, .06961, 0],
					35: [.19444, .69444, .06616, 0],
					37: [.05556, .75, .13639, 0],
					38: [0, .69444, .09694, 0],
					39: [0, .69444, .12417, 0],
					40: [.25, .75, .16194, 0],
					41: [.25, .75, .03694, 0],
					42: [0, .75, .14917, 0],
					43: [.05667, .56167, .03694, 0],
					44: [.19444, .10556, 0, 0],
					45: [0, .43056, .02826, 0],
					46: [0, .10556, 0, 0],
					47: [.25, .75, .16194, 0],
					48: [0, .64444, .13556, 0],
					49: [0, .64444, .13556, 0],
					50: [0, .64444, .13556, 0],
					51: [0, .64444, .13556, 0],
					52: [.19444, .64444, .13556, 0],
					53: [0, .64444, .13556, 0],
					54: [0, .64444, .13556, 0],
					55: [.19444, .64444, .13556, 0],
					56: [0, .64444, .13556, 0],
					57: [0, .64444, .13556, 0],
					58: [0, .43056, .0582, 0],
					59: [.19444, .43056, .0582, 0],
					61: [-.13313, .36687, .06616, 0],
					63: [0, .69444, .1225, 0],
					64: [0, .69444, .09597, 0],
					65: [0, .68333, 0, 0],
					66: [0, .68333, .10257, 0],
					67: [0, .68333, .14528, 0],
					68: [0, .68333, .09403, 0],
					69: [0, .68333, .12028, 0],
					70: [0, .68333, .13305, 0],
					71: [0, .68333, .08722, 0],
					72: [0, .68333, .16389, 0],
					73: [0, .68333, .15806, 0],
					74: [0, .68333, .14028, 0],
					75: [0, .68333, .14528, 0],
					76: [0, .68333, 0, 0],
					77: [0, .68333, .16389, 0],
					78: [0, .68333, .16389, 0],
					79: [0, .68333, .09403, 0],
					80: [0, .68333, .10257, 0],
					81: [.19444, .68333, .09403, 0],
					82: [0, .68333, .03868, 0],
					83: [0, .68333, .11972, 0],
					84: [0, .68333, .13305, 0],
					85: [0, .68333, .16389, 0],
					86: [0, .68333, .18361, 0],
					87: [0, .68333, .18361, 0],
					88: [0, .68333, .15806, 0],
					89: [0, .68333, .19383, 0],
					90: [0, .68333, .14528, 0],
					91: [.25, .75, .1875, 0],
					93: [.25, .75, .10528, 0],
					94: [0, .69444, .06646, 0],
					95: [.31, .12056, .09208, 0],
					97: [0, .43056, .07671, 0],
					98: [0, .69444, .06312, 0],
					99: [0, .43056, .05653, 0],
					100: [0, .69444, .10333, 0],
					101: [0, .43056, .07514, 0],
					102: [.19444, .69444, .21194, 0],
					103: [.19444, .43056, .08847, 0],
					104: [0, .69444, .07671, 0],
					105: [0, .65536, .1019, 0],
					106: [.19444, .65536, .14467, 0],
					107: [0, .69444, .10764, 0],
					108: [0, .69444, .10333, 0],
					109: [0, .43056, .07671, 0],
					110: [0, .43056, .07671, 0],
					111: [0, .43056, .06312, 0],
					112: [.19444, .43056, .06312, 0],
					113: [.19444, .43056, .08847, 0],
					114: [0, .43056, .10764, 0],
					115: [0, .43056, .08208, 0],
					116: [0, .61508, .09486, 0],
					117: [0, .43056, .07671, 0],
					118: [0, .43056, .10764, 0],
					119: [0, .43056, .10764, 0],
					120: [0, .43056, .12042, 0],
					121: [.19444, .43056, .08847, 0],
					122: [0, .43056, .12292, 0],
					126: [.35, .31786, .11585, 0],
					163: [0, .69444, 0, 0],
					305: [0, .43056, 0, .02778],
					567: [.19444, .43056, 0, .08334],
					768: [0, .69444, 0, 0],
					769: [0, .69444, .09694, 0],
					770: [0, .69444, .06646, 0],
					771: [0, .66786, .11585, 0],
					772: [0, .56167, .10333, 0],
					774: [0, .69444, .10806, 0],
					775: [0, .66786, .11752, 0],
					776: [0, .66786, .10474, 0],
					778: [0, .69444, 0, 0],
					779: [0, .69444, .1225, 0],
					780: [0, .62847, .08295, 0],
					915: [0, .68333, .13305, 0],
					916: [0, .68333, 0, 0],
					920: [0, .68333, .09403, 0],
					923: [0, .68333, 0, 0],
					926: [0, .68333, .15294, 0],
					928: [0, .68333, .16389, 0],
					931: [0, .68333, .12028, 0],
					933: [0, .68333, .11111, 0],
					934: [0, .68333, .05986, 0],
					936: [0, .68333, .11111, 0],
					937: [0, .68333, .10257, 0],
					8211: [0, .43056, .09208, 0],
					8212: [0, .43056, .09208, 0],
					8216: [0, .69444, .12417, 0],
					8217: [0, .69444, .12417, 0],
					8220: [0, .69444, .1685, 0],
					8221: [0, .69444, .06961, 0],
					8463: [0, .68889, 0, 0]
				},
				"Main-Regular": {
					32: [0, 0, 0, 0],
					33: [0, .69444, 0, 0],
					34: [0, .69444, 0, 0],
					35: [.19444, .69444, 0, 0],
					36: [.05556, .75, 0, 0],
					37: [.05556, .75, 0, 0],
					38: [0, .69444, 0, 0],
					39: [0, .69444, 0, 0],
					40: [.25, .75, 0, 0],
					41: [.25, .75, 0, 0],
					42: [0, .75, 0, 0],
					43: [.08333, .58333, 0, 0],
					44: [.19444, .10556, 0, 0],
					45: [0, .43056, 0, 0],
					46: [0, .10556, 0, 0],
					47: [.25, .75, 0, 0],
					48: [0, .64444, 0, 0],
					49: [0, .64444, 0, 0],
					50: [0, .64444, 0, 0],
					51: [0, .64444, 0, 0],
					52: [0, .64444, 0, 0],
					53: [0, .64444, 0, 0],
					54: [0, .64444, 0, 0],
					55: [0, .64444, 0, 0],
					56: [0, .64444, 0, 0],
					57: [0, .64444, 0, 0],
					58: [0, .43056, 0, 0],
					59: [.19444, .43056, 0, 0],
					60: [.0391, .5391, 0, 0],
					61: [-.13313, .36687, 0, 0],
					62: [.0391, .5391, 0, 0],
					63: [0, .69444, 0, 0],
					64: [0, .69444, 0, 0],
					65: [0, .68333, 0, 0],
					66: [0, .68333, 0, 0],
					67: [0, .68333, 0, 0],
					68: [0, .68333, 0, 0],
					69: [0, .68333, 0, 0],
					70: [0, .68333, 0, 0],
					71: [0, .68333, 0, 0],
					72: [0, .68333, 0, 0],
					73: [0, .68333, 0, 0],
					74: [0, .68333, 0, 0],
					75: [0, .68333, 0, 0],
					76: [0, .68333, 0, 0],
					77: [0, .68333, 0, 0],
					78: [0, .68333, 0, 0],
					79: [0, .68333, 0, 0],
					80: [0, .68333, 0, 0],
					81: [.19444, .68333, 0, 0],
					82: [0, .68333, 0, 0],
					83: [0, .68333, 0, 0],
					84: [0, .68333, 0, 0],
					85: [0, .68333, 0, 0],
					86: [0, .68333, .01389, 0],
					87: [0, .68333, .01389, 0],
					88: [0, .68333, 0, 0],
					89: [0, .68333, .025, 0],
					90: [0, .68333, 0, 0],
					91: [.25, .75, 0, 0],
					92: [.25, .75, 0, 0],
					93: [.25, .75, 0, 0],
					94: [0, .69444, 0, 0],
					95: [.31, .12056, .02778, 0],
					96: [0, .69444, 0, 0],
					97: [0, .43056, 0, 0],
					98: [0, .69444, 0, 0],
					99: [0, .43056, 0, 0],
					100: [0, .69444, 0, 0],
					101: [0, .43056, 0, 0],
					102: [0, .69444, .07778, 0],
					103: [.19444, .43056, .01389, 0],
					104: [0, .69444, 0, 0],
					105: [0, .66786, 0, 0],
					106: [.19444, .66786, 0, 0],
					107: [0, .69444, 0, 0],
					108: [0, .69444, 0, 0],
					109: [0, .43056, 0, 0],
					110: [0, .43056, 0, 0],
					111: [0, .43056, 0, 0],
					112: [.19444, .43056, 0, 0],
					113: [.19444, .43056, 0, 0],
					114: [0, .43056, 0, 0],
					115: [0, .43056, 0, 0],
					116: [0, .61508, 0, 0],
					117: [0, .43056, 0, 0],
					118: [0, .43056, .01389, 0],
					119: [0, .43056, .01389, 0],
					120: [0, .43056, 0, 0],
					121: [.19444, .43056, .01389, 0],
					122: [0, .43056, 0, 0],
					123: [.25, .75, 0, 0],
					124: [.25, .75, 0, 0],
					125: [.25, .75, 0, 0],
					126: [.35, .31786, 0, 0],
					160: [0, 0, 0, 0],
					168: [0, .66786, 0, 0],
					172: [0, .43056, 0, 0],
					175: [0, .56778, 0, 0],
					176: [0, .69444, 0, 0],
					177: [.08333, .58333, 0, 0],
					180: [0, .69444, 0, 0],
					215: [.08333, .58333, 0, 0],
					247: [.08333, .58333, 0, 0],
					305: [0, .43056, 0, 0],
					567: [.19444, .43056, 0, 0],
					710: [0, .69444, 0, 0],
					711: [0, .62847, 0, 0],
					713: [0, .56778, 0, 0],
					714: [0, .69444, 0, 0],
					715: [0, .69444, 0, 0],
					728: [0, .69444, 0, 0],
					729: [0, .66786, 0, 0],
					730: [0, .69444, 0, 0],
					732: [0, .66786, 0, 0],
					768: [0, .69444, 0, 0],
					769: [0, .69444, 0, 0],
					770: [0, .69444, 0, 0],
					771: [0, .66786, 0, 0],
					772: [0, .56778, 0, 0],
					774: [0, .69444, 0, 0],
					775: [0, .66786, 0, 0],
					776: [0, .66786, 0, 0],
					778: [0, .69444, 0, 0],
					779: [0, .69444, 0, 0],
					780: [0, .62847, 0, 0],
					824: [.19444, .69444, 0, 0],
					915: [0, .68333, 0, 0],
					916: [0, .68333, 0, 0],
					920: [0, .68333, 0, 0],
					923: [0, .68333, 0, 0],
					926: [0, .68333, 0, 0],
					928: [0, .68333, 0, 0],
					931: [0, .68333, 0, 0],
					933: [0, .68333, 0, 0],
					934: [0, .68333, 0, 0],
					936: [0, .68333, 0, 0],
					937: [0, .68333, 0, 0],
					8211: [0, .43056, .02778, 0],
					8212: [0, .43056, .02778, 0],
					8216: [0, .69444, 0, 0],
					8217: [0, .69444, 0, 0],
					8220: [0, .69444, 0, 0],
					8221: [0, .69444, 0, 0],
					8224: [.19444, .69444, 0, 0],
					8225: [.19444, .69444, 0, 0],
					8230: [0, .12, 0, 0],
					8242: [0, .55556, 0, 0],
					8407: [0, .71444, .15382, 0],
					8463: [0, .68889, 0, 0],
					8465: [0, .69444, 0, 0],
					8467: [0, .69444, 0, .11111],
					8472: [.19444, .43056, 0, .11111],
					8476: [0, .69444, 0, 0],
					8501: [0, .69444, 0, 0],
					8592: [-.13313, .36687, 0, 0],
					8593: [.19444, .69444, 0, 0],
					8594: [-.13313, .36687, 0, 0],
					8595: [.19444, .69444, 0, 0],
					8596: [-.13313, .36687, 0, 0],
					8597: [.25, .75, 0, 0],
					8598: [.19444, .69444, 0, 0],
					8599: [.19444, .69444, 0, 0],
					8600: [.19444, .69444, 0, 0],
					8601: [.19444, .69444, 0, 0],
					8614: [.011, .511, 0, 0],
					8617: [.011, .511, 0, 0],
					8618: [.011, .511, 0, 0],
					8636: [-.13313, .36687, 0, 0],
					8637: [-.13313, .36687, 0, 0],
					8640: [-.13313, .36687, 0, 0],
					8641: [-.13313, .36687, 0, 0],
					8652: [.011, .671, 0, 0],
					8656: [-.13313, .36687, 0, 0],
					8657: [.19444, .69444, 0, 0],
					8658: [-.13313, .36687, 0, 0],
					8659: [.19444, .69444, 0, 0],
					8660: [-.13313, .36687, 0, 0],
					8661: [.25, .75, 0, 0],
					8704: [0, .69444, 0, 0],
					8706: [0, .69444, .05556, .08334],
					8707: [0, .69444, 0, 0],
					8709: [.05556, .75, 0, 0],
					8711: [0, .68333, 0, 0],
					8712: [.0391, .5391, 0, 0],
					8715: [.0391, .5391, 0, 0],
					8722: [.08333, .58333, 0, 0],
					8723: [.08333, .58333, 0, 0],
					8725: [.25, .75, 0, 0],
					8726: [.25, .75, 0, 0],
					8727: [-.03472, .46528, 0, 0],
					8728: [-.05555, .44445, 0, 0],
					8729: [-.05555, .44445, 0, 0],
					8730: [.2, .8, 0, 0],
					8733: [0, .43056, 0, 0],
					8734: [0, .43056, 0, 0],
					8736: [0, .69224, 0, 0],
					8739: [.25, .75, 0, 0],
					8741: [.25, .75, 0, 0],
					8743: [0, .55556, 0, 0],
					8744: [0, .55556, 0, 0],
					8745: [0, .55556, 0, 0],
					8746: [0, .55556, 0, 0],
					8747: [.19444, .69444, .11111, 0],
					8764: [-.13313, .36687, 0, 0],
					8768: [.19444, .69444, 0, 0],
					8771: [-.03625, .46375, 0, 0],
					8773: [-.022, .589, 0, 0],
					8776: [-.01688, .48312, 0, 0],
					8781: [-.03625, .46375, 0, 0],
					8784: [-.133, .67, 0, 0],
					8800: [.215, .716, 0, 0],
					8801: [-.03625, .46375, 0, 0],
					8804: [.13597, .63597, 0, 0],
					8805: [.13597, .63597, 0, 0],
					8810: [.0391, .5391, 0, 0],
					8811: [.0391, .5391, 0, 0],
					8826: [.0391, .5391, 0, 0],
					8827: [.0391, .5391, 0, 0],
					8834: [.0391, .5391, 0, 0],
					8835: [.0391, .5391, 0, 0],
					8838: [.13597, .63597, 0, 0],
					8839: [.13597, .63597, 0, 0],
					8846: [0, .55556, 0, 0],
					8849: [.13597, .63597, 0, 0],
					8850: [.13597, .63597, 0, 0],
					8851: [0, .55556, 0, 0],
					8852: [0, .55556, 0, 0],
					8853: [.08333, .58333, 0, 0],
					8854: [.08333, .58333, 0, 0],
					8855: [.08333, .58333, 0, 0],
					8856: [.08333, .58333, 0, 0],
					8857: [.08333, .58333, 0, 0],
					8866: [0, .69444, 0, 0],
					8867: [0, .69444, 0, 0],
					8868: [0, .69444, 0, 0],
					8869: [0, .69444, 0, 0],
					8872: [.249, .75, 0, 0],
					8900: [-.05555, .44445, 0, 0],
					8901: [-.05555, .44445, 0, 0],
					8902: [-.03472, .46528, 0, 0],
					8904: [.005, .505, 0, 0],
					8942: [.03, .9, 0, 0],
					8943: [-.19, .31, 0, 0],
					8945: [-.1, .82, 0, 0],
					8968: [.25, .75, 0, 0],
					8969: [.25, .75, 0, 0],
					8970: [.25, .75, 0, 0],
					8971: [.25, .75, 0, 0],
					8994: [-.14236, .35764, 0, 0],
					8995: [-.14236, .35764, 0, 0],
					9136: [.244, .744, 0, 0],
					9137: [.244, .744, 0, 0],
					9651: [.19444, .69444, 0, 0],
					9657: [-.03472, .46528, 0, 0],
					9661: [.19444, .69444, 0, 0],
					9667: [-.03472, .46528, 0, 0],
					9711: [.19444, .69444, 0, 0],
					9824: [.12963, .69444, 0, 0],
					9825: [.12963, .69444, 0, 0],
					9826: [.12963, .69444, 0, 0],
					9827: [.12963, .69444, 0, 0],
					9837: [0, .75, 0, 0],
					9838: [.19444, .69444, 0, 0],
					9839: [.19444, .69444, 0, 0],
					10216: [.25, .75, 0, 0],
					10217: [.25, .75, 0, 0],
					10222: [.244, .744, 0, 0],
					10223: [.244, .744, 0, 0],
					10229: [.011, .511, 0, 0],
					10230: [.011, .511, 0, 0],
					10231: [.011, .511, 0, 0],
					10232: [.024, .525, 0, 0],
					10233: [.024, .525, 0, 0],
					10234: [.024, .525, 0, 0],
					10236: [.011, .511, 0, 0],
					10815: [0, .68333, 0, 0],
					10927: [.13597, .63597, 0, 0],
					10928: [.13597, .63597, 0, 0]
				},
				"Math-BoldItalic": {
					47: [.19444, .69444, 0, 0],
					65: [0, .68611, 0, 0],
					66: [0, .68611, .04835, 0],
					67: [0, .68611, .06979, 0],
					68: [0, .68611, .03194, 0],
					69: [0, .68611, .05451, 0],
					70: [0, .68611, .15972, 0],
					71: [0, .68611, 0, 0],
					72: [0, .68611, .08229, 0],
					73: [0, .68611, .07778, 0],
					74: [0, .68611, .10069, 0],
					75: [0, .68611, .06979, 0],
					76: [0, .68611, 0, 0],
					77: [0, .68611, .11424, 0],
					78: [0, .68611, .11424, 0],
					79: [0, .68611, .03194, 0],
					80: [0, .68611, .15972, 0],
					81: [.19444, .68611, 0, 0],
					82: [0, .68611, .00421, 0],
					83: [0, .68611, .05382, 0],
					84: [0, .68611, .15972, 0],
					85: [0, .68611, .11424, 0],
					86: [0, .68611, .25555, 0],
					87: [0, .68611, .15972, 0],
					88: [0, .68611, .07778, 0],
					89: [0, .68611, .25555, 0],
					90: [0, .68611, .06979, 0],
					97: [0, .44444, 0, 0],
					98: [0, .69444, 0, 0],
					99: [0, .44444, 0, 0],
					100: [0, .69444, 0, 0],
					101: [0, .44444, 0, 0],
					102: [.19444, .69444, .11042, 0],
					103: [.19444, .44444, .03704, 0],
					104: [0, .69444, 0, 0],
					105: [0, .69326, 0, 0],
					106: [.19444, .69326, .0622, 0],
					107: [0, .69444, .01852, 0],
					108: [0, .69444, .0088, 0],
					109: [0, .44444, 0, 0],
					110: [0, .44444, 0, 0],
					111: [0, .44444, 0, 0],
					112: [.19444, .44444, 0, 0],
					113: [.19444, .44444, .03704, 0],
					114: [0, .44444, .03194, 0],
					115: [0, .44444, 0, 0],
					116: [0, .63492, 0, 0],
					117: [0, .44444, 0, 0],
					118: [0, .44444, .03704, 0],
					119: [0, .44444, .02778, 0],
					120: [0, .44444, 0, 0],
					121: [.19444, .44444, .03704, 0],
					122: [0, .44444, .04213, 0],
					915: [0, .68611, .15972, 0],
					916: [0, .68611, 0, 0],
					920: [0, .68611, .03194, 0],
					923: [0, .68611, 0, 0],
					926: [0, .68611, .07458, 0],
					928: [0, .68611, .08229, 0],
					931: [0, .68611, .05451, 0],
					933: [0, .68611, .15972, 0],
					934: [0, .68611, 0, 0],
					936: [0, .68611, .11653, 0],
					937: [0, .68611, .04835, 0],
					945: [0, .44444, 0, 0],
					946: [.19444, .69444, .03403, 0],
					947: [.19444, .44444, .06389, 0],
					948: [0, .69444, .03819, 0],
					949: [0, .44444, 0, 0],
					950: [.19444, .69444, .06215, 0],
					951: [.19444, .44444, .03704, 0],
					952: [0, .69444, .03194, 0],
					953: [0, .44444, 0, 0],
					954: [0, .44444, 0, 0],
					955: [0, .69444, 0, 0],
					956: [.19444, .44444, 0, 0],
					957: [0, .44444, .06898, 0],
					958: [.19444, .69444, .03021, 0],
					959: [0, .44444, 0, 0],
					960: [0, .44444, .03704, 0],
					961: [.19444, .44444, 0, 0],
					962: [.09722, .44444, .07917, 0],
					963: [0, .44444, .03704, 0],
					964: [0, .44444, .13472, 0],
					965: [0, .44444, .03704, 0],
					966: [.19444, .44444, 0, 0],
					967: [.19444, .44444, 0, 0],
					968: [.19444, .69444, .03704, 0],
					969: [0, .44444, .03704, 0],
					977: [0, .69444, 0, 0],
					981: [.19444, .69444, 0, 0],
					982: [0, .44444, .03194, 0],
					1009: [.19444, .44444, 0, 0],
					1013: [0, .44444, 0, 0]
				},
				"Math-Italic": {
					47: [.19444, .69444, 0, 0],
					65: [0, .68333, 0, .13889],
					66: [0, .68333, .05017, .08334],
					67: [0, .68333, .07153, .08334],
					68: [0, .68333, .02778, .05556],
					69: [0, .68333, .05764, .08334],
					70: [0, .68333, .13889, .08334],
					71: [0, .68333, 0, .08334],
					72: [0, .68333, .08125, .05556],
					73: [0, .68333, .07847, .11111],
					74: [0, .68333, .09618, .16667],
					75: [0, .68333, .07153, .05556],
					76: [0, .68333, 0, .02778],
					77: [0, .68333, .10903, .08334],
					78: [0, .68333, .10903, .08334],
					79: [0, .68333, .02778, .08334],
					80: [0, .68333, .13889, .08334],
					81: [.19444, .68333, 0, .08334],
					82: [0, .68333, .00773, .08334],
					83: [0, .68333, .05764, .08334],
					84: [0, .68333, .13889, .08334],
					85: [0, .68333, .10903, .02778],
					86: [0, .68333, .22222, 0],
					87: [0, .68333, .13889, 0],
					88: [0, .68333, .07847, .08334],
					89: [0, .68333, .22222, 0],
					90: [0, .68333, .07153, .08334],
					97: [0, .43056, 0, 0],
					98: [0, .69444, 0, 0],
					99: [0, .43056, 0, .05556],
					100: [0, .69444, 0, .16667],
					101: [0, .43056, 0, .05556],
					102: [.19444, .69444, .10764, .16667],
					103: [.19444, .43056, .03588, .02778],
					104: [0, .69444, 0, 0],
					105: [0, .65952, 0, 0],
					106: [.19444, .65952, .05724, 0],
					107: [0, .69444, .03148, 0],
					108: [0, .69444, .01968, .08334],
					109: [0, .43056, 0, 0],
					110: [0, .43056, 0, 0],
					111: [0, .43056, 0, .05556],
					112: [.19444, .43056, 0, .08334],
					113: [.19444, .43056, .03588, .08334],
					114: [0, .43056, .02778, .05556],
					115: [0, .43056, 0, .05556],
					116: [0, .61508, 0, .08334],
					117: [0, .43056, 0, .02778],
					118: [0, .43056, .03588, .02778],
					119: [0, .43056, .02691, .08334],
					120: [0, .43056, 0, .02778],
					121: [.19444, .43056, .03588, .05556],
					122: [0, .43056, .04398, .05556],
					915: [0, .68333, .13889, .08334],
					916: [0, .68333, 0, .16667],
					920: [0, .68333, .02778, .08334],
					923: [0, .68333, 0, .16667],
					926: [0, .68333, .07569, .08334],
					928: [0, .68333, .08125, .05556],
					931: [0, .68333, .05764, .08334],
					933: [0, .68333, .13889, .05556],
					934: [0, .68333, 0, .08334],
					936: [0, .68333, .11, .05556],
					937: [0, .68333, .05017, .08334],
					945: [0, .43056, .0037, .02778],
					946: [.19444, .69444, .05278, .08334],
					947: [.19444, .43056, .05556, 0],
					948: [0, .69444, .03785, .05556],
					949: [0, .43056, 0, .08334],
					950: [.19444, .69444, .07378, .08334],
					951: [.19444, .43056, .03588, .05556],
					952: [0, .69444, .02778, .08334],
					953: [0, .43056, 0, .05556],
					954: [0, .43056, 0, 0],
					955: [0, .69444, 0, 0],
					956: [.19444, .43056, 0, .02778],
					957: [0, .43056, .06366, .02778],
					958: [.19444, .69444, .04601, .11111],
					959: [0, .43056, 0, .05556],
					960: [0, .43056, .03588, 0],
					961: [.19444, .43056, 0, .08334],
					962: [.09722, .43056, .07986, .08334],
					963: [0, .43056, .03588, 0],
					964: [0, .43056, .1132, .02778],
					965: [0, .43056, .03588, .02778],
					966: [.19444, .43056, 0, .08334],
					967: [.19444, .43056, 0, .05556],
					968: [.19444, .69444, .03588, .11111],
					969: [0, .43056, .03588, 0],
					977: [0, .69444, 0, .08334],
					981: [.19444, .69444, 0, .08334],
					982: [0, .43056, .02778, 0],
					1009: [.19444, .43056, 0, .08334],
					1013: [0, .43056, 0, .05556]
				},
				"Math-Regular": {
					65: [0, .68333, 0, .13889],
					66: [0, .68333, .05017, .08334],
					67: [0, .68333, .07153, .08334],
					68: [0, .68333, .02778, .05556],
					69: [0, .68333, .05764, .08334],
					70: [0, .68333, .13889, .08334],
					71: [0, .68333, 0, .08334],
					72: [0, .68333, .08125, .05556],
					73: [0, .68333, .07847, .11111],
					74: [0, .68333, .09618, .16667],
					75: [0, .68333, .07153, .05556],
					76: [0, .68333, 0, .02778],
					77: [0, .68333, .10903, .08334],
					78: [0, .68333, .10903, .08334],
					79: [0, .68333, .02778, .08334],
					80: [0, .68333, .13889, .08334],
					81: [.19444, .68333, 0, .08334],
					82: [0, .68333, .00773, .08334],
					83: [0, .68333, .05764, .08334],
					84: [0, .68333, .13889, .08334],
					85: [0, .68333, .10903, .02778],
					86: [0, .68333, .22222, 0],
					87: [0, .68333, .13889, 0],
					88: [0, .68333, .07847, .08334],
					89: [0, .68333, .22222, 0],
					90: [0, .68333, .07153, .08334],
					97: [0, .43056, 0, 0],
					98: [0, .69444, 0, 0],
					99: [0, .43056, 0, .05556],
					100: [0, .69444, 0, .16667],
					101: [0, .43056, 0, .05556],
					102: [.19444, .69444, .10764, .16667],
					103: [.19444, .43056, .03588, .02778],
					104: [0, .69444, 0, 0],
					105: [0, .65952, 0, 0],
					106: [.19444, .65952, .05724, 0],
					107: [0, .69444, .03148, 0],
					108: [0, .69444, .01968, .08334],
					109: [0, .43056, 0, 0],
					110: [0, .43056, 0, 0],
					111: [0, .43056, 0, .05556],
					112: [.19444, .43056, 0, .08334],
					113: [.19444, .43056, .03588, .08334],
					114: [0, .43056, .02778, .05556],
					115: [0, .43056, 0, .05556],
					116: [0, .61508, 0, .08334],
					117: [0, .43056, 0, .02778],
					118: [0, .43056, .03588, .02778],
					119: [0, .43056, .02691, .08334],
					120: [0, .43056, 0, .02778],
					121: [.19444, .43056, .03588, .05556],
					122: [0, .43056, .04398, .05556],
					915: [0, .68333, .13889, .08334],
					916: [0, .68333, 0, .16667],
					920: [0, .68333, .02778, .08334],
					923: [0, .68333, 0, .16667],
					926: [0, .68333, .07569, .08334],
					928: [0, .68333, .08125, .05556],
					931: [0, .68333, .05764, .08334],
					933: [0, .68333, .13889, .05556],
					934: [0, .68333, 0, .08334],
					936: [0, .68333, .11, .05556],
					937: [0, .68333, .05017, .08334],
					945: [0, .43056, .0037, .02778],
					946: [.19444, .69444, .05278, .08334],
					947: [.19444, .43056, .05556, 0],
					948: [0, .69444, .03785, .05556],
					949: [0, .43056, 0, .08334],
					950: [.19444, .69444, .07378, .08334],
					951: [.19444, .43056, .03588, .05556],
					952: [0, .69444, .02778, .08334],
					953: [0, .43056, 0, .05556],
					954: [0, .43056, 0, 0],
					955: [0, .69444, 0, 0],
					956: [.19444, .43056, 0, .02778],
					957: [0, .43056, .06366, .02778],
					958: [.19444, .69444, .04601, .11111],
					959: [0, .43056, 0, .05556],
					960: [0, .43056, .03588, 0],
					961: [.19444, .43056, 0, .08334],
					962: [.09722, .43056, .07986, .08334],
					963: [0, .43056, .03588, 0],
					964: [0, .43056, .1132, .02778],
					965: [0, .43056, .03588, .02778],
					966: [.19444, .43056, 0, .08334],
					967: [.19444, .43056, 0, .05556],
					968: [.19444, .69444, .03588, .11111],
					969: [0, .43056, .03588, 0],
					977: [0, .69444, 0, .08334],
					981: [.19444, .69444, 0, .08334],
					982: [0, .43056, .02778, 0],
					1009: [.19444, .43056, 0, .08334],
					1013: [0, .43056, 0, .05556]
				},
				"SansSerif-Regular": {
					33: [0, .69444, 0, 0],
					34: [0, .69444, 0, 0],
					35: [.19444, .69444, 0, 0],
					36: [.05556, .75, 0, 0],
					37: [.05556, .75, 0, 0],
					38: [0, .69444, 0, 0],
					39: [0, .69444, 0, 0],
					40: [.25, .75, 0, 0],
					41: [.25, .75, 0, 0],
					42: [0, .75, 0, 0],
					43: [.08333, .58333, 0, 0],
					44: [.125, .08333, 0, 0],
					45: [0, .44444, 0, 0],
					46: [0, .08333, 0, 0],
					47: [.25, .75, 0, 0],
					48: [0, .65556, 0, 0],
					49: [0, .65556, 0, 0],
					50: [0, .65556, 0, 0],
					51: [0, .65556, 0, 0],
					52: [0, .65556, 0, 0],
					53: [0, .65556, 0, 0],
					54: [0, .65556, 0, 0],
					55: [0, .65556, 0, 0],
					56: [0, .65556, 0, 0],
					57: [0, .65556, 0, 0],
					58: [0, .44444, 0, 0],
					59: [.125, .44444, 0, 0],
					61: [-.13, .37, 0, 0],
					63: [0, .69444, 0, 0],
					64: [0, .69444, 0, 0],
					65: [0, .69444, 0, 0],
					66: [0, .69444, 0, 0],
					67: [0, .69444, 0, 0],
					68: [0, .69444, 0, 0],
					69: [0, .69444, 0, 0],
					70: [0, .69444, 0, 0],
					71: [0, .69444, 0, 0],
					72: [0, .69444, 0, 0],
					73: [0, .69444, 0, 0],
					74: [0, .69444, 0, 0],
					75: [0, .69444, 0, 0],
					76: [0, .69444, 0, 0],
					77: [0, .69444, 0, 0],
					78: [0, .69444, 0, 0],
					79: [0, .69444, 0, 0],
					80: [0, .69444, 0, 0],
					81: [.125, .69444, 0, 0],
					82: [0, .69444, 0, 0],
					83: [0, .69444, 0, 0],
					84: [0, .69444, 0, 0],
					85: [0, .69444, 0, 0],
					86: [0, .69444, .01389, 0],
					87: [0, .69444, .01389, 0],
					88: [0, .69444, 0, 0],
					89: [0, .69444, .025, 0],
					90: [0, .69444, 0, 0],
					91: [.25, .75, 0, 0],
					93: [.25, .75, 0, 0],
					94: [0, .69444, 0, 0],
					95: [.35, .09444, .02778, 0],
					97: [0, .44444, 0, 0],
					98: [0, .69444, 0, 0],
					99: [0, .44444, 0, 0],
					100: [0, .69444, 0, 0],
					101: [0, .44444, 0, 0],
					102: [0, .69444, .06944, 0],
					103: [.19444, .44444, .01389, 0],
					104: [0, .69444, 0, 0],
					105: [0, .67937, 0, 0],
					106: [.19444, .67937, 0, 0],
					107: [0, .69444, 0, 0],
					108: [0, .69444, 0, 0],
					109: [0, .44444, 0, 0],
					110: [0, .44444, 0, 0],
					111: [0, .44444, 0, 0],
					112: [.19444, .44444, 0, 0],
					113: [.19444, .44444, 0, 0],
					114: [0, .44444, .01389, 0],
					115: [0, .44444, 0, 0],
					116: [0, .57143, 0, 0],
					117: [0, .44444, 0, 0],
					118: [0, .44444, .01389, 0],
					119: [0, .44444, .01389, 0],
					120: [0, .44444, 0, 0],
					121: [.19444, .44444, .01389, 0],
					122: [0, .44444, 0, 0],
					126: [.35, .32659, 0, 0],
					305: [0, .44444, 0, 0],
					567: [.19444, .44444, 0, 0],
					768: [0, .69444, 0, 0],
					769: [0, .69444, 0, 0],
					770: [0, .69444, 0, 0],
					771: [0, .67659, 0, 0],
					772: [0, .60889, 0, 0],
					774: [0, .69444, 0, 0],
					775: [0, .67937, 0, 0],
					776: [0, .67937, 0, 0],
					778: [0, .69444, 0, 0],
					779: [0, .69444, 0, 0],
					780: [0, .63194, 0, 0],
					915: [0, .69444, 0, 0],
					916: [0, .69444, 0, 0],
					920: [0, .69444, 0, 0],
					923: [0, .69444, 0, 0],
					926: [0, .69444, 0, 0],
					928: [0, .69444, 0, 0],
					931: [0, .69444, 0, 0],
					933: [0, .69444, 0, 0],
					934: [0, .69444, 0, 0],
					936: [0, .69444, 0, 0],
					937: [0, .69444, 0, 0],
					8211: [0, .44444, .02778, 0],
					8212: [0, .44444, .02778, 0],
					8216: [0, .69444, 0, 0],
					8217: [0, .69444, 0, 0],
					8220: [0, .69444, 0, 0],
					8221: [0, .69444, 0, 0]
				},
				"Script-Regular": {
					65: [0, .7, .22925, 0],
					66: [0, .7, .04087, 0],
					67: [0, .7, .1689, 0],
					68: [0, .7, .09371, 0],
					69: [0, .7, .18583, 0],
					70: [0, .7, .13634, 0],
					71: [0, .7, .17322, 0],
					72: [0, .7, .29694, 0],
					73: [0, .7, .19189, 0],
					74: [.27778, .7, .19189, 0],
					75: [0, .7, .31259, 0],
					76: [0, .7, .19189, 0],
					77: [0, .7, .15981, 0],
					78: [0, .7, .3525, 0],
					79: [0, .7, .08078, 0],
					80: [0, .7, .08078, 0],
					81: [0, .7, .03305, 0],
					82: [0, .7, .06259, 0],
					83: [0, .7, .19189, 0],
					84: [0, .7, .29087, 0],
					85: [0, .7, .25815, 0],
					86: [0, .7, .27523, 0],
					87: [0, .7, .27523, 0],
					88: [0, .7, .26006, 0],
					89: [0, .7, .2939, 0],
					90: [0, .7, .24037, 0]
				},
				"Size1-Regular": {
					40: [.35001, .85, 0, 0],
					41: [.35001, .85, 0, 0],
					47: [.35001, .85, 0, 0],
					91: [.35001, .85, 0, 0],
					92: [.35001, .85, 0, 0],
					93: [.35001, .85, 0, 0],
					123: [.35001, .85, 0, 0],
					125: [.35001, .85, 0, 0],
					710: [0, .72222, 0, 0],
					732: [0, .72222, 0, 0],
					770: [0, .72222, 0, 0],
					771: [0, .72222, 0, 0],
					8214: [-99e-5, .601, 0, 0],
					8593: [1e-5, .6, 0, 0],
					8595: [1e-5, .6, 0, 0],
					8657: [1e-5, .6, 0, 0],
					8659: [1e-5, .6, 0, 0],
					8719: [.25001, .75, 0, 0],
					8720: [.25001, .75, 0, 0],
					8721: [.25001, .75, 0, 0],
					8730: [.35001, .85, 0, 0],
					8739: [-.00599, .606, 0, 0],
					8741: [-.00599, .606, 0, 0],
					8747: [.30612, .805, .19445, 0],
					8748: [.306, .805, .19445, 0],
					8749: [.306, .805, .19445, 0],
					8750: [.30612, .805, .19445, 0],
					8896: [.25001, .75, 0, 0],
					8897: [.25001, .75, 0, 0],
					8898: [.25001, .75, 0, 0],
					8899: [.25001, .75, 0, 0],
					8968: [.35001, .85, 0, 0],
					8969: [.35001, .85, 0, 0],
					8970: [.35001, .85, 0, 0],
					8971: [.35001, .85, 0, 0],
					9168: [-99e-5, .601, 0, 0],
					10216: [.35001, .85, 0, 0],
					10217: [.35001, .85, 0, 0],
					10752: [.25001, .75, 0, 0],
					10753: [.25001, .75, 0, 0],
					10754: [.25001, .75, 0, 0],
					10756: [.25001, .75, 0, 0],
					10758: [.25001, .75, 0, 0]
				},
				"Size2-Regular": {
					40: [.65002, 1.15, 0, 0],
					41: [.65002, 1.15, 0, 0],
					47: [.65002, 1.15, 0, 0],
					91: [.65002, 1.15, 0, 0],
					92: [.65002, 1.15, 0, 0],
					93: [.65002, 1.15, 0, 0],
					123: [.65002, 1.15, 0, 0],
					125: [.65002, 1.15, 0, 0],
					710: [0, .75, 0, 0],
					732: [0, .75, 0, 0],
					770: [0, .75, 0, 0],
					771: [0, .75, 0, 0],
					8719: [.55001, 1.05, 0, 0],
					8720: [.55001, 1.05, 0, 0],
					8721: [.55001, 1.05, 0, 0],
					8730: [.65002, 1.15, 0, 0],
					8747: [.86225, 1.36, .44445, 0],
					8748: [.862, 1.36, .44445, 0],
					8749: [.862, 1.36, .44445, 0],
					8750: [.86225, 1.36, .44445, 0],
					8896: [.55001, 1.05, 0, 0],
					8897: [.55001, 1.05, 0, 0],
					8898: [.55001, 1.05, 0, 0],
					8899: [.55001, 1.05, 0, 0],
					8968: [.65002, 1.15, 0, 0],
					8969: [.65002, 1.15, 0, 0],
					8970: [.65002, 1.15, 0, 0],
					8971: [.65002, 1.15, 0, 0],
					10216: [.65002, 1.15, 0, 0],
					10217: [.65002, 1.15, 0, 0],
					10752: [.55001, 1.05, 0, 0],
					10753: [.55001, 1.05, 0, 0],
					10754: [.55001, 1.05, 0, 0],
					10756: [.55001, 1.05, 0, 0],
					10758: [.55001, 1.05, 0, 0]
				},
				"Size3-Regular": {
					40: [.95003, 1.45, 0, 0],
					41: [.95003, 1.45, 0, 0],
					47: [.95003, 1.45, 0, 0],
					91: [.95003, 1.45, 0, 0],
					92: [.95003, 1.45, 0, 0],
					93: [.95003, 1.45, 0, 0],
					123: [.95003, 1.45, 0, 0],
					125: [.95003, 1.45, 0, 0],
					710: [0, .75, 0, 0],
					732: [0, .75, 0, 0],
					770: [0, .75, 0, 0],
					771: [0, .75, 0, 0],
					8730: [.95003, 1.45, 0, 0],
					8968: [.95003, 1.45, 0, 0],
					8969: [.95003, 1.45, 0, 0],
					8970: [.95003, 1.45, 0, 0],
					8971: [.95003, 1.45, 0, 0],
					10216: [.95003, 1.45, 0, 0],
					10217: [.95003, 1.45, 0, 0]
				},
				"Size4-Regular": {
					40: [1.25003, 1.75, 0, 0],
					41: [1.25003, 1.75, 0, 0],
					47: [1.25003, 1.75, 0, 0],
					91: [1.25003, 1.75, 0, 0],
					92: [1.25003, 1.75, 0, 0],
					93: [1.25003, 1.75, 0, 0],
					123: [1.25003, 1.75, 0, 0],
					125: [1.25003, 1.75, 0, 0],
					710: [0, .825, 0, 0],
					732: [0, .825, 0, 0],
					770: [0, .825, 0, 0],
					771: [0, .825, 0, 0],
					8730: [1.25003, 1.75, 0, 0],
					8968: [1.25003, 1.75, 0, 0],
					8969: [1.25003, 1.75, 0, 0],
					8970: [1.25003, 1.75, 0, 0],
					8971: [1.25003, 1.75, 0, 0],
					9115: [.64502, 1.155, 0, 0],
					9116: [1e-5, .6, 0, 0],
					9117: [.64502, 1.155, 0, 0],
					9118: [.64502, 1.155, 0, 0],
					9119: [1e-5, .6, 0, 0],
					9120: [.64502, 1.155, 0, 0],
					9121: [.64502, 1.155, 0, 0],
					9122: [-99e-5, .601, 0, 0],
					9123: [.64502, 1.155, 0, 0],
					9124: [.64502, 1.155, 0, 0],
					9125: [-99e-5, .601, 0, 0],
					9126: [.64502, 1.155, 0, 0],
					9127: [1e-5, .9, 0, 0],
					9128: [.65002, 1.15, 0, 0],
					9129: [.90001, 0, 0, 0],
					9130: [0, .3, 0, 0],
					9131: [1e-5, .9, 0, 0],
					9132: [.65002, 1.15, 0, 0],
					9133: [.90001, 0, 0, 0],
					9143: [.88502, .915, 0, 0],
					10216: [1.25003, 1.75, 0, 0],
					10217: [1.25003, 1.75, 0, 0],
					57344: [-.00499, .605, 0, 0],
					57345: [-.00499, .605, 0, 0],
					57680: [0, .12, 0, 0],
					57681: [0, .12, 0, 0],
					57682: [0, .12, 0, 0],
					57683: [0, .12, 0, 0]
				},
				"Typewriter-Regular": {
					33: [0, .61111, 0, 0],
					34: [0, .61111, 0, 0],
					35: [0, .61111, 0, 0],
					36: [.08333, .69444, 0, 0],
					37: [.08333, .69444, 0, 0],
					38: [0, .61111, 0, 0],
					39: [0, .61111, 0, 0],
					40: [.08333, .69444, 0, 0],
					41: [.08333, .69444, 0, 0],
					42: [0, .52083, 0, 0],
					43: [-.08056, .53055, 0, 0],
					44: [.13889, .125, 0, 0],
					45: [-.08056, .53055, 0, 0],
					46: [0, .125, 0, 0],
					47: [.08333, .69444, 0, 0],
					48: [0, .61111, 0, 0],
					49: [0, .61111, 0, 0],
					50: [0, .61111, 0, 0],
					51: [0, .61111, 0, 0],
					52: [0, .61111, 0, 0],
					53: [0, .61111, 0, 0],
					54: [0, .61111, 0, 0],
					55: [0, .61111, 0, 0],
					56: [0, .61111, 0, 0],
					57: [0, .61111, 0, 0],
					58: [0, .43056, 0, 0],
					59: [.13889, .43056, 0, 0],
					60: [-.05556, .55556, 0, 0],
					61: [-.19549, .41562, 0, 0],
					62: [-.05556, .55556, 0, 0],
					63: [0, .61111, 0, 0],
					64: [0, .61111, 0, 0],
					65: [0, .61111, 0, 0],
					66: [0, .61111, 0, 0],
					67: [0, .61111, 0, 0],
					68: [0, .61111, 0, 0],
					69: [0, .61111, 0, 0],
					70: [0, .61111, 0, 0],
					71: [0, .61111, 0, 0],
					72: [0, .61111, 0, 0],
					73: [0, .61111, 0, 0],
					74: [0, .61111, 0, 0],
					75: [0, .61111, 0, 0],
					76: [0, .61111, 0, 0],
					77: [0, .61111, 0, 0],
					78: [0, .61111, 0, 0],
					79: [0, .61111, 0, 0],
					80: [0, .61111, 0, 0],
					81: [.13889, .61111, 0, 0],
					82: [0, .61111, 0, 0],
					83: [0, .61111, 0, 0],
					84: [0, .61111, 0, 0],
					85: [0, .61111, 0, 0],
					86: [0, .61111, 0, 0],
					87: [0, .61111, 0, 0],
					88: [0, .61111, 0, 0],
					89: [0, .61111, 0, 0],
					90: [0, .61111, 0, 0],
					91: [.08333, .69444, 0, 0],
					92: [.08333, .69444, 0, 0],
					93: [.08333, .69444, 0, 0],
					94: [0, .61111, 0, 0],
					95: [.09514, 0, 0, 0],
					96: [0, .61111, 0, 0],
					97: [0, .43056, 0, 0],
					98: [0, .61111, 0, 0],
					99: [0, .43056, 0, 0],
					100: [0, .61111, 0, 0],
					101: [0, .43056, 0, 0],
					102: [0, .61111, 0, 0],
					103: [.22222, .43056, 0, 0],
					104: [0, .61111, 0, 0],
					105: [0, .61111, 0, 0],
					106: [.22222, .61111, 0, 0],
					107: [0, .61111, 0, 0],
					108: [0, .61111, 0, 0],
					109: [0, .43056, 0, 0],
					110: [0, .43056, 0, 0],
					111: [0, .43056, 0, 0],
					112: [.22222, .43056, 0, 0],
					113: [.22222, .43056, 0, 0],
					114: [0, .43056, 0, 0],
					115: [0, .43056, 0, 0],
					116: [0, .55358, 0, 0],
					117: [0, .43056, 0, 0],
					118: [0, .43056, 0, 0],
					119: [0, .43056, 0, 0],
					120: [0, .43056, 0, 0],
					121: [.22222, .43056, 0, 0],
					122: [0, .43056, 0, 0],
					123: [.08333, .69444, 0, 0],
					124: [.08333, .69444, 0, 0],
					125: [.08333, .69444, 0, 0],
					126: [0, .61111, 0, 0],
					127: [0, .61111, 0, 0],
					305: [0, .43056, 0, 0],
					567: [.22222, .43056, 0, 0],
					768: [0, .61111, 0, 0],
					769: [0, .61111, 0, 0],
					770: [0, .61111, 0, 0],
					771: [0, .61111, 0, 0],
					772: [0, .56555, 0, 0],
					774: [0, .61111, 0, 0],
					776: [0, .61111, 0, 0],
					778: [0, .61111, 0, 0],
					780: [0, .56597, 0, 0],
					915: [0, .61111, 0, 0],
					916: [0, .61111, 0, 0],
					920: [0, .61111, 0, 0],
					923: [0, .61111, 0, 0],
					926: [0, .61111, 0, 0],
					928: [0, .61111, 0, 0],
					931: [0, .61111, 0, 0],
					933: [0, .61111, 0, 0],
					934: [0, .61111, 0, 0],
					936: [0, .61111, 0, 0],
					937: [0, .61111, 0, 0],
					2018: [0, .61111, 0, 0],
					2019: [0, .61111, 0, 0],
					8216: [0, .61111, 0, 0],
					8217: [0, .61111, 0, 0],
					8242: [0, .61111, 0, 0],
					9251: [.11111, .21944, 0, 0]
				}
			};
			r.default = a
		}, {}],
		103: [function (e, t, r) {
			"use strict";
			Object.defineProperty(r, "__esModule", {
				value: true
			});
			var a = e("./utils");
			var n = d(a);
			var i = e("./ParseError");
			var l = d(i);
			var u = e("./ParseNode");
			var o = d(u);
			var s = e("./defineFunction");
			var f = d(s);
			e("./functions/katex");
			e("./functions/phantom");
			e("./functions/mod");
			e("./functions/op");
			e("./functions/operatorname");
			e("./functions/genfrac");
			e("./functions/lap");
			e("./functions/smash");
			e("./functions/delimsizing");
			e("./functions/href");
			e("./functions/mathchoice");

			function d(e) {
				return e && e.__esModule ? e : {
					default: e
				}
			}
			var c = s._functions;
			r.default = c;
			var v = function e(t, r, a) {
				(0, f.default)({
					names: t,
					props: r,
					handler: a
				})
			};
			v(["\\sqrt"], {
				numArgs: 1,
				numOptionalArgs: 1
			}, function (e, t, r) {
				var a = r[0];
				var n = t[0];
				return {
					type: "sqrt",
					body: n,
					index: a
				}
			});
			var h = {
				"\\text": undefined,
				"\\textrm": "mathrm",
				"\\textsf": "mathsf",
				"\\texttt": "mathtt",
				"\\textnormal": "mathrm",
				"\\textbf": "mathbf",
				"\\textit": "textit"
			};
			v(["\\text", "\\textrm", "\\textsf", "\\texttt", "\\textnormal", "\\textbf", "\\textit"], {
				numArgs: 1,
				argTypes: ["text"],
				greediness: 2,
				allowedInText: true
			}, function (e, t) {
				var r = t[0];
				return {
					type: "text",
					body: (0, s.ordargument)(r),
					font: h[e.funcName]
				}
			});
			v(["\\textcolor"], {
				numArgs: 2,
				allowedInText: true,
				greediness: 3,
				argTypes: ["color", "original"]
			}, function (e, t) {
				var r = t[0];
				var a = t[1];
				return {
					type: "color",
					color: r.value,
					value: (0, s.ordargument)(a)
				}
			});
			v(["\\color"], {
				numArgs: 1,
				allowedInText: true,
				greediness: 3,
				argTypes: ["color"]
			}, null);
			v(["\\colorbox"], {
				numArgs: 2,
				allowedInText: true,
				greediness: 3,
				argTypes: ["color", "text"]
			}, function (e, t) {
				var r = t[0];
				var a = t[1];
				return {
					type: "enclose",
					label: e.funcName,
					backgroundColor: r,
					body: a
				}
			});
			v(["\\fcolorbox"], {
				numArgs: 3,
				allowedInText: true,
				greediness: 3,
				argTypes: ["color", "color", "text"]
			}, function (e, t) {
				var r = t[0];
				var a = t[1];
				var n = t[2];
				return {
					type: "enclose",
					label: e.funcName,
					backgroundColor: a,
					borderColor: r,
					body: n
				}
			});
			v(["\\overline"], {
				numArgs: 1
			}, function (e, t) {
				var r = t[0];
				return {
					type: "overline",
					body: r
				}
			});
			v(["\\underline"], {
				numArgs: 1
			}, function (e, t) {
				var r = t[0];
				return {
					type: "underline",
					body: r
				}
			});
			v(["\\rule"], {
				numArgs: 2,
				numOptionalArgs: 1,
				argTypes: ["size", "size", "size"]
			}, function (e, t, r) {
				var a = r[0];
				var n = t[0];
				var i = t[1];
				return {
					type: "rule",
					shift: a && a.value,
					width: n.value,
					height: i.value
				}
			});
			v(["\\kern", "\\mkern"], {
				numArgs: 1,
				argTypes: ["size"]
			}, function (e, t) {
				return {
					type: "kern",
					dimension: t[0].value
				}
			});
			v(["\\mathord", "\\mathbin", "\\mathrel", "\\mathopen", "\\mathclose", "\\mathpunct", "\\mathinner"], {
				numArgs: 1
			}, function (e, t) {
				var r = t[0];
				return {
					type: "mclass",
					mclass: "m" + e.funcName.substr(5),
					value: (0, s.ordargument)(r)
				}
			});
			v(["\\stackrel"], {
				numArgs: 2
			}, function (e, t) {
				var r = t[0];
				var a = t[1];
				var n = new o.default("op", {
					type: "op",
					limits: true,
					alwaysHandleSupSub: true,
					symbol: false,
					value: (0, s.ordargument)(a)
				}, a.mode);
				var i = new o.default("supsub", {
					base: n,
					sup: r,
					sub: null
				}, r.mode);
				return {
					type: "mclass",
					mclass: "mrel",
					value: [i]
				}
			});
			var p = {
				"\\Bbb": "\\mathbb",
				"\\bold": "\\mathbf",
				"\\frak": "\\mathfrak"
			};
			v(["\\blue", "\\orange", "\\pink", "\\red", "\\green", "\\gray", "\\purple", "\\blueA", "\\blueB", "\\blueC", "\\blueD", "\\blueE", "\\tealA", "\\tealB", "\\tealC", "\\tealD", "\\tealE", "\\greenA", "\\greenB", "\\greenC", "\\greenD", "\\greenE", "\\goldA", "\\goldB", "\\goldC", "\\goldD", "\\goldE", "\\redA", "\\redB", "\\redC", "\\redD", "\\redE", "\\maroonA", "\\maroonB", "\\maroonC", "\\maroonD", "\\maroonE", "\\purpleA", "\\purpleB", "\\purpleC", "\\purpleD", "\\purpleE", "\\mintA", "\\mintB", "\\mintC", "\\grayA", "\\grayB", "\\grayC", "\\grayD", "\\grayE", "\\grayF", "\\grayG", "\\grayH", "\\grayI", "\\kaBlue", "\\kaGreen"], {
				numArgs: 1,
				allowedInText: true,
				greediness: 3
			}, function (e, t) {
				var r = t[0];
				return {
					type: "color",
					color: "katex-" + e.funcName.slice(1),
					value: (0, s.ordargument)(r)
				}
			});
			var m = {
				"\u222b": "\\int",
				"\u222c": "\\iint",
				"\u222d": "\\iiint",
				"\u222e": "\\oint"
			};
			v(["\\arcsin", "\\arccos", "\\arctan", "\\arctg", "\\arcctg", "\\arg", "\\ch", "\\cos", "\\cosec", "\\cosh", "\\cot", "\\cotg", "\\coth", "\\csc", "\\ctg", "\\cth", "\\deg", "\\dim", "\\exp", "\\hom", "\\ker", "\\lg", "\\ln", "\\log", "\\sec", "\\sin", "\\sinh", "\\sh", "\\tan", "\\tanh", "\\tg", "\\th"], {
				numArgs: 0
			}, function (e) {
				return {
					type: "op",
					limits: false,
					symbol: false,
					body: e.funcName
				}
			});
			v(["\\det", "\\gcd", "\\inf", "\\lim", "\\liminf", "\\limsup", "\\max", "\\min", "\\Pr", "\\sup"], {
				numArgs: 0
			}, function (e) {
				return {
					type: "op",
					limits: true,
					symbol: false,
					body: e.funcName
				}
			});
			v(["\\int", "\\iint", "\\iiint", "\\oint", "\u222b", "\u222c", "\u222d", "\u222e"], {
				numArgs: 0
			}, function (e) {
				var t = e.funcName;
				if (t.length === 1) {
					t = m[t]
				}
				return {
					type: "op",
					limits: false,
					symbol: true,
					body: t
				}
			});
			v(["\\tiny", "\\scriptsize", "\\footnotesize", "\\small", "\\normalsize", "\\large", "\\Large", "\\LARGE", "\\huge", "\\Huge"], {
				numArgs: 0
			}, null);
			v(["\\displaystyle", "\\textstyle", "\\scriptstyle", "\\scriptscriptstyle"], {
				numArgs: 0
			}, null);
			v(["\\rm", "\\sf", "\\tt", "\\bf", "\\it"], {
				numArgs: 0
			}, null);
			v(["\\mathrm", "\\mathit", "\\mathbf", "\\mathbb", "\\mathcal", "\\mathfrak", "\\mathscr", "\\mathsf", "\\mathtt", "\\Bbb", "\\bold", "\\frak"], {
				numArgs: 1,
				greediness: 2
			}, function (e, t) {
				var r = t[0];
				var a = e.funcName;
				if (a in p) {
					a = p[a]
				}
				return {
					type: "font",
					font: a.slice(1),
					body: r
				}
			});
			v(["\\acute", "\\grave", "\\ddot", "\\tilde", "\\bar", "\\breve", "\\check", "\\hat", "\\vec", "\\dot", "\\widehat", "\\widetilde", "\\overrightarrow", "\\overleftarrow", "\\Overrightarrow", "\\overleftrightarrow", "\\overgroup", "\\overlinesegment", "\\overleftharpoon", "\\overrightharpoon"], {
				numArgs: 1
			}, function (e, t) {
				var r = t[0];
				var a = !n.default.contains(["\\acute", "\\grave", "\\ddot", "\\tilde", "\\bar", "\\breve", "\\check", "\\hat", "\\vec", "\\dot"], e.funcName);
				var i = !a || n.default.contains(["\\widehat", "\\widetilde"], e.funcName);
				return {
					type: "accent",
					label: e.funcName,
					isStretchy: a,
					isShifty: i,
					base: r
				}
			});
			v(["\\'", "\\`", "\\^", "\\~", "\\=", "\\u", "\\.", '\\"', "\\r", "\\H", "\\v"], {
				numArgs: 1,
				allowedInText: true,
				allowedInMath: false
			}, function (e, t) {
				var r = t[0];
				return {
					type: "accent",
					label: e.funcName,
					isStretchy: false,
					isShifty: true,
					base: r
				}
			});
			v(["\\overbrace", "\\underbrace"], {
				numArgs: 1
			}, function (e, t) {
				var r = t[0];
				return {
					type: "horizBrace",
					label: e.funcName,
					isOver: /^\\over/.test(e.funcName),
					base: r
				}
			});
			v(["\\underleftarrow", "\\underrightarrow", "\\underleftrightarrow", "\\undergroup", "\\underlinesegment", "\\utilde"], {
				numArgs: 1
			}, function (e, t) {
				var r = t[0];
				return {
					type: "accentUnder",
					label: e.funcName,
					base: r
				}
			});
			v(["\\xleftarrow", "\\xrightarrow", "\\xLeftarrow", "\\xRightarrow", "\\xleftrightarrow", "\\xLeftrightarrow", "\\xhookleftarrow", "\\xhookrightarrow", "\\xmapsto", "\\xrightharpoondown", "\\xrightharpoonup", "\\xleftharpoondown", "\\xleftharpoonup", "\\xrightleftharpoons", "\\xleftrightharpoons", "\\xLongequal", "\\xtwoheadrightarrow", "\\xtwoheadleftarrow", "\\xLongequal", "\\xtofrom"], {
				numArgs: 1,
				numOptionalArgs: 1
			}, function (e, t, r) {
				var a = r[0];
				var n = t[0];
				return {
					type: "xArrow",
					label: e.funcName,
					body: n,
					below: a
				}
			});
			v(["\\cancel", "\\bcancel", "\\xcancel", "\\sout", "\\fbox"], {
				numArgs: 1
			}, function (e, t) {
				var r = t[0];
				return {
					type: "enclose",
					label: e.funcName,
					body: r
				}
			});
			v(["\\over", "\\choose", "\\atop"], {
				numArgs: 0,
				infix: true
			}, function (e) {
				var t = void 0;
				switch (e.funcName) {
					case "\\over":
						t = "\\frac";
						break;
					case "\\choose":
						t = "\\binom";
						break;
					case "\\atop":
						t = "\\\\atopfrac";
						break;
					default:
						throw new Error("Unrecognized infix genfrac command")
				}
				return {
					type: "infix",
					replaceWith: t,
					token: e.token
				}
			});
			v(["\\\\", "\\cr"], {
				numArgs: 0,
				numOptionalArgs: 1,
				argTypes: ["size"]
			}, function (e, t, r) {
				var a = r[0];
				return {
					type: "cr",
					size: a
				}
			});
			v(["\\begin", "\\end"], {
				numArgs: 1,
				argTypes: ["text"]
			}, function (e, t) {
				var r = t[0];
				if (r.type !== "ordgroup") {
					throw new l.default("Invalid environment name", r)
				}
				var a = "";
				for (var n = 0; n < r.value.length; ++n) {
					a += r.value[n].value
				}
				return {
					type: "environment",
					name: a,
					nameGroup: r
				}
			});
			v(["\\raisebox"], {
				numArgs: 2,
				argTypes: ["size", "text"],
				allowedInText: true
			}, function (e, t) {
				var r = t[0];
				var a = t[1];
				return {
					type: "raisebox",
					dy: r,
					body: a,
					value: (0, s.ordargument)(a)
				}
			});
			v(["\\verb"], {
				numArgs: 0,
				allowedInText: true
			}, function (e) {
				throw new l.default("\\verb ended by end of line instead of matching delimiter")
			})
		}, {
			"./ParseError": 84,
			"./ParseNode": 85,
			"./defineFunction": 96,
			"./functions/delimsizing": 104,
			"./functions/genfrac": 105,
			"./functions/href": 106,
			"./functions/katex": 107,
			"./functions/lap": 108,
			"./functions/mathchoice": 109,
			"./functions/mod": 110,
			"./functions/op": 111,
			"./functions/operatorname": 112,
			"./functions/phantom": 113,
			"./functions/smash": 114,
			"./utils": 123
		}],
		104: [function (e, t, r) {
			"use strict";
			var a = e("../buildCommon");
			var n = x(a);
			var i = e("../defineFunction");
			var l = x(i);
			var u = e("../delimiter");
			var o = x(u);
			var s = e("../mathMLTree");
			var f = x(s);
			var d = e("../ParseError");
			var c = x(d);
			var v = e("../utils");
			var h = x(v);
			var p = e("../buildHTML");
			var m = y(p);
			var g = e("../buildMathML");
			var b = y(g);

			function y(e) {
				if (e && e.__esModule) {
					return e
				} else {
					var t = {};
					if (e != null) {
						for (var r in e) {
							if (Object.prototype.hasOwnProperty.call(e, r)) t[r] = e[r]
						}
					}
					t.default = e;
					return t
				}
			}

			function x(e) {
				return e && e.__esModule ? e : {
					default: e
				}
			}
			var w = {
				"\\bigl": {
					mclass: "mopen",
					size: 1
				},
				"\\Bigl": {
					mclass: "mopen",
					size: 2
				},
				"\\biggl": {
					mclass: "mopen",
					size: 3
				},
				"\\Biggl": {
					mclass: "mopen",
					size: 4
				},
				"\\bigr": {
					mclass: "mclose",
					size: 1
				},
				"\\Bigr": {
					mclass: "mclose",
					size: 2
				},
				"\\biggr": {
					mclass: "mclose",
					size: 3
				},
				"\\Biggr": {
					mclass: "mclose",
					size: 4
				},
				"\\bigm": {
					mclass: "mrel",
					size: 1
				},
				"\\Bigm": {
					mclass: "mrel",
					size: 2
				},
				"\\biggm": {
					mclass: "mrel",
					size: 3
				},
				"\\Biggm": {
					mclass: "mrel",
					size: 4
				},
				"\\big": {
					mclass: "mord",
					size: 1
				},
				"\\Big": {
					mclass: "mord",
					size: 2
				},
				"\\bigg": {
					mclass: "mord",
					size: 3
				},
				"\\Bigg": {
					mclass: "mord",
					size: 4
				}
			};
			var k = ["(", ")", "[", "\\lbrack", "]", "\\rbrack", "\\{", "\\lbrace", "\\}", "\\rbrace", "\\lfloor", "\\rfloor", "\\lceil", "\\rceil", "<", ">", "\\langle", "\\rangle", "\\lt", "\\gt", "\\lvert", "\\rvert", "\\lVert", "\\rVert", "\\lgroup", "\\rgroup", "\\lmoustache", "\\rmoustache", "/", "\\backslash", "|", "\\vert", "\\|", "\\Vert", "\\uparrow", "\\Uparrow", "\\downarrow", "\\Downarrow", "\\updownarrow", "\\Updownarrow", "."];

			function M(e, t) {
				if (h.default.contains(k, e.value)) {
					return e
				} else {
					throw new c.default("Invalid delimiter: '" + e.value + "' after '" + t.funcName + "'", e)
				}
			}(0, l.default)({
				type: "delimsizing",
				names: ["\\bigl", "\\Bigl", "\\biggl", "\\Biggl", "\\bigr", "\\Bigr", "\\biggr", "\\Biggr", "\\bigm", "\\Bigm", "\\biggm", "\\Biggm", "\\big", "\\Big", "\\bigg", "\\Bigg"],
				props: {
					numArgs: 1
				},
				handler: function e(t, r) {
					var a = M(r[0], t);
					return {
						type: "delimsizing",
						size: w[t.funcName].size,
						mclass: w[t.funcName].mclass,
						value: a.value
					}
				},
				htmlBuilder: function e(t, r) {
					var a = t.value.value;
					if (a === ".") {
						return n.default.makeSpan([t.value.mclass])
					}
					return o.default.sizedDelim(a, t.value.size, r, t.mode, [t.value.mclass])
				},
				mathmlBuilder: function e(t) {
					var r = [];
					if (t.value.value !== ".") {
						r.push(b.makeText(t.value.value, t.mode))
					}
					var a = new f.default.MathNode("mo", r);
					if (t.value.mclass === "mopen" || t.value.mclass === "mclose") {
						a.setAttribute("fence", "true")
					} else {
						a.setAttribute("fence", "false")
					}
					return a
				}
			});
			(0, l.default)({
				type: "leftright",
				names: ["\\left", "\\right"],
				props: {
					numArgs: 1
				},
				handler: function e(t, r) {
					var a = M(r[0], t);
					return {
						type: "leftright",
						value: a.value
					}
				},
				htmlBuilder: function e(t, r) {
					var a = m.buildExpression(t.value.body, r, true);
					var i = 0;
					var l = 0;
					var u = false;
					for (var s = 0; s < a.length; s++) {
						if (a[s].isMiddle) {
							u = true
						} else {
							i = Math.max(a[s].height, i);
							l = Math.max(a[s].depth, l)
						}
					}
					i *= r.sizeMultiplier;
					l *= r.sizeMultiplier;
					var f = void 0;
					if (t.value.left === ".") {
						f = m.makeNullDelimiter(r, ["mopen"])
					} else {
						f = o.default.leftRightDelim(t.value.left, i, l, r, t.mode, ["mopen"])
					}
					a.unshift(f);
					if (u) {
						for (var d = 1; d < a.length; d++) {
							var c = a[d];
							if (c.isMiddle) {
								a[d] = o.default.leftRightDelim(c.isMiddle.value, i, l, c.isMiddle.options, t.mode, []);
								var v = m.spliceSpaces(c.children, 0);
								if (v) {
									n.default.prependChildren(a[d], v)
								}
							}
						}
					}
					var h = void 0;
					if (t.value.right === ".") {
						h = m.makeNullDelimiter(r, ["mclose"])
					} else {
						h = o.default.leftRightDelim(t.value.right, i, l, r, t.mode, ["mclose"])
					}
					a.push(h);
					return n.default.makeSpan(["minner"], a, r)
				},
				mathmlBuilder: function e(t, r) {
					var a = b.buildExpression(t.value.body, r);
					if (t.value.left !== ".") {
						var n = new f.default.MathNode("mo", [b.makeText(t.value.left, t.mode)]);
						n.setAttribute("fence", "true");
						a.unshift(n)
					}
					if (t.value.right !== ".") {
						var i = new f.default.MathNode("mo", [b.makeText(t.value.right, t.mode)]);
						i.setAttribute("fence", "true");
						a.push(i)
					}
					var l = new f.default.MathNode("mrow", a);
					return l
				}
			});
			(0, l.default)({
				type: "middle",
				names: ["\\middle"],
				props: {
					numArgs: 1
				},
				handler: function e(t, r) {
					var a = M(r[0], t);
					if (!t.parser.leftrightDepth) {
						throw new c.default("\\middle without preceding \\left", a)
					}
					return {
						type: "middle",
						value: a.value
					}
				},
				htmlBuilder: function e(t, r) {
					var a = void 0;
					if (t.value.value === ".") {
						a = m.makeNullDelimiter(r, [])
					} else {
						a = o.default.sizedDelim(t.value.value, 1, r, t.mode, []);
						a.isMiddle = {
							value: t.value.value,
							options: r
						}
					}
					return a
				},
				mathmlBuilder: function e(t, r) {
					var a = new f.default.MathNode("mo", [b.makeText(t.value.middle, t.mode)]);
					a.setAttribute("fence", "true");
					return a
				}
			})
		}, {
			"../ParseError": 84,
			"../buildCommon": 91,
			"../buildHTML": 92,
			"../buildMathML": 93,
			"../defineFunction": 96,
			"../delimiter": 97,
			"../mathMLTree": 116,
			"../utils": 123
		}],
		105: [function (e, t, r) {
			"use strict";
			var a = e("../defineFunction");
			var n = b(a);
			var i = e("../buildCommon");
			var l = b(i);
			var u = e("../delimiter");
			var o = b(u);
			var s = e("../mathMLTree");
			var f = b(s);
			var d = e("../Style");
			var c = b(d);
			var v = e("../buildHTML");
			var h = g(v);
			var p = e("../buildMathML");
			var m = g(p);

			function g(e) {
				if (e && e.__esModule) {
					return e
				} else {
					var t = {};
					if (e != null) {
						for (var r in e) {
							if (Object.prototype.hasOwnProperty.call(e, r)) t[r] = e[r]
						}
					}
					t.default = e;
					return t
				}
			}

			function b(e) {
				return e && e.__esModule ? e : {
					default: e
				}
			}(0, n.default)({
				type: "genfrac",
				names: ["\\dfrac", "\\frac", "\\tfrac", "\\dbinom", "\\binom", "\\tbinom", "\\\\atopfrac"],
				props: {
					numArgs: 2,
					greediness: 2
				},
				handler: function e(t, r) {
					var a = r[0];
					var n = r[1];
					var i = void 0;
					var l = null;
					var u = null;
					var o = "auto";
					switch (t.funcName) {
						case "\\dfrac":
						case "\\frac":
						case "\\tfrac":
							i = true;
							break;
						case "\\\\atopfrac":
							i = false;
							break;
						case "\\dbinom":
						case "\\binom":
						case "\\tbinom":
							i = false;
							l = "(";
							u = ")";
							break;
						default:
							throw new Error("Unrecognized genfrac command")
					}
					switch (t.funcName) {
						case "\\dfrac":
						case "\\dbinom":
							o = "display";
							break;
						case "\\tfrac":
						case "\\tbinom":
							o = "text";
							break
					}
					return {
						type: "genfrac",
						numer: a,
						denom: n,
						hasBarLine: i,
						leftDelim: l,
						rightDelim: u,
						size: o
					}
				},
				htmlBuilder: function e(t, r) {
					var a = r.style;
					if (t.value.size === "display") {
						a = c.default.DISPLAY
					} else if (t.value.size === "text") {
						a = c.default.TEXT
					}
					var n = a.fracNum();
					var i = a.fracDen();
					var u = void 0;
					u = r.havingStyle(n);
					var s = h.buildGroup(t.value.numer, u, r);
					u = r.havingStyle(i);
					var f = h.buildGroup(t.value.denom, u, r);
					var d = void 0;
					var v = void 0;
					var p = void 0;
					if (t.value.hasBarLine) {
						d = h.makeLineSpan("frac-line", r);
						v = d.height;
						p = d.height
					} else {
						d = null;
						v = 0;
						p = r.fontMetrics().defaultRuleThickness
					}
					var m = void 0;
					var g = void 0;
					var b = void 0;
					if (a.size === c.default.DISPLAY.size) {
						m = r.fontMetrics().num1;
						if (v > 0) {
							g = 3 * p
						} else {
							g = 7 * p
						}
						b = r.fontMetrics().denom1
					} else {
						if (v > 0) {
							m = r.fontMetrics().num2;
							g = p
						} else {
							m = r.fontMetrics().num3;
							g = 3 * p
						}
						b = r.fontMetrics().denom2
					}
					var y = void 0;
					if (v === 0) {
						var x = m - s.depth - (f.height - b);
						if (x < g) {
							m += .5 * (g - x);
							b += .5 * (g - x)
						}
						y = l.default.makeVList({
							positionType: "individualShift",
							children: [{
								type: "elem",
								elem: f,
								shift: b
							}, {
								type: "elem",
								elem: s,
								shift: -m
							}]
						}, r)
					} else {
						var w = r.fontMetrics().axisHeight;
						if (m - s.depth - (w + .5 * v) < g) {
							m += g - (m - s.depth - (w + .5 * v))
						}
						if (w - .5 * v - (f.height - b) < g) {
							b += g - (w - .5 * v - (f.height - b))
						}
						var k = -(w - .5 * v);
						y = l.default.makeVList({
							positionType: "individualShift",
							children: [{
								type: "elem",
								elem: f,
								shift: b
							}, {
								type: "elem",
								elem: d,
								shift: k
							}, {
								type: "elem",
								elem: s,
								shift: -m
							}]
						}, r)
					}
					u = r.havingStyle(a);
					y.height *= u.sizeMultiplier / r.sizeMultiplier;
					y.depth *= u.sizeMultiplier / r.sizeMultiplier;
					var M = void 0;
					if (a.size === c.default.DISPLAY.size) {
						M = r.fontMetrics().delim1
					} else {
						M = r.fontMetrics().delim2
					}
					var _ = void 0;
					var S = void 0;
					if (t.value.leftDelim == null) {
						_ = h.makeNullDelimiter(r, ["mopen"])
					} else {
						_ = o.default.customSizedDelim(t.value.leftDelim, M, true, r.havingStyle(a), t.mode, ["mopen"])
					}
					if (t.value.rightDelim == null) {
						S = h.makeNullDelimiter(r, ["mclose"])
					} else {
						S = o.default.customSizedDelim(t.value.rightDelim, M, true, r.havingStyle(a), t.mode, ["mclose"])
					}
					return l.default.makeSpan(["mord"].concat(u.sizingClasses(r)), [_, l.default.makeSpan(["mfrac"], [y]), S], r)
				},
				mathmlBuilder: function e(t, r) {
					var a = new f.default.MathNode("mfrac", [m.buildGroup(t.value.numer, r), m.buildGroup(t.value.denom, r)]);
					if (!t.value.hasBarLine) {
						a.setAttribute("linethickness", "0px")
					}
					if (t.value.leftDelim != null || t.value.rightDelim != null) {
						var n = [];
						if (t.value.leftDelim != null) {
							var i = new f.default.MathNode("mo", [new f.default.TextNode(t.value.leftDelim)]);
							i.setAttribute("fence", "true");
							n.push(i)
						}
						n.push(a);
						if (t.value.rightDelim != null) {
							var l = new f.default.MathNode("mo", [new f.default.TextNode(t.value.rightDelim)]);
							l.setAttribute("fence", "true");
							n.push(l)
						}
						var u = new f.default.MathNode("mrow", n);
						return u
					}
					return a
				}
			})
		}, {
			"../Style": 89,
			"../buildCommon": 91,
			"../buildHTML": 92,
			"../buildMathML": 93,
			"../defineFunction": 96,
			"../delimiter": 97,
			"../mathMLTree": 116
		}],
		106: [function (e, t, r) {
			"use strict";
			var a = e("../defineFunction");
			var n = h(a);
			var i = e("../buildCommon");
			var l = h(i);
			var u = e("../mathMLTree");
			var o = h(u);
			var s = e("../buildHTML");
			var f = v(s);
			var d = e("../buildMathML");
			var c = v(d);

			function v(e) {
				if (e && e.__esModule) {
					return e
				} else {
					var t = {};
					if (e != null) {
						for (var r in e) {
							if (Object.prototype.hasOwnProperty.call(e, r)) t[r] = e[r]
						}
					}
					t.default = e;
					return t
				}
			}

			function h(e) {
				return e && e.__esModule ? e : {
					default: e
				}
			}(0, n.default)({
				type: "href",
				names: ["\\href"],
				props: {
					numArgs: 2,
					argTypes: ["url", "original"]
				},
				handler: function e(t, r) {
					var n = r[1];
					var i = r[0].value;
					return {
						type: "href",
						href: i,
						body: (0, a.ordargument)(n)
					}
				},
				htmlBuilder: function e(t, r) {
					var a = f.buildExpression(t.value.body, r, false);
					var n = t.value.href;
					var i = [];
					var u = void 0;
					var o = void 0;
					if (a.length === 1) {
						i = a[0].classes
					} else if (a.length >= 2) {
						u = f.getTypeOfDomTree(a[0]) || "mord";
						o = f.getTypeOfDomTree(a[a.length - 1]) || "mord";
						if (u === o) {
							i = [u]
						} else {
							var s = l.default.makeAnchor(n, [], a, r);
							return new l.default.makeFragment([new l.default.makeSpan([u], [], r), s, new l.default.makeSpan([o], [], r)])
						}
					}
					return new l.default.makeAnchor(n, i, a, r)
				},
				mathmlBuilder: function e(t, r) {
					var a = c.buildExpression(t.value.body, r);
					var n = new o.default.MathNode("mrow", a);
					n.setAttribute("href", t.value.href);
					return n
				}
			})
		}, {
			"../buildCommon": 91,
			"../buildHTML": 92,
			"../buildMathML": 93,
			"../defineFunction": 96,
			"../mathMLTree": 116
		}],
		107: [function (e, t, r) {
			"use strict";
			var a = e("../defineFunction");
			var n = s(a);
			var i = e("../buildCommon");
			var l = s(i);
			var u = e("../mathMLTree");
			var o = s(u);

			function s(e) {
				return e && e.__esModule ? e : {
					default: e
				}
			}(0, n.default)({
				type: "katex",
				names: ["\\KaTeX"],
				props: {
					numArgs: 0,
					allowedInText: true
				},
				handler: function e(t, r) {
					return {
						type: "katex"
					}
				},
				htmlBuilder: function e(t, r) {
					var a = l.default.makeSpan(["k"], [l.default.mathsym("K", t.mode)], r);
					var n = l.default.makeSpan(["a"], [l.default.mathsym("A", t.mode)], r);
					n.height = (n.height + .2) * .75;
					n.depth = (n.height - .2) * .75;
					var i = l.default.makeSpan(["t"], [l.default.mathsym("T", t.mode)], r);
					var u = l.default.makeSpan(["e"], [l.default.mathsym("E", t.mode)], r);
					u.height = u.height - .2155;
					u.depth = u.depth + .2155;
					var o = l.default.makeSpan(["x"], [l.default.mathsym("X", t.mode)], r);
					return l.default.makeSpan(["mord", "katex-logo"], [a, n, i, u, o], r)
				},
				mathmlBuilder: function e(t, r) {
					var a = new o.default.MathNode("mtext", [new o.default.TextNode("KaTeX")]);
					return a
				}
			})
		}, {
			"../buildCommon": 91,
			"../defineFunction": 96,
			"../mathMLTree": 116
		}],
		108: [function (e, t, r) {
			"use strict";
			var a = e("../defineFunction");
			var n = h(a);
			var i = e("../buildCommon");
			var l = h(i);
			var u = e("../mathMLTree");
			var o = h(u);
			var s = e("../buildHTML");
			var f = v(s);
			var d = e("../buildMathML");
			var c = v(d);

			function v(e) {
				if (e && e.__esModule) {
					return e
				} else {
					var t = {};
					if (e != null) {
						for (var r in e) {
							if (Object.prototype.hasOwnProperty.call(e, r)) t[r] = e[r]
						}
					}
					t.default = e;
					return t
				}
			}

			function h(e) {
				return e && e.__esModule ? e : {
					default: e
				}
			}(0, n.default)({
				type: "lap",
				names: ["\\mathllap", "\\mathrlap", "\\mathclap"],
				props: {
					numArgs: 1,
					allowedInText: true
				},
				handler: function e(t, r) {
					var a = r[0];
					return {
						type: "lap",
						alignment: t.funcName.slice(5),
						body: a
					}
				},
				htmlBuilder: function e(t, r) {
					var a = void 0;
					if (t.value.alignment === "clap") {
						a = l.default.makeSpan([], [f.buildGroup(t.value.body, r)]);
						a = l.default.makeSpan(["inner"], [a], r)
					} else {
						a = l.default.makeSpan(["inner"], [f.buildGroup(t.value.body, r)])
					}
					var n = l.default.makeSpan(["fix"], []);
					return l.default.makeSpan(["mord", t.value.alignment], [a, n], r)
				},
				mathmlBuilder: function e(t, r) {
					var a = new o.default.MathNode("mpadded", [c.buildGroup(t.value.body, r)]);
					if (t.value.alignment !== "rlap") {
						var n = t.value.alignment === "llap" ? "-1" : "-0.5";
						a.setAttribute("lspace", n + "width")
					}
					a.setAttribute("width", "0px");
					return a
				}
			})
		}, {
			"../buildCommon": 91,
			"../buildHTML": 92,
			"../buildMathML": 93,
			"../defineFunction": 96,
			"../mathMLTree": 116
		}],
		109: [function (e, t, r) {
			"use strict";
			var a = e("../defineFunction");
			var n = m(a);
			var i = e("../buildCommon");
			var l = m(i);
			var u = e("../mathMLTree");
			var o = m(u);
			var s = e("../Style");
			var f = m(s);
			var d = e("../buildHTML");
			var c = p(d);
			var v = e("../buildMathML");
			var h = p(v);

			function p(e) {
				if (e && e.__esModule) {
					return e
				} else {
					var t = {};
					if (e != null) {
						for (var r in e) {
							if (Object.prototype.hasOwnProperty.call(e, r)) t[r] = e[r]
						}
					}
					t.default = e;
					return t
				}
			}

			function m(e) {
				return e && e.__esModule ? e : {
					default: e
				}
			}
			var g = function e(t, r) {
				var a = r.style;
				if (a.size === f.default.DISPLAY.size) {
					return t.value.display
				} else if (a.size === f.default.TEXT.size) {
					return t.value.text
				} else if (a.size === f.default.SCRIPT.size) {
					return t.value.script
				} else if (a.size === f.default.SCRIPTSCRIPT.size) {
					return t.value.scriptscript
				}
				return t.value.text
			};
			(0, n.default)({
				type: "mathchoice",
				names: ["\\mathchoice"],
				props: {
					numArgs: 4
				},
				handler: function e(t, r) {
					return {
						type: "mathchoice",
						display: (0, a.ordargument)(r[0]),
						text: (0, a.ordargument)(r[1]),
						script: (0, a.ordargument)(r[2]),
						scriptscript: (0, a.ordargument)(r[3])
					}
				},
				htmlBuilder: function e(t, r) {
					var a = g(t, r);
					var n = c.buildExpression(a, r, false);
					return new l.default.makeFragment(n)
				},
				mathmlBuilder: function e(t, r) {
					var a = g(t, r);
					var n = h.buildExpression(a, r, false);
					return new o.default.MathNode("mrow", n)
				}
			})
		}, {
			"../Style": 89,
			"../buildCommon": 91,
			"../buildHTML": 92,
			"../buildMathML": 93,
			"../defineFunction": 96,
			"../mathMLTree": 116
		}],
		110: [function (e, t, r) {
			"use strict";
			var a = e("../defineFunction");
			var n = m(a);
			var i = e("../buildCommon");
			var l = m(i);
			var u = e("../mathMLTree");
			var o = m(u);
			var s = e("../Style");
			var f = m(s);
			var d = e("../buildHTML");
			var c = p(d);
			var v = e("../buildMathML");
			var h = p(v);

			function p(e) {
				if (e && e.__esModule) {
					return e
				} else {
					var t = {};
					if (e != null) {
						for (var r in e) {
							if (Object.prototype.hasOwnProperty.call(e, r)) t[r] = e[r]
						}
					}
					t.default = e;
					return t
				}
			}

			function m(e) {
				return e && e.__esModule ? e : {
					default: e
				}
			}
			var g = function e(t, r) {
				var a = [];
				if (t.value.modType === "bmod") {
					if (!r.style.isTight()) {
						a.push(l.default.makeSpan(["mspace", "negativemediumspace"], [], r))
					}
					a.push(l.default.makeSpan(["mspace", "thickspace"], [], r))
				} else if (r.style.size === f.default.DISPLAY.size) {
					a.push(l.default.makeSpan(["mspace", "quad"], [], r))
				} else if (t.value.modType === "mod") {
					a.push(l.default.makeSpan(["mspace", "twelvemuspace"], [], r))
				} else {
					a.push(l.default.makeSpan(["mspace", "eightmuspace"], [], r))
				}
				if (t.value.modType === "pod" || t.value.modType === "pmod") {
					a.push(l.default.mathsym("(", t.mode))
				}
				if (t.value.modType !== "pod") {
					var n = [l.default.mathsym("m", t.mode), l.default.mathsym("o", t.mode), l.default.mathsym("d", t.mode)];
					if (t.value.modType === "bmod") {
						a.push(l.default.makeSpan(["mbin"], n, r));
						a.push(l.default.makeSpan(["mspace", "thickspace"], [], r));
						if (!r.style.isTight()) {
							a.push(l.default.makeSpan(["mspace", "negativemediumspace"], [], r))
						}
					} else {
						Array.prototype.push.apply(a, n);
						a.push(l.default.makeSpan(["mspace", "sixmuspace"], [], r))
					}
				}
				if (t.value.value) {
					Array.prototype.push.apply(a, c.buildExpression(t.value.value, r, false))
				}
				if (t.value.modType === "pod" || t.value.modType === "pmod") {
					a.push(l.default.mathsym(")", t.mode))
				}
				return l.default.makeFragment(a)
			};
			var b = function e(t, r) {
				var a = [];
				if (t.value.modType === "pod" || t.value.modType === "pmod") {
					a.push(new o.default.MathNode("mo", [h.makeText("(", t.mode)]))
				}
				if (t.value.modType !== "pod") {
					a.push(new o.default.MathNode("mo", [h.makeText("mod", t.mode)]))
				}
				if (t.value.value) {
					var n = new o.default.MathNode("mspace");
					n.setAttribute("width", "0.333333em");
					a.push(n);
					a = a.concat(h.buildExpression(t.value.value, r))
				}
				if (t.value.modType === "pod" || t.value.modType === "pmod") {
					a.push(new o.default.MathNode("mo", [h.makeText(")", t.mode)]))
				}
				return new o.default.MathNode("mo", a)
			};
			(0, n.default)({
				type: "mod",
				names: ["\\bmod"],
				props: {
					numArgs: 0
				},
				handler: function e(t, r) {
					return {
						type: "mod",
						modType: "bmod",
						value: null
					}
				},
				htmlBuilder: g,
				mathmlBuilder: b
			});
			(0, n.default)({
				type: "mod",
				names: ["\\pod", "\\pmod", "\\mod"],
				props: {
					numArgs: 1
				},
				handler: function e(t, r) {
					var n = r[0];
					return {
						type: "mod",
						modType: t.funcName.substr(1),
						value: (0, a.ordargument)(n)
					}
				},
				htmlBuilder: g,
				mathmlBuilder: b
			})
		}, {
			"../Style": 89,
			"../buildCommon": 91,
			"../buildHTML": 92,
			"../buildMathML": 93,
			"../defineFunction": 96,
			"../mathMLTree": 116
		}],
		111: [function (e, t, r) {
			"use strict";
			var a = e("../defineFunction");
			var n = x(a);
			var i = e("../buildCommon");
			var l = x(i);
			var u = e("../domTree");
			var o = x(u);
			var s = e("../mathMLTree");
			var f = x(s);
			var d = e("../utils");
			var c = x(d);
			var v = e("../Style");
			var h = x(v);
			var p = e("../buildHTML");
			var m = y(p);
			var g = e("../buildMathML");
			var b = y(g);

			function y(e) {
				if (e && e.__esModule) {
					return e
				} else {
					var t = {};
					if (e != null) {
						for (var r in e) {
							if (Object.prototype.hasOwnProperty.call(e, r)) t[r] = e[r]
						}
					}
					t.default = e;
					return t
				}
			}

			function x(e) {
				return e && e.__esModule ? e : {
					default: e
				}
			}
			var w = function e(t, r) {
				var a = void 0;
				var n = void 0;
				var i = false;
				if (t.type === "supsub") {
					a = t.value.sup;
					n = t.value.sub;
					t = t.value.base;
					i = true
				}
				var u = r.style;
				var s = ["\\smallint"];
				var f = false;
				if (u.size === h.default.DISPLAY.size && t.value.symbol && !c.default.contains(s, t.value.body)) {
					f = true
				}
				var d = void 0;
				if (t.value.symbol) {
					var v = f ? "Size2-Regular" : "Size1-Regular";
					d = l.default.makeSymbol(t.value.body, v, "math", r, ["mop", "op-symbol", f ? "large-op" : "small-op"])
				} else if (t.value.value) {
					var p = m.buildExpression(t.value.value, r, true);
					if (p.length === 1 && p[0] instanceof o.default.symbolNode) {
						d = p[0];
						d.classes[0] = "mop"
					} else {
						d = l.default.makeSpan(["mop"], p, r)
					}
				} else {
					var g = [];
					for (var b = 1; b < t.value.body.length; b++) {
						g.push(l.default.mathsym(t.value.body[b], t.mode))
					}
					d = l.default.makeSpan(["mop"], g, r)
				}
				var y = 0;
				var x = 0;
				if (d instanceof o.default.symbolNode) {
					y = (d.height - d.depth) / 2 - r.fontMetrics().axisHeight;
					x = d.italic
				}
				if (i) {
					d = l.default.makeSpan([], [d]);
					var w = void 0;
					var k = void 0;
					if (a) {
						var M = m.buildGroup(a, r.havingStyle(u.sup()), r);
						k = {
							elem: M,
							kern: Math.max(r.fontMetrics().bigOpSpacing1, r.fontMetrics().bigOpSpacing3 - M.depth)
						}
					}
					if (n) {
						var _ = m.buildGroup(n, r.havingStyle(u.sub()), r);
						w = {
							elem: _,
							kern: Math.max(r.fontMetrics().bigOpSpacing2, r.fontMetrics().bigOpSpacing4 - _.height)
						}
					}
					var S = void 0;
					if (k && w) {
						var z = r.fontMetrics().bigOpSpacing5 + w.elem.height + w.elem.depth + w.kern + d.depth + y;
						S = l.default.makeVList({
							positionType: "bottom",
							positionData: z,
							children: [{
								type: "kern",
								size: r.fontMetrics().bigOpSpacing5
							}, {
								type: "elem",
								elem: w.elem,
								marginLeft: -x + "em"
							}, {
								type: "kern",
								size: w.kern
							}, {
								type: "elem",
								elem: d
							}, {
								type: "kern",
								size: k.kern
							}, {
								type: "elem",
								elem: k.elem,
								marginLeft: x + "em"
							}, {
								type: "kern",
								size: r.fontMetrics().bigOpSpacing5
							}]
						}, r)
					} else if (w) {
						var T = d.height - y;
						S = l.default.makeVList({
							positionType: "top",
							positionData: T,
							children: [{
								type: "kern",
								size: r.fontMetrics().bigOpSpacing5
							}, {
								type: "elem",
								elem: w.elem,
								marginLeft: -x + "em"
							}, {
								type: "kern",
								size: w.kern
							}, {
								type: "elem",
								elem: d
							}]
						}, r)
					} else if (k) {
						var C = d.depth + y;
						S = l.default.makeVList({
							positionType: "bottom",
							positionData: C,
							children: [{
								type: "elem",
								elem: d
							}, {
								type: "kern",
								size: k.kern
							}, {
								type: "elem",
								elem: k.elem,
								marginLeft: x + "em"
							}, {
								type: "kern",
								size: r.fontMetrics().bigOpSpacing5
							}]
						}, r)
					} else {
						return d
					}
					return l.default.makeSpan(["mop", "op-limits"], [S], r)
				} else {
					if (y) {
						d.style.position = "relative";
						d.style.top = y + "em"
					}
					return d
				}
			};
			var k = function e(t, r) {
				var a = void 0;
				if (t.value.symbol) {
					a = new f.default.MathNode("mo", [b.makeText(t.value.body, t.mode)])
				} else if (t.value.value) {
					a = new f.default.MathNode("mo", b.buildExpression(t.value.value, r))
				} else {
					a = new f.default.MathNode("mi", [new f.default.TextNode(t.value.body.slice(1))]);
					var n = new f.default.MathNode("mo", [b.makeText("\u2061", "text")]);
					return new o.default.documentFragment([a, n])
				}
				return a
			};
			var M = {
				"\u220f": "\\prod",
				"\u2210": "\\coprod",
				"\u2211": "\\sum",
				"\u22c0": "\\bigwedge",
				"\u22c1": "\\bigvee",
				"\u22c2": "\\bigcap",
				"\u22c3": "\\bigcap",
				"\u2a00": "\\bigodot",
				"\u2a01": "\\bigoplus",
				"\u2a02": "\\bigotimes",
				"\u2a04": "\\biguplus",
				"\u2a06": "\\bigsqcup"
			};
			(0, n.default)({
				type: "op",
				names: ["\\coprod", "\\bigvee", "\\bigwedge", "\\biguplus", "\\bigcap", "\\bigcup", "\\intop", "\\prod", "\\sum", "\\bigotimes", "\\bigoplus", "\\bigodot", "\\bigsqcup", "\\smallint", "\u220f", "\u2210", "\u2211", "\u22c0", "\u22c1", "\u22c2", "\u22c3", "\u2a00", "\u2a01", "\u2a02", "\u2a04", "\u2a06"],
				props: {
					numArgs: 0
				},
				handler: function e(t, r) {
					var a = t.funcName;
					if (a.length === 1) {
						a = M[a]
					}
					return {
						type: "op",
						limits: true,
						symbol: true,
						body: a
					}
				},
				htmlBuilder: w,
				mathmlBuilder: k
			});
			(0, n.default)({
				type: "op",
				names: ["\\mathop"],
				props: {
					numArgs: 1
				},
				handler: function e(t, r) {
					var n = r[0];
					return {
						type: "op",
						limits: false,
						symbol: false,
						value: (0, a.ordargument)(n)
					}
				},
				htmlBuilder: w,
				mathmlBuilder: k
			})
		}, {
			"../Style": 89,
			"../buildCommon": 91,
			"../buildHTML": 92,
			"../buildMathML": 93,
			"../defineFunction": 96,
			"../domTree": 98,
			"../mathMLTree": 116,
			"../utils": 123
		}],
		112: [function (e, t, r) {
			"use strict";
			var a = e("../defineFunction");
			var n = m(a);
			var i = e("../buildCommon");
			var l = m(i);
			var u = e("../mathMLTree");
			var o = m(u);
			var s = e("../domTree");
			var f = m(s);
			var d = e("../buildHTML");
			var c = p(d);
			var v = e("../buildMathML");
			var h = p(v);

			function p(e) {
				if (e && e.__esModule) {
					return e
				} else {
					var t = {};
					if (e != null) {
						for (var r in e) {
							if (Object.prototype.hasOwnProperty.call(e, r)) t[r] = e[r]
						}
					}
					t.default = e;
					return t
				}
			}

			function m(e) {
				return e && e.__esModule ? e : {
					default: e
				}
			}(0, n.default)({
				type: "operatorname",
				names: ["\\operatorname"],
				props: {
					numArgs: 1
				},
				handler: function e(t, r) {
					var n = r[0];
					return {
						type: "operatorname",
						value: (0, a.ordargument)(n)
					}
				},
				htmlBuilder: function e(t, r) {
					var a = [];
					if (t.value.value.length > 0) {
						var n = "";
						var i = "";
						var u = c.buildExpression(t.value.value, r, true);
						for (var o = 0; o < u.length; o++) {
							n = u[o].value;
							n = n.replace(/\u2212/, "-");
							n = n.replace(/\u2217/, "*");
							i = /[\u0391-\u03D7]/.test(n) ? "math" : "text";
							a.push(l.default.mathsym(n, i))
						}
					}
					return l.default.makeSpan(["mop"], a, r)
				},
				mathmlBuilder: function e(t, r) {
					var a = [];
					if (t.value.value.length > 0) {
						var n = h.buildExpression(t.value.value, r);
						var i = "";
						for (var l = 0; l < n.length; l++) {
							i += n[l].children[0].text
						}
						i = i.replace(/\u2212/g, "-");
						i = i.replace(/\u2217/g, "*");
						a = [new o.default.TextNode(i)]
					}
					var u = new o.default.MathNode("mi", a);
					u.setAttribute("mathvariant", "normal");
					var s = new o.default.MathNode("mo", [h.makeText("\u2061", "text")]);
					return new f.default.documentFragment([u, s])
				}
			})
		}, {
			"../buildCommon": 91,
			"../buildHTML": 92,
			"../buildMathML": 93,
			"../defineFunction": 96,
			"../domTree": 98,
			"../mathMLTree": 116
		}],
		113: [function (e, t, r) {
			"use strict";
			var a = e("../defineFunction");
			var n = h(a);
			var i = e("../buildCommon");
			var l = h(i);
			var u = e("../mathMLTree");
			var o = h(u);
			var s = e("../buildHTML");
			var f = v(s);
			var d = e("../buildMathML");
			var c = v(d);

			function v(e) {
				if (e && e.__esModule) {
					return e
				} else {
					var t = {};
					if (e != null) {
						for (var r in e) {
							if (Object.prototype.hasOwnProperty.call(e, r)) t[r] = e[r]
						}
					}
					t.default = e;
					return t
				}
			}

			function h(e) {
				return e && e.__esModule ? e : {
					default: e
				}
			}(0, n.default)({
				type: "phantom",
				names: ["\\phantom"],
				props: {
					numArgs: 1
				},
				handler: function e(t, r) {
					var n = r[0];
					return {
						type: "phantom",
						value: (0, a.ordargument)(n)
					}
				},
				htmlBuilder: function e(t, r) {
					var a = f.buildExpression(t.value.value, r.withPhantom(), false);
					return new l.default.makeFragment(a)
				},
				mathmlBuilder: function e(t, r) {
					var a = c.buildExpression(t.value.value, r);
					return new o.default.MathNode("mphantom", a)
				}
			});
			(0, n.default)({
				type: "hphantom",
				names: ["\\hphantom"],
				props: {
					numArgs: 1
				},
				handler: function e(t, r) {
					var n = r[0];
					return {
						type: "hphantom",
						value: (0, a.ordargument)(n),
						body: n
					}
				},
				htmlBuilder: function e(t, r) {
					var a = l.default.makeSpan([], [f.buildGroup(t.value.body, r.withPhantom())]);
					a.height = 0;
					a.depth = 0;
					if (a.children) {
						for (var n = 0; n < a.children.length; n++) {
							a.children[n].height = 0;
							a.children[n].depth = 0
						}
					}
					a = l.default.makeVList({
						positionType: "firstBaseline",
						children: [{
							type: "elem",
							elem: a
						}]
					}, r);
					return a
				},
				mathmlBuilder: function e(t, r) {
					var a = c.buildExpression(t.value.value, r);
					var n = new o.default.MathNode("mphantom", a);
					n.setAttribute("height", "0px");
					return n
				}
			});
			(0, n.default)({
				type: "vphantom",
				names: ["\\vphantom"],
				props: {
					numArgs: 1
				},
				handler: function e(t, r) {
					var n = r[0];
					return {
						type: "vphantom",
						value: (0, a.ordargument)(n),
						body: n
					}
				},
				htmlBuilder: function e(t, r) {
					var a = l.default.makeSpan(["inner"], [f.buildGroup(t.value.body, r.withPhantom())]);
					var n = l.default.makeSpan(["fix"], []);
					return l.default.makeSpan(["mord", "rlap"], [a, n], r)
				},
				mathmlBuilder: function e(t, r) {
					var a = c.buildExpression(t.value.value, r);
					var n = new o.default.MathNode("mphantom", a);
					n.setAttribute("width", "0px");
					return n
				}
			})
		}, {
			"../buildCommon": 91,
			"../buildHTML": 92,
			"../buildMathML": 93,
			"../defineFunction": 96,
			"../mathMLTree": 116
		}],
		114: [function (e, t, r) {
			"use strict";
			var a = e("../defineFunction");
			var n = h(a);
			var i = e("../buildCommon");
			var l = h(i);
			var u = e("../mathMLTree");
			var o = h(u);
			var s = e("../buildHTML");
			var f = v(s);
			var d = e("../buildMathML");
			var c = v(d);

			function v(e) {
				if (e && e.__esModule) {
					return e
				} else {
					var t = {};
					if (e != null) {
						for (var r in e) {
							if (Object.prototype.hasOwnProperty.call(e, r)) t[r] = e[r]
						}
					}
					t.default = e;
					return t
				}
			}

			function h(e) {
				return e && e.__esModule ? e : {
					default: e
				}
			}(0, n.default)({
				type: "smash",
				names: ["\\smash"],
				props: {
					numArgs: 1,
					numOptionalArgs: 1,
					allowedInText: true
				},
				handler: function e(t, r, a) {
					var n = false;
					var i = false;
					var l = a[0];
					if (l) {
						var u = "";
						for (var o = 0; o < l.value.length; ++o) {
							u = l.value[o].value;
							if (u === "t") {
								n = true
							} else if (u === "b") {
								i = true
							} else {
								n = false;
								i = false;
								break
							}
						}
					} else {
						n = true;
						i = true
					}
					var s = r[0];
					return {
						type: "smash",
						body: s,
						smashHeight: n,
						smashDepth: i
					}
				},
				htmlBuilder: function e(t, r) {
					var a = l.default.makeSpan(["mord"], [f.buildGroup(t.value.body, r)]);
					if (!t.value.smashHeight && !t.value.smashDepth) {
						return a
					}
					if (t.value.smashHeight) {
						a.height = 0;
						if (a.children) {
							for (var n = 0; n < a.children.length; n++) {
								a.children[n].height = 0
							}
						}
					}
					if (t.value.smashDepth) {
						a.depth = 0;
						if (a.children) {
							for (var i = 0; i < a.children.length; i++) {
								a.children[i].depth = 0
							}
						}
					}
					return l.default.makeVList({
						positionType: "firstBaseline",
						children: [{
							type: "elem",
							elem: a
						}]
					}, r)
				},
				mathmlBuilder: function e(t, r) {
					var a = new o.default.MathNode("mpadded", [c.buildGroup(t.value.body, r)]);
					if (t.value.smashHeight) {
						a.setAttribute("height", "0px")
					}
					if (t.value.smashDepth) {
						a.setAttribute("depth", "0px")
					}
					return a
				}
			})
		}, {
			"../buildCommon": 91,
			"../buildHTML": 92,
			"../buildMathML": 93,
			"../defineFunction": 96,
			"../mathMLTree": 116
		}],
		115: [function (e, t, r) {
			"use strict";
			Object.defineProperty(r, "__esModule", {
				value: true
			});
			var a = e("./symbols");
			var n = o(a);
			var i = e("./utils");
			var l = o(i);
			var u = e("./Token");

			function o(e) {
				return e && e.__esModule ? e : {
					default: e
				}
			}
			var s = {};
			r.default = s;

			function f(e, t) {
				s[e] = t
			}
			f("\\@firstoftwo", function (e) {
				var t = e.consumeArgs(2);
				return {
					tokens: t[0],
					numArgs: 0
				}
			});
			f("\\@ifnextchar", function (e) {
				var t = e.consumeArgs(3);
				var r = e.future();
				if (t[0].length === 1 && t[0][0].text === r.text) {
					return {
						tokens: t[1],
						numArgs: 0
					}
				} else {
					return {
						tokens: t[2],
						numArgs: 0
					}
				}
			});
			f("\\@ifstar", "\\@ifnextchar *{\\@firstoftwo{#1}}");
			f("\\bgroup", "{");
			f("\\egroup", "}");
			f("\\begingroup", "{");
			f("\\endgroup", "}");
			f("\u2102", "\\mathbb{C}");
			f("\u210d", "\\mathbb{H}");
			f("\u2115", "\\mathbb{N}");
			f("\u2119", "\\mathbb{P}");
			f("\u211a", "\\mathbb{Q}");
			f("\u211d", "\\mathbb{R}");
			f("\u2124", "\\mathbb{Z}");
			f("\\mkern", "\\kern");
			f("\\llap", "\\mathllap{\\textrm{#1}}");
			f("\\rlap", "\\mathrlap{\\textrm{#1}}");
			f("\\clap", "\\mathclap{\\textrm{#1}}");
			f("\\overset", "\\mathop{#2}\\limits^{#1}");
			f("\\underset", "\\mathop{#2}\\limits_{#1}");
			f("\\boxed", "\\fbox{\\displaystyle{#1}}");
			f("\\iff", "\\DOTSB\\;\\Longleftrightarrow\\;");
			f("\\implies", "\\DOTSB\\;\\Longrightarrow\\;");
			f("\\impliedby", "\\DOTSB\\;\\Longleftarrow\\;");
			var d = {
				",": "\\dotsc",
				"\\not": "\\dotsb",
				"+": "\\dotsb",
				"=": "\\dotsb",
				"<": "\\dotsb",
				">": "\\dotsb",
				"-": "\\dotsb",
				"*": "\\dotsb",
				":": "\\dotsb",
				"\\DOTSB": "\\dotsb",
				"\\coprod": "\\dotsb",
				"\\bigvee": "\\dotsb",
				"\\bigwedge": "\\dotsb",
				"\\biguplus": "\\dotsb",
				"\\bigcap": "\\dotsb",
				"\\bigcup": "\\dotsb",
				"\\prod": "\\dotsb",
				"\\sum": "\\dotsb",
				"\\bigotimes": "\\dotsb",
				"\\bigoplus": "\\dotsb",
				"\\bigodot": "\\dotsb",
				"\\bigsqcup": "\\dotsb",
				"\\implies": "\\dotsb",
				"\\impliedby": "\\dotsb",
				"\\And": "\\dotsb",
				"\\longrightarrow": "\\dotsb",
				"\\Longrightarrow": "\\dotsb",
				"\\longleftarrow": "\\dotsb",
				"\\Longleftarrow": "\\dotsb",
				"\\longleftrightarrow": "\\dotsb",
				"\\Longleftrightarrow": "\\dotsb",
				"\\mapsto": "\\dotsb",
				"\\longmapsto": "\\dotsb",
				"\\hookrightarrow": "\\dotsb",
				"\\iff": "\\dotsb",
				"\\doteq": "\\dotsb",
				"\\mathbin": "\\dotsb",
				"\\bmod": "\\dotsb",
				"\\mathrel": "\\dotsb",
				"\\relbar": "\\dotsb",
				"\\Relbar": "\\dotsb",
				"\\xrightarrow": "\\dotsb",
				"\\xleftarrow": "\\dotsb",
				"\\DOTSI": "\\dotsi",
				"\\int": "\\dotsi",
				"\\oint": "\\dotsi",
				"\\iint": "\\dotsi",
				"\\iiint": "\\dotsi",
				"\\iiiint": "\\dotsi",
				"\\idotsint": "\\dotsi",
				"\\DOTSX": "\\dotsx"
			};
			f("\\dots", function (e) {
				var t = "\\dotso";
				var r = e.expandAfterFuture().text;
				if (r in d) {
					t = d[r]
				} else if (r.substr(0, 4) === "\\not") {
					t = "\\dotsb"
				} else if (r in n.default.math) {
					if (l.default.contains(["bin", "rel"], n.default.math[r].group)) {
						t = "\\dotsb"
					}
				}
				return t
			});
			var c = {
				")": true,
				"]": true,
				"\\rbrack": true,
				"\\}": true,
				"\\rbrace": true,
				"\\rangle": true,
				"\\rceil": true,
				"\\rfloor": true,
				"\\rgroup": true,
				"\\rmoustache": true,
				"\\right": true,
				"\\bigr": true,
				"\\biggr": true,
				"\\Bigr": true,
				"\\Biggr": true,
				$: true,
				";": true,
				".": true,
				",": true
			};
			f("\\dotso", function (e) {
				var t = e.future().text;
				if (t in c) {
					return "\\ldots\\,"
				} else {
					return "\\ldots"
				}
			});
			f("\\dotsc", function (e) {
				var t = e.future().text;
				if (t in c && t !== ",") {
					return "\\ldots\\,"
				} else {
					return "\\ldots"
				}
			});
			f("\\cdots", function (e) {
				var t = e.future().text;
				if (t in c) {
					return "\\@cdots\\,"
				} else {
					return "\\@cdots"
				}
			});
			f("\\dotsb", "\\cdots");
			f("\\dotsm", "\\cdots");
			f("\\dotsi", "\\!\\cdots");
			f("\\dotsx", "\\ldots\\,");
			f("\\DOTSI", "\\relax");
			f("\\DOTSB", "\\relax");
			f("\\DOTSX", "\\relax");
			f("\\thinspace", "\\,");
			f("\\medspace", "\\:");
			f("\\thickspace", "\\;");
			f("\\hspace", "\\@ifstar\\kern\\kern");
			f("\\ordinarycolon", ":");
			f("\\vcentcolon", "\\mathrel{\\mathop\\ordinarycolon}");
			f("\\dblcolon", "\\vcentcolon\\mathrel{\\mkern-.9mu}\\vcentcolon");
			f("\\coloneqq", "\\vcentcolon\\mathrel{\\mkern-1.2mu}=");
			f("\\Coloneqq", "\\dblcolon\\mathrel{\\mkern-1.2mu}=");
			f("\\coloneq", "\\vcentcolon\\mathrel{\\mkern-1.2mu}\\mathrel{-}");
			f("\\Coloneq", "\\dblcolon\\mathrel{\\mkern-1.2mu}\\mathrel{-}");
			f("\\eqqcolon", "=\\mathrel{\\mkern-1.2mu}\\vcentcolon");
			f("\\Eqqcolon", "=\\mathrel{\\mkern-1.2mu}\\dblcolon");
			f("\\eqcolon", "\\mathrel{-}\\mathrel{\\mkern-1.2mu}\\vcentcolon");
			f("\\Eqcolon", "\\mathrel{-}\\mathrel{\\mkern-1.2mu}\\dblcolon");
			f("\\colonapprox", "\\vcentcolon\\mathrel{\\mkern-1.2mu}\\approx");
			f("\\Colonapprox", "\\dblcolon\\mathrel{\\mkern-1.2mu}\\approx");
			f("\\colonsim", "\\vcentcolon\\mathrel{\\mkern-1.2mu}\\sim");
			f("\\Colonsim", "\\dblcolon\\mathrel{\\mkern-1.2mu}\\sim");
			f("\\ratio", "\\vcentcolon");
			f("\\coloncolon", "\\dblcolon");
			f("\\colonequals", "\\coloneqq");
			f("\\coloncolonequals", "\\Coloneqq");
			f("\\equalscolon", "\\eqqcolon");
			f("\\equalscoloncolon", "\\Eqqcolon");
			f("\\colonminus", "\\coloneq");
			f("\\coloncolonminus", "\\Coloneq");
			f("\\minuscolon", "\\eqcolon");
			f("\\minuscoloncolon", "\\Eqcolon");
			f("\\coloncolonapprox", "\\Colonapprox");
			f("\\coloncolonsim", "\\Colonsim");
			f("\\simcolon", "\\sim\\mathrel{\\mkern-1.2mu}\\vcentcolon");
			f("\\simcoloncolon", "\\sim\\mathrel{\\mkern-1.2mu}\\dblcolon");
			f("\\approxcolon", "\\approx\\mathrel{\\mkern-1.2mu}\\vcentcolon");
			f("\\approxcoloncolon", "\\approx\\mathrel{\\mkern-1.2mu}\\dblcolon");
			f("\\notni", "\\not\\ni")
		}, {
			"./Token": 90,
			"./symbols": 120,
			"./utils": 123
		}],
		116: [function (e, t, r) {
			"use strict";
			Object.defineProperty(r, "__esModule", {
				value: true
			});
			var a = e("babel-runtime/core-js/get-iterator");
			var n = d(a);
			var i = e("babel-runtime/helpers/classCallCheck");
			var l = d(i);
			var u = e("babel-runtime/helpers/createClass");
			var o = d(u);
			var s = e("./utils");
			var f = d(s);

			function d(e) {
				return e && e.__esModule ? e : {
					default: e
				}
			}
			var c = function () {
				function e(t, r) {
					(0, l.default)(this, e);
					this.type = t;
					this.attributes = {};
					this.children = r || []
				}(0, o.default)(e, [{
					key: "setAttribute",
					value: function e(t, r) {
						this.attributes[t] = r
					}
				}, {
					key: "toNode",
					value: function e() {
						var t = document.createElementNS("http://www.w3.org/1998/Math/MathML", this.type);
						for (var r in this.attributes) {
							if (Object.prototype.hasOwnProperty.call(this.attributes, r)) {
								t.setAttribute(r, this.attributes[r])
							}
						}
						var a = true;
						var i = false;
						var l = undefined;
						try {
							for (var u = (0, n.default)(this.children), o; !(a = (o = u.next()).done); a = true) {
								var s = o.value;
								t.appendChild(s.toNode())
							}
						} catch (e) {
							i = true;
							l = e
						} finally {
							try {
								if (!a && u.return) {
									u.return()
								}
							} finally {
								if (i) {
									throw l
								}
							}
						}
						return t
					}
				}, {
					key: "toMarkup",
					value: function e() {
						var t = "<" + this.type;
						for (var r in this.attributes) {
							if (Object.prototype.hasOwnProperty.call(this.attributes, r)) {
								t += " " + r + '="';
								t += f.default.escape(this.attributes[r]);
								t += '"'
							}
						}
						t += ">";
						for (var a = 0; a < this.children.length; a++) {
							t += this.children[a].toMarkup()
						}
						t += "</" + this.type + ">";
						return t
					}
				}]);
				return e
			}();
			var v = function () {
				function e(t) {
					(0, l.default)(this, e);
					this.text = t
				}(0, o.default)(e, [{
					key: "toNode",
					value: function e() {
						return document.createTextNode(this.text)
					}
				}, {
					key: "toMarkup",
					value: function e() {
						return f.default.escape(this.text)
					}
				}]);
				return e
			}();
			r.default = {
				MathNode: c,
				TextNode: v
			}
		}, {
			"./utils": 123,
			"babel-runtime/core-js/get-iterator": 3,
			"babel-runtime/helpers/classCallCheck": 8,
			"babel-runtime/helpers/createClass": 9
		}],
		117: [function (e, t, r) {
			"use strict";
			Object.defineProperty(r, "__esModule", {
				value: true
			});
			var a = e("./Parser");
			var n = i(a);

			function i(e) {
				return e && e.__esModule ? e : {
					default: e
				}
			}
			var l = function e(t, r) {
				if (!(typeof t === "string" || t instanceof String)) {
					throw new TypeError("KaTeX can only parse string typed expression")
				}
				var a = new n.default(t, r);
				return a.parse()
			};
			r.default = l
		}, {
			"./Parser": 86
		}],
		118: [function (e, t, r) {
			"use strict";
			Object.defineProperty(r, "__esModule", {
				value: true
			});
			var a = e("babel-runtime/helpers/slicedToArray");
			var n = v(a);
			var i = e("./domTree");
			var l = v(i);
			var u = e("./buildCommon");
			var o = v(u);
			var s = e("./mathMLTree");
			var f = v(s);
			var d = e("./utils");
			var c = v(d);

			function v(e) {
				return e && e.__esModule ? e : {
					default: e
				}
			}
			var h = {
				widehat: "^",
				widetilde: "~",
				utilde: "~",
				overleftarrow: "\u2190",
				underleftarrow: "\u2190",
				xleftarrow: "\u2190",
				overrightarrow: "\u2192",
				underrightarrow: "\u2192",
				xrightarrow: "\u2192",
				underbrace: "\u23b5",
				overbrace: "\u23de",
				overleftrightarrow: "\u2194",
				underleftrightarrow: "\u2194",
				xleftrightarrow: "\u2194",
				Overrightarrow: "\u21d2",
				xRightarrow: "\u21d2",
				overleftharpoon: "\u21bc",
				xleftharpoonup: "\u21bc",
				overrightharpoon: "\u21c0",
				xrightharpoonup: "\u21c0",
				xLeftarrow: "\u21d0",
				xLeftrightarrow: "\u21d4",
				xhookleftarrow: "\u21a9",
				xhookrightarrow: "\u21aa",
				xmapsto: "\u21a6",
				xrightharpoondown: "\u21c1",
				xleftharpoondown: "\u21bd",
				xrightleftharpoons: "\u21cc",
				xleftrightharpoons: "\u21cb",
				xtwoheadleftarrow: "\u219e",
				xtwoheadrightarrow: "\u21a0",
				xLongequal: "=",
				xtofrom: "\u21c4"
			};
			var p = function e(t) {
				var r = new f.default.MathNode("mo", [new f.default.TextNode(h[t.substr(1)])]);
				r.setAttribute("stretchy", "true");
				return r
			};
			var m = {
				overrightarrow: [
					["rightarrow"], .888, 522, "xMaxYMin"
				],
				overleftarrow: [
					["leftarrow"], .888, 522, "xMinYMin"
				],
				underrightarrow: [
					["rightarrow"], .888, 522, "xMaxYMin"
				],
				underleftarrow: [
					["leftarrow"], .888, 522, "xMinYMin"
				],
				xrightarrow: [
					["rightarrow"], 1.469, 522, "xMaxYMin"
				],
				xleftarrow: [
					["leftarrow"], 1.469, 522, "xMinYMin"
				],
				Overrightarrow: [
					["doublerightarrow"], .888, 560, "xMaxYMin"
				],
				xRightarrow: [
					["doublerightarrow"], 1.526, 560, "xMaxYMin"
				],
				xLeftarrow: [
					["doubleleftarrow"], 1.526, 560, "xMinYMin"
				],
				overleftharpoon: [
					["leftharpoon"], .888, 522, "xMinYMin"
				],
				xleftharpoonup: [
					["leftharpoon"], .888, 522, "xMinYMin"
				],
				xleftharpoondown: [
					["leftharpoondown"], .888, 522, "xMinYMin"
				],
				overrightharpoon: [
					["rightharpoon"], .888, 522, "xMaxYMin"
				],
				xrightharpoonup: [
					["rightharpoon"], .888, 522, "xMaxYMin"
				],
				xrightharpoondown: [
					["rightharpoondown"], .888, 522, "xMaxYMin"
				],
				xLongequal: [
					["longequal"], .888, 334, "xMinYMin"
				],
				xtwoheadleftarrow: [
					["twoheadleftarrow"], .888, 334, "xMinYMin"
				],
				xtwoheadrightarrow: [
					["twoheadrightarrow"], .888, 334, "xMaxYMin"
				],
				overleftrightarrow: [
					["leftarrow", "rightarrow"], .888, 522
				],
				overbrace: [
					["leftbrace", "midbrace", "rightbrace"], 1.6, 548
				],
				underbrace: [
					["leftbraceunder", "midbraceunder", "rightbraceunder"], 1.6, 548
				],
				underleftrightarrow: [
					["leftarrow", "rightarrow"], .888, 522
				],
				xleftrightarrow: [
					["leftarrow", "rightarrow"], 1.75, 522
				],
				xLeftrightarrow: [
					["doubleleftarrow", "doublerightarrow"], 1.75, 560
				],
				xrightleftharpoons: [
					["leftharpoondownplus", "rightharpoonplus"], 1.75, 716
				],
				xleftrightharpoons: [
					["leftharpoonplus", "rightharpoondownplus"], 1.75, 716
				],
				xhookleftarrow: [
					["leftarrow", "righthook"], 1.08, 522
				],
				xhookrightarrow: [
					["lefthook", "rightarrow"], 1.08, 522
				],
				overlinesegment: [
					["leftlinesegment", "rightlinesegment"], .888, 522
				],
				underlinesegment: [
					["leftlinesegment", "rightlinesegment"], .888, 522
				],
				overgroup: [
					["leftgroup", "rightgroup"], .888, 342
				],
				undergroup: [
					["leftgroupunder", "rightgroupunder"], .888, 342
				],
				xmapsto: [
					["leftmapsto", "rightarrow"], 1.5, 522
				],
				xtofrom: [
					["leftToFrom", "rightToFrom"], 1.75, 528
				]
			};
			var g = function e(t) {
				if (t.type === "ordgroup") {
					return t.value.length
				} else {
					return 1
				}
			};
			var b = function e(t, r) {
				function a() {
					var e = 4e5;
					var a = t.value.label.substr(1);
					if (c.default.contains(["widehat", "widetilde", "utilde"], a)) {
						var i = g(t.value.base);
						var u = void 0;
						var s = void 0;
						var f = void 0;
						if (i > 5) {
							u = a === "widehat" ? 420 : 312;
							e = a === "widehat" ? 2364 : 2340;
							f = a === "widehat" ? .42 : .34;
							s = (a === "widehat" ? "widehat" : "tilde") + "4"
						} else {
							var d = [1, 1, 2, 2, 3, 3][i];
							if (a === "widehat") {
								e = [0, 1062, 2364, 2364, 2364][d];
								u = [0, 239, 300, 360, 420][d];
								f = [0, .24, .3, .3, .36, .42][d];
								s = "widehat" + d
							} else {
								e = [0, 600, 1033, 2339, 2340][d];
								u = [0, 260, 286, 306, 312][d];
								f = [0, .26, .286, .3, .306, .34][d];
								s = "tilde" + d
							}
						}
						var v = new l.default.pathNode(s);
						var h = new l.default.svgNode([v], {
							width: "100%",
							height: f + "em",
							viewBox: "0 0 " + e + " " + u,
							preserveAspectRatio: "none"
						});
						return {
							span: o.default.makeSpan([], [h], r),
							minWidth: 0,
							height: f
						}
					} else {
						var p = [];
						var b = (0, n.default)(m[a], 4),
							y = b[0],
							x = b[1],
							w = b[2],
							k = b[3];
						var M = w / 1e3;
						var _ = y.length;
						var S = void 0;
						var z = void 0;
						if (_ === 1) {
							S = ["hide-tail"];
							z = [k]
						} else if (_ === 2) {
							S = ["halfarrow-left", "halfarrow-right"];
							z = ["xMinYMin", "xMaxYMin"]
						} else if (_ === 3) {
							S = ["brace-left", "brace-center", "brace-right"];
							z = ["xMinYMin", "xMidYMin", "xMaxYMin"]
						} else {
							throw new Error("Correct katexImagesData or update code here to support\n                    " + _ + " children.")
						}
						for (var T = 0; T < _; T++) {
							var C = new l.default.pathNode(y[T]);
							var A = new l.default.svgNode([C], {
								width: "400em",
								height: M + "em",
								viewBox: "0 0 " + e + " " + w,
								preserveAspectRatio: z[T] + " slice"
							});
							var O = o.default.makeSpan([S[T]], [A], r);
							if (_ === 1) {
								return {
									span: O,
									minWidth: x,
									height: M
								}
							} else {
								O.style.height = M + "em";
								p.push(O)
							}
						}
						return {
							span: o.default.makeSpan(["stretchy"], p, r),
							minWidth: x,
							height: M
						}
					}
				}
				var i = a(),
					u = i.span,
					s = i.minWidth,
					f = i.height;
				u.height = f;
				u.style.height = f + "em";
				if (s > 0) {
					u.style.minWidth = s + "em"
				}
				return u
			};
			var y = function e(t, r, a, n) {
				var i = void 0;
				var u = t.height + t.depth + 2 * a;
				if (/fbox|color/.test(r)) {
					i = o.default.makeSpan(["stretchy", r], [], n);
					if (r === "fbox") {
						var s = n.color && n.getColor();
						if (s) {
							i.style.borderColor = s
						}
					}
				} else {
					var f = [];
					if (/^[bx]cancel$/.test(r)) {
						f.push(new l.default.lineNode({
							x1: "0",
							y1: "0",
							x2: "100%",
							y2: "100%",
							"stroke-width": "0.046em"
						}))
					}
					if (/^x?cancel$/.test(r)) {
						f.push(new l.default.lineNode({
							x1: "0",
							y1: "100%",
							x2: "100%",
							y2: "0",
							"stroke-width": "0.046em"
						}))
					}
					var d = new l.default.svgNode(f, {
						width: "100%",
						height: u + "em"
					});
					i = o.default.makeSpan([], [d], n)
				}
				i.height = u;
				i.style.height = u + "em";
				return i
			};
			var x = function e(t, r) {
				var a = new l.default.pathNode("bigRule");
				var n = new l.default.svgNode([a], {
					width: "400em",
					height: "400em",
					viewBox: "0 0 400000 400000",
					preserveAspectRatio: "xMinYMin slice"
				});
				return o.default.makeSpan([t, "hide-tail"], [n], r)
			};
			r.default = {
				encloseSpan: y,
				mathMLnode: p,
				ruleSpan: x,
				svgSpan: b
			}
		}, {
			"./buildCommon": 91,
			"./domTree": 98,
			"./mathMLTree": 116,
			"./utils": 123,
			"babel-runtime/helpers/slicedToArray": 10
		}],
		119: [function (e, t, r) {
			"use strict";
			Object.defineProperty(r, "__esModule", {
				value: true
			});
			var a = {
				bigRule: "M0 0 h400000 v400000 h-400000z M0 0 h400000 v400000 h-400000z",
				sqrtMain: "M95 622c-2.667 0-7.167-2.667-13.5\n-8S72 604 72 600c0-2 .333-3.333 1-4 1.333-2.667 23.833-20.667 67.5-54s\n65.833-50.333 66.5-51c1.333-1.333 3-2 5-2 4.667 0 8.667 3.333 12 10l173\n378c.667 0 35.333-71 104-213s137.5-285 206.5-429S812 17.333 812 14c5.333\n-9.333 12-14 20-14h399166v40H845.272L620 507 385 993c-2.667 4.667-9 7-19\n7-6 0-10-1-12-3L160 575l-65 47zM834 0h399166v40H845z",
				sqrtSize1: "M263 601c.667 0 18 39.667 52 119s68.167\n 158.667 102.5 238 51.833 119.333 52.5 120C810 373.333 980.667 17.667 982 11\nc4.667-7.333 11-11 19-11h398999v40H1012.333L741 607c-38.667 80.667-84 175-136\n 283s-89.167 185.333-111.5 232-33.833 70.333-34.5 71c-4.667 4.667-12.333 7-23\n 7l-12-1-109-253c-72.667-168-109.333-252-110-252-10.667 8-22 16.667-34 26-22\n 17.333-33.333 26-34 26l-26-26 76-59 76-60zM1001 0h398999v40H1012z",
				sqrtSize2: "M1001 0h398999v40H1013.084S929.667 308 749\n 880s-277 876.333-289 913c-4.667 4.667-12.667 7-24 7h-12c-1.333-3.333-3.667\n-11.667-7-25-35.333-125.333-106.667-373.333-214-744-10 12-21 25-33 39l-32 39\nc-6-5.333-15-14-27-26l25-30c26.667-32.667 52-63 76-91l52-60 208 722c56-175.333\n 126.333-397.333 211-666s153.833-488.167 207.5-658.5C944.167 129.167 975 32.667\n 983 10c4-6.667 10-10 18-10zm0 0h398999v40H1013z",
				sqrtSize3: "M424 2398c-1.333-.667-38.5-172-111.5-514 S202.667 1370.667 202\n 1370c0-2-10.667 14.333-32 49-4.667 7.333-9.833 15.667-15.5 25s-9.833 16-12.5\n 20l-5 7c-4-3.333-8.333-7.667-13-13l-13-13 76-122 77-121 209 968c0-2 84.667\n-361.667 254-1079C896.333 373.667 981.667 13.333 983 10c4-6.667 10-10 18-10\nh398999v40H1014.622S927.332 418.667 742 1206c-185.333 787.333-279.333 1182.333\n-282 1185-2 6-10 9-24 9-8 0-12-.667-12-2zM1001 0h398999v40H1014z",
				sqrtSize4: "M473 2713C812.333 913.667 982.333 13 983 11c3.333-7.333 9.333\n-11 18-11h399110v40H1017.698S927.168 518 741.5 1506C555.833 2494 462 2989 460\n 2991c-2 6-10 9-24 9-8 0-12-.667-12-2s-5.333-32-16-92c-50.667-293.333-119.667\n-693.333-207-1200 0-1.333-5.333 8.667-16 30l-32 64-16 33-26-26 76-153 77-151\nc.667.667 35.667 202 105 604 67.333 400.667 102 602.667 104 606z\nM1001 0h398999v40H1017z",
				doubleleftarrow: "M262 157\nl10-10c34-36 62.7-77 86-123 3.3-8 5-13.3 5-16 0-5.3-6.7-8-20-8-7.3\n 0-12.2.5-14.5 1.5-2.3 1-4.8 4.5-7.5 10.5-49.3 97.3-121.7 169.3-217 216-28\n 14-57.3 25-88 33-6.7 2-11 3.8-13 5.5-2 1.7-3 4.2-3 7.5s1 5.8 3 7.5\nc2 1.7 6.3 3.5 13 5.5 68 17.3 128.2 47.8 180.5 91.5 52.3 43.7 93.8 96.2 124.5\n 157.5 9.3 8 15.3 12.3 18 13h6c12-.7 18-4 18-10 0-2-1.7-7-5-15-23.3-46-52-87\n-86-123l-10-10h399738v-40H218c328 0 0 0 0 0l-10-8c-26.7-20-65.7-43-117-69 2.7\n-2 6-3.7 10-5 36.7-16 72.3-37.3 107-64l10-8h399782v-40z\nm8 0v40h399730v-40zm0 194v40h399730v-40z",
				doublerightarrow: "M399738 392l\n-10 10c-34 36-62.7 77-86 123-3.3 8-5 13.3-5 16 0 5.3 6.7 8 20 8 7.3 0 12.2-.5\n 14.5-1.5 2.3-1 4.8-4.5 7.5-10.5 49.3-97.3 121.7-169.3 217-216 28-14 57.3-25 88\n-33 6.7-2 11-3.8 13-5.5 2-1.7 3-4.2 3-7.5s-1-5.8-3-7.5c-2-1.7-6.3-3.5-13-5.5-68\n-17.3-128.2-47.8-180.5-91.5-52.3-43.7-93.8-96.2-124.5-157.5-9.3-8-15.3-12.3-18\n-13h-6c-12 .7-18 4-18 10 0 2 1.7 7 5 15 23.3 46 52 87 86 123l10 10H0v40h399782\nc-328 0 0 0 0 0l10 8c26.7 20 65.7 43 117 69-2.7 2-6 3.7-10 5-36.7 16-72.3 37.3\n-107 64l-10 8H0v40zM0 157v40h399730v-40zm0 194v40h399730v-40z",
				leftarrow: "M400000 241H110l3-3c68.7-52.7 113.7-120\n 135-202 4-14.7 6-23 6-25 0-7.3-7-11-21-11-8 0-13.2.8-15.5 2.5-2.3 1.7-4.2 5.8\n-5.5 12.5-1.3 4.7-2.7 10.3-4 17-12 48.7-34.8 92-68.5 130S65.3 228.3 18 247\nc-10 4-16 7.7-18 11 0 8.7 6 14.3 18 17 47.3 18.7 87.8 47 121.5 85S196 441.3 208\n 490c.7 2 1.3 5 2 9s1.2 6.7 1.5 8c.3 1.3 1 3.3 2 6s2.2 4.5 3.5 5.5c1.3 1 3.3\n 1.8 6 2.5s6 1 10 1c14 0 21-3.7 21-11 0-2-2-10.3-6-25-20-79.3-65-146.7-135-202\n l-3-3h399890zM100 241v40h399900v-40z",
				leftbrace: "M6 548l-6-6v-35l6-11c56-104 135.3-181.3 238-232 57.3-28.7 117\n-45 179-50h399577v120H403c-43.3 7-81 15-113 26-100.7 33-179.7 91-237 174-2.7\n 5-6 9-10 13-.7 1-7.3 1-20 1H6z",
				leftbraceunder: "M0 6l6-6h17c12.688 0 19.313.3 20 1 4 4 7.313 8.3 10 13\n 35.313 51.3 80.813 93.8 136.5 127.5 55.688 33.7 117.188 55.8 184.5 66.5.688\n 0 2 .3 4 1 18.688 2.7 76 4.3 172 5h399450v120H429l-6-1c-124.688-8-235-61.7\n-331-161C60.687 138.7 32.312 99.3 7 54L0 41V6z",
				leftgroup: "M400000 80\nH435C64 80 168.3 229.4 21 260c-5.9 1.2-18 0-18 0-2 0-3-1-3-3v-38C76 61 257 0\n 435 0h399565z",
				leftgroupunder: "M400000 262\nH435C64 262 168.3 112.6 21 82c-5.9-1.2-18 0-18 0-2 0-3 1-3 3v38c76 158 257 219\n 435 219h399565z",
				leftharpoon: "M0 267c.7 5.3 3 10 7 14h399993v-40H93c3.3\n-3.3 10.2-9.5 20.5-18.5s17.8-15.8 22.5-20.5c50.7-52 88-110.3 112-175 4-11.3 5\n-18.3 3-21-1.3-4-7.3-6-18-6-8 0-13 .7-15 2s-4.7 6.7-8 16c-42 98.7-107.3 174.7\n-196 228-6.7 4.7-10.7 8-12 10-1.3 2-2 5.7-2 11zm100-26v40h399900v-40z",
				leftharpoonplus: "M0 267c.7 5.3 3 10 7 14h399993v-40H93c3.3-3.3 10.2-9.5\n 20.5-18.5s17.8-15.8 22.5-20.5c50.7-52 88-110.3 112-175 4-11.3 5-18.3 3-21-1.3\n-4-7.3-6-18-6-8 0-13 .7-15 2s-4.7 6.7-8 16c-42 98.7-107.3 174.7-196 228-6.7 4.7\n-10.7 8-12 10-1.3 2-2 5.7-2 11zm100-26v40h399900v-40zM0 435v40h400000v-40z\nm0 0v40h400000v-40z",
				leftharpoondown: "M7 241c-4 4-6.333 8.667-7 14 0 5.333.667 9 2 11s5.333\n 5.333 12 10c90.667 54 156 130 196 228 3.333 10.667 6.333 16.333 9 17 2 .667 5\n 1 9 1h5c10.667 0 16.667-2 18-6 2-2.667 1-9.667-3-21-32-87.333-82.667-157.667\n-152-211l-3-3h399907v-40zM93 281 H400000 v-40L7 241z",
				leftharpoondownplus: "M7 435c-4 4-6.3 8.7-7 14 0 5.3.7 9 2 11s5.3 5.3 12\n 10c90.7 54 156 130 196 228 3.3 10.7 6.3 16.3 9 17 2 .7 5 1 9 1h5c10.7 0 16.7\n-2 18-6 2-2.7 1-9.7-3-21-32-87.3-82.7-157.7-152-211l-3-3h399907v-40H7zm93 0\nv40h399900v-40zM0 241v40h399900v-40zm0 0v40h399900v-40z",
				lefthook: "M400000 281 H103s-33-11.2-61-33.5S0 197.3 0 164s14.2-61.2 42.5\n-83.5C70.8 58.2 104 47 142 47 c16.7 0 25 6.7 25 20 0 12-8.7 18.7-26 20-40 3.3\n-68.7 15.7-86 37-10 12-15 25.3-15 40 0 22.7 9.8 40.7 29.5 54 19.7 13.3 43.5 21\n 71.5 23h399859zM103 281v-40h399897v40z",
				leftlinesegment: "M40 281 V428 H0 V94 H40 V241 H400000 v40z\nM40 281 V428 H0 V94 H40 V241 H400000 v40z",
				leftmapsto: "M40 281 V448H0V74H40V241H400000v40z\nM40 281 V448H0V74H40V241H400000v40z",
				leftToFrom: "M0 147h400000v40H0zm0 214c68 40 115.7 95.7 143 167h22c15.3 0 23\n-.3 23-1 0-1.3-5.3-13.7-16-37-18-35.3-41.3-69-70-101l-7-8h399905v-40H95l7-8\nc28.7-32 52-65.7 70-101 10.7-23.3 16-35.7 16-37 0-.7-7.7-1-23-1h-22C115.7 265.3\n 68 321 0 361zm0-174v-40h399900v40zm100 154v40h399900v-40z",
				longequal: "M0 50 h400000 v40H0z m0 194h40000v40H0z\nM0 50 h400000 v40H0z m0 194h40000v40H0z",
				midbrace: "M200428 334\nc-100.7-8.3-195.3-44-280-108-55.3-42-101.7-93-139-153l-9-14c-2.7 4-5.7 8.7-9 14\n-53.3 86.7-123.7 153-211 199-66.7 36-137.3 56.3-212 62H0V214h199568c178.3-11.7\n 311.7-78.3 403-201 6-8 9.7-12 11-12 .7-.7 6.7-1 18-1s17.3.3 18 1c1.3 0 5 4 11\n 12 44.7 59.3 101.3 106.3 170 141s145.3 54.3 229 60h199572v120z",
				midbraceunder: "M199572 214\nc100.7 8.3 195.3 44 280 108 55.3 42 101.7 93 139 153l9 14c2.7-4 5.7-8.7 9-14\n 53.3-86.7 123.7-153 211-199 66.7-36 137.3-56.3 212-62h199568v120H200432c-178.3\n 11.7-311.7 78.3-403 201-6 8-9.7 12-11 12-.7.7-6.7 1-18 1s-17.3-.3-18-1c-1.3 0\n-5-4-11-12-44.7-59.3-101.3-106.3-170-141s-145.3-54.3-229-60H0V214z",
				rightarrow: "M0 241v40h399891c-47.3 35.3-84 78-110 128\n-16.7 32-27.7 63.7-33 95 0 1.3-.2 2.7-.5 4-.3 1.3-.5 2.3-.5 3 0 7.3 6.7 11 20\n 11 8 0 13.2-.8 15.5-2.5 2.3-1.7 4.2-5.5 5.5-11.5 2-13.3 5.7-27 11-41 14.7-44.7\n 39-84.5 73-119.5s73.7-60.2 119-75.5c6-2 9-5.7 9-11s-3-9-9-11c-45.3-15.3-85\n-40.5-119-75.5s-58.3-74.8-73-119.5c-4.7-14-8.3-27.3-11-40-1.3-6.7-3.2-10.8-5.5\n-12.5-2.3-1.7-7.5-2.5-15.5-2.5-14 0-21 3.7-21 11 0 2 2 10.3 6 25 20.7 83.3 67\n 151.7 139 205zm0 0v40h399900v-40z",
				rightbrace: "M400000 542l\n-6 6h-17c-12.7 0-19.3-.3-20-1-4-4-7.3-8.3-10-13-35.3-51.3-80.8-93.8-136.5-127.5\ns-117.2-55.8-184.5-66.5c-.7 0-2-.3-4-1-18.7-2.7-76-4.3-172-5H0V214h399571l6 1\nc124.7 8 235 61.7 331 161 31.3 33.3 59.7 72.7 85 118l7 13v35z",
				rightbraceunder: "M399994 0l6 6v35l-6 11c-56 104-135.3 181.3-238 232-57.3\n 28.7-117 45-179 50H-300V214h399897c43.3-7 81-15 113-26 100.7-33 179.7-91 237\n-174 2.7-5 6-9 10-13 .7-1 7.3-1 20-1h17z",
				rightgroup: "M0 80h399565c371 0 266.7 149.4 414 180 5.9 1.2 18 0 18 0 2 0\n 3-1 3-3v-38c-76-158-257-219-435-219H0z",
				rightgroupunder: "M0 262h399565c371 0 266.7-149.4 414-180 5.9-1.2 18 0 18\n 0 2 0 3 1 3 3v38c-76 158-257 219-435 219H0z",
				rightharpoon: "M0 241v40h399993c4.7-4.7 7-9.3 7-14 0-9.3\n-3.7-15.3-11-18-92.7-56.7-159-133.7-199-231-3.3-9.3-6-14.7-8-16-2-1.3-7-2-15-2\n-10.7 0-16.7 2-18 6-2 2.7-1 9.7 3 21 15.3 42 36.7 81.8 64 119.5 27.3 37.7 58\n 69.2 92 94.5zm0 0v40h399900v-40z",
				rightharpoonplus: "M0 241v40h399993c4.7-4.7 7-9.3 7-14 0-9.3-3.7-15.3-11\n-18-92.7-56.7-159-133.7-199-231-3.3-9.3-6-14.7-8-16-2-1.3-7-2-15-2-10.7 0-16.7\n 2-18 6-2 2.7-1 9.7 3 21 15.3 42 36.7 81.8 64 119.5 27.3 37.7 58 69.2 92 94.5z\nm0 0v40h399900v-40z m100 194v40h399900v-40zm0 0v40h399900v-40z",
				rightharpoondown: "M399747 511c0 7.3 6.7 11 20 11 8 0 13-.8 15-2.5s4.7-6.8\n 8-15.5c40-94 99.3-166.3 178-217 13.3-8 20.3-12.3 21-13 5.3-3.3 8.5-5.8 9.5\n-7.5 1-1.7 1.5-5.2 1.5-10.5s-2.3-10.3-7-15H0v40h399908c-34 25.3-64.7 57-92 95\n-27.3 38-48.7 77.7-64 119-3.3 8.7-5 14-5 16zM0 241v40h399900v-40z",
				rightharpoondownplus: "M399747 705c0 7.3 6.7 11 20 11 8 0 13-.8\n 15-2.5s4.7-6.8 8-15.5c40-94 99.3-166.3 178-217 13.3-8 20.3-12.3 21-13 5.3-3.3\n 8.5-5.8 9.5-7.5 1-1.7 1.5-5.2 1.5-10.5s-2.3-10.3-7-15H0v40h399908c-34 25.3\n-64.7 57-92 95-27.3 38-48.7 77.7-64 119-3.3 8.7-5 14-5 16zM0 435v40h399900v-40z\nm0-194v40h400000v-40zm0 0v40h400000v-40z",
				righthook: "M399859 241c-764 0 0 0 0 0 40-3.3 68.7-15.7 86-37 10-12 15-25.3\n 15-40 0-22.7-9.8-40.7-29.5-54-19.7-13.3-43.5-21-71.5-23-17.3-1.3-26-8-26-20 0\n-13.3 8.7-20 26-20 38 0 71 11.2 99 33.5 0 0 7 5.6 21 16.7 14 11.2 21 33.5 21\n 66.8s-14 61.2-42 83.5c-28 22.3-61 33.5-99 33.5L0 241z M0 281v-40h399859v40z",
				rightlinesegment: "M399960 241 V94 h40 V428 h-40 V281 H0 v-40z\nM399960 241 V94 h40 V428 h-40 V281 H0 v-40z",
				rightToFrom: "M400000 167c-70.7-42-118-97.7-142-167h-23c-15.3 0-23 .3-23\n 1 0 1.3 5.3 13.7 16 37 18 35.3 41.3 69 70 101l7 8H0v40h399905l-7 8c-28.7 32\n-52 65.7-70 101-10.7 23.3-16 35.7-16 37 0 .7 7.7 1 23 1h23c24-69.3 71.3-125 142\n-167z M100 147v40h399900v-40zM0 341v40h399900v-40z",
				twoheadleftarrow: "M0 167c68 40\n 115.7 95.7 143 167h22c15.3 0 23-.3 23-1 0-1.3-5.3-13.7-16-37-18-35.3-41.3-69\n-70-101l-7-8h125l9 7c50.7 39.3 85 86 103 140h46c0-4.7-6.3-18.7-19-42-18-35.3\n-40-67.3-66-96l-9-9h399716v-40H284l9-9c26-28.7 48-60.7 66-96 12.7-23.333 19\n-37.333 19-42h-46c-18 54-52.3 100.7-103 140l-9 7H95l7-8c28.7-32 52-65.7 70-101\n 10.7-23.333 16-35.7 16-37 0-.7-7.7-1-23-1h-22C115.7 71.3 68 127 0 167z",
				twoheadrightarrow: "M400000 167\nc-68-40-115.7-95.7-143-167h-22c-15.3 0-23 .3-23 1 0 1.3 5.3 13.7 16 37 18 35.3\n 41.3 69 70 101l7 8h-125l-9-7c-50.7-39.3-85-86-103-140h-46c0 4.7 6.3 18.7 19 42\n 18 35.3 40 67.3 66 96l9 9H0v40h399716l-9 9c-26 28.7-48 60.7-66 96-12.7 23.333\n-19 37.333-19 42h46c18-54 52.3-100.7 103-140l9-7h125l-7 8c-28.7 32-52 65.7-70\n 101-10.7 23.333-16 35.7-16 37 0 .7 7.7 1 23 1h22c27.3-71.3 75-127 143-167z",
				tilde1: "M200 55.538c-77 0-168 73.953-177 73.953-3 0-7\n-2.175-9-5.437L2 97c-1-2-2-4-2-6 0-4 2-7 5-9l20-12C116 12 171 0 207 0c86 0\n 114 68 191 68 78 0 168-68 177-68 4 0 7 2 9 5l12 19c1 2.175 2 4.35 2 6.525 0\n 4.35-2 7.613-5 9.788l-19 13.05c-92 63.077-116.937 75.308-183 76.128\n-68.267.847-113-73.952-191-73.952z",
				tilde2: "M344 55.266c-142 0-300.638 81.316-311.5 86.418\n-8.01 3.762-22.5 10.91-23.5 5.562L1 120c-1-2-1-3-1-4 0-5 3-9 8-10l18.4-9C160.9\n 31.9 283 0 358 0c148 0 188 122 331 122s314-97 326-97c4 0 8 2 10 7l7 21.114\nc1 2.14 1 3.21 1 4.28 0 5.347-3 9.626-7 10.696l-22.3 12.622C852.6 158.372 751\n 181.476 676 181.476c-149 0-189-126.21-332-126.21z",
				tilde3: "M786 59C457 59 32 175.242 13 175.242c-6 0-10-3.457\n-11-10.37L.15 138c-1-7 3-12 10-13l19.2-6.4C378.4 40.7 634.3 0 804.3 0c337 0\n 411.8 157 746.8 157 328 0 754-112 773-112 5 0 10 3 11 9l1 14.075c1 8.066-.697\n 16.595-6.697 17.492l-21.052 7.31c-367.9 98.146-609.15 122.696-778.15 122.696\n -338 0-409-156.573-744-156.573z",
				tilde4: "M786 58C457 58 32 177.487 13 177.487c-6 0-10-3.345\n-11-10.035L.15 143c-1-7 3-12 10-13l22-6.7C381.2 35 637.15 0 807.15 0c337 0 409\n 177 744 177 328 0 754-127 773-127 5 0 10 3 11 9l1 14.794c1 7.805-3 13.38-9\n 14.495l-20.7 5.574c-366.85 99.79-607.3 139.372-776.3 139.372-338 0-409\n -175.236-744-175.236z",
				widehat1: "M529 0h5l519 115c5 1 9 5 9 10 0 1-1 2-1 3l-4 22\nc-1 5-5 9-11 9h-2L532 67 19 159h-2c-5 0-9-4-11-9l-5-22c-1-6 2-12 8-13z",
				widehat2: "M1181 0h2l1171 176c6 0 10 5 10 11l-2 23c-1 6-5 10\n-11 10h-1L1182 67 15 220h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z",
				widehat3: "M1181 0h2l1171 236c6 0 10 5 10 11l-2 23c-1 6-5 10\n-11 10h-1L1182 67 15 280h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z",
				widehat4: "M1181 0h2l1171 296c6 0 10 5 10 11l-2 23c-1 6-5 10\n-11 10h-1L1182 67 15 340h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z"
			};
			r.default = {
				path: a
			}
		}, {}],
		120: [function (e, t, r) {
			"use strict";
			Object.defineProperty(r, "__esModule", {
				value: true
			});
			var a = {
				math: {},
				text: {}
			};
			r.default = a;

			function n(e, t, r, n, i, l) {
				a[e][i] = {
					font: t,
					group: r,
					replace: n
				};
				if (l && n) {
					a[e][n] = a[e][i]
				}
			}
			var i = "math";
			var l = "text";
			var u = "main";
			var o = "ams";
			var s = "accent";
			var f = "bin";
			var d = "close";
			var c = "inner";
			var v = "mathord";
			var h = "op";
			var p = "open";
			var m = "punct";
			var g = "rel";
			var b = "spacing";
			var y = "textord";
			n(i, u, g, "\u2261", "\\equiv", true);
			n(i, u, g, "\u227a", "\\prec", true);
			n(i, u, g, "\u227b", "\\succ", true);
			n(i, u, g, "\u223c", "\\sim", true);
			n(i, u, g, "\u22a5", "\\perp");
			n(i, u, g, "\u2aaf", "\\preceq", true);
			n(i, u, g, "\u2ab0", "\\succeq", true);
			n(i, u, g, "\u2243", "\\simeq", true);
			n(i, u, g, "\u2223", "\\mid", true);
			n(i, u, g, "\u226a", "\\ll");
			n(i, u, g, "\u226b", "\\gg", true);
			n(i, u, g, "\u224d", "\\asymp", true);
			n(i, u, g, "\u2225", "\\parallel");
			n(i, u, g, "\u22c8", "\\bowtie", true);
			n(i, u, g, "\u2323", "\\smile", true);
			n(i, u, g, "\u2291", "\\sqsubseteq", true);
			n(i, u, g, "\u2292", "\\sqsupseteq", true);
			n(i, u, g, "\u2250", "\\doteq", true);
			n(i, u, g, "\u2322", "\\frown", true);
			n(i, u, g, "\u220b", "\\ni", true);
			n(i, u, g, "\u221d", "\\propto", true);
			n(i, u, g, "\u22a2", "\\vdash", true);
			n(i, u, g, "\u22a3", "\\dashv", true);
			n(i, u, g, "\u220b", "\\owns");
			n(i, u, m, ".", "\\ldotp");
			n(i, u, m, "\u22c5", "\\cdotp");
			n(i, u, y, "#", "\\#");
			n(l, u, y, "#", "\\#");
			n(i, u, y, "&", "\\&");
			n(l, u, y, "&", "\\&");
			n(i, u, y, "\u2135", "\\aleph", true);
			n(i, u, y, "\u2200", "\\forall", true);
			n(i, u, y, "\u210f", "\\hbar");
			n(i, u, y, "\u2203", "\\exists", true);
			n(i, u, y, "\u2207", "\\nabla", true);
			n(i, u, y, "\u266d", "\\flat", true);
			n(i, u, y, "\u2113", "\\ell", true);
			n(i, u, y, "\u266e", "\\natural", true);
			n(i, u, y, "\u2663", "\\clubsuit", true);
			n(i, u, y, "\u2118", "\\wp", true);
			n(i, u, y, "\u266f", "\\sharp", true);
			n(i, u, y, "\u2662", "\\diamondsuit", true);
			n(i, u, y, "\u211c", "\\Re", true);
			n(i, u, y, "\u2661", "\\heartsuit", true);
			n(i, u, y, "\u2111", "\\Im", true);
			n(i, u, y, "\u2660", "\\spadesuit", true);
			n(i, u, y, "\u2020", "\\dag");
			n(l, u, y, "\u2020", "\\dag");
			n(l, u, y, "\u2020", "\\textdagger");
			n(i, u, y, "\u2021", "\\ddag");
			n(l, u, y, "\u2021", "\\ddag");
			n(l, u, y, "\u2020", "\\textdaggerdbl");
			n(i, u, d, "\u23b1", "\\rmoustache");
			n(i, u, p, "\u23b0", "\\lmoustache");
			n(i, u, d, "\u27ef", "\\rgroup");
			n(i, u, p, "\u27ee", "\\lgroup");
			n(i, u, f, "\u2213", "\\mp", true);
			n(i, u, f, "\u2296", "\\ominus", true);
			n(i, u, f, "\u228e", "\\uplus", true);
			n(i, u, f, "\u2293", "\\sqcap", true);
			n(i, u, f, "\u2217", "\\ast");
			n(i, u, f, "\u2294", "\\sqcup", true);
			n(i, u, f, "\u25ef", "\\bigcirc");
			n(i, u, f, "\u2219", "\\bullet");
			n(i, u, f, "\u2021", "\\ddagger");
			n(i, u, f, "\u2240", "\\wr", true);
			n(i, u, f, "\u2a3f", "\\amalg");
			n(i, u, f, "&", "\\And");
			n(i, u, g, "\u27f5", "\\longleftarrow", true);
			n(i, u, g, "\u21d0", "\\Leftarrow", true);
			n(i, u, g, "\u27f8", "\\Longleftarrow", true);
			n(i, u, g, "\u27f6", "\\longrightarrow", true);
			n(i, u, g, "\u21d2", "\\Rightarrow", true);
			n(i, u, g, "\u27f9", "\\Longrightarrow", true);
			n(i, u, g, "\u2194", "\\leftrightarrow", true);
			n(i, u, g, "\u27f7", "\\longleftrightarrow", true);
			n(i, u, g, "\u21d4", "\\Leftrightarrow", true);
			n(i, u, g, "\u27fa", "\\Longleftrightarrow", true);
			n(i, u, g, "\u21a6", "\\mapsto", true);
			n(i, u, g, "\u27fc", "\\longmapsto", true);
			n(i, u, g, "\u2197", "\\nearrow", true);
			n(i, u, g, "\u21a9", "\\hookleftarrow", true);
			n(i, u, g, "\u21aa", "\\hookrightarrow", true);
			n(i, u, g, "\u2198", "\\searrow", true);
			n(i, u, g, "\u21bc", "\\leftharpoonup", true);
			n(i, u, g, "\u21c0", "\\rightharpoonup", true);
			n(i, u, g, "\u2199", "\\swarrow", true);
			n(i, u, g, "\u21bd", "\\leftharpoondown", true);
			n(i, u, g, "\u21c1", "\\rightharpoondown", true);
			n(i, u, g, "\u2196", "\\nwarrow", true);
			n(i, u, g, "\u21cc", "\\rightleftharpoons", true);
			n(i, o, g, "\u226e", "\\nless", true);
			n(i, o, g, "\ue010", "\\nleqslant");
			n(i, o, g, "\ue011", "\\nleqq");
			n(i, o, g, "\u2a87", "\\lneq", true);
			n(i, o, g, "\u2268", "\\lneqq", true);
			n(i, o, g, "\ue00c", "\\lvertneqq");
			n(i, o, g, "\u22e6", "\\lnsim", true);
			n(i, o, g, "\u2a89", "\\lnapprox", true);
			n(i, o, g, "\u2280", "\\nprec", true);
			n(i, o, g, "\u22e0", "\\npreceq", true);
			n(i, o, g, "\u22e8", "\\precnsim", true);
			n(i, o, g, "\u2ab9", "\\precnapprox", true);
			n(i, o, g, "\u2241", "\\nsim", true);
			n(i, o, g, "\ue006", "\\nshortmid");
			n(i, o, g, "\u2224", "\\nmid", true);
			n(i, o, g, "\u22ac", "\\nvdash", true);
			n(i, o, g, "\u22ad", "\\nvDash", true);
			n(i, o, g, "\u22ea", "\\ntriangleleft");
			n(i, o, g, "\u22ec", "\\ntrianglelefteq", true);
			n(i, o, g, "\u228a", "\\subsetneq", true);
			n(i, o, g, "\ue01a", "\\varsubsetneq");
			n(i, o, g, "\u2acb", "\\subsetneqq", true);
			n(i, o, g, "\ue017", "\\varsubsetneqq");
			n(i, o, g, "\u226f", "\\ngtr", true);
			n(i, o, g, "\ue00f", "\\ngeqslant");
			n(i, o, g, "\ue00e", "\\ngeqq");
			n(i, o, g, "\u2a88", "\\gneq", true);
			n(i, o, g, "\u2269", "\\gneqq", true);
			n(i, o, g, "\ue00d", "\\gvertneqq");
			n(i, o, g, "\u22e7", "\\gnsim", true);
			n(i, o, g, "\u2a8a", "\\gnapprox", true);
			n(i, o, g, "\u2281", "\\nsucc", true);
			n(i, o, g, "\u22e1", "\\nsucceq", true);
			n(i, o, g, "\u22e9", "\\succnsim", true);
			n(i, o, g, "\u2aba", "\\succnapprox", true);
			n(i, o, g, "\u2246", "\\ncong", true);
			n(i, o, g, "\ue007", "\\nshortparallel");
			n(i, o, g, "\u2226", "\\nparallel", true);
			n(i, o, g, "\u22af", "\\nVDash", true);
			n(i, o, g, "\u22eb", "\\ntriangleright");
			n(i, o, g, "\u22ed", "\\ntrianglerighteq", true);
			n(i, o, g, "\ue018", "\\nsupseteqq");
			n(i, o, g, "\u228b", "\\supsetneq", true);
			n(i, o, g, "\ue01b", "\\varsupsetneq");
			n(i, o, g, "\u2acc", "\\supsetneqq", true);
			n(i, o, g, "\ue019", "\\varsupsetneqq");
			n(i, o, g, "\u22ae", "\\nVdash", true);
			n(i, o, g, "\u2ab5", "\\precneqq", true);
			n(i, o, g, "\u2ab6", "\\succneqq", true);
			n(i, o, g, "\ue016", "\\nsubseteqq");
			n(i, o, f, "\u22b4", "\\unlhd");
			n(i, o, f, "\u22b5", "\\unrhd");
			n(i, o, g, "\u219a", "\\nleftarrow", true);
			n(i, o, g, "\u219b", "\\nrightarrow", true);
			n(i, o, g, "\u21cd", "\\nLeftarrow", true);
			n(i, o, g, "\u21cf", "\\nRightarrow", true);
			n(i, o, g, "\u21ae", "\\nleftrightarrow", true);
			n(i, o, g, "\u21ce", "\\nLeftrightarrow", true);
			n(i, o, g, "\u25b3", "\\vartriangle");
			n(i, o, y, "\u210f", "\\hslash");
			n(i, o, y, "\u25bd", "\\triangledown");
			n(i, o, y, "\u25ca", "\\lozenge");
			n(i, o, y, "\u24c8", "\\circledS");
			n(i, o, y, "\xae", "\\circledR");
			n(l, o, y, "\xae", "\\circledR");
			n(i, o, y, "\u2221", "\\measuredangle", true);
			n(i, o, y, "\u2204", "\\nexists");
			n(i, o, y, "\u2127", "\\mho");
			n(i, o, y, "\u2132", "\\Finv", true);
			n(i, o, y, "\u2141", "\\Game", true);
			n(i, o, y, "k", "\\Bbbk");
			n(i, o, y, "\u2035", "\\backprime");
			n(i, o, y, "\u25b2", "\\blacktriangle");
			n(i, o, y, "\u25bc", "\\blacktriangledown");
			n(i, o, y, "\u25a0", "\\blacksquare");
			n(i, o, y, "\u29eb", "\\blacklozenge");
			n(i, o, y, "\u2605", "\\bigstar");
			n(i, o, y, "\u2222", "\\sphericalangle", true);
			n(i, o, y, "\u2201", "\\complement", true);
			n(i, o, y, "\xf0", "\\eth", true);
			n(i, o, y, "\u2571", "\\diagup");
			n(i, o, y, "\u2572", "\\diagdown");
			n(i, o, y, "\u25a1", "\\square");
			n(i, o, y, "\u25a1", "\\Box");
			n(i, o, y, "\u25ca", "\\Diamond");
			n(i, o, y, "\xa5", "\\yen", true);
			n(i, o, y, "\u2713", "\\checkmark", true);
			n(l, o, y, "\u2713", "\\checkmark");
			n(i, o, y, "\u2136", "\\beth", true);
			n(i, o, y, "\u2138", "\\daleth", true);
			n(i, o, y, "\u2137", "\\gimel", true);
			n(i, o, y, "\u03dd", "\\digamma");
			n(i, o, y, "\u03f0", "\\varkappa");
			n(i, o, p, "\u250c", "\\ulcorner");
			n(i, o, d, "\u2510", "\\urcorner");
			n(i, o, p, "\u2514", "\\llcorner");
			n(i, o, d, "\u2518", "\\lrcorner");
			n(i, o, g, "\u2266", "\\leqq", true);
			n(i, o, g, "\u2a7d", "\\leqslant");
			n(i, o, g, "\u2a95", "\\eqslantless", true);
			n(i, o, g, "\u2272", "\\lesssim");
			n(i, o, g, "\u2a85", "\\lessapprox");
			n(i, o, g, "\u224a", "\\approxeq", true);
			n(i, o, f, "\u22d6", "\\lessdot");
			n(i, o, g, "\u22d8", "\\lll");
			n(i, o, g, "\u2276", "\\lessgtr");
			n(i, o, g, "\u22da", "\\lesseqgtr");
			n(i, o, g, "\u2a8b", "\\lesseqqgtr");
			n(i, o, g, "\u2251", "\\doteqdot");
			n(i, o, g, "\u2253", "\\risingdotseq", true);
			n(i, o, g, "\u2252", "\\fallingdotseq", true);
			n(i, o, g, "\u223d", "\\backsim", true);
			n(i, o, g, "\u22cd", "\\backsimeq", true);
			n(i, o, g, "\u2ac5", "\\subseteqq", true);
			n(i, o, g, "\u22d0", "\\Subset", true);
			n(i, o, g, "\u228f", "\\sqsubset", true);
			n(i, o, g, "\u227c", "\\preccurlyeq", true);
			n(i, o, g, "\u22de", "\\curlyeqprec", true);
			n(i, o, g, "\u227e", "\\precsim", true);
			n(i, o, g, "\u2ab7", "\\precapprox", true);
			n(i, o, g, "\u22b2", "\\vartriangleleft");
			n(i, o, g, "\u22b4", "\\trianglelefteq");
			n(i, o, g, "\u22a8", "\\vDash");
			n(i, o, g, "\u22aa", "\\Vvdash", true);
			n(i, o, g, "\u2323", "\\smallsmile");
			n(i, o, g, "\u2322", "\\smallfrown");
			n(i, o, g, "\u224f", "\\bumpeq", true);
			n(i, o, g, "\u224e", "\\Bumpeq", true);
			n(i, o, g, "\u2267", "\\geqq", true);
			n(i, o, g, "\u2a7e", "\\geqslant", true);
			n(i, o, g, "\u2a96", "\\eqslantgtr", true);
			n(i, o, g, "\u2273", "\\gtrsim", true);
			n(i, o, g, "\u2a86", "\\gtrapprox", true);
			n(i, o, f, "\u22d7", "\\gtrdot");
			n(i, o, g, "\u22d9", "\\ggg", true);
			n(i, o, g, "\u2277", "\\gtrless", true);
			n(i, o, g, "\u22db", "\\gtreqless", true);
			n(i, o, g, "\u2a8c", "\\gtreqqless", true);
			n(i, o, g, "\u2256", "\\eqcirc", true);
			n(i, o, g, "\u2257", "\\circeq", true);
			n(i, o, g, "\u225c", "\\triangleq", true);
			n(i, o, g, "\u223c", "\\thicksim");
			n(i, o, g, "\u2248", "\\thickapprox");
			n(i, o, g, "\u2ac6", "\\supseteqq", true);
			n(i, o, g, "\u22d1", "\\Supset", true);
			n(i, o, g, "\u2290", "\\sqsupset", true);
			n(i, o, g, "\u227d", "\\succcurlyeq", true);
			n(i, o, g, "\u22df", "\\curlyeqsucc", true);
			n(i, o, g, "\u227f", "\\succsim", true);
			n(i, o, g, "\u2ab8", "\\succapprox", true);
			n(i, o, g, "\u22b3", "\\vartriangleright");
			n(i, o, g, "\u22b5", "\\trianglerighteq");
			n(i, o, g, "\u22a9", "\\Vdash", true);
			n(i, o, g, "\u2223", "\\shortmid");
			n(i, o, g, "\u2225", "\\shortparallel");
			n(i, o, g, "\u226c", "\\between", true);
			n(i, o, g, "\u22d4", "\\pitchfork", true);
			n(i, o, g, "\u221d", "\\varpropto");
			n(i, o, g, "\u25c0", "\\blacktriangleleft");
			n(i, o, g, "\u2234", "\\therefore", true);
			n(i, o, g, "\u220d", "\\backepsilon");
			n(i, o, g, "\u25b6", "\\blacktriangleright");
			n(i, o, g, "\u2235", "\\because", true);
			n(i, o, g, "\u22d8", "\\llless");
			n(i, o, g, "\u22d9", "\\gggtr");
			n(i, o, f, "\u22b2", "\\lhd");
			n(i, o, f, "\u22b3", "\\rhd");
			n(i, o, g, "\u2242", "\\eqsim", true);
			n(i, u, g, "\u22c8", "\\Join");
			n(i, o, g, "\u2251", "\\Doteq", true);
			n(i, o, f, "\u2214", "\\dotplus", true);
			n(i, o, f, "\u2216", "\\smallsetminus");
			n(i, o, f, "\u22d2", "\\Cap", true);
			n(i, o, f, "\u22d3", "\\Cup", true);
			n(i, o, f, "\u2a5e", "\\doublebarwedge", true);
			n(i, o, f, "\u229f", "\\boxminus", true);
			n(i, o, f, "\u229e", "\\boxplus", true);
			n(i, o, f, "\u22c7", "\\divideontimes", true);
			n(i, o, f, "\u22c9", "\\ltimes", true);
			n(i, o, f, "\u22ca", "\\rtimes", true);
			n(i, o, f, "\u22cb", "\\leftthreetimes", true);
			n(i, o, f, "\u22cc", "\\rightthreetimes", true);
			n(i, o, f, "\u22cf", "\\curlywedge", true);
			n(i, o, f, "\u22ce", "\\curlyvee", true);
			n(i, o, f, "\u229d", "\\circleddash", true);
			n(i, o, f, "\u229b", "\\circledast", true);
			n(i, o, f, "\u22c5", "\\centerdot");
			n(i, o, f, "\u22ba", "\\intercal", true);
			n(i, o, f, "\u22d2", "\\doublecap");
			n(i, o, f, "\u22d3", "\\doublecup");
			n(i, o, f, "\u22a0", "\\boxtimes", true);
			n(i, o, g, "\u21e2", "\\dashrightarrow", true);
			n(i, o, g, "\u21e0", "\\dashleftarrow", true);
			n(i, o, g, "\u21c7", "\\leftleftarrows", true);
			n(i, o, g, "\u21c6", "\\leftrightarrows", true);
			n(i, o, g, "\u21da", "\\Lleftarrow", true);
			n(i, o, g, "\u219e", "\\twoheadleftarrow", true);
			n(i, o, g, "\u21a2", "\\leftarrowtail", true);
			n(i, o, g, "\u21ab", "\\looparrowleft", true);
			n(i, o, g, "\u21cb", "\\leftrightharpoons", true);
			n(i, o, g, "\u21b6", "\\curvearrowleft", true);
			n(i, o, g, "\u21ba", "\\circlearrowleft", true);
			n(i, o, g, "\u21b0", "\\Lsh", true);
			n(i, o, g, "\u21c8", "\\upuparrows", true);
			n(i, o, g, "\u21bf", "\\upharpoonleft", true);
			n(i, o, g, "\u21c3", "\\downharpoonleft", true);
			n(i, o, g, "\u22b8", "\\multimap", true);
			n(i, o, g, "\u21ad", "\\leftrightsquigarrow", true);
			n(i, o, g, "\u21c9", "\\rightrightarrows", true);
			n(i, o, g, "\u21c4", "\\rightleftarrows", true);
			n(i, o, g, "\u21a0", "\\twoheadrightarrow", true);
			n(i, o, g, "\u21a3", "\\rightarrowtail", true);
			n(i, o, g, "\u21ac", "\\looparrowright", true);
			n(i, o, g, "\u21b7", "\\curvearrowright", true);
			n(i, o, g, "\u21bb", "\\circlearrowright", true);
			n(i, o, g, "\u21b1", "\\Rsh", true);
			n(i, o, g, "\u21ca", "\\downdownarrows", true);
			n(i, o, g, "\u21be", "\\upharpoonright", true);
			n(i, o, g, "\u21c2", "\\downharpoonright", true);
			n(i, o, g, "\u21dd", "\\rightsquigarrow", true);
			n(i, o, g, "\u21dd", "\\leadsto");
			n(i, o, g, "\u21db", "\\Rrightarrow", true);
			n(i, o, g, "\u21be", "\\restriction");
			n(i, u, y, "\u2018", "`");
			n(i, u, y, "$", "\\$");
			n(l, u, y, "$", "\\$");
			n(l, u, y, "$", "\\textdollar");
			n(i, u, y, "%", "\\%");
			n(l, u, y, "%", "\\%");
			n(i, u, y, "_", "\\_");
			n(l, u, y, "_", "\\_");
			n(l, u, y, "_", "\\textunderscore");
			n(i, u, y, "\u2220", "\\angle", true);
			n(i, u, y, "\u221e", "\\infty", true);
			n(i, u, y, "\u2032", "\\prime");
			n(i, u, y, "\u25b3", "\\triangle");
			n(i, u, y, "\u0393", "\\Gamma", true);
			n(i, u, y, "\u0394", "\\Delta", true);
			n(i, u, y, "\u0398", "\\Theta", true);
			n(i, u, y, "\u039b", "\\Lambda", true);
			n(i, u, y, "\u039e", "\\Xi", true);
			n(i, u, y, "\u03a0", "\\Pi", true);
			n(i, u, y, "\u03a3", "\\Sigma", true);
			n(i, u, y, "\u03a5", "\\Upsilon", true);
			n(i, u, y, "\u03a6", "\\Phi", true);
			n(i, u, y, "\u03a8", "\\Psi", true);
			n(i, u, y, "\u03a9", "\\Omega", true);
			n(i, u, y, "\xac", "\\neg");
			n(i, u, y, "\xac", "\\lnot");
			n(i, u, y, "\u22a4", "\\top");
			n(i, u, y, "\u22a5", "\\bot");
			n(i, u, y, "\u2205", "\\emptyset");
			n(i, o, y, "\u2205", "\\varnothing");
			n(i, u, v, "\u03b1", "\\alpha", true);
			n(i, u, v, "\u03b2", "\\beta", true);
			n(i, u, v, "\u03b3", "\\gamma", true);
			n(i, u, v, "\u03b4", "\\delta", true);
			n(i, u, v, "\u03f5", "\\epsilon", true);
			n(i, u, v, "\u03b6", "\\zeta", true);
			n(i, u, v, "\u03b7", "\\eta", true);
			n(i, u, v, "\u03b8", "\\theta", true);
			n(i, u, v, "\u03b9", "\\iota", true);
			n(i, u, v, "\u03ba", "\\kappa", true);
			n(i, u, v, "\u03bb", "\\lambda", true);
			n(i, u, v, "\u03bc", "\\mu", true);
			n(i, u, v, "\u03bd", "\\nu", true);
			n(i, u, v, "\u03be", "\\xi", true);
			n(i, u, v, "\u03bf", "\\omicron", true);
			n(i, u, v, "\u03c0", "\\pi", true);
			n(i, u, v, "\u03c1", "\\rho", true);
			n(i, u, v, "\u03c3", "\\sigma", true);
			n(i, u, v, "\u03c4", "\\tau", true);
			n(i, u, v, "\u03c5", "\\upsilon", true);
			n(i, u, v, "\u03d5", "\\phi", true);
			n(i, u, v, "\u03c7", "\\chi", true);
			n(i, u, v, "\u03c8", "\\psi", true);
			n(i, u, v, "\u03c9", "\\omega", true);
			n(i, u, v, "\u03b5", "\\varepsilon", true);
			n(i, u, v, "\u03d1", "\\vartheta", true);
			n(i, u, v, "\u03d6", "\\varpi", true);
			n(i, u, v, "\u03f1", "\\varrho", true);
			n(i, u, v, "\u03c2", "\\varsigma", true);
			n(i, u, v, "\u03c6", "\\varphi", true);
			n(i, u, f, "\u2217", "*");
			n(i, u, f, "+", "+");
			n(i, u, f, "\u2212", "-");
			n(i, u, f, "\u22c5", "\\cdot");
			n(i, u, f, "\u2218", "\\circ");
			n(i, u, f, "\xf7", "\\div", true);
			n(i, u, f, "\xb1", "\\pm", true);
			n(i, u, f, "\xd7", "\\times", true);
			n(i, u, f, "\u2229", "\\cap", true);
			n(i, u, f, "\u222a", "\\cup", true);
			n(i, u, f, "\u2216", "\\setminus");
			n(i, u, f, "\u2227", "\\land");
			n(i, u, f, "\u2228", "\\lor");
			n(i, u, f, "\u2227", "\\wedge", true);
			n(i, u, f, "\u2228", "\\vee", true);
			n(i, u, y, "\u221a", "\\surd");
			n(i, u, p, "(", "(");
			n(i, u, p, "[", "[");
			n(i, u, p, "\u27e8", "\\langle");
			n(i, u, p, "\u2223", "\\lvert");
			n(i, u, p, "\u2225", "\\lVert");
			n(i, u, d, ")", ")");
			n(i, u, d, "]", "]");
			n(i, u, d, "?", "?");
			n(i, u, d, "!", "!");
			n(i, u, d, "\u27e9", "\\rangle");
			n(i, u, d, "\u2223", "\\rvert");
			n(i, u, d, "\u2225", "\\rVert");
			n(i, u, g, "=", "=");
			n(i, u, g, "<", "<");
			n(i, u, g, ">", ">");
			n(i, u, g, ":", ":");
			n(i, u, g, "\u2248", "\\approx", true);
			n(i, u, g, "\u2245", "\\cong", true);
			n(i, u, g, "\u2265", "\\ge");
			n(i, u, g, "\u2265", "\\geq", true);
			n(i, u, g, "\u2190", "\\gets");
			n(i, u, g, ">", "\\gt");
			n(i, u, g, "\u2208", "\\in", true);
			n(i, u, g, "\u2209", "\\notin", true);
			n(i, u, g, "\u0338", "\\not");
			n(i, u, g, "\u2282", "\\subset", true);
			n(i, u, g, "\u2283", "\\supset", true);
			n(i, u, g, "\u2286", "\\subseteq", true);
			n(i, u, g, "\u2287", "\\supseteq", true);
			n(i, o, g, "\u2288", "\\nsubseteq", true);
			n(i, o, g, "\u2289", "\\nsupseteq", true);
			n(i, u, g, "\u22a8", "\\models");
			n(i, u, g, "\u2190", "\\leftarrow", true);
			n(i, u, g, "\u2264", "\\le");
			n(i, u, g, "\u2264", "\\leq", true);
			n(i, u, g, "<", "\\lt");
			n(i, u, g, "\u2260", "\\ne", true);
			n(i, u, g, "\u2260", "\\neq");
			n(i, u, g, "\u2192", "\\rightarrow", true);
			n(i, u, g, "\u2192", "\\to");
			n(i, o, g, "\u2271", "\\ngeq", true);
			n(i, o, g, "\u2270", "\\nleq", true);
			n(i, u, b, null, "\\!");
			n(i, u, b, "\xa0", "\\ ");
			n(i, u, b, "\xa0", "~");
			n(i, u, b, null, "\\,");
			n(i, u, b, null, "\\:");
			n(i, u, b, null, "\\;");
			n(i, u, b, null, "\\enspace");
			n(i, u, b, null, "\\qquad");
			n(i, u, b, null, "\\quad");
			n(i, u, b, "\xa0", "\\space");
			n(i, u, m, ",", ",");
			n(i, u, m, ";", ";");
			n(i, u, m, ":", "\\colon");
			n(i, o, f, "\u22bc", "\\barwedge", true);
			n(i, o, f, "\u22bb", "\\veebar", true);
			n(i, u, f, "\u2299", "\\odot", true);
			n(i, u, f, "\u2295", "\\oplus", true);
			n(i, u, f, "\u2297", "\\otimes", true);
			n(i, u, y, "\u2202", "\\partial", true);
			n(i, u, f, "\u2298", "\\oslash", true);
			n(i, o, f, "\u229a", "\\circledcirc", true);
			n(i, o, f, "\u22a1", "\\boxdot", true);
			n(i, u, f, "\u25b3", "\\bigtriangleup");
			n(i, u, f, "\u25bd", "\\bigtriangledown");
			n(i, u, f, "\u2020", "\\dagger");
			n(i, u, f, "\u22c4", "\\diamond");
			n(i, u, f, "\u22c6", "\\star");
			n(i, u, f, "\u25c3", "\\triangleleft");
			n(i, u, f, "\u25b9", "\\triangleright");
			n(i, u, p, "{", "\\{");
			n(l, u, y, "{", "\\{");
			n(l, u, y, "{", "\\textbraceleft");
			n(i, u, d, "}", "\\}");
			n(l, u, y, "}", "\\}");
			n(l, u, y, "}", "\\textbraceright");
			n(i, u, p, "{", "\\lbrace");
			n(i, u, d, "}", "\\rbrace");
			n(i, u, p, "[", "\\lbrack");
			n(i, u, d, "]", "\\rbrack");
			n(l, u, y, "<", "\\textless");
			n(l, u, y, ">", "\\textgreater");
			n(i, u, p, "\u230a", "\\lfloor");
			n(i, u, d, "\u230b", "\\rfloor");
			n(i, u, p, "\u2308", "\\lceil");
			n(i, u, d, "\u2309", "\\rceil");
			n(i, u, y, "\\", "\\backslash");
			n(i, u, y, "\u2223", "|");
			n(i, u, y, "\u2223", "\\vert");
			n(l, u, y, "|", "\\textbar");
			n(i, u, y, "\u2225", "\\|");
			n(i, u, y, "\u2225", "\\Vert");
			n(l, u, y, "\u2225", "\\textbardbl");
			n(i, u, g, "\u2191", "\\uparrow", true);
			n(i, u, g, "\u21d1", "\\Uparrow", true);
			n(i, u, g, "\u2193", "\\downarrow", true);
			n(i, u, g, "\u21d3", "\\Downarrow", true);
			n(i, u, g, "\u2195", "\\updownarrow", true);
			n(i, u, g, "\u21d5", "\\Updownarrow", true);
			n(i, u, h, "\u2210", "\\coprod");
			n(i, u, h, "\u22c1", "\\bigvee");
			n(i, u, h, "\u22c0", "\\bigwedge");
			n(i, u, h, "\u2a04", "\\biguplus");
			n(i, u, h, "\u22c2", "\\bigcap");
			n(i, u, h, "\u22c3", "\\bigcup");
			n(i, u, h, "\u222b", "\\int");
			n(i, u, h, "\u222b", "\\intop");
			n(i, u, h, "\u222c", "\\iint");
			n(i, u, h, "\u222d", "\\iiint");
			n(i, u, h, "\u220f", "\\prod");
			n(i, u, h, "\u2211", "\\sum");
			n(i, u, h, "\u2a02", "\\bigotimes");
			n(i, u, h, "\u2a01", "\\bigoplus");
			n(i, u, h, "\u2a00", "\\bigodot");
			n(i, u, h, "\u222e", "\\oint");
			n(i, u, h, "\u2a06", "\\bigsqcup");
			n(i, u, h, "\u222b", "\\smallint");
			n(l, u, c, "\u2026", "\\textellipsis");
			n(i, u, c, "\u2026", "\\mathellipsis");
			n(l, u, c, "\u2026", "\\ldots", true);
			n(i, u, c, "\u2026", "\\ldots", true);
			n(i, u, c, "\u22ef", "\\@cdots", true);
			n(i, u, c, "\u22f1", "\\ddots", true);
			n(i, u, y, "\u22ee", "\\vdots", true);
			n(i, u, s, "\xb4", "\\acute");
			n(i, u, s, "`", "\\grave");
			n(i, u, s, "\xa8", "\\ddot");
			n(i, u, s, "~", "\\tilde");
			n(i, u, s, "\xaf", "\\bar");
			n(i, u, s, "\u02d8", "\\breve");
			n(i, u, s, "\u02c7", "\\check");
			n(i, u, s, "^", "\\hat");
			n(i, u, s, "\u20d7", "\\vec");
			n(i, u, s, "\u02d9", "\\dot");
			n(i, u, v, "\u0131", "\\imath");
			n(i, u, v, "\u0237", "\\jmath");
			n(l, u, s, "\u02ca", "\\'");
			n(l, u, s, "\u02cb", "\\`");
			n(l, u, s, "\u02c6", "\\^");
			n(l, u, s, "\u02dc", "\\~");
			n(l, u, s, "\u02c9", "\\=");
			n(l, u, s, "\u02d8", "\\u");
			n(l, u, s, "\u02d9", "\\.");
			n(l, u, s, "\u02da", "\\r");
			n(l, u, s, "\u02c7", "\\v");
			n(l, u, s, "\xa8", '\\"');
			n(l, u, s, "\u030b", "\\H");
			n(l, u, y, "\u2013", "--");
			n(l, u, y, "\u2013", "\\textendash");
			n(l, u, y, "\u2014", "---");
			n(l, u, y, "\u2014", "\\textemdash");
			n(l, u, y, "\u2018", "`");
			n(l, u, y, "\u2018", "\\textquoteleft");
			n(l, u, y, "\u2019", "'");
			n(l, u, y, "\u2019", "\\textquoteright");
			n(l, u, y, "\u201c", "``");
			n(l, u, y, "\u201c", "\\textquotedblleft");
			n(l, u, y, "\u201d", "''");
			n(l, u, y, "\u201d", "\\textquotedblright");
			n(i, u, y, "\xb0", "\\degree");
			n(l, u, y, "\xb0", "\\degree");
			n(i, u, v, "\xa3", "\\pounds");
			n(i, u, v, "\xa3", "\\mathsterling", true);
			n(l, u, v, "\xa3", "\\pounds");
			n(l, u, v, "\xa3", "\\textsterling");
			n(i, o, y, "\u2720", "\\maltese");
			n(l, o, y, "\u2720", "\\maltese");
			n(l, u, b, "\xa0", "\\ ");
			n(l, u, b, "\xa0", " ");
			n(l, u, b, "\xa0", "~");
			var x = '0123456789/@."';
			for (var w = 0; w < x.length; w++) {
				var k = x.charAt(w);
				n(i, u, y, k, k)
			}
			var M = '0123456789!@*()-=+[]<>|";:?/.,';
			for (var _ = 0; _ < M.length; _++) {
				var S = M.charAt(_);
				n(l, u, y, S, S)
			}
			var z = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
			for (var T = 0; T < z.length; T++) {
				var C = z.charAt(T);
				n(i, u, v, C, C);
				n(l, u, y, C, C)
			}
			for (var A = 192; A <= 214; A++) {
				var O = String.fromCharCode(A);
				n(i, u, v, O, O);
				n(l, u, y, O, O)
			}
			for (var N = 216; N <= 246; N++) {
				var L = String.fromCharCode(N);
				n(i, u, v, L, L);
				n(l, u, y, L, L)
			}
			for (var j = 248; j <= 255; j++) {
				var E = String.fromCharCode(j);
				n(i, u, v, E, E);
				n(l, u, y, E, E)
			}
			for (var q = 1040; q <= 1103; q++) {
				var P = String.fromCharCode(q);
				n(l, u, y, P, P)
			}
			n(l, u, y, "\u2013", "\u2013");
			n(l, u, y, "\u2014", "\u2014");
			n(l, u, y, "\u2018", "\u2018");
			n(l, u, y, "\u2019", "\u2019");
			n(l, u, y, "\u201c", "\u201c");
			n(l, u, y, "\u201d", "\u201d")
		}, {}],
		121: [function (e, t, r) {
			"use strict";
			Object.defineProperty(r, "__esModule", {
				value: true
			});
			var a = r.hangulRegex = /[\uAC00-\uD7AF]/;
			var n = r.cjkRegex = /[\u3000-\u30FF\u4E00-\u9FAF\uAC00-\uD7AF\uFF00-\uFF60]/
		}, {}],
		122: [function (e, t, r) {
			"use strict";
			Object.defineProperty(r, "__esModule", {
				value: true
			});
			r.calculateSize = r.validUnit = undefined;
			var a = e("./ParseError");
			var n = u(a);
			var i = e("./Options");
			var l = u(i);

			function u(e) {
				return e && e.__esModule ? e : {
					default: e
				}
			}
			var o = {
				pt: 1,
				mm: 7227 / 2540,
				cm: 7227 / 254,
				in: 72.27,
				bp: 803 / 800,
				pc: 12,
				dd: 1238 / 1157,
				cc: 14856 / 1157,
				nd: 685 / 642,
				nc: 1370 / 107,
				sp: 1 / 65536,
				px: 803 / 800
			};
			var s = {
				ex: true,
				em: true,
				mu: true
			};
			var f = r.validUnit = function e(t) {
				if (typeof t !== "string") {
					t = t.unit
				}
				return t in o || t in s || t === "ex"
			};
			var d = r.calculateSize = function e(t, r) {
				var a = void 0;
				if (t.unit in o) {
					a = o[t.unit] / r.fontMetrics().ptPerEm / r.sizeMultiplier
				} else if (t.unit === "mu") {
					a = r.fontMetrics().cssEmPerMu
				} else {
					var i = void 0;
					if (r.style.isTight()) {
						i = r.havingStyle(r.style.text())
					} else {
						i = r
					}
					if (t.unit === "ex") {
						a = i.fontMetrics().xHeight
					} else if (t.unit === "em") {
						a = i.fontMetrics().quad
					} else {
						throw new n.default("Invalid unit: '" + t.unit + "'")
					}
					if (i !== r) {
						a *= i.sizeMultiplier / r.sizeMultiplier
					}
				}
				return Math.min(t.number * a, r.maxSize)
			}
		}, {
			"./Options": 83,
			"./ParseError": 84
		}],
		123: [function (e, t, r) {
			"use strict";
			Object.defineProperty(r, "__esModule", {
				value: true
			});
			var a = Array.prototype.indexOf;
			var n = function e(t, r) {
				if (t == null) {
					return -1
				}
				if (a && t.indexOf === a) {
					return t.indexOf(r)
				}
				var n = t.length;
				for (var i = 0; i < n; i++) {
					if (t[i] === r) {
						return i
					}
				}
				return -1
			};
			var i = function e(t, r) {
				return n(t, r) !== -1
			};
			var l = function e(t, r) {
				return t === undefined ? r : t
			};
			var u = /([A-Z])/g;
			var o = function e(t) {
				return t.replace(u, "-$1").toLowerCase()
			};
			var s = {
				"&": "&amp;",
				">": "&gt;",
				"<": "&lt;",
				'"': "&quot;",
				"'": "&#x27;"
			};
			var f = /[&><"']/g;

			function d(e) {
				return String(e).replace(f, function (e) {
					return s[e]
				})
			}
			var c = void 0;
			if (typeof document !== "undefined") {
				var v = document.createElement("span");
				if ("textContent" in v) {
					c = function e(t, r) {
						t.textContent = r
					}
				} else {
					c = function e(t, r) {
						t.innerText = r
					}
				}
			}

			function h(e) {
				c(e, "")
			}
			r.default = {
				contains: i,
				deflt: l,
				escape: d,
				hyphenate: o,
				indexOf: n,
				setTextContent: c,
				clearNode: h
			}
		}, {}]
	}, {}, [1])(1)
});