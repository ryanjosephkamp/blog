/* reword_nerd article demos, built from reword-nerd e85cf0f by tools/reword-nerd-demos. Rebuild; don't edit. */
import { t as e } from "./rolldown-runtime-Bj0s5Odl.js";
// ../reword-nerd/node_modules/ignore/index.js
var t = /* @__PURE__ */ e(((e, t) => {
	function n(e) {
		return Array.isArray(e) ? e : [e];
	}
	var r = /^\s+$/, i = /(?:[^\\]|^)\\$/, a = /^\\!/, o = /^\\#/, s = /\r?\n/g, c = /^\.*\/|^\.+$/, l = "node-ignore";
	/* istanbul ignore else */
	typeof Symbol < "u" && (l = Symbol.for("node-ignore"));
	var u = l, d = (e, t, n) => Object.defineProperty(e, t, { value: n }), f = /([0-z])-([0-z])/g, p = () => !1, m = (e) => e.replace(f, (e, t, n) => t.charCodeAt(0) <= n.charCodeAt(0) ? e : ""), h = (e) => {
		let { length: t } = e;
		return e.slice(0, t - t % 2);
	}, g = [
		[/^\uFEFF/, () => ""],
		[/((?:\\\\)*?)(\\?\s+)$/, (e, t, n) => t + (n.indexOf("\\") === 0 ? " " : "")],
		[/(\\+?)\s/g, (e, t) => {
			let { length: n } = t;
			return t.slice(0, n - n % 2) + " ";
		}],
		[/[\\$.|*+(){^]/g, (e) => `\\${e}`],
		[/(?!\\)\?/g, () => "[^/]"],
		[/^\//, () => "^"],
		[/\//g, () => "\\/"],
		[/^\^*\\\*\\\*\\\//, () => "^(?:.*\\/)?"],
		[/^(?=[^^])/, function() {
			return /\/(?!$)/.test(this) ? "^" : "(?:^|\\/)";
		}],
		[/\\\/\\\*\\\*(?=\\\/|$)/g, (e, t, n) => t + 6 < n.length ? "(?:\\/[^\\/]+)*" : "\\/.+"],
		[/(^|[^\\]+)(\\\*)+(?=.+)/g, (e, t, n) => t + n.replace(/\\\*/g, "[^\\/]*")],
		[/\\\\\\(?=[$.|*+(){^])/g, () => "\\"],
		[/\\\\/g, () => "\\"],
		[/(\\)?\[([^\]/]*?)(\\*)($|\])/g, (e, t, n, r, i) => t === "\\" ? `\\[${n}${h(r)}${i}` : i === "]" && r.length % 2 == 0 ? `[${m(n)}${r}]` : "[]"],
		[/(?:[^*])$/, (e) => /\/$/.test(e) ? `${e}$` : `${e}(?=$|\\/$)`],
		[/(\^|\\\/)?\\\*$/, (e, t) => `${t ? `${t}[^/]+` : "[^/]*"}(?=$|\\/$)`]
	], _ = Object.create(null), v = (e, t) => {
		let n = _[e];
		return n || (n = g.reduce((t, [n, r]) => t.replace(n, r.bind(e)), e), _[e] = n), t ? new RegExp(n, "i") : new RegExp(n);
	}, y = (e) => typeof e == "string", b = (e) => e && y(e) && !r.test(e) && !i.test(e) && e.indexOf("#") !== 0, x = (e) => e.split(s), S = class {
		constructor(e, t, n, r) {
			this.origin = e, this.pattern = t, this.negative = n, this.regex = r;
		}
	}, C = (e, t) => {
		let n = e, r = !1;
		e.indexOf("!") === 0 && (r = !0, e = e.substr(1)), e = e.replace(a, "!").replace(o, "#");
		let i = v(e, t);
		return new S(n, e, r, i);
	}, w = (e, t) => {
		throw new t(e);
	}, T = (e, t, n) => y(e) ? e ? !T.isNotRelative(e) || n(`path should be a \`path.relative()\`d string, but got "${t}"`, RangeError) : n("path must not be empty", TypeError) : n(`path must be a string, but got \`${t}\``, TypeError), E = (e) => c.test(e);
	T.isNotRelative = E, T.convert = (e) => e;
	var D = class {
		constructor({ ignorecase: e = !0, ignoreCase: t = e, allowRelativePaths: n = !1 } = {}) {
			d(this, u, !0), this._rules = [], this._ignoreCase = t, this._allowRelativePaths = n, this._initCache();
		}
		_initCache() {
			this._ignoreCache = Object.create(null), this._testCache = Object.create(null);
		}
		_addPattern(e) {
			if (e && e[u]) this._rules = this._rules.concat(e._rules), this._added = !0;
			else if (b(e)) {
				let t = C(e, this._ignoreCase);
				this._added = !0, this._rules.push(t);
			}
		}
		add(e) {
			return this._added = !1, n(y(e) ? x(e) : e).forEach(this._addPattern, this), this._added && this._initCache(), this;
		}
		addPattern(e) {
			return this.add(e);
		}
		_testOne(e, t) {
			let n = !1, r = !1;
			return this._rules.forEach((i) => {
				let { negative: a } = i;
				r === a && n !== r || a && !n && !r && !t || i.regex.test(e) && (n = !a, r = a);
			}), {
				ignored: n,
				unignored: r
			};
		}
		_test(e, t, n, r) {
			let i = e && T.convert(e);
			return T(i, e, this._allowRelativePaths ? p : w), this._t(i, t, n, r);
		}
		_t(e, t, n, r) {
			if (e in t) return t[e];
			if (r ||= e.split("/"), r.pop(), !r.length) return t[e] = this._testOne(e, n);
			let i = this._t(r.join("/") + "/", t, n, r);
			return t[e] = i.ignored ? i : this._testOne(e, n);
		}
		ignores(e) {
			return this._test(e, this._ignoreCache, !1).ignored;
		}
		createFilter() {
			return (e) => !this.ignores(e);
		}
		filter(e) {
			return n(e).filter(this.createFilter());
		}
		test(e) {
			return this._test(e, this._testCache, !0);
		}
	}, O = (e) => new D(e);
	/* istanbul ignore if */
	if (O.isPathValid = (e) => T(e && T.convert(e), e, p), O.default = O, t.exports = O, typeof process < "u" && (process.env && process.env.IGNORE_TEST_WIN32 || process.platform === "win32")) {
		T.convert = (e) => /^\\\\\?\\/.test(e) || /["<>|\u0000-\u001F]+/u.test(e) ? e : e.replace(/\\/g, "/");
		let e = /^[a-z]:\//i;
		T.isNotRelative = (t) => e.test(t) || E(t);
	}
}));
export default t();
