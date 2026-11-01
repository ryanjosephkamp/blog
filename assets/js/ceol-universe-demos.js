/* The CEOL Universe post's demos. Their figures are in
   assets/data/ceol-universe.json, from the CEOL Universe's committed records of
   version 1.0; the composer counts rows from the dataset's own count cube. */
(function () {
  "use strict";
  "use strict";
  var fmt = function (n) { return Number(n).toLocaleString("en-US"); };
  var pct = function (a, b) {
    var p = (100 * a) / b;
    return (p >= 10 ? p.toFixed(1) : p >= 1 ? p.toFixed(1) : p >= 0.01 ? p.toFixed(2) : p > 0 ? "under 0.01" : "0") + "%";
  };
  function h(tag, attrs, html) {
    var el = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) { el.setAttribute(k, attrs[k]); });
    if (html != null) el.innerHTML = html;
    return el;
  }
  var CHECK = '<svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true"><path d="M2.5 6.2l2.3 2.3 4.7-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var PLUS = '<svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true"><path d="M6 2.5v7M2.5 6h7" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>';

  function copyButton(getText) {
    var b = h("button", { type: "button", class: "ceol-btn ceol-copy" }, "Copy");
    b.addEventListener("click", function () {
      var text = getText();
      var done = function () { b.textContent = "Copied"; setTimeout(function () { b.textContent = "Copy"; }, 1400); };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () { selectPre(b); });
      } else selectPre(b);
    });
    return b;
  }
  function selectPre(b) {
    var pre = b.parentNode.querySelector("pre");
    var r = document.createRange();
    r.selectNodeContents(pre);
    var s = window.getSelection();
    s.removeAllRanges();
    s.addRange(r);
    b.textContent = "Selected: copy it";
  }

  /* 1. Compose a list */
  function composer(el, data) {
    var D = data;
    var CRIT = [
      { key: "plain", label: "Plain a to z", on: true, at: 1,
        sql: "class_explicit = 'plain'", py: '(df.class_explicit == "plain")', col: "class_explicit" },
      { key: "single", label: "A single token", on: false, at: 2,
        sql: "token_count = 1", py: "(df.token_count == 1)", col: "token_count" },
      { key: "nomodel", label: "No model or engine", on: false, at: 3,
        sql: "model_or_engine = 'none'", py: '(df.model_or_engine == "none")', col: "model_or_engine" },
      { key: "gb", label: "In Google Books", on: false, at: 4,
        sql: "gb_type IS TRUE", py: "df.gb_type.eq(True)", col: "gb_type" },
      { key: "eol", label: "In the English OpenList", on: false, at: 5,
        sql: "eol", py: "df.eol", col: "eol" },
    ];
    var minLists = 1;
    var tab = "sql";
    el.appendChild(h("p", { class: "ceol-demo__label" }, "Try it"));
    el.appendChild(h("h3", null, "Compose a list"));
    el.appendChild(h("p", { class: "ceol-demo__lede" },
      "Each choice is a criterion over every row of version 1.0. The count is exact: it comes from the dataset&rsquo;s own count of rows for every combination of its columns, so nothing here is sampled."));
    var rangeRow = h("div", { class: "ceol-range" });
    var rid = "ceol-min-lists";
    var rl = h("label", { for: rid });
    var range = h("input", { id: rid, type: "range", min: "0", max: "8", step: "1", value: "1" });
    rangeRow.appendChild(rl);
    rangeRow.appendChild(range);
    el.appendChild(rangeRow);
    var chips = h("ul", { class: "ceol-chips" });
    CRIT.forEach(function (c) {
      var li = h("li");
      var b = h("button", { type: "button", class: "ceol-chip", "aria-pressed": String(c.on) });
      b.addEventListener("click", function () { c.on = !c.on; update(); });
      c.btn = b;
      li.appendChild(b);
      chips.appendChild(li);
    });
    el.appendChild(chips);

    var grid = h("div", { class: "ceol-composer" });
    var left = h("div");
    var svgNS = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", "0 0 100 100");
    svg.setAttribute("class", "ceol-squares");
    svg.setAttribute("role", "img");
    var outer = document.createElementNS(svgNS, "rect");
    outer.setAttribute("x", "0.5"); outer.setAttribute("y", "0.5"); outer.setAttribute("width", "99"); outer.setAttribute("height", "99");
    outer.setAttribute("fill", "none"); outer.setAttribute("stroke", "var(--line-strong)"); outer.setAttribute("stroke-width", "0.6");
    var selR = document.createElementNS(svgNS, "rect");
    selR.setAttribute("fill", "var(--accent)"); selR.setAttribute("opacity", "0.85");
    var eolR = document.createElementNS(svgNS, "rect");
    eolR.setAttribute("fill", "var(--ceol-eol)");
    [outer, selR, eolR].forEach(function (r) { svg.appendChild(r); });
    left.appendChild(svg);
    var legend = h("p", { class: "ceol-legend" },
      '<span><span class="ceol-swatch" style="border:1px solid var(--line-strong)"></span> every row</span>' +
      '<span><span class="ceol-swatch" style="background:var(--accent)"></span> your list</span>' +
      '<span><span class="ceol-swatch" style="background:var(--ceol-eol)"></span> the part also in the English OpenList</span>');
    left.appendChild(legend);
    var readout = h("p", { class: "ceol-readout", "aria-live": "polite" });
    left.appendChild(readout);
    grid.appendChild(left);

    var right = h("div");
    var tabs = h("div", { class: "ceol-tabs", role: "group", "aria-label": "Code language" });
    var tSql = h("button", { type: "button", "aria-pressed": "true" }, "DuckDB SQL");
    var tPy = h("button", { type: "button", "aria-pressed": "false" }, "Python");
    tSql.addEventListener("click", function () { tab = "sql"; update(); });
    tPy.addEventListener("click", function () { tab = "py"; update(); });
    tabs.appendChild(tSql); tabs.appendChild(tPy);
    right.appendChild(tabs);
    var box = h("div", { class: "ceol-code" });
    var pre = h("pre");
    var code = h("code");
    pre.appendChild(code);
    box.appendChild(pre);
    box.appendChild(copyButton(function () { return code.textContent; }));
    right.appendChild(box);
    right.appendChild(h("p", { class: "ceol-demo__note" },
      "The code reads the dataset from Hugging Face at the tag <code>v1.0</code>, and its comment states the rows it returns."));
    grid.appendChild(right);
    el.appendChild(grid);
    el.appendChild(h("p", { class: "ceol-demo__note" },
      "The squares are to scale by area: the outline is all " + fmt(D.total) + " rows. The site&rsquo;s composer offers every column, a length range, each list by name, and a datasheet for the list you make."));

    function count(onlyEol) {
      var n = 0;
      for (var i = 0; i < D.folded.length; i++) {
        var c = D.folded[i];
        if (c[0] < minLists) continue;
        var ok = true;
        for (var j = 0; j < CRIT.length; j++) {
          if (CRIT[j].on && !c[CRIT[j].at]) { ok = false; break; }
        }
        if (onlyEol && !c[5]) ok = false;
        if (ok) n += c[6];
      }
      return n;
    }
    function codeText(rows) {
      var terms = [];
      var cols = [];
      if (minLists > 0) { terms.push({ sql: "panel_count >= " + minLists, py: "(df.panel_count >= " + minLists + ")" }); cols.push("panel_count"); }
      CRIT.forEach(function (c) { if (c.on) { terms.push(c); cols.push(c.col); } });
      var n = fmt(rows);
      if (tab === "sql") {
        return "-- The CEOL Universe, version 1.0: " + n + " rows\nSELECT word\nFROM\n  'hf://datasets/ryanjosephkamp/ceol-universe@v1.0/data/universe.parquet'" +
          (terms.length ? "\nWHERE " + terms.map(function (t) { return t.sql; }).join("\n  AND ") : "") + "\nORDER BY word;";
      }
      var mask = terms.length ? "df[\n    " + terms.map(function (t) { return t.py; }).join("\n    & ") + "\n]" : "df";
      return 'from datasets import load_dataset\n\nds = load_dataset(\n    "ryanjosephkamp/ceol-universe",\n    "universe",\n    revision="v1.0",\n    split="candidates",\n)\n' +
        "df = ds.select_columns([" + ["word"].concat(cols).map(function (c) { return '"' + c + '"'; }).join(", ") + "]).to_pandas()\nrows = " + mask + "\nprint(len(rows))  # " + n;
    }
    function square(rect, n) {
      var side = n > 0 ? Math.max(0.9, 99 * Math.sqrt(n / D.total)) : 0;
      rect.setAttribute("x", "0.5"); rect.setAttribute("y", String(99.5 - side));
      rect.setAttribute("width", String(side)); rect.setAttribute("height", String(side));
    }
    function update() {
      minLists = Number(range.value);
      rl.innerHTML = minLists === 0
        ? "Listed by <strong>any number</strong> of the 8 published lists, none included"
        : "Listed by at least <strong>" + minLists + "</strong> of the 8 published lists";
      CRIT.forEach(function (c) {
        c.btn.setAttribute("aria-pressed", String(c.on));
        c.btn.innerHTML = (c.on ? CHECK : PLUS) + c.label;
      });
      var rows = count(false);
      var eol = count(true);
      square(selR, rows); square(eolR, eol);
      svg.setAttribute("aria-label", fmt(rows) + " of " + fmt(D.total) + " rows; " + fmt(eol) + " of them in the English OpenList");
      readout.innerHTML = "<strong>" + fmt(rows) + "</strong> rows, " + pct(rows, D.total) + " of the universe<br>" +
        fmt(eol) + " of them in the English OpenList&rsquo;s list at the pinned revision";
      tSql.setAttribute("aria-pressed", String(tab === "sql"));
      tPy.setAttribute("aria-pressed", String(tab === "py"));
      code.textContent = codeText(rows);
    }
    range.addEventListener("input", update);
    update();
  }

  /* 2. How far each list contains the others */
  function overlap(el, data) {
    var C = data.containment;
    var sel = [6, 1];
    el.appendChild(h("p", { class: "ceol-demo__label" }, "Try it"));
    el.appendChild(h("h3", null, "How far each list contains the others"));
    el.appendChild(h("p", { class: "ceol-demo__lede" },
      "Pick a cell. Of the single-token rows the row&rsquo;s list holds that the column&rsquo;s list could hold, it gives the share the column&rsquo;s list holds too. Read across a row: a bright cell beside a dim one is one list nested in another."));
    var grid = h("div", { class: "ceol-heat", role: "group", "aria-label": "Containment, list by list" });
    grid.style.gridTemplateColumns = "minmax(2.6rem, auto) repeat(8, minmax(0, 1fr))";
    grid.appendChild(h("div", { class: "hd" }, ""));
    C.short.forEach(function (s, j) { grid.appendChild(h("div", { class: "hd", title: C.lists[j] }, s)); });
    var cells = [];
    C.share.forEach(function (row, i) {
      grid.appendChild(h("div", { class: "hd rh", title: C.lists[i] }, C.short[i]));
      row.forEach(function (v, j) {
        var b = h("button", { type: "button", class: "ceol-cell" });
        if (i === j) {
          b.textContent = "–";
          b.style.background = "transparent";
          b.style.color = "var(--line-strong)";
          b.disabled = true;
          b.setAttribute("aria-label", C.lists[i] + " against itself");
        } else {
          b.textContent = v;
          b.style.background = "color-mix(in srgb, var(--accent) " + Math.max(4, v) + "%, var(--page))";
          b.style.color = v >= 55 ? "var(--page)" : "var(--ink)";
          b.setAttribute("aria-label", C.lists[i] + " in " + C.lists[j] + ": " + v + "%");
          b.addEventListener("click", function () { sel = [i, j]; paint(); });
          b.addEventListener("mouseenter", function () { show(i, j); });
          b.addEventListener("focus", function () { show(i, j); });
          b.addEventListener("mouseleave", function () { show(sel[0], sel[1]); });
        }
        cells.push({ b: b, i: i, j: j });
        grid.appendChild(b);
      });
    });
    el.appendChild(grid);
    el.appendChild(h("p", { class: "ceol-legend" },
      '<span>0%</span><span class="ramp" style="background:linear-gradient(90deg, color-mix(in srgb, var(--accent) 4%, var(--page)), var(--accent))"></span><span>100%</span>' +
      "<span>WN WordNet · Wikt Wiktionary · US, GB, CA, AU the hunspell dictionaries · EN ENABLE · SC SCOWL</span>"));
    var readout = h("p", { class: "ceol-readout", "aria-live": "polite" });
    el.appendChild(readout);
    el.appendChild(h("p", { class: "ceol-demo__note" },
      "Version 1.0&rsquo;s single-token rows, from the dataset&rsquo;s descriptive analysis. A list that cannot hold a class of string (a list without hyphens cannot hold a hyphenated one) is never counted as leaving it out."));
    function show(i, j) {
      var v = C.share[i][j];
      readout.innerHTML = "Of the rows <strong>" + C.lists[i] + "</strong> holds that " + C.lists[j] + " could hold, " + C.lists[j] +
        " holds <strong>" + v + "%</strong>: " + fmt(C.contained[i][j]) + " of " + fmt(C.eligible[i][j]) + ".";
    }
    function paint() {
      cells.forEach(function (c) { c.b.setAttribute("aria-pressed", String(c.i === sel[0] && c.j === sel[1])); });
      show(sel[0], sel[1]);
    }
    paint();
  }

  /* 3. How version 1.0 was built */
  function build(el, data) {
    var S = data.steps;
    var at = 0;
    el.appendChild(h("p", { class: "ceol-demo__label" }, "Step through it"));
    el.appendChild(h("h3", null, "How version 1.0 was built"));
    el.appendChild(h("p", { class: "ceol-demo__lede" },
      "7 steps, each with its own committed record. Pick one to see what it did to the count."));
    var list = h("ol", { class: "ceol-steps" });
    var btns = S.map(function (s, k) {
      var li = h("li");
      var change = k === 0 ? fmt(s.rows) : s.change === 0 ? "no change" : (s.change > 0 ? "+" : "−") + fmt(Math.abs(s.change));
      var b = h("button", { type: "button", "aria-pressed": "false" },
        '<span class="n">' + (k + 1) + '</span><span class="t">' + s.title + '</span><span class="d">' + change + "</span>");
      b.addEventListener("click", function () { at = k; paint(); });
      li.appendChild(b);
      list.appendChild(li);
      return b;
    });
    el.appendChild(list);
    var detail = h("div", { class: "ceol-step-detail", "aria-live": "polite" });
    el.appendChild(detail);
    var max = Math.max.apply(null, S.slice(1).map(function (s) { return Math.abs(s.change); }));
    function bar(n) {
      var w = Math.max(n === 0 ? 0 : 0.6, (100 * Math.abs(n)) / max);
      var color = n >= 0 ? "var(--accent)" : "var(--ceol-eol)";
      return '<span style="display:inline-block;height:0.55rem;width:' + w.toFixed(1) + '%;max-width:100%;background:' + color + ';vertical-align:middle"></span>';
    }
    function paint() {
      btns.forEach(function (b, k) { b.setAttribute("aria-pressed", String(k === at)); });
      var s = S[at];
      var prev = at > 0 ? S[at - 1].rows : null;
      var line = at === 0
        ? "<strong>" + fmt(s.rows) + "</strong> rows to start from"
        : fmt(prev) + " → <strong>" + fmt(s.rows) + "</strong> rows" + (s.change === 0 ? ", none added or removed" : " (" + (s.change > 0 ? "+" : "−") + fmt(Math.abs(s.change)) + ")");
      detail.innerHTML = "<p><strong>Step " + (at + 1) + " of " + S.length + ": " + s.title + ".</strong> " + s.what + "</p><p>" + line + "</p>" +
        (at > 0 && s.change !== 0 ? '<p style="max-width:100%">' + bar(s.change) + "</p>" : "");
    }
    el.appendChild(h("p", { class: "ceol-demo__note" },
      "The bars share 1 scale, the largest change, so the changes compare with each other; every total is about 10 million."));
    paint();
  }

  var DEMOS = { composer: composer, overlap: overlap, build: build };

  function start() {
    var post = document.querySelector("[data-ceol-data]");
    if (!post) return;
    var film = post.querySelector("video[data-ceol-film]");
    if (film && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      film.removeAttribute("autoplay");
      film.pause();
    }
    fetch(post.getAttribute("data-ceol-data"))
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (D) {
        post.querySelectorAll("[data-ceol-demo]").forEach(function (el) {
          var fn = DEMOS[el.getAttribute("data-ceol-demo")];
          if (!fn) return;
          el.innerHTML = "";
          try { fn(el, D); } catch (e) { el.innerHTML = '<p class="ceol-demo__fallback">This demo didn&rsquo;t load.</p>'; }
        });
      })
      .catch(function () {});
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
