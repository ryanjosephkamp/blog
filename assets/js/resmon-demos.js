/*
 * Interactive figures for the resmon post: Today's plate, the Source wall,
 * the notes resmon writes before a search, and the tour's chapters.
 *
 * Each figure reads one JSON file exported from resmon's demo collection and
 * draws it. The plate's bounds, grid cells, age ramp, and watch outlines, the
 * wall's marks, and the search notes follow resmon's own rules for them.
 */
(function () {
  "use strict";

  var GRID = 8;
  var LETTERS = "ABCDEFGH";
  var RAMP_DAYS = [0, 7, 30, 90, 180];
  var RAMP_RADIUS = [2.3, 1.8, 1.4, 1.1, 0.85];
  var RAMP_ALPHA = [1, 0.86, 0.7, 0.58, 0.5];
  var count = new Intl.NumberFormat("en-US");

  function h(tag, attrs, kids) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (key) {
        var value = attrs[key];
        if (value === null || value === undefined || value === false) return;
        if (key === "text") node.textContent = value;
        else if (key === "html") node.innerHTML = value;
        else if (key.slice(0, 2) === "on") node.addEventListener(key.slice(2), value);
        else node.setAttribute(key, value === true ? "" : value);
      });
    }
    (kids || []).forEach(function (kid) {
      if (kid === null || kid === undefined || kid === false) return;
      node.appendChild(typeof kid === "string" ? document.createTextNode(kid) : kid);
    });
    return node;
  }

  function token(node, name, fallback) {
    var value = getComputedStyle(node).getPropertyValue(name).trim();
    return value || fallback;
  }

  function load(url) {
    return fetch(url).then(function (response) {
      if (!response.ok) throw new Error(url + " answered " + response.status);
      return response.json();
    });
  }

  function onThemeChange(callback) {
    var media = window.matchMedia("(prefers-color-scheme: dark)");
    if (media.addEventListener) media.addEventListener("change", callback);
    new MutationObserver(callback).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme", "data-resolved-theme", "data-storage-free-theme", "class"],
    });
  }

  function dayWords(iso) {
    if (!iso) return "";
    var date = new Date(iso.length <= 10 ? iso + "T12:00:00Z" : iso);
    return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
  }

  function timeWords(iso) {
    return new Date(iso).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZoneName: "short" });
  }

  function listed(names) {
    if (names.length <= 1) return names.join("");
    if (names.length === 2) return names[0] + " and " + names[1];
    return names.slice(0, -1).join(", ") + ", and " + names[names.length - 1];
  }

  function failed(root, error) {
    root.replaceChildren(h("p", { class: "rm-error", text: "This figure could not load its data (" + error.message + "). Reload the page to try again." }));
  }

  /* ------------------------------------------------------------------ */
  /* Today's plate                                                       */
  /* ------------------------------------------------------------------ */

  function rampClass(age) {
    for (var i = RAMP_DAYS.length - 1; i >= 0; i--) if (age >= RAMP_DAYS[i]) return i;
    return 0;
  }

  function plateBounds(xs, ys, regions) {
    var minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    regions.forEach(function (r) {
      minX = Math.min(minX, r.x - r.r); maxX = Math.max(maxX, r.x + r.r);
      minY = Math.min(minY, r.y - r.r); maxY = Math.max(maxY, r.y + r.r);
    });
    for (var i = 0; i < xs.length; i++) {
      if (xs[i] < minX) minX = xs[i]; if (xs[i] > maxX) maxX = xs[i];
      if (ys[i] < minY) minY = ys[i]; if (ys[i] > maxY) maxY = ys[i];
    }
    var size = Math.max(maxX - minX, maxY - minY, 1e-3) * 1.06;
    return { minX: (minX + maxX) / 2 - size / 2, minY: (minY + maxY) / 2 - size / 2, size: size };
  }

  function gridCell(px, py, b) {
    var col = Math.min(GRID - 1, Math.max(0, Math.floor(((px - b.minX) / b.size) * GRID)));
    var row = Math.min(GRID - 1, Math.max(0, Math.floor(((b.minY + b.size - py) / b.size) * GRID)));
    return LETTERS[col] + (row + 1);
  }

  function boxBlur(src, n, radius) {
    var tmp = new Float32Array(n * n), out = new Float32Array(n * n), width = radius * 2 + 1;
    var row, col, r, c, sum;
    for (row = 0; row < n; row++) {
      sum = 0;
      for (c = -radius; c <= radius; c++) sum += src[row * n + Math.min(n - 1, Math.max(0, c))];
      for (col = 0; col < n; col++) {
        tmp[row * n + col] = sum / width;
        sum += src[row * n + Math.min(n - 1, col + radius + 1)] - src[row * n + Math.max(0, col - radius)];
      }
    }
    for (col = 0; col < n; col++) {
      sum = 0;
      for (r = -radius; r <= radius; r++) sum += tmp[Math.min(n - 1, Math.max(0, r)) * n + col];
      for (row = 0; row < n; row++) {
        out[row * n + col] = sum / width;
        sum += tmp[Math.min(n - 1, row + radius + 1) * n + col] - tmp[Math.max(0, row - radius) * n + col];
      }
    }
    return out;
  }

  function density(xs, ys, b, n, radius, only) {
    var counts = new Float32Array(n * n);
    function add(i) {
      var col = Math.floor(((xs[i] - b.minX) / b.size) * n);
      var row = Math.floor(((b.minY + b.size - ys[i]) / b.size) * n);
      if (col >= 0 && col < n && row >= 0 && row < n) counts[row * n + col] += 1;
    }
    if (only) only.forEach(add);
    else for (var i = 0; i < xs.length; i++) add(i);
    var values = counts;
    for (var pass = 0; pass < 3; pass++) values = boxBlur(values, n, radius);
    var max = 0;
    for (var k = 0; k < values.length; k++) if (values[k] > max) max = values[k];
    return { n: n, values: values, max: max };
  }

  // Where a watch's density crosses a fifth of its peak, by marching squares.
  function contour(field, level, b) {
    var n = field.n, values = field.values, step = b.size / n, out = [];
    function px(c) { return b.minX + (c + 0.5) * step; }
    function py(r) { return b.minY + b.size - (r + 0.5) * step; }
    function v(r, c) { return values[r * n + c]; }
    function lerp(a, z) { return a === z ? 0.5 : (level - a) / (z - a); }
    for (var r = 0; r < n - 1; r++) {
      for (var c = 0; c < n - 1; c++) {
        var tl = v(r, c), tr = v(r, c + 1), br = v(r + 1, c + 1), bl = v(r + 1, c);
        var index = (tl >= level ? 8 : 0) | (tr >= level ? 4 : 0) | (br >= level ? 2 : 0) | (bl >= level ? 1 : 0);
        if (index === 0 || index === 15) continue;
        var top = [px(c) + lerp(tl, tr) * step, py(r)];
        var right = [px(c + 1), py(r) - lerp(tr, br) * step];
        var bottom = [px(c) + lerp(bl, br) * step, py(r + 1)];
        var left = [px(c), py(r) - lerp(tl, bl) * step];
        var high = (tl + tr + br + bl) / 4 >= level;
        var segs = {
          1: [[left, bottom]], 14: [[left, bottom]], 2: [[bottom, right]], 13: [[bottom, right]],
          3: [[left, right]], 12: [[left, right]], 4: [[top, right]], 11: [[top, right]],
          6: [[top, bottom]], 9: [[top, bottom]], 7: [[left, top]], 8: [[left, top]],
          5: high ? [[left, top], [bottom, right]] : [[left, bottom], [top, right]],
          10: high ? [[top, right], [left, bottom]] : [[left, top], [bottom, right]],
        }[index] || [];
        segs.forEach(function (s) { out.push([s[0][0], s[0][1], s[1][0], s[1][1]]); });
      }
    }
    return out;
  }

  function shadingImage(field, ink) {
    var canvas = document.createElement("canvas");
    canvas.width = field.n; canvas.height = field.n;
    var ctx = canvas.getContext("2d");
    if (!ctx || field.max <= 0) return canvas;
    ctx.fillStyle = ink; ctx.fillRect(0, 0, 1, 1);
    var rgb = ctx.getImageData(0, 0, 1, 1).data;
    var image = ctx.createImageData(field.n, field.n);
    for (var i = 0; i < field.values.length; i++) {
      var t = Math.min(1, field.values[i] / field.max);
      image.data[i * 4] = rgb[0]; image.data[i * 4 + 1] = rgb[1]; image.data[i * 4 + 2] = rgb[2];
      image.data[i * 4 + 3] = Math.round(255 * 0.085 * Math.pow(t, 0.55));
    }
    ctx.putImageData(image, 0, 0);
    return canvas;
  }

  function plate(root, data) {
    var ids = data.points.id, xs = data.points.x, ys = data.points.y, total = ids.length;
    var indexOf = new Map(ids.map(function (id, i) { return [id, i]; }));
    var ramp = new Uint8Array(total);
    for (var i = 0; i < total; i++) ramp[i] = rampClass(Math.max(0, data.now_day - data.points.day[i]));
    var bounds = plateBounds(xs, ys, data.regions);
    var fresh = new Map(data.new.map(function (p) { return [p.id, p]; }));
    var arrivals = data.new.slice().sort(function (a, z) { return a.n - z.n; });
    var field = density(xs, ys, bounds, 96, 3);
    // How much of the plate holds papers, which caps each dot at the room it has (as the app does).
    var occupied = (function () {
      var n = 96, seen = new Uint8Array(n * n), cells = 0;
      for (var k = 0; k < total; k++) {
        var col = Math.floor(((xs[k] - bounds.minX) / bounds.size) * n), row = Math.floor(((bounds.minY + bounds.size - ys[k]) / bounds.size) * n);
        if (col >= 0 && col < n && row >= 0 && row < n && !seen[row * n + col]) { seen[row * n + col] = 1; cells++; }
      }
      return cells * Math.pow(bounds.size / n, 2);
    })();
    var outlines = data.watches.filter(function (w) { return w.members && w.members.length; }).map(function (w) {
      var only = w.members.map(function (id) { return indexOf.get(id); }).filter(function (k) { return k !== undefined; });
      var f = density(xs, ys, bounds, 96, 2, only);
      return f.max > 0 ? contour(f, f.max * 0.2, bounds) : [];
    });
    var order = Array.from({ length: total }, function (_, k) { return k; })
      .sort(function (a, z) { return ramp[z] - ramp[a]; });
    var words = new Map();
    function paper(id) { return data.papers[String(id)] || ["(untitled)", "", "", "", ""]; }
    function haystack(id) {
      if (!words.has(id)) { var p = paper(id); words.set(id, (p[0] + " " + p[1]).toLowerCase()); }
      return words.get(id);
    }

    // The frame.
    var find = h("input", { id: "rm-plate-find", type: "search", autocomplete: "off", spellcheck: "false", placeholder: "Try diffusion, or Nguyen" });
    var shown = h("span", { class: "rm-plate__shown", "aria-live": "polite" });
    var canvas = h("canvas", { class: "rm-plate__canvas", role: "img", "aria-label": "The plate: " + count.format(total) + " papers drawn as points, with the " + data.new.length + " new ones ringed and numbered. The list of new papers beside it holds the same papers." });
    var tip = h("div", { class: "rm-plate__tip", hidden: true });
    var zoomIn = h("button", { type: "button", class: "rm-plate__zoom", "aria-label": "Zoom in", text: "+" });
    var zoomOut = h("button", { type: "button", class: "rm-plate__zoom", "aria-label": "Zoom out", text: "−" });
    var zoomFit = h("button", { type: "button", class: "rm-plate__zoom", "aria-label": "Show the whole collection", text: "⤢" });
    var stage = h("div", { class: "rm-plate__stage" }, [canvas, h("div", { class: "rm-plate__zooms" }, [zoomIn, zoomOut, zoomFit]), tip]);
    var heading = h("p", { class: "rm-plate__heading" }, [
      h("strong", { text: data.new.length + " new papers" }),
      " since the collection was last marked read, on a plate of all " + count.format(data.fitted_count) + ", placed by how much wording they share, worked out on this computer." +
        (data.unplaced && data.unplaced.no_text ? " " + data.unplaced.no_text + " paper with too little text to place is not on it." : ""),
    ]);
    var list = h("div", { class: "rm-plate__list" });
    var key = h("div", { class: "rm-plate__key", "aria-hidden": "true" });
    root.replaceChildren(
      heading,
      h("div", { class: "rm-plate__bar" }, [h("label", { for: "rm-plate-find", text: "Find a title or author" }), find, shown]),
      h("div", { class: "rm-plate__body" }, [stage, list]),
      key
    );

    // The key, drawn with the plate's own marks.
    RAMP_DAYS.forEach(function (days, cls) {
      key.appendChild(h("span", { class: "rm-plate__keyitem", html: '<svg width="10" height="10" viewBox="0 0 8 8"><circle cx="4" cy="4" r="' + (RAMP_RADIUS[cls] * 1.2) + '" fill="currentColor" opacity="' + RAMP_ALPHA[cls] + '"/></svg>' + days }));
    });
    key.appendChild(h("span", { class: "rm-plate__keynote", text: "days since collected" }));
    key.appendChild(h("span", { class: "rm-plate__keyitem rm-plate__keyitem--new", html: '<svg width="12" height="12" viewBox="0 0 12 12"><circle cx="6" cy="6" r="4.2" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>new since last marked read' }));
    key.appendChild(h("span", { class: "rm-plate__keyitem", html: '<svg width="18" height="10" viewBox="0 0 18 10"><path d="M1 5h16" stroke="currentColor" stroke-dasharray="3 3.5"/></svg>a watch’s papers' }));
    key.appendChild(h("span", { class: "rm-plate__keyitem", html: '<svg width="12" height="10" viewBox="0 0 12 10"><rect x="1" y="1" width="10" height="8" fill="currentColor" opacity="0.18"/></svg>more papers nearby' }));

    // The list of new papers, by watch, numbered as they arrived.
    var groups = new Map();
    arrivals.forEach(function (p) { if (!groups.has(p.watch)) groups.set(p.watch, []); groups.get(p.watch).push(p); });
    var watchOrder = data.watches.slice().sort(function (a, z) { return z.new - a.new; });
    var items = [];
    var showAll = h("button", { type: "button", class: "rm-plate__more", text: "Show all " + data.new.length });
    list.appendChild(h("p", { class: "rm-plate__listhead", text: "New since last marked read" }));
    watchOrder.forEach(function (w) {
      var group = groups.get(w.name) || [];
      if (!group.length) {
        list.appendChild(h("p", { class: "rm-plate__quiet" }, [h("span", { class: "rm-plate__watch", text: w.name }), " Nothing new. Its last run found " + w.found + (w.found === 1 ? " paper" : " papers") + " it already had; " + w.answered + " of " + w.asked + " sources answered."]));
        return;
      }
      list.appendChild(h("p", { class: "rm-plate__group" }, [h("span", { class: "rm-plate__watch", text: w.name }), " " + w.new + " new"]));
      var ol = h("ol", { class: "rm-plate__items" });
      group.forEach(function (p) {
        var at = indexOf.get(p.id), info = paper(p.id);
        var item = h("li", { class: "rm-plate__item" }, [h("button", {
          type: "button", "data-id": p.id,
          onclick: function () { select(at, true); },
          onmouseenter: function () { hover = at; draw(); },
          onmouseleave: function () { hover = -1; draw(); },
          onfocus: function () { hover = at; draw(); },
          onblur: function () { hover = -1; draw(); },
        }, [
          h("span", { class: "rm-plate__num", text: String(p.n) }),
          h("span", { class: "rm-plate__title", text: info[0] }),
          h("span", { class: "rm-plate__meta", text: [info[1], info[2], at === undefined ? "" : gridCell(xs[at], ys[at], bounds)].filter(Boolean).join(" · ") }),
        ])]);
        items.push(item);
        ol.appendChild(item);
      });
      list.appendChild(ol);
    });
    list.appendChild(showAll);
    showAll.addEventListener("click", function () { list.classList.add("is-open"); showAll.hidden = true; });

    // The view: plate units to pixels.
    var view = { cx: bounds.minX + bounds.size / 2, cy: bounds.minY + bounds.size / 2, scale: 1, fit: 1 };
    var size = { w: 0, h: 0, margin: 18 };
    var hover = -1, picked = -1, matches = null, matchList = [], matchAt = -1, palette = null, shade = null;

    function readPalette() {
      palette = {
        bg: token(root, "--rm-plate", "#fff"), ink: token(root, "--rm-plate-ink", "#111"),
        dim: token(root, "--rm-plate-dim", "#bbb"), grid: token(root, "--rm-plate-grid", "#eee"),
        label: token(root, "--rm-plate-label", "#555"), mark: token(root, "--rm-mark", "#e95c00"),
        bound: token(root, "--rm-plate-bound", "#888"),
      };
      shade = shadingImage(field, palette.ink);
    }

    function toScreen(px, py) {
      return [(px - view.cx) * view.scale + size.w / 2, size.h / 2 - (py - view.cy) * view.scale];
    }

    function resize() {
      var width = stage.clientWidth;
      if (!width) return;
      size.w = width; size.h = width;
      var ratio = window.devicePixelRatio || 1;
      canvas.width = Math.round(width * ratio); canvas.height = Math.round(width * ratio);
      canvas.style.width = width + "px"; canvas.style.height = width + "px";
      var fit = (width - size.margin * 2) / bounds.size;
      view.scale = view.scale === view.fit || view.fit === 1 ? fit : view.scale * (fit / view.fit);
      view.fit = fit;
      draw();
    }

    function draw() {
      if (!size.w || !palette) return;
      var ctx = canvas.getContext("2d"), ratio = canvas.width / size.w, p = palette, m = size.margin;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      ctx.fillStyle = p.bg; ctx.fillRect(0, 0, size.w, size.h);
      var zoom = view.scale / view.fit;

      // The grid over the plate bounds, with its letters and numbers in the margin.
      var tl = toScreen(bounds.minX, bounds.minY + bounds.size), cell = (bounds.size * view.scale) / GRID;
      ctx.save();
      ctx.beginPath(); ctx.rect(m, m, size.w - 2 * m, size.h - 2 * m); ctx.clip();
      ctx.strokeStyle = p.grid; ctx.lineWidth = 1; ctx.beginPath();
      for (var g = 0; g <= GRID; g++) {
        var gx = Math.round(tl[0] + g * cell) + 0.5, gy = Math.round(tl[1] + g * cell) + 0.5;
        ctx.moveTo(gx, tl[1]); ctx.lineTo(gx, tl[1] + GRID * cell);
        ctx.moveTo(tl[0], gy); ctx.lineTo(tl[0] + GRID * cell, gy);
      }
      ctx.stroke();
      if (shade) { ctx.imageSmoothingEnabled = true; ctx.drawImage(shade, tl[0], tl[1], bounds.size * view.scale, bounds.size * view.scale); }

      // Watches: dashed outlines.
      ctx.setLineDash([3, 3.5]); ctx.strokeStyle = p.bound; ctx.lineWidth = 1; ctx.beginPath();
      outlines.forEach(function (segs) {
        segs.forEach(function (s) { var a = toScreen(s[0], s[1]), z = toScreen(s[2], s[3]); ctx.moveTo(a[0], a[1]); ctx.lineTo(z[0], z[1]); });
      });
      ctx.stroke(); ctx.setLineDash([]);

      // Every paper, oldest first so the newest sit on top.
      var boost = Math.min(2.2, Math.max(1, Math.pow(zoom, 0.32)));
      var spacing = Math.sqrt((occupied * view.scale * view.scale) / Math.max(1, total));
      var cap = Math.max(0.55, spacing * 0.42), crowding = Math.min(1, 0.35 + spacing / 6);
      for (var k = 0; k < total; k++) {
        var at = order[k], s = toScreen(xs[at], ys[at]);
        if (s[0] < m - 4 || s[0] > size.w - m + 4 || s[1] < m - 4 || s[1] > size.h - m + 4) continue;
        var dim = matches && !matches.has(at), cls = ramp[at];
        var base = (RAMP_RADIUS[cls] || 1) * boost;
        var r = dim ? Math.min(Math.max(base * 0.8, 1), cap) : Math.min(base, cap);
        ctx.globalAlpha = dim ? 1 : RAMP_ALPHA[cls] * crowding;
        ctx.fillStyle = dim ? p.dim : matches ? p.mark : p.ink;
        ctx.beginPath(); ctx.arc(s[0], s[1], Math.max(r, 0.8), 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;

      // Region names, largest first, skipping any that would collide.
      ctx.font = "500 11px " + token(root, "--rm-font-ui", "system-ui, sans-serif");
      ctx.textAlign = "center"; ctx.textBaseline = "middle";
      var placed = [];
      data.regions.slice().sort(function (a, z) { return z.size - a.size; }).forEach(function (region) {
        var s = toScreen(region.x, region.y), wdt = ctx.measureText(region.label).width + 14;
        var box = [s[0] - wdt / 2, s[1] - 9, s[0] + wdt / 2, s[1] + 9];
        if (box[0] < m || box[2] > size.w - m || box[1] < m || box[3] > size.h - m) return;
        if (placed.some(function (o) { return box[0] < o[2] && box[2] > o[0] && box[1] < o[3] && box[3] > o[1]; })) return;
        placed.push(box);
        ctx.lineWidth = 3; ctx.strokeStyle = p.bg; ctx.strokeText(region.label, s[0], s[1]);
        ctx.fillStyle = p.label; ctx.fillText(region.label, s[0], s[1]);
      });

      // The new papers: ringed, and numbered in the order they arrived.
      ctx.font = "600 11px " + token(root, "--rm-font-ui", "system-ui, sans-serif");
      ctx.textAlign = "left"; ctx.textBaseline = "alphabetic";
      arrivals.forEach(function (paperNew) {
        var at = indexOf.get(paperNew.id);
        if (at === undefined) return;
        var s = toScreen(xs[at], ys[at]);
        ctx.strokeStyle = p.mark; ctx.lineWidth = 1.4;
        ctx.beginPath(); ctx.arc(s[0], s[1], 4.6, 0, Math.PI * 2); ctx.stroke();
        ctx.lineWidth = 3; ctx.strokeStyle = p.bg; ctx.strokeText(String(paperNew.n), s[0] + 5.5, s[1] - 5.5);
        ctx.fillStyle = p.mark; ctx.fillText(String(paperNew.n), s[0] + 5.5, s[1] - 5.5);
      });

      // What is pointed at, or chosen.
      [hover, picked].forEach(function (at, which) {
        if (at < 0) return;
        var s = toScreen(xs[at], ys[at]);
        ctx.strokeStyle = p.ink; ctx.lineWidth = which ? 2 : 1.5;
        ctx.beginPath(); ctx.arc(s[0], s[1], which ? 8 : 7, 0, Math.PI * 2); ctx.stroke();
      });
      ctx.restore();

      // Letters and numbers, where the grid's cells are on screen.
      ctx.fillStyle = p.label; ctx.font = "500 10px " + token(root, "--rm-font-ui", "system-ui, sans-serif");
      ctx.textAlign = "center"; ctx.textBaseline = "middle";
      for (var c = 0; c < GRID; c++) {
        var cx = tl[0] + (c + 0.5) * cell, cy = tl[1] + (c + 0.5) * cell;
        if (cx > m && cx < size.w - m) { ctx.fillText(LETTERS[c], cx, m / 2); ctx.fillText(LETTERS[c], cx, size.h - m / 2); }
        if (cy > m && cy < size.h - m) { ctx.fillText(String(c + 1), m / 2, cy); ctx.fillText(String(c + 1), size.w - m / 2, cy); }
      }
      canvas.style.touchAction = zoom > 1.01 ? "none" : "pan-y";
      placeTip();
    }

    function nearest(sx, sy, reach) {
      var best = -1, bestD = reach * reach;
      for (var k = 0; k < total; k++) {
        var s = toScreen(xs[k], ys[k]), dx = s[0] - sx, dy = s[1] - sy, d = dx * dx + dy * dy;
        if (d < bestD) { bestD = d; best = k; }
      }
      return best;
    }

    function placeTip() {
      var at = picked >= 0 ? picked : hover;
      if (at < 0) { tip.hidden = true; return; }
      var id = ids[at], info = paper(id), isNew = fresh.get(id);
      tip.replaceChildren(
        h("strong", { text: info[0] }),
        h("span", { text: info[1] }),
        h("span", { text: [info[2], info[3] ? "published " + dayWords(info[3]) : "", "cell " + gridCell(xs[at], ys[at], bounds)].filter(Boolean).join(" · ") }),
        h("span", { class: isNew ? "rm-plate__tipnew" : "", text: isNew ? "New: number " + isNew.n + ", from " + (isNew.watch === "A search" ? "a search" : "the " + isNew.watch + " watch") : "Collected " + dayWords(info[4]) })
      );
      tip.hidden = false;
      var s = toScreen(xs[at], ys[at]), tw = tip.offsetWidth, th = tip.offsetHeight;
      var left = Math.min(Math.max(8, s[0] + 14), size.w - tw - 8);
      var top = s[1] + 14 + th > size.h - 8 ? s[1] - th - 14 : s[1] + 14;
      tip.style.left = left + "px"; tip.style.top = Math.max(8, top) + "px";
    }

    function select(at, center) {
      if (at === undefined || at < 0) { picked = -1; draw(); return; }
      picked = at;
      if (center) {
        if (view.scale < view.fit * 2.4) view.scale = view.fit * 2.4;
        view.cx = xs[at]; view.cy = ys[at];
      }
      draw();
    }

    function zoomBy(factor, sx, sy) {
      var next = Math.min(view.fit * 12, Math.max(view.fit, view.scale * factor));
      if (sx !== undefined) {
        var px = (sx - size.w / 2) / view.scale + view.cx, py = (size.h / 2 - sy) / view.scale + view.cy;
        view.cx = px - (sx - size.w / 2) / next; view.cy = py - (size.h / 2 - sy) / next;
      }
      view.scale = next;
      if (next === view.fit) { view.cx = bounds.minX + bounds.size / 2; view.cy = bounds.minY + bounds.size / 2; }
      draw();
    }

    zoomIn.addEventListener("click", function () { zoomBy(1.7); });
    zoomOut.addEventListener("click", function () { zoomBy(1 / 1.7); });
    zoomFit.addEventListener("click", function () { zoomBy(0); });

    var drag = null;
    canvas.addEventListener("pointerdown", function (e) {
      drag = { x: e.clientX, y: e.clientY, cx: view.cx, cy: view.cy, moved: false, type: e.pointerType };
      if (e.pointerType === "mouse" || view.scale > view.fit * 1.01) canvas.setPointerCapture(e.pointerId);
    });
    canvas.addEventListener("pointermove", function (e) {
      var rect = canvas.getBoundingClientRect(), sx = e.clientX - rect.left, sy = e.clientY - rect.top;
      if (drag && (drag.type === "mouse" || view.scale > view.fit * 1.01)) {
        var dx = e.clientX - drag.x, dy = e.clientY - drag.y;
        if (Math.abs(dx) + Math.abs(dy) > 4) drag.moved = true;
        if (drag.moved && view.scale > view.fit * 1.01) {
          view.cx = drag.cx - dx / view.scale; view.cy = drag.cy + dy / view.scale; draw(); return;
        }
      }
      if (e.pointerType === "mouse") {
        var at = nearest(sx, sy, 10);
        if (at !== hover) { hover = at; draw(); }
        canvas.style.cursor = at >= 0 ? "pointer" : view.scale > view.fit * 1.01 ? "grab" : "default";
      }
    });
    canvas.addEventListener("pointerup", function (e) {
      var rect = canvas.getBoundingClientRect();
      if (drag && !drag.moved) select(nearest(e.clientX - rect.left, e.clientY - rect.top, e.pointerType === "mouse" ? 10 : 18), false);
      drag = null;
    });
    canvas.addEventListener("pointerleave", function () { if (hover >= 0) { hover = -1; draw(); } });
    canvas.addEventListener("dblclick", function (e) {
      var rect = canvas.getBoundingClientRect();
      zoomBy(1.7, e.clientX - rect.left, e.clientY - rect.top);
    });

    function runFind() {
      var q = find.value.trim().toLowerCase();
      if (q.length < 2) {
        matches = null; matchList = []; matchAt = -1;
        shown.textContent = "All " + count.format(total) + " papers shown";
      } else {
        var terms = q.split(/\s+/);
        matchList = [];
        for (var k = 0; k < total; k++) {
          var text = haystack(ids[k]);
          if (terms.every(function (t) { return text.indexOf(t) >= 0; })) matchList.push(k);
        }
        matchList.sort(function (a, z) { return (paper(ids[z])[3] || "").localeCompare(paper(ids[a])[3] || ""); });
        matches = new Set(matchList); matchAt = -1;
        shown.textContent = matchList.length ? count.format(matchList.length) + " of " + count.format(total) + " match. Enter steps through them." : "No title or author contains that.";
      }
      draw();
    }
    find.addEventListener("input", runFind);
    find.addEventListener("keydown", function (e) {
      if (e.key !== "Enter" || !matchList.length) return;
      e.preventDefault();
      matchAt = (matchAt + (e.shiftKey ? -1 : 1) + matchList.length) % matchList.length;
      select(matchList[matchAt], true);
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && picked >= 0) select(-1); });

    readPalette();
    runFind();
    if (window.ResizeObserver) new ResizeObserver(resize).observe(stage);
    else window.addEventListener("resize", resize);
    resize();
    onThemeChange(function () { readPalette(); draw(); });
  }

  /* ------------------------------------------------------------------ */
  /* The Source wall                                                     */
  /* ------------------------------------------------------------------ */

  var MARK = {
    answered: "point", answered_empty: "ring", answered_in_part: "half", failed: "struck",
    could_not_be_asked: "dotted", not_recorded: "dot", not_selected: "dash",
  };

  function pointRadius(n, largest) {
    if (!n || n <= 0 || largest <= 0) return 2.5;
    return 2.5 + 3.5 * Math.sqrt(Math.min(n, largest) / largest);
  }

  function markSvg(state, n, largest) {
    var mark = MARK[state] || "unknown", body;
    switch (mark) {
      case "point": body = '<circle cx="8" cy="8" r="' + pointRadius(n, largest).toFixed(2) + '" fill="currentColor"/>'; break;
      case "ring": body = '<circle cx="8" cy="8" r="4" fill="none" stroke="currentColor" stroke-width="1.4"/>'; break;
      case "half": body = '<circle cx="8" cy="8" r="4.5" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M8 3.5a4.5 4.5 0 0 1 0 9z" fill="currentColor"/>'; break;
      case "struck": body = '<circle cx="8" cy="8" r="5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M4.5 11.5 11.5 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>'; break;
      case "dotted": body = '<circle cx="8" cy="8" r="4.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-dasharray="1.7 1.8" stroke-linecap="round"/>'; break;
      case "dot": body = '<circle cx="8" cy="8" r="1.5" fill="currentColor"/>'; break;
      case "dash": body = '<path d="M5 8h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>'; break;
      default: body = '<rect x="4.5" y="4.5" width="7" height="7" fill="none" stroke="currentColor" stroke-width="1.3"/>';
    }
    return '<svg class="rm-mark" data-mark="' + mark + '" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" focusable="false">' + body + "</svg>";
  }

  function runName(run) {
    if (run.label.indexOf("Watch") === 0) return "Watch";
    return run.label;
  }

  function wall(root, data) {
    var largest = 0;
    data.sources.forEach(function (s) { s.cells.forEach(function (c) { if (c.count > largest) largest = c.count; }); });
    var detail = h("div", { class: "rm-wall__detail", "aria-live": "polite" });
    var buttons = [];

    function describeRun(run) {
      var what = run.label.indexOf("Watch") === 0 ? "The " + run.label.replace(/^Watch\s*—\s*/, "") + " watch’s run" : "A " + run.label;
      return what + " for “" + run.query.replace(/^"|"$/g, "") + ",” at " + timeWords(run.started);
    }

    function show(si, ri) {
      buttons.forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.si === String(si) && b.dataset.ri === String(ri))); });
      var source = data.sources[si], cell = source.cells[ri], run = data.runs[ri];
      detail.replaceChildren(
        h("p", { class: "rm-wall__where" }, [h("span", { class: "rm-wall__detailmark rm-state--" + cell.state, html: markSvg(cell.state, cell.count, largest) }), h("span", { text: source.name + " · " + describeRun(run) })]),
        h("p", { class: "rm-wall__label" }, [h("strong", { text: cell.label.charAt(0).toUpperCase() + cell.label.slice(1) + (cell.state === "answered" && cell.count ? ", with " + count.format(cell.count) + " records." : ".") })]),
        h("p", { class: "rm-wall__note", text: cell.note })
      );
    }

    var head = h("tr", null, [h("th", { scope: "col", class: "rm-wall__corner", text: "Source" })].concat(data.runs.map(function (run) {
      return h("th", { scope: "col", title: describeRun(run) }, [
        h("span", { class: "rm-wall__run", text: runName(run) }),
        h("span", { class: "rm-wall__run rm-wall__run--short", "aria-hidden": "true", text: runName(run).replace(/^Deep /, "") }),
        h("span", { class: "rm-wall__time" }, [
          timeWords(run.started).replace(/\s?[AP]M\s[A-Z]{2,5}$/, ""),
          h("span", { class: "rm-wall__ampm", text: " " + (/([AP]M)/.exec(timeWords(run.started)) || ["", ""])[1] }),
        ]),
      ]);
    })));
    var body = h("tbody");
    data.sources.forEach(function (source, si) {
      var row = h("tr", null, [h("th", { scope: "row", text: source.name })]);
      source.cells.forEach(function (cell, ri) {
        var b = h("button", {
          type: "button", class: "rm-cell rm-state--" + cell.state, "data-si": si, "data-ri": ri, "aria-pressed": "false",
          "aria-label": source.name + ", " + describeRun(data.runs[ri]) + ": " + cell.label,
          html: markSvg(cell.state, cell.count, largest),
          onclick: function () { show(si, ri); },
        });
        buttons.push(b);
        row.appendChild(h("td", null, [b]));
      });
      body.appendChild(row);
    });

    var legend = h("ul", { class: "rm-wall__legend" }, data.legend.map(function (item) {
      return h("li", null, [h("span", { class: "rm-wall__legendmark rm-state--" + item.state, html: markSvg(item.state, largest / 2, largest) }), h("span", null, [h("strong", { text: item.label }), " " + item.meaning])]);
    }));

    root.replaceChildren(
      h("p", { class: "rm-wall__verdict" }, [h("span", { class: "rm-wall__flag", text: data.verdict.level === "attention" ? "Needs attention" : "Fine" }), " " + data.verdict.headline]),
      h("div", { class: "rm-wall__layout" }, [
        h("div", { class: "rm-wall__scroll", tabindex: "0", role: "region", "aria-label": "Source wall: each row a source, each column a run" }, [h("table", { class: "rm-wall__table" }, [h("thead", null, [head]), body])]),
        detail,
      ]),
      h("details", { class: "rm-wall__key" }, [h("summary", { text: "What each mark means" }), legend])
    );

    // Open on the cell the wall is about: the first failure, else the first answer.
    var start = null;
    ["failed", "could_not_be_asked", "answered"].some(function (state) {
      data.sources.some(function (s, si) {
        var ri = s.cells.findIndex(function (c) { return c.state === state; });
        if (ri >= 0) { start = [si, ri]; return true; }
        return false;
      });
      return !!start;
    });
    if (start) show(start[0], start[1]);
  }

  /* ------------------------------------------------------------------ */
  /* Before you ask                                                      */
  /* ------------------------------------------------------------------ */

  function ratePerSecond(rate) {
    var m = /^\s*([\d.]+)\s*req\/s/.exec(rate);
    return m ? Number(m[1]) : null;
  }

  function rateShort(perSecond, stated) {
    if (perSecond === null || perSecond <= 0) return stated;
    if (perSecond >= 1) return Number(perSecond.toFixed(1)) + " a second";
    var every = 1 / perSecond;
    return every >= 59 ? "1 every " + Math.round(every / 60) + " min" : "1 every " + Math.round(every) + " s";
  }

  function rateLong(perSecond) {
    if (perSecond >= 1) return Number(perSecond.toFixed(1)) + " requests a second";
    var every = 1 / perSecond;
    if (every >= 59) return "one request every " + (Math.round(every / 60) === 1 ? "minute" : Math.round(every / 60) + " minutes");
    return "one request every " + Math.round(every) + " seconds";
  }

  var DATES = { day: "the day", month: "the month", year: "the year" };
  var KEYS = { required: "needs an API key", recommended: "a key is recommended", optional: "a key is optional" };

  function planner(root, data) {
    var preset = (root.getAttribute("data-preset") || "").split(",").filter(Boolean);
    var chosen = new Set(preset.length ? preset : ["arxiv", "openalex"]);
    var windowDays = Number(root.getAttribute("data-days") || 7);
    var sources = data.sources.slice().sort(function (a, z) { return a.name.localeCompare(z.name, "en", { sensitivity: "base" }); });
    var out = h("div", { class: "rm-plan__out", "aria-live": "polite" });
    var picks = h("div", { class: "rm-plan__picks" });

    sources.forEach(function (s) {
      var id = "rm-plan-" + s.slug;
      var box = h("input", { type: "checkbox", id: id, value: s.slug });
      box.checked = chosen.has(s.slug);
      box.addEventListener("change", function () { if (box.checked) chosen.add(s.slug); else chosen.delete(s.slug); render(); });
      picks.appendChild(h("label", { class: "rm-plan__pick", for: id }, [box, h("span", { class: "rm-plan__name", text: s.name }), KEYS[s.key] ? h("span", { class: "rm-plan__keyneed" + (s.key === "required" ? " is-required" : ""), text: KEYS[s.key] }) : null]));
    });

    var windows = [[7, "Last 7 days"], [30, "Last 30 days"], [365, "Last year"], [0, "Any time"]];
    var radios = h("div", { class: "rm-plan__windows", role: "radiogroup", "aria-label": "Published" }, windows.map(function (w) {
      var id = "rm-plan-window-" + w[0];
      var radio = h("input", { type: "radio", name: "rm-plan-window", id: id, value: String(w[0]) });
      radio.checked = w[0] === windowDays;
      radio.addEventListener("change", function () { windowDays = w[0]; render(); });
      return h("label", { class: "rm-plan__window", for: id }, [radio, w[1]]);
    }));

    var clear = h("button", { type: "button", class: "rm-plan__clear", text: "Clear the sources", onclick: function () {
      chosen.clear(); picks.querySelectorAll("input").forEach(function (b) { b.checked = false; }); render();
    } });

    function render() {
      var picked = sources.filter(function (s) { return chosen.has(s.slug); });
      var lines = [];
      if (!picked.length) {
        out.replaceChildren(h("p", { class: "rm-plan__ask is-off", text: "Choose a source" }), h("p", { class: "rm-plan__note", text: "Tick one source for a Deep Dive, or several for a Deep Sweep." }));
        return;
      }
      // The slowest of several sources sets the pace; one source sets none.
      var rated = picked.map(function (s) { return { s: s, rate: ratePerSecond(s.rate) }; })
        .filter(function (r) { return r.rate !== null && r.rate > 0; })
        .sort(function (a, z) { return a.rate - z.rate; });
      if (picked.length > 1 && rated[0]) lines.push(rated[0].s.name + " allows " + rateLong(rated[0].rate) + ", the slowest of these; it sets how long the sweep takes.");
      // The sources that date papers more coarsely than a window this short.
      if (windowDays > 0 && windowDays < 365) {
        var coarse = picked.filter(function (s) { return s.dates === "year" || (s.dates === "month" && windowDays < 31); });
        if (coarse.length) {
          var one = coarse.length === 1;
          lines.push(listed(coarse.map(function (s) { return s.name; })) + " " + (one ? "dates" : "date") + " papers only to the " +
            (one ? coarse[0].dates : "month or year") + "; a window this short may come back as one " + (one ? "it" : "they") + " could not answer.");
        }
      }
      var keyed = picked.filter(function (s) { return s.key === "required"; });
      if (keyed.length) lines.push("A source that requires an API key and has none here is recorded as not asked: " + listed(keyed.map(function (s) { return s.name; })) + ".");

      var table = h("table", { class: "rm-plan__table" }, [
        h("thead", null, [h("tr", null, ["Source", "How it combines your terms", "Dates papers to", "resmon’s pace"].map(function (t) { return h("th", { scope: "col", text: t }); }))]),
        h("tbody", null, picked.map(function (s) {
          return h("tr", null, [
            h("th", { scope: "row", text: s.name }),
            h("td", { "data-label": "Terms", text: s.terms }),
            h("td", { "data-label": "Dates", text: DATES[s.dates] || s.dates }),
            h("td", { "data-label": "Pace", text: rateShort(ratePerSecond(s.rate), s.rate) }),
          ]);
        })),
      ]);
      out.replaceChildren(
        h("p", { class: "rm-plan__ask", text: picked.length === 1 ? "Ask " + picked[0].name : "Ask " + picked.length + " sources" }),
        lines.length ? h("ul", { class: "rm-plan__notes" }, lines.map(function (l) { return h("li", { text: l }); })) : h("p", { class: "rm-plan__note", text: "Nothing about this search needs saying before you ask." }),
        h("div", { class: "rm-plan__scroll" }, [table])
      );
    }

    root.replaceChildren(
      h("div", { class: "rm-plan__form" }, [
        h("fieldset", { class: "rm-plan__set" }, [h("legend", { text: "Published" }), radios]),
        h("fieldset", { class: "rm-plan__set" }, [h("legend", { text: "Sources" }), picks, clear]),
      ]),
      out
    );
    render();
  }

  /* ------------------------------------------------------------------ */
  /* The tour's chapters                                                 */
  /* ------------------------------------------------------------------ */

  function chapters(root, data) {
    var video = document.getElementById(root.getAttribute("data-video"));
    if (!video) return;
    var list = h("ol", { class: "rm-chapters" });
    var buttons = data.chapters.map(function (c, k) {
      var mins = Math.floor(c.start / 60), secs = String(Math.floor(c.start % 60)).padStart(2, "0");
      var b = h("button", { type: "button", onclick: function () { video.currentTime = c.start; var p = video.play(); if (p && p.catch) p.catch(function () {}); } }, [
        h("span", { class: "rm-chapters__time", text: mins + ":" + secs }),
        h("span", { class: "rm-chapters__title", text: c.title }),
        h("span", { class: "rm-chapters__line", text: c.line }),
      ]);
      list.appendChild(h("li", null, [b]));
      return { b: b, start: c.start, end: data.chapters[k + 1] ? data.chapters[k + 1].start : Infinity };
    });
    video.addEventListener("timeupdate", function () {
      buttons.forEach(function (x) { x.b.setAttribute("aria-current", String(video.currentTime >= x.start && video.currentTime < x.end)); });
    });
    root.replaceChildren(list);
  }

  var FIGURES = { plate: plate, wall: wall, planner: planner, chapters: chapters };

  function mount() {
    document.querySelectorAll("[data-resmon-demo]").forEach(function (root) {
      var make = FIGURES[root.getAttribute("data-resmon-demo")];
      if (!make || root.dataset.mounted) return;
      root.dataset.mounted = "1";
      load(root.getAttribute("data-src")).then(function (data) { make(root, data); }, function (error) { failed(root, error); });
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount);
  else mount();
})();
