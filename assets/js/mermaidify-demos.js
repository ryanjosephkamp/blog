/*
 * The mermaidify article's three demos, built on mermaidify's own reader (mermaidify-reader.js, the
 * global MermaidifyReader):
 * - [data-demo="draw"]: a small drawing pad that reads what you draw, live, and writes Mermaid.
 * - [data-demo="xray"]: the example drawing, step by step, as the reader sees it.
 * - [data-demo="accuracy"]: how well it reads, on people's drawings and on generated ones.
 * Mermaid draws the diagrams; it loads the first time the drawing pad has one to draw.
 */
(() => {
  "use strict";
  const R = window.MermaidifyReader;
  const css = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const dark = () => {
    const theme = document.documentElement.dataset.resolvedTheme;
    return theme ? theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
  };
  const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
  const pathLength = (p) => p.reduce((s, q, i) => (i ? s + dist(p[i - 1], q) : 0), 0);
  const el = (tag, attrs = {}, ...kids) => {
    const e = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) k === "class" ? (e.className = v) : k.startsWith("on") ? e.addEventListener(k.slice(2), v) : e.setAttribute(k, v);
    for (const k of kids) e.append(k);
    return e;
  };

  /** A canvas that fills its box at the screen's pixel density, and how to draw a stroke on it smoothly. */
  function surface(canvas) {
    const ctx = canvas.getContext("2d");
    const fit = () => {
      const r = canvas.getBoundingClientRect(), k = Math.min(devicePixelRatio || 1, 3);
      canvas.width = Math.max(1, Math.round(r.width * k));
      canvas.height = Math.max(1, Math.round(r.height * k));
      ctx.setTransform(k, 0, 0, k, 0, 0);
      return { w: r.width, h: r.height };
    };
    const trace = (p) => {
      ctx.beginPath();
      ctx.moveTo(p[0][0], p[0][1]);
      if (p.length === 1) ctx.lineTo(p[0][0] + 0.01, p[0][1]);
      for (let i = 1; i < p.length - 1; i++) ctx.quadraticCurveTo(p[i][0], p[i][1], (p[i][0] + p[i + 1][0]) / 2, (p[i][1] + p[i + 1][1]) / 2);
      if (p.length > 1) ctx.lineTo(p[p.length - 1][0], p[p.length - 1][1]);
    };
    return { ctx, fit, trace };
  }

  /** Mermaid, the same version the app uses, pinned, and loaded once, when it is first needed. */
  const MERMAID = "https://cdn.jsdelivr.net/npm/mermaid@12.2.0/dist/mermaid.min.js";
  const MERMAID_SRI = "sha384-8xUhuLNMjW/cI2Dacg3DR4WliYznvIg0LVG1stctThKD/YVrJFI9TNCFxft5NYgp";
  let loading = null;
  function loadMermaid() {
    loading ??= new Promise((done) => {
      const s = el("script", { src: MERMAID, integrity: MERMAID_SRI, crossorigin: "anonymous" });
      s.onload = () => done(window.mermaid || null);
      s.onerror = () => done(null);
      document.head.append(s);
    });
    return loading;
  }

  /** Mermaid, set up for the page's light or dark look, drawing one diagram at a time into a box. */
  let renders = 0;
  async function drawMermaid(box, code) {
    const mine = ++renders;
    if (!(await loadMermaid())) {
      box.textContent = "Mermaid didn’t load, so here is the code alone.";
      return;
    }
    if (mine !== renders) return;
    window.mermaid.initialize({ startOnLoad: false, securityLevel: "strict", theme: dark() ? "dark" : "neutral", fontFamily: css("--font-body") });
    try {
      const { svg } = await window.mermaid.render("mfy-mmd-" + mine, code);
      if (mine === renders) box.innerHTML = svg;
    } catch {
      document.getElementById("mfy-mmd-" + mine)?.remove();
      document.getElementById("dmfy-mmd-" + mine)?.remove();
    }
  }

  /** The dashed outlines, letters, glowing arrows, and amber left-out marks the app paints over a reading. */
  function paintReading(ctx, trace, strokes, m) {
    ctx.save();
    ctx.lineCap = ctx.lineJoin = "round";
    ctx.lineWidth = 9;
    ctx.globalAlpha = 0.35;
    ctx.strokeStyle = css("--mfy-accent");
    for (const e of m.edges) for (const i of e.strokes) strokes[i] && (trace(strokes[i]), ctx.stroke());
    ctx.strokeStyle = css("--mfy-warn");
    for (const i of m.unused) strokes[i] && (trace(strokes[i]), ctx.stroke());
    ctx.globalAlpha = 1;
    ctx.lineWidth = 1.5;
    ctx.setLineDash([5, 5]);
    ctx.strokeStyle = css("--mfy-accent");
    for (const s of [...m.groups, ...m.nodes]) {
      ctx.beginPath();
      s.poly.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
      ctx.closePath();
      ctx.stroke();
    }
    ctx.setLineDash([]);
    ctx.font = `600 11px ${css("--font-mono")}`;
    ctx.textBaseline = "middle";
    for (const s of [...m.groups, ...m.nodes]) {
      if (s.role === "dot") continue;
      const w = ctx.measureText(s.id).width + 10, x = s.bb.x0 - 4, y = s.bb.y0 - 9;
      ctx.fillStyle = css("--mfy-accent");
      ctx.beginPath();
      ctx.roundRect(x, y, w, 18, 5);
      ctx.fill();
      ctx.fillStyle = css("--mfy-on-accent");
      ctx.fillText(s.id, x + 5, y + 9.5);
    }
    ctx.restore();
  }

  const WORDS = { rect: "box", stadium: "oval", circle: "circle", diamond: "diamond", hexagon: "hexagon", trapezoid: "trapezoid", "inv-trapezoid": "trapezoid", "lean-right": "parallelogram", "lean-left": "parallelogram", triangle: "triangle", "flip-triangle": "triangle", double: "double circle", subroutine: "box in a box", dot: "filled dot", bullseye: "ring around a dot" };
  const MANY = { box: "boxes", "box in a box": "boxes in boxes", "ring around a dot": "rings around dots" };
  const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;
  function readLine(m) {
    if (m.diagram === "state") {
      const states = m.nodes.filter((n) => n.role === "state").length, dots = m.nodes.filter((n) => n.role === "dot").length;
      return `Read ${plural(states, "state", "states")}, ${plural(dots, "start or end", "starts and ends")}, and ${plural(m.edges.length, "transition", "transitions")}` + (m.unused.length ? `; ${plural(m.unused.length, "mark", "marks")} left out, in amber.` : ".");
    }
    const kinds = {};
    for (const n of m.nodes) kinds[WORDS[n.kind] || n.kind] = (kinds[WORDS[n.kind] || n.kind] || 0) + 1;
    const shapes = Object.entries(kinds).map(([k, n]) => plural(n, k, MANY[k] || k + "s")).join(", ");
    return `Read ${plural(m.nodes.length, "shape", "shapes")}${shapes ? ` (${shapes})` : ""} and ${plural(m.edges.length, "arrow", "arrows")}` + (m.unused.length ? `; ${plural(m.unused.length, "mark", "marks")} left out, in amber.` : ".");
  }

  // ─── 1. Draw it yourself ────────────────────────────────────────────────────
  function drawDemo(root) {
    const canvas = el("canvas", { class: "mfy-pad", role: "img", "aria-label": "Drawing pad. Draw boxes, ovals, diamonds, and circles, and lines with heads between them." });
    const read = el("p", { class: "mfy-read", "aria-live": "polite" }, "Draw a box, another box, and an arrow between them.");
    const out = el("div", { class: "mfy-diagram" });
    const code = el("pre", { class: "mfy-code" });
    const kind = el("select", { "aria-label": "Read as" }, el("option", { value: "flowchart" }, "Flowchart"), el("option", { value: "state" }, "State diagram"));
    const bar = el(
      "div",
      { class: "mfy-bar" },
      el("button", { type: "button", onclick: () => load() }, "Load the example"),
      el("button", { type: "button", onclick: () => (strokes.pop(), update()) }, "Undo"),
      el("button", { type: "button", onclick: () => ((strokes = []), update()) }, "Clear"),
      el("label", { class: "mfy-kind" }, "Read as ", kind),
    );
    root.append(bar, canvas, read, el("div", { class: "mfy-out" }, out, code));
    const { ctx, fit, trace } = surface(canvas);
    // Each stroke is its points and its ink; the reader reads the ink too, so colors come through into Mermaid.
    let strokes = [], cur = null, pointer = null, anchor = 0, holdTimer = 0, still = null, frozen = false, size = { w: 0, h: 0 }, m = null;

    function paint() {
      ctx.clearRect(0, 0, size.w, size.h);
      ctx.fillStyle = css("--mfy-dots");
      for (let x = 12; x < size.w; x += 24) for (let y = 12; y < size.h; y += 24) ctx.fillRect(x - 0.8, y - 0.8, 1.6, 1.6);
      if (m && !cur) paintReading(ctx, trace, strokes.map((s) => s.pts), m);
      ctx.lineCap = ctx.lineJoin = "round";
      ctx.lineWidth = 3;
      for (const s of strokes) {
        ctx.strokeStyle = css("--mfy-ink-" + s.color) || css("--ink");
        trace(s.pts);
        ctx.stroke();
      }
      ctx.strokeStyle = css("--ink");
      if (cur) (trace(cur), ctx.stroke());
    }
    let wait = 0;
    function update() {
      m = strokes.length ? R.recognize(strokes.map((s) => ({ pts: s.pts, color: s.color, zoom: s.zoom })), { diagram: kind.value }) : null;
      paint();
      clearTimeout(wait);
      if (!m || !m.nodes.length) {
        renders++;
        read.textContent = m ? readLine(m) + " Draw a shape for a line to join." : "Draw a box, another box, and an arrow between them.";
        code.textContent = "";
        out.textContent = "";
        return;
      }
      read.textContent = readLine(m) + ` ${m.ms.toFixed(1)} ms.`;
      const text = kind.value === "state" ? R.toStateMermaid(m) : R.toMermaid(m);
      code.textContent = text;
      wait = setTimeout(() => drawMermaid(out, text), 250);
    }
    function load() {
      // The pad's size, measured now if it has not been yet (a page in the background measures late).
      if (!size.w) size = fit();
      const w = Math.min(size.w, 520), ex = R.exampleStrokes(w), b = ex.flatMap((s) => s.pts);
      const y0 = Math.min(...b.map((p) => p[1])), y1 = Math.max(...b.map((p) => p[1])), k = Math.min(1, (size.h - 24) / (y1 - y0));
      const dx = (size.w - w * k) / 2;
      // Shrunk to fit a short pad, the example is read at the size it was drawn, as the app reads a drawing at its zoom.
      strokes = ex.map((s) => ({ pts: s.pts.map(([x, y]) => [dx + x * k, 12 + (y - y0) * k]), color: s.color || "ink", zoom: 1 / k }));
      kind.value = "flowchart";
      update();
    }
    // Held still for half a second, a stroke snaps: an arrow becomes a clean arrow, an outline the clean shape it
    // fits, and a nearly straight line a straight one; the press draws on after a shape.
    function hold() {
      if (!cur || frozen) return;
      const a = R.oneStrokeArrow(cur.slice(anchor));
      if (a) {
        cur = [...cur.slice(0, anchor), ...R.cleanArrow(a.tail, a.tip, 1)];
        frozen = true;
      } else {
        const r = R.snap(cur, anchor, 1);
        if (!r) return;
        if (r.kind === "line") {
          cur = [...cur.slice(0, r.from), ...r.pts];
          anchor = cur.length - 1;
        } else {
          const lead = cur.slice(0, r.from + 1);
          if (pathLength(lead) >= 14) strokes.push({ pts: lead, color: "ink" });
          strokes.push({ pts: r.pts, color: "ink" });
          cur = [cur[cur.length - 1]];
          anchor = 0;
        }
      }
      try {
        navigator.vibrate?.(12);
      } catch {}
      paint();
    }
    const at = (e) => {
      const r = canvas.getBoundingClientRect();
      return [e.clientX - r.left, e.clientY - r.top];
    };
    canvas.addEventListener("pointerdown", (e) => {
      if (cur || (e.pointerType === "mouse" && e.button !== 0)) return;
      canvas.setPointerCapture(e.pointerId);
      pointer = e.pointerId;
      cur = [at(e)];
      still = at(e);
      anchor = 0;
      frozen = false;
      clearTimeout(holdTimer);
      holdTimer = setTimeout(hold, 500);
      paint();
    });
    canvas.addEventListener("pointermove", (e) => {
      if (!cur || frozen || e.pointerId !== pointer) return;
      const events = e.getCoalescedEvents?.() ?? [];
      for (const ev of events.length ? events : [e]) {
        const p = at(ev);
        if (dist(p, cur[cur.length - 1]) >= 1.5) cur.push(p);
      }
      if (dist(at(e), still) > (e.pointerType === "touch" ? 6 : 4)) {
        still = at(e);
        clearTimeout(holdTimer);
        holdTimer = setTimeout(hold, 500);
      }
      paint();
    });
    const end = (e) => {
      if (!cur || e.pointerId !== pointer) return;
      clearTimeout(holdTimer);
      if (pathLength(cur) >= 8) strokes.push({ pts: cur, color: "ink" });
      cur = null;
      update();
    };
    canvas.addEventListener("pointerup", end);
    canvas.addEventListener("pointercancel", (e) => {
      if (e.pointerId !== pointer) return;
      cur = null;
      clearTimeout(holdTimer);
      paint();
    });
    kind.addEventListener("change", update);
    // One quiet reading first, so the time the pad shows is the reader's usual speed, not its first, slower run.
    R.recognize(R.exampleStrokes(420));
    new ResizeObserver(() => {
      size = fit();
      paint();
    }).observe(canvas);
    matchMedia("(prefers-color-scheme: dark)").addEventListener("change", update);
  }

  // ─── 2. What the reader sees ───────────────────────────────────────────────
  const STEPS = [
    ["The strokes, as drawn", "Nine strokes, five in plain ink and four in color, as a person might draw them on a phone. Nothing else goes in: no photo, and no names yet."],
    ["Strokes that come back to their start are shapes", "Each closed stroke is matched against the outlines Mermaid can draw, and the nearest one wins: an oval, a box, a diamond, and a circle drawn inside a circle, which is a double circle."],
    ["The rest are lines, and a hook is a head", "A line that doubles back at one end has its head there; the hook is cut off, and what’s left is the line. A head can also be a V or a triangle drawn apart, or a filled knot."],
    ["Each line joins the shapes at its ends", "An end reaches for the nearest shape it points into. The line from the diamond back to the box makes a loop, and its green ink comes along into Mermaid."],
    ["Then it writes Mermaid", "Letters in reading order, a node for each shape in its own Mermaid shape, an arrow for each line, and the colors as classes. Tap a shape in the app to give it a name."],
  ];
  function xrayDemo(root) {
    const canvas = el("canvas", { class: "mfy-pad mfy-xray", role: "img", "aria-label": "The example drawing, as the reader sees it at this step." });
    const title = el("h3", { class: "mfy-step-title" }), text = el("p", { class: "mfy-step-text" }), count = el("span", { class: "mfy-count" });
    const said = el("div", { "aria-live": "polite" }, title, text);
    const code = el("pre", { class: "mfy-code" });
    let step = 0;
    const back = el("button", { type: "button", onclick: () => go(step - 1) }, "Back"), next = el("button", { type: "button", onclick: () => go(step + 1) }, "Next");
    root.append(el("div", { class: "mfy-xray-wrap" }, canvas, el("div", { class: "mfy-xray-side" }, el("div", { class: "mfy-bar" }, back, count, next), said, code)));
    const { ctx, fit, trace } = surface(canvas);
    let size = { w: 0, h: 0 }, strokes = [], colors = [], m = null;
    function layout() {
      size = fit();
      const ex = R.exampleStrokes(420), b = ex.flatMap((s) => s.pts);
      const x0 = Math.min(...b.map((p) => p[0])), x1 = Math.max(...b.map((p) => p[0])), y0 = Math.min(...b.map((p) => p[1])), y1 = Math.max(...b.map((p) => p[1]));
      const k = Math.min((size.w - 32) / (x1 - x0), (size.h - 32) / (y1 - y0), 1.2), dx = (size.w - (x1 - x0) * k) / 2, dy = (size.h - (y1 - y0) * k) / 2;
      strokes = ex.map((s) => s.pts.map(([x, y]) => [dx + (x - x0) * k, dy + (y - y0) * k]));
      colors = ex.map((s) => s.color || "ink");
      // Shrunk to fit, the example is read at the size it was drawn, with its ink, as the app reads a drawing at its zoom.
      m = R.recognize(strokes.map((pts, i) => ({ pts, color: colors[i], zoom: 1 / k })));
      paint();
    }
    const ink = (c) => css("--mfy-ink-" + c) || css("--ink");
    function paint() {
      ctx.clearRect(0, 0, size.w, size.h);
      ctx.lineCap = ctx.lineJoin = "round";
      const shapeStrokes = new Set(m.nodes.flatMap((n) => n.strokes));
      strokes.forEach((p, i) => {
        ctx.lineWidth = 3;
        ctx.strokeStyle = ink(colors[i]);
        ctx.globalAlpha = step === 0 ? 1 : step === 1 ? (shapeStrokes.has(i) ? 1 : 0.18) : step === 2 ? (shapeStrokes.has(i) ? 0.25 : 1) : 1;
        trace(p);
        ctx.stroke();
      });
      ctx.globalAlpha = 1;
      if (step === 1)
        for (const n of m.nodes) {
          ctx.setLineDash([5, 5]);
          ctx.lineWidth = 1.5;
          ctx.strokeStyle = css("--mfy-accent");
          ctx.beginPath();
          n.poly.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
          ctx.closePath();
          ctx.stroke();
          ctx.setLineDash([]);
          label(WORDS[n.kind] || n.kind, n.bb.x1 + 8, n.bb.cy);
        }
      if (step === 2)
        for (const e of m.edges) {
          // The line as read, over the stroke: what is left of the stroke past it is the head.
          ctx.lineWidth = 7;
          ctx.globalAlpha = 0.35;
          ctx.strokeStyle = css("--mfy-accent");
          trace(e.pts);
          ctx.stroke();
          ctx.globalAlpha = 1;
          const tip = e.pts[e.pts.length - 1];
          ctx.fillStyle = css("--mfy-warn");
          ctx.beginPath();
          ctx.arc(tip[0], tip[1], 5, 0, 2 * Math.PI);
          ctx.fill();
        }
      if (step >= 3) paintReading(ctx, trace, strokes, m);
      if (step === 3)
        for (const e of m.edges) {
          const p = e.pts, mid = p[Math.floor(p.length / 2)];
          label(`${e.from} → ${e.to}`, mid[0] + 8, mid[1]);
        }
    }
    function label(t, x, y) {
      ctx.font = `600 12px ${css("--font-body")}`;
      const w = ctx.measureText(t).width + 10;
      x = Math.min(x, size.w - w - 4);
      ctx.fillStyle = css("--page");
      ctx.globalAlpha = 0.9;
      ctx.fillRect(x, y - 10, w, 20);
      ctx.globalAlpha = 1;
      ctx.fillStyle = css("--ink");
      ctx.textBaseline = "middle";
      ctx.fillText(t, x + 5, y + 0.5);
    }
    function go(i) {
      step = Math.max(0, Math.min(STEPS.length - 1, i));
      title.textContent = STEPS[step][0];
      text.textContent = STEPS[step][1];
      count.textContent = `${step + 1} of ${STEPS.length}`;
      // A button that turns off with the keyboard on it hands the focus to the other one.
      const had = document.activeElement;
      back.disabled = step === 0;
      next.disabled = step === STEPS.length - 1;
      if (had?.disabled) (had === back ? next : back).focus();
      code.hidden = step !== STEPS.length - 1;
      code.textContent = R.toMermaid(m);
      paint();
    }
    new ResizeObserver(() => {
      layout();
      go(step);
    }).observe(canvas);
    matchMedia("(prefers-color-scheme: dark)").addEventListener("change", paint);
  }

  // ─── 3. How well it reads ──────────────────────────────────────────────────
  const SETS = {
    people: {
      label: "300 drawings by people",
      note: "Hand-drawn flowcharts from Google’s DIDI dataset, test split, which the reader was never tuned on. Median time to read one: 2.8 ms.",
      bars: [["Shapes found", 1139, 1199], ["Shapes read with their look", 830, 932], ["Arrows read right", 906, 1102], ["Whole drawings exactly right", 201, 300]],
    },
    flow: {
      label: "1,000 generated flowcharts",
      note: "Drawn by a program with wobbly strokes, every kind of head, and dotted and thick lines. Median time: 2.6 ms.",
      bars: [["Shapes read right", 3958, 3972], ["Arrows read right", 3536, 3556], ["Line styles read right", 1809, 1827], ["Whole drawings exactly right", 973, 1000]],
    },
    state: {
      label: "1,000 generated state diagrams",
      note: "Starts, ends, states, choices, and composite states, joined by transitions. Median time: 3.0 ms.",
      bars: [["Starts and ends", 2128, 2130], ["Transitions", 4989, 4993], ["Whole diagrams exactly right", 996, 1000]],
    },
  };
  function accuracyDemo(root) {
    const tabs = el("div", { class: "mfy-tabs", role: "group", "aria-label": "Which drawings" });
    const chart = el("div", { class: "mfy-chart" }), note = el("p", { class: "mfy-note" });
    root.append(tabs, chart, note);
    const show = (key) => {
      for (const b of tabs.children) b.setAttribute("aria-pressed", String(b.dataset.key === key));
      const set = SETS[key];
      chart.replaceChildren(
        ...set.bars.map(([name, n, of]) => {
          const pct = (100 * n) / of;
          const fill = el("span", { class: "mfy-bar-fill" });
          fill.style.width = pct.toFixed(1) + "%";
          return el("div", { class: "mfy-row" }, el("span", { class: "mfy-row-name" }, name), el("span", { class: "mfy-track" }, fill), el("span", { class: "mfy-row-num" }, `${pct.toFixed(1)}%`, el("small", {}, ` ${n.toLocaleString("en-US")} of ${of.toLocaleString("en-US")}`)));
        }),
      );
      note.textContent = set.note;
    };
    for (const [key, set] of Object.entries(SETS)) tabs.append(el("button", { type: "button", "data-key": key, onclick: () => show(key) }, set.label));
    show("people");
  }

  if (!R) return;
  for (const root of document.querySelectorAll(".mfy-demo[data-demo]")) {
    const start = { draw: drawDemo, xray: xrayDemo, accuracy: accuracyDemo }[root.dataset.demo];
    if (!start) continue;
    root.replaceChildren();
    start(root);
  }
})();
