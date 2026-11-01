/* The English OpenList post's demos. Their figures are in
   assets/data/english-openlist.json, taken from the build the English
   OpenList's site serves; the search loads the list itself from Hugging Face. */
(function () {
  "use strict";

  var LIST_URL = "https://huggingface.co/datasets/ryanjosephkamp/english-openlist/resolve/main/data/merged_valid_words.txt";
  var NS = "http://www.w3.org/2000/svg";
  var CHECK = '<svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true"><path d="M2.5 6.2l2.3 2.3 4.7-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var PLUS = '<svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true"><path d="M6 2.5v7M2.5 6h7" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>';

  function fmt(n) { return Number(n).toLocaleString("en-US"); }
  function usDate(iso, withYear) {
    var opts = { month: "long", day: "numeric", timeZone: "UTC" };
    if (withYear !== false) opts.year = "numeric";
    return new Date(iso + "T12:00:00Z").toLocaleString("en-US", opts);
  }
  function h(tag, attrs, html) {
    var el = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) { el.setAttribute(k, attrs[k]); });
    if (html != null) el.innerHTML = html;
    return el;
  }
  function s(tag, attrs) {
    var el = document.createElementNS(NS, tag);
    if (attrs) Object.keys(attrs).forEach(function (k) { el.setAttribute(k, attrs[k]); });
    return el;
  }
  function esc(t) {
    return String(t).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; });
  }
  function niceMax(v) {
    var p = Math.pow(10, Math.floor(Math.log10(v)));
    var m = v / p;
    return (m <= 1 ? 1 : m <= 2 ? 2 : m <= 2.5 ? 2.5 : m <= 5 ? 5 : 10) * p;
  }
  function head(el, label, title, lede) {
    el.appendChild(h("p", { class: "eol-demo__label" }, label));
    el.appendChild(h("h3", null, title));
    el.appendChild(h("p", { class: "eol-demo__lede" }, lede));
  }

  /* 1. Try the rule */
  function rule(el, D) {
    var EXAMPLES = ["steamship", "fairy tale", "gounod's", "dégagé", "après-skiing", "underemphasize"];
    var maxLen = D.by_length[D.by_length.length - 1].length;
    head(el, "Try it", "Try the rule",
      "An entry is lowercase a to z and nothing else: <code>^[a-z]+$</code>, with no length bound. Type anything, or pick an example.");
    el.appendChild(h("label", { for: "eol-rule-input", class: "visually-hidden" }, "A string to test"));
    var input = h("input", { id: "eol-rule-input", class: "eol-input", type: "text", value: "steamship", autocomplete: "off", spellcheck: "false", autocapitalize: "off" });
    el.appendChild(input);
    var ex = h("ul", { class: "eol-chips", style: "margin-top:0.7rem" });
    EXAMPLES.forEach(function (w) {
      var li = h("li");
      var b = h("button", { type: "button", class: "eol-chip" }, esc(w));
      b.addEventListener("click", function () { input.value = w; update(); });
      li.appendChild(b);
      ex.appendChild(li);
    });
    el.appendChild(ex);
    var shown = h("p", { class: "eol-readout", style: "font-family:var(--font-mono);font-size:1.15rem;color:var(--ink);overflow-wrap:anywhere", "aria-hidden": "true" });
    el.appendChild(shown);
    var checks = h("ul", { class: "eol-checks", "aria-live": "polite" });
    el.appendChild(checks);
    el.appendChild(h("p", { class: "eol-demo__note" },
      "Fitting the rule doesn&rsquo;t put a string on the list: a source has to list it, or a dictionary has to know it. The test runs in your browser; nothing is looked up."));

    function why(ch) {
      if (/[A-Z]/.test(ch)) return "a capital";
      if (ch === " ") return "a space";
      if (ch === "-") return "a hyphen";
      if (ch === "'" || ch === "’") return "an apostrophe";
      if (/[0-9]/.test(ch)) return "a digit";
      if (/\p{L}/u.test(ch) && ch.normalize("NFD") !== ch) return "an accent";
      if (/\p{L}/u.test(ch)) return "a letter outside a to z";
      return "“" + ch + "”";
    }
    function item(ok, text) {
      return '<li><span class="mark ' + (ok ? "ok" : "no") + '" aria-hidden="true">' + (ok ? "✓" : "✗") + "</span><span>" +
        '<span class="visually-hidden">' + (ok ? "Yes: " : "No: ") + "</span>" + text + "</span></li>";
    }
    function update() {
      var chars = Array.from(input.value);
      var bad = [];
      shown.innerHTML = chars.length
        ? chars.map(function (c) {
            var ok = /^[a-z]$/.test(c);
            if (!ok) bad.push(why(c));
            return ok ? esc(c) : '<span class="eol-bad">' + (c === " " ? "&nbsp;" : esc(c)) + "</span>";
          }).join("")
        : "&nbsp;";
      var kinds = bad.filter(function (k, i) { return bad.indexOf(k) === i; });
      var fits = chars.length > 0 && bad.length === 0;
      var out = [];
      if (!chars.length) out.push(item(false, "An entry has at least 1 letter."));
      else if (fits) out.push(item(true, "Only the letters a to z."));
      else out.push(item(false, bad.length + (bad.length === 1 ? " character breaks" : " characters break") + " the rule: " + kinds.join(", ") + "."));
      if (chars.length) {
        out.push(item(true, chars.length + (chars.length === 1 ? " character" : " characters") + ". The rule sets no length bound: the list runs from 1 letter to " + maxLen + "."));
        var t = fits && chars.length >= 2 && chars.length <= 45;
        out.push(item(t, fits
          ? (t ? "Inside the download &ldquo;Lengths 2 to 45&rdquo;, the bounds of tournament word lists." : "Outside the download &ldquo;Lengths 2 to 45&rdquo;, though the full list can hold it.")
          : "Neither the list nor any of its downloads can hold it, whatever a dictionary says."));
      }
      checks.innerHTML = out.join("");
    }
    input.addEventListener("input", update);
    update();
  }

  /* 2. What decided each word, by length */
  function decided(el, D) {
    var COLORS = ["var(--eol-s1)", "var(--eol-s2)", "var(--eol-s3)", "var(--eol-s4)"];
    var on = [true, true, true, true];
    var tournament = false;
    var asTable = false;
    head(el, "Try it", "Words by length, and what decided them",
      "Every word&rsquo;s record says how it got on the list. Leave out what you don&rsquo;t want, and see what&rsquo;s left, length by length.");
    var chips = h("ul", { class: "eol-chips" });
    var btns = D.order.map(function (k, i) {
      var li = h("li");
      var b = h("button", { type: "button", class: "eol-chip", "aria-pressed": "true" });
      b.addEventListener("click", function () { on[i] = !on[i]; update(); });
      li.appendChild(b);
      chips.appendChild(li);
      return b;
    });
    var liT = h("li");
    var bT = h("button", { type: "button", class: "eol-chip", "aria-pressed": "false" });
    bT.addEventListener("click", function () { tournament = !tournament; update(); });
    liT.appendChild(bT);
    chips.appendChild(liT);
    el.appendChild(chips);
    var readout = h("p", { class: "eol-readout", "aria-live": "polite" });
    el.appendChild(readout);
    var wrap = h("div", { class: "eol-chart-wrap" });
    var svg = s("svg", { class: "eol-chart", role: "img" });
    wrap.appendChild(svg);
    var tip = h("div", { class: "eol-tip", hidden: "" });
    wrap.appendChild(tip);
    el.appendChild(wrap);
    var tableBox = h("div", { hidden: "" });
    el.appendChild(tableBox);
    var tToggle = h("button", { type: "button", class: "eol-btn", style: "margin-top:0.6rem" }, "Show as a table");
    tToggle.addEventListener("click", function () { asTable = !asTable; update(); });
    el.appendChild(tToggle);
    var have = D.by_length.map(function (r) { return r.length; });
    var gaps = [];
    for (var n = 1; n <= have[have.length - 1]; n++) if (have.indexOf(n) < 0) gaps.push(n);
    el.appendChild(h("p", { class: "eol-demo__note" },
      "From the English OpenList site&rsquo;s build of " + usDate(D.as_of) + "." +
      (gaps.length ? " No word has " + gaps.join(" or ") + " letters, so those have no bar." : "")));

    var L = { l: 52, r: 8, t: 10, b: 34 }, W = 640, H = 250;
    function kept(r) {
      if (tournament && (r.length < 2 || r.length > 45)) return [0, 0, 0, 0];
      return r.counts.map(function (c, i) { return on[i] ? c : 0; });
    }
    function sum(a) { return a.reduce(function (x, y) { return x + y; }, 0); }
    function update() {
      btns.forEach(function (b, i) {
        b.setAttribute("aria-pressed", String(on[i]));
        var k = D.order[i];
        b.innerHTML = '<span class="eol-swatch" style="background:' + COLORS[i] + '"></span>' + D.labels[k] + " · " + fmt(D.decided[k]);
      });
      bT.setAttribute("aria-pressed", String(tournament));
      bT.innerHTML = (tournament ? CHECK : PLUS) + "Lengths 2 to 45 only";
      var total = 0;
      D.by_length.forEach(function (r) { total += sum(kept(r)); });
      var all = on.every(Boolean);
      var match = "";
      if (all && tournament) match = ": the download &ldquo;Lengths 2 to 45&rdquo;";
      else if (on[0] && on[1] && on[2] && !on[3] && !tournament) match = ": the download &ldquo;Without the synthetic engine&rdquo;";
      else if (all && !tournament) match = ": the whole list";
      readout.innerHTML = "<strong>" + fmt(total) + "</strong> words kept, of " + fmt(D.words) + match;
      draw();
      tableBox.hidden = !asTable;
      wrap.hidden = asTable;
      tToggle.textContent = asTable ? "Show as a chart" : "Show as a table";
      if (asTable) table();
    }
    function draw() {
      W = Math.max(300, Math.round(wrap.clientWidth || 640));
      svg.setAttribute("viewBox", "0 0 " + W + " " + H);
      while (svg.firstChild) svg.removeChild(svg.firstChild);
      var lens = D.by_length;
      var maxLen = lens[lens.length - 1].length;
      var max = 0;
      lens.forEach(function (r) { var t = sum(kept(r)); if (t > max) max = t; });
      var yMax = max > 0 ? niceMax(max) : 1;
      var pw = W - L.l - L.r, ph = H - L.t - L.b;
      var bw = pw / maxLen;
      [0, 0.5, 1].forEach(function (f) {
        var y = L.t + ph - f * ph;
        svg.appendChild(s("line", { class: f === 0 ? "axis" : "grid", x1: L.l, x2: W - L.r, y1: y, y2: y }));
        var t = s("text", { x: L.l - 6, y: y + 4, "text-anchor": "end" });
        t.textContent = fmt(Math.round(f * yMax));
        svg.appendChild(t);
      });
      (W < 480 ? [1, 10, 20, 30, 40] : [1, 5, 10, 15, 20, 25, 30, 35, 40, 45]).forEach(function (n) {
        var t = s("text", { x: L.l + (n - 0.5) * bw, y: H - L.b + 15, "text-anchor": "middle" });
        t.textContent = n;
        svg.appendChild(t);
      });
      var xl = s("text", { x: L.l + pw / 2, y: H - 4, "text-anchor": "middle" });
      xl.textContent = "letters";
      svg.appendChild(xl);
      lens.forEach(function (r) {
        var x = L.l + (r.length - 1) * bw;
        var counts = kept(r);
        var y = L.t + ph;
        counts.forEach(function (c, i) {
          if (!c) return;
          var hgt = (c / yMax) * ph;
          var segH = Math.max(0, hgt - 1);
          if (segH > 0) svg.appendChild(s("rect", { x: x + 1, y: y - hgt, width: Math.max(1, bw - 2), height: Math.max(0.6, segH), fill: COLORS[i] }));
          y -= hgt;
        });
        var hit = s("rect", { x: x, y: L.t, width: bw, height: ph, fill: "transparent", tabindex: "0", "aria-label": r.length + " letters: " + fmt(sum(counts)) + " words" });
        hit.addEventListener("mouseenter", function () { showTip(r, x + bw / 2); });
        hit.addEventListener("focus", function () { showTip(r, x + bw / 2); });
        hit.addEventListener("mouseleave", function () { tip.hidden = true; });
        hit.addEventListener("blur", function () { tip.hidden = true; });
        svg.appendChild(hit);
      });
      svg.setAttribute("aria-label", "Words by length, stacked by what decided them; " + fmt(lens.reduce(function (a, r) { return a + sum(kept(r)); }, 0)) + " words kept");
    }
    function showTip(r, x) {
      var counts = kept(r);
      tip.innerHTML = "<strong>" + r.length + (r.length === 1 ? " letter" : " letters") + ": " + fmt(sum(counts)) + "</strong><br>" +
        D.order.map(function (k, i) { return '<span class="eol-swatch" style="background:' + COLORS[i] + '"></span> ' + D.labels[k] + ": " + fmt(counts[i]); }).join("<br>");
      tip.hidden = false;
      var box = svg.getBoundingClientRect();
      var px = (x / W) * box.width;
      tip.style.left = Math.min(Math.max(0, px - 90), box.width - 190) + "px";
      tip.style.top = "0px";
    }
    function table() {
      var rows = D.by_length.map(function (r) {
        var c = kept(r);
        return '<tr><td class="num">' + r.length + "</td>" + c.map(function (n) { return '<td class="num">' + fmt(n) + "</td>"; }).join("") +
          '<td class="num">' + fmt(sum(c)) + "</td></tr>";
      }).join("");
      tableBox.innerHTML = '<table><thead><tr><th class="num">Letters</th>' + D.order.map(function (k) { return '<th class="num">' + D.labels[k] + "</th>"; }).join("") +
        '<th class="num">Kept</th></tr></thead><tbody>' + rows + "</tbody></table>";
    }
    update();
    var rt = 0;
    window.addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(function () { if (!asTable) draw(); }, 150); });
  }

  /* 3. The list's size, night by night */
  function growth(el, D) {
    var G = D.growth;
    var first = G[0], last = G[G.length - 1];
    head(el, "Explore it", "The list&rsquo;s size, night by night",
      "Point at the line, or tab to it and use the arrow keys. The big steps down are corrections, made through the ledgers. The nightly run&rsquo;s additions are small enough to look flat at this scale: point at a night to see them.");
    var wrap = h("div", { class: "eol-chart-wrap" });
    var W = 640, H = 260, L = { l: 64, r: 12, t: 14, b: 30 };
    var svg = s("svg", { class: "eol-chart", role: "img", tabindex: "0",
      "aria-label": "The list's size from " + usDate(first.date) + " to " + usDate(last.date) + ", from " + fmt(first.total) + " to " + fmt(last.total) + " words" });
    wrap.appendChild(svg);
    var tip = h("div", { class: "eol-tip", hidden: "" });
    wrap.appendChild(tip);
    el.appendChild(wrap);
    var readout = h("p", { class: "eol-readout", "aria-live": "polite" });
    el.appendChild(readout);
    el.appendChild(h("p", { class: "eol-demo__note" },
      "From the daily log: a point per recorded run, from " + usDate(first.date, false) + " to " + usDate(last.date) +
      ". Days with no recorded run have no point. The axis starts at 340,000, not 0, so the nightly additions show."));

    var t0 = Date.parse(first.date), t1 = Date.parse(last.date);
    var lo = 340000, hi = 382000;
    var pw, ph, cross, dot;
    var X = function (d) { return L.l + ((Date.parse(d) - t0) / (t1 - t0)) * pw; };
    var Y = function (v) { return L.t + ph - ((v - lo) / (hi - lo)) * ph; };
    var months = [];
    for (var m = new Date(t0); m.getTime() <= t1; m.setUTCMonth(m.getUTCMonth() + 1)) {
      var d = new Date(Date.UTC(m.getUTCFullYear(), m.getUTCMonth() + 1, 1));
      if (d.getTime() < t1) months.push(d.toISOString().slice(0, 10));
    }
    function draw() {
      W = Math.max(300, Math.round(wrap.clientWidth || 640));
      pw = W - L.l - L.r;
      ph = H - L.t - L.b;
      svg.setAttribute("viewBox", "0 0 " + W + " " + H);
      while (svg.firstChild) svg.removeChild(svg.firstChild);
      [340000, 350000, 360000, 370000, 380000].forEach(function (v) {
        svg.appendChild(s("line", { class: v === lo ? "axis" : "grid", x1: L.l, x2: W - L.r, y1: Y(v), y2: Y(v) }));
        var t = s("text", { x: L.l - 6, y: Y(v) + 4, "text-anchor": "end" });
        t.textContent = fmt(v);
        svg.appendChild(t);
      });
      months.filter(function (d, i) { return W >= 480 || i % 2 === 0; }).forEach(function (d) {
        var t = s("text", { x: X(d), y: H - 8, "text-anchor": "middle" });
        t.textContent = new Date(d + "T12:00:00Z").toLocaleString("en-US", { month: "short", timeZone: "UTC" });
        svg.appendChild(t);
      });
      var path = G.map(function (p, i) { return (i ? "L" : "M") + X(p.date).toFixed(1) + " " + Y(p.total).toFixed(1); }).join(" ");
      svg.appendChild(s("path", { d: path, fill: "none", stroke: "var(--eol-s1)", "stroke-width": "2", "stroke-linejoin": "round" }));
      G.forEach(function (p, i) {
        if (i && p.total - G[i - 1].total <= -4) {
          svg.appendChild(s("circle", { cx: X(p.date), cy: Y(p.total), r: 4, fill: "var(--eol-red)", stroke: "var(--page)", "stroke-width": "2" }));
        }
      });
      cross = s("line", { x1: 0, x2: 0, y1: L.t, y2: L.t + ph, stroke: "var(--line-strong)", "stroke-dasharray": "3 3", visibility: "hidden" });
      dot = s("circle", { r: 4.5, fill: "var(--eol-s1)", stroke: "var(--page)", "stroke-width": "2", visibility: "hidden" });
      svg.appendChild(cross);
      svg.appendChild(dot);
    }
    draw();
    var rt = 0;
    window.addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(function () { draw(); tip.hidden = true; }, 150); });
    var at = G.length - 1;
    function show(i) {
      at = Math.max(0, Math.min(G.length - 1, i));
      var p = G[at];
      var d = at ? p.total - G[at - 1].total : 0;
      var x = X(p.date), y = Y(p.total);
      cross.setAttribute("x1", x); cross.setAttribute("x2", x); cross.setAttribute("visibility", "visible");
      dot.setAttribute("cx", x); dot.setAttribute("cy", y); dot.setAttribute("visibility", "visible");
      var date = usDate(p.date);
      var change = at === 0 ? "" : d === 0 ? "no change" : (d > 0 ? "+" : "−") + fmt(Math.abs(d));
      var note = p.note ? " (" + p.note + ")" : d <= -100 ? " (a correction)" : "";
      tip.innerHTML = "<strong>" + date + "</strong><br>" + fmt(p.total) + " words" + (change ? "<br>" + change + " since the point before" + note : "");
      tip.hidden = false;
      var box = svg.getBoundingClientRect();
      var px = (x / W) * box.width;
      tip.style.left = Math.min(Math.max(0, px + 10), box.width - 200) + "px";
      tip.style.top = "0px";
      readout.innerHTML = date + ": <strong>" + fmt(p.total) + "</strong> words" + (change ? ", " + change + note : "");
    }
    function nearest(clientX) {
      var box = svg.getBoundingClientRect();
      var x = ((clientX - box.left) / box.width) * W;
      var best = 0, bd = Infinity;
      G.forEach(function (p, i) { var dd = Math.abs(X(p.date) - x); if (dd < bd) { bd = dd; best = i; } });
      return best;
    }
    svg.addEventListener("pointermove", function (e) { show(nearest(e.clientX)); });
    svg.addEventListener("pointerdown", function (e) { show(nearest(e.clientX)); });
    svg.addEventListener("pointerleave", function () { tip.hidden = true; });
    svg.addEventListener("keydown", function (e) {
      var to = { ArrowLeft: at - 1, ArrowRight: at + 1, Home: 0, End: G.length - 1 }[e.key];
      if (to !== undefined) { show(to); e.preventDefault(); }
    });
    svg.addEventListener("focus", function () { show(at); });
    svg.addEventListener("blur", function () { tip.hidden = true; });
    readout.innerHTML = "From <strong>" + fmt(first.total) + "</strong> words on " + usDate(first.date, false) +
      " to <strong>" + fmt(last.total) + "</strong> on " + usDate(last.date) + ".";
  }

  /* 4. Search the whole list, loaded from Hugging Face */
  function search(el) {
    var MODES = [["prefix", "Starts with"], ["contains", "Contains"], ["suffix", "Ends with"], ["pattern", "Pattern"]];
    var SHOW = 120;
    var words = null;
    var mode = "prefix";
    head(el, "Try it", "Search the whole list",
      "Load the list from Hugging Face, the same file as the code above, and search all of it in this page.");
    var load = h("button", { type: "button", class: "eol-btn eol-btn--primary" }, "Load the list (about 4 MB)");
    el.appendChild(load);
    var status = h("p", { class: "eol-readout", "aria-live": "polite" });
    el.appendChild(status);
    var box = h("div", { hidden: "" });
    el.appendChild(box);
    box.appendChild(h("label", { for: "eol-search-input", class: "visually-hidden" }, "Search the list"));
    var input = h("input", { id: "eol-search-input", class: "eol-input", type: "search", placeholder: "Letters to search for", autocomplete: "off", spellcheck: "false", autocapitalize: "off" });
    box.appendChild(input);
    var chips = h("ul", { class: "eol-chips", style: "margin-top:0.7rem" });
    var btns = MODES.map(function (m) {
      var li = h("li");
      var b = h("button", { type: "button", class: "eol-chip", "aria-pressed": String(m[0] === mode) }, m[1]);
      b.addEventListener("click", function () { mode = m[0]; update(); input.focus(); });
      li.appendChild(b);
      chips.appendChild(li);
      return b;
    });
    box.appendChild(chips);
    var readout = h("p", { class: "eol-readout", "aria-live": "polite" });
    box.appendChild(readout);
    var list = h("ul", { class: "eol-words" });
    box.appendChild(list);
    el.appendChild(h("p", { class: "eol-demo__note" },
      "A pattern uses <code>?</code> for any 1 letter, so <code>c?t</code> finds 3-letter words that start with c and end with t. The search runs in your browser on the list as Hugging Face serves it now, which can differ from this post&rsquo;s counts by the words added since."));

    function has(w) {
      var lo = 0, hi = words.length - 1;
      while (lo <= hi) {
        var mid = (lo + hi) >> 1;
        if (words[mid] === w) return true;
        if (words[mid] < w) lo = mid + 1; else hi = mid - 1;
      }
      return false;
    }
    function mark(w, q) {
      if (mode === "pattern" || !q) return esc(w);
      var i = mode === "prefix" ? 0 : mode === "suffix" ? w.length - q.length : w.indexOf(q);
      return esc(w.slice(0, i)) + "<mark>" + esc(w.slice(i, i + q.length)) + "</mark>" + esc(w.slice(i + q.length));
    }
    function update() {
      btns.forEach(function (b, i) { b.setAttribute("aria-pressed", String(MODES[i][0] === mode)); });
      var q = input.value.toLowerCase().replace(mode === "pattern" ? /[^a-z?]/g : /[^a-z]/g, "");
      if (!q) {
        readout.innerHTML = "Type some letters.";
        list.innerHTML = "";
        return;
      }
      var test;
      if (mode === "prefix") test = function (w) { return w.lastIndexOf(q, 0) === 0; };
      else if (mode === "suffix") test = function (w) { return w.length >= q.length && w.indexOf(q, w.length - q.length) !== -1; };
      else if (mode === "contains") test = function (w) { return w.indexOf(q) !== -1; };
      else {
        var re = new RegExp("^" + q.replace(/\?/g, "[a-z]") + "$");
        test = function (w) { return re.test(w); };
      }
      var hits = [];
      var n = 0;
      for (var i = 0; i < words.length; i++) {
        if (test(words[i])) { n++; if (hits.length < SHOW) hits.push(words[i]); }
      }
      var exact = mode !== "pattern" && has(q)
        ? " &ldquo;" + esc(q) + "&rdquo; itself is on the list."
        : mode !== "pattern" ? " &ldquo;" + esc(q) + "&rdquo; itself isn&rsquo;t." : "";
      readout.innerHTML = "<strong>" + fmt(n) + "</strong> " + (n === 1 ? "word matches" : "words match") +
        (n > SHOW ? "; the first " + SHOW + " are shown" : "") + "." + exact;
      list.innerHTML = hits.map(function (w) { return "<li>" + mark(w, q) + "</li>"; }).join("");
    }
    var timer = 0;
    input.addEventListener("input", function () { clearTimeout(timer); timer = setTimeout(update, 60); });
    load.addEventListener("click", function () {
      load.disabled = true;
      status.textContent = "Loading the list from Hugging Face…";
      fetch(LIST_URL)
        .then(function (r) { if (!r.ok) throw new Error("Hugging Face answered " + r.status); return r.text(); })
        .then(function (text) {
          words = text.split("\n").filter(Boolean);
          load.remove();
          status.innerHTML = "<strong>" + fmt(words.length) + "</strong> words loaded.";
          box.hidden = false;
          input.value = "word";
          update();
        })
        .catch(function (e) {
          load.disabled = false;
          status.textContent = "The list didn’t load (" + e.message + "). Try again, or search it on the English OpenList’s site.";
        });
    });
  }

  var DEMOS = { rule: rule, decided: decided, growth: growth, search: search };

  function start() {
    var post = document.querySelector("[data-eol-data]");
    if (!post) return;
    var film = post.querySelector("video[data-eol-film]");
    if (film && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      film.removeAttribute("autoplay");
      film.pause();
    }
    var mounts = Array.prototype.slice.call(post.querySelectorAll("[data-eol-demo]"));
    fetch(post.getAttribute("data-eol-data"))
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (D) {
        mounts.forEach(function (el) {
          var fn = DEMOS[el.getAttribute("data-eol-demo")];
          if (!fn) return;
          el.innerHTML = "";
          try { fn(el, D); } catch (e) { el.innerHTML = '<p class="eol-demo__fallback">This demo didn&rsquo;t load.</p>'; }
        });
      })
      .catch(function () {
        mounts.forEach(function (el) {
          if (el.getAttribute("data-eol-demo") !== "search") return;
          el.innerHTML = "";
          search(el);
        });
      });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
