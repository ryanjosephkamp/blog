/* The grooph post's demos, drawn by grooph's own script for a page (grooph.global.js, the grooph package's browser
   build): eight of its built-in templates in any view and look, with their Mermaid, and a document edited live. The
   documents come from the file a demo names in its data-src. */
(() => {
  "use strict";
  let data;
  const VIEWS = [["", "Picture"], ["stairs", "Stairs"], ["panes", "Panes"], ["spiral", "Spiral"], ["rings", "Rings"], ["columns", "Columns"]];
  const LOOKS = [["paper", "Paper"], ["blueprint", "Blueprint"], ["ink", "Ink"], ["phosphor", "Phosphor"], ["transit", "Transit"], ["chalk", "Chalk"]];
  const dark = () => {
    const theme = document.documentElement.dataset.resolvedTheme;
    return theme ? theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
  };
  // Every demo drawn again when the site's light or dark changes.
  const redraws = [];
  new MutationObserver(() => redraws.forEach((go) => go())).observe(document.documentElement, { attributes: true, attributeFilter: ["data-resolved-theme"] });
  matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => redraws.forEach((go) => go()));

  const el = (tag, props = {}, ...kids) => {
    const node = Object.assign(document.createElement(tag), props);
    for (const k of kids) node.append(k);
    return node;
  };
  const select = (label, options, value) => {
    const s = el("select");
    for (const [v, t] of options) s.append(el("option", { value: v, textContent: t, selected: v === value }));
    return [el("label", { className: "demo-pick" }, el("span", { textContent: label }), s), s];
  };

  /** Draw a document into a box, in a look that follows the page's light or dark; a look with one face is drawn as it is. */
  function draw(box, doc, options) {
    box.__mounted?.destroy();
    const theme = `${options.look}-${dark() ? "dark" : "light"}`;
    const view = options.view ? { view: options.view } : {};
    try {
      grooph.render(doc, { theme, ...view });
      box.__mounted = grooph.mount(box, doc, { theme, ...view });
    } catch (err) {
      if (err && err.code === "bad-option") box.__mounted = grooph.mount(box, doc, { theme: options.look, ...view });
      else box.__mounted = grooph.mount(box, doc, { theme, ...view });
    }
  }

  function pick(root) {
    const ids = data.templates.map((t) => [t.id, t.title]);
    const [tl, t] = select("Workflow", ids, "review-gate");
    const [vl, v] = select("View", VIEWS, "");
    const [ll, l] = select("Look", LOOKS, "paper");
    const out = el("div", { className: "demo-diagram demo-picture" });
    const code = el("pre", { className: "demo-code" });
    const more = el("details", { className: "demo-more" }, el("summary", { textContent: "The same workflow as Mermaid" }), code);
    const say = el("p", { className: "demo-note" });
    root.append(el("div", { className: "demo-bar" }, tl, vl, ll), out, say, more);
    const go = () => {
      const tpl = data.templates.find((x) => x.id === t.value);
      draw(out, tpl.doc, { view: v.value, look: l.value });
      code.textContent = tpl.mermaid;
      say.textContent = `${tpl.title}: ${tpl.summary}`;
    };
    for (const s of [t, v, l]) s.addEventListener("change", go);
    redraws.push(go);
    go();
  }

  function doc(root) {
    const start = JSON.stringify(data.small, null, 2);
    const text = el("textarea", { className: "demo-json", spellcheck: false, value: start, rows: 18 });
    text.setAttribute("aria-label", "The graph document");
    const out = el("div", { className: "demo-diagram demo-picture" });
    const reset = el("button", { type: "button", textContent: "Start over" });
    const say = el("p", { className: "demo-note", textContent: "Change a name, a model tier, or a brake's number, and the picture follows. Delete the loop, and its brakes go with it." });
    root.append(el("div", { className: "demo-doc" }, text, out), el("div", { className: "demo-bar" }, reset), say);
    let timer;
    const go = () => draw(out, text.value, { look: "paper" });
    text.addEventListener("input", () => {
      clearTimeout(timer);
      timer = setTimeout(go, 250);
    });
    reset.addEventListener("click", () => {
      text.value = start;
      go();
    });
    redraws.push(go);
    go();
  }

  const DEMOS = { pick, doc };
  const roots = [...document.querySelectorAll(".grooph-demo[data-demo]")];
  if (!roots.length || !window.grooph) return;
  fetch(roots[0].dataset.src)
    .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
    .then((d) => {
      data = d;
      for (const root of roots) {
        const start = DEMOS[root.dataset.demo];
        if (!start) continue;
        root.replaceChildren();
        start(root);
      }
    })
    .catch(() => undefined);
})();
