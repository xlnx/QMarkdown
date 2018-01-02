const electron = require('electron')
const Menu = electron.Menu

function Config (menu) {
	this.data = {};
	this.defaultConf = {};
	this.lock = {};
	this.setter = {};
	this.menu = menu;
	this.sels = [];
	this.item = {};
}

Config.prototype.dump = function () {
	return JSON.stringify(this.data);
},
Config.prototype.set = function (key, val) {
	let origin = this.data;
	let l = key.split(".");
	let k = l.pop();
	for (let x of l) {
		origin = !origin[x] ? (origin[x] = {}) : origin[x];
	}
	if (this.setter[key]) {
		val = this.setter[key](val, origin[k]);
	}
	origin[k] = val;
},
Config.prototype.get = function (key) {
	let origin = this.data;
	let l = key.split(".");
	let k = l.pop();
	for (let x of l) {
		origin = !origin[x] ? (origin[x] = {}) : origin[x];
	}
	return origin[k];
},
Config.prototype.load = function(conf) {
	let self = this;
	(function iter(keys, conf) {
		for (x in conf) {
			if (typeof conf[x] == "object" && !(conf[x] instanceof Array)) {
				iter((keys ? keys + "." : "") + x, conf[x]);
			} else {
				self.set((keys ? keys + "." : "") + x, conf[x]);
			}
		}
	}) ("", conf);
},
Config.prototype.getMenuItem = function(selector, run) {
	let k = selector.split('.');
	let it = run ? this.menu.items : this.menu, find;
	while (k.length) {
		if (!it) {
			throw "no attribute named " + selector;
		} else {
			find = false;
			for (let x of it) {
				if (x.label == k[0]) {
					k = k.slice(1);
					if (k.length) {
						if (run) {
							it = x.submenu.items;
						} else {
							it = x.submenu;
						}
					} else {
						it = x;
					}
					find = true;
					break;
				}
			}
			if (!find) {
				throw "no attribute named " + selector;
			}
		}
	}
	return it;
},
Config.prototype.bind = function (selector, key) {
	let self = this;
	this.sels.push(selector);
	let options = {};
	!function () {
		let k = key;
		let s = selector;
		let e = self.getMenuItem(selector);
		switch (options.type = e.type) {
		case "checkbox": options.default = e.checked; break;
		default: throw "undefned object type";
		}
		// let f = options.setter;
		let v = options.default;
		let cl = !!e.click ? e.click : function () {};
		let getval;
		e.click = function (item, browserWindow) {
			if (!self.lock[k]) {
				self.lock[k] = true;
				self.set(k, getval());
				self.lock[k] = false;
			}
		}
		v = [(x) => { return x === undefined || x === ""; }, v];
		let origin = self.defaultConf;
		let l = k.split(".");
		let ky = l.pop();
		for (let x of l) {
			origin = !origin[x] ? (origin[x] = {}) : origin[x];
		}
		origin[ky] = undefined;
		switch (options.type) {
			case "checkbox": {
			getval = () => self.item[s].checked;
			self.setter[k] = function (value) {
				if (v[0](value)) { value = v[1]; }
				// console.log(value);
				// console.log(value);
				self.item[s].checked = value;
				cl(self.item[s]);
				// f(value);
				return value;
			}; } break;
			default:
			throw "not defined";
		}
	} ();
},
Config.prototype.init = function () {
	this.menu = Menu.buildFromTemplate(this.menu);
	// console.log(this.menu);
	Menu.setApplicationMenu(this.menu);
	for (let x of this.sels) {
		this.item[x] = this.getMenuItem(x, true);
	}
	this.load(this.defaultConf);
}

module.exports = Config;