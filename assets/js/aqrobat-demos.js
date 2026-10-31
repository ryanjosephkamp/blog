// The Aqrobat post's two demos, on Aqrobat's own encoder (aqrobat-core.js):
// a code maker, and the same code as different apps would paste it.
(() => {
  const A = window.Aqrobat;
  if (!A) return;

  const EMOJI_FONT =
    '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif';
  const MONO_FONT =
    'ui-monospace, "SFMono-Regular", Menlo, Monaco, Consolas, monospace';
  const PROSE_FONT = "Arial, Helvetica, sans-serif";
  const SITE = "https://ryanjosephkamp.github.io/aqrobat/";

  const esc = (s) =>
    String(s).replace(
      /[&<>"]/g,
      (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c],
    );

  // Draws a code's rows at the largest size that fits `width`, with square
  // cells: `cells` squares across, so the line height is one square's width.
  function drawCode(el, rows, { family, cells, width, max = 24 }) {
    el.style.fontFamily = family;
    el.style.lineHeight = "normal";
    el.style.fontSize = "20px";
    el.textContent = rows.join("\n");
    // Emoji advances round at small sizes, so correct the first estimate.
    let size = 20;
    let measured = el.getBoundingClientRect().width || 1;
    for (let i = 0; i < 3 && Math.abs(measured - width) > 1; i++) {
      size = Math.max(3, Math.min(max, (size * width) / measured));
      el.style.fontSize = `${size}px`;
      measured = el.getBoundingClientRect().width || 1;
      if (size === max && measured < width) break;
    }
    for (let i = 0; i < 6 && measured > width; i++) {
      size *= 0.98;
      el.style.fontSize = `${size}px`;
      measured = el.getBoundingClientRect().width || 1;
    }
    el.style.lineHeight = `${measured / cells}px`;
    return { size };
  }

  function fitWidth(paper, cap) {
    const style = getComputedStyle(paper);
    const inner =
      paper.clientWidth -
      parseFloat(style.paddingLeft) -
      parseFloat(style.paddingRight);
    return Math.max(120, Math.min(cap, inner));
  }

  function onResize(el, fn) {
    let frame = 0;
    let last = el.clientWidth;
    new ResizeObserver(() => {
      if (el.clientWidth === last) return;
      last = el.clientWidth;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(fn);
    }).observe(el);
  }

  const pill = (kind, label) =>
    `<span class="aqrobat-pill is-${kind}">${esc(label)}</span>`;

  // What's known about one choice of characters, from phone scans, the
  // Gmail simulator, and the paste lab.
  function makerEvidence(palette, s) {
    const one = palette.length === 1 ? palette[0] : null;
    const wide = palette.every(A.wideGlyph);
    const squares = palette.every((g) => A.DARK_TILES.includes(g));
    const untested = [
      "untested",
      "Untested",
      "Nobody has scanned this exact choice yet. Scan it before you rely on it.",
    ];
    if (!wide)
      return one === "█"
        ? ["sim", "Tested for code blocks", "Full blocks keep their shape in a monospace code block, like GitHub’s or Notion’s. In most other apps, the font changes their width."]
        : ["bad", "Monospace only", "Letters and symbols line up only in a monospace font, and Gmail on a phone collapses their spaces. The next demo shows why."];
    if (one === "🙂" || one === "🐱")
      return ["bad", "Too light to scan", "Smiley codes didn’t scan from Gmail on a phone. A mostly light emoji leaves a camera too little contrast."];
    if (squares) {
      if (s.light === "white")
        return one === "⬛"
          ? ["sim", "Simulated", "⬛ on 🤍 passed 9 of 12 camera trials in the Gmail simulator. Not tried on a phone yet."]
          : untested;
      return one === "⬛"
        ? ["good", "Scanned on a phone", "Black squares scanned from Gmail on a phone, and passed 10 of 12 trials in the Gmail simulator."]
        : ["good", "Tested", "Emoji squares passed the paste tests in every editor, and black squares have scanned from Gmail on a phone."];
    }
    if (s.light === "white") return untested;
    if (one === "🍇")
      return {
        black: ["good", "Scanned on a phone", "Grapes with ▫️ and ⬛ corners scanned from Gmail on a phone on October 29, 2026, and passed 9 of 12 trials in the Gmail simulator."],
        same: ["bad", "Unlikely to scan", "Without solid corners, grapes passed 0 of 12 trials in the Gmail simulator."],
        red: ["sim", "Partly simulated", "In the Gmail simulator, squares work as corners in any color: grapes with 🟪 corners passed 8 of 12 trials. Red corners and phones are untried."],
      }[s.corners];
    if (one === "🖤")
      return {
        black: ["good", "Scanned on a phone", "Black hearts with ▫️ and ⬛ corners scanned from Gmail on a phone on October 29, 2026, and passed 10 of 12 trials in the Gmail simulator."],
        same: ["sim", "Simulated", "Without solid corners, black hearts passed 6 of 12 trials in the Gmail simulator, a coin flip."],
        red: ["sim", "Simulated", "With 🟥 corners, black hearts passed 9 of 12 trials in the Gmail simulator. Not tried on a phone yet."],
      }[s.corners];
    return untested;
  }

  function makerDemo(box) {
    const CHOICES = [
      ["⬛", "Black squares"],
      ["🟦", "Blue squares"],
      ["🍇", "Grapes"],
      ["🖤", "Black hearts"],
      ["🍇🍓🫐", "Grapes, strawberries, and blueberries"],
      ["🙂", "Smileys"],
      ["█", "Full blocks"],
      ["#", "Hashes"],
    ];
    const s = { payload: SITE, chars: "🍇", corners: "black", light: "default" };
    box.innerHTML = `<p class="aqrobat-demo__title">Live demo</p>
<label for="mk-input">Link or text</label>
<input type="text" id="mk-input" value="${esc(s.payload)}" autocomplete="off" autocapitalize="off" spellcheck="false">
<p class="aqrobat-demo__meta" id="mk-bytes"></p>
<fieldset><legend>Characters</legend><div class="aqrobat-chips" id="mk-chars">${CHOICES.map(([c, label]) => `<button type="button" class="aqrobat-chip" data-chars="${esc(c)}" aria-pressed="${c === s.chars}" aria-label="${esc(label)}" title="${esc(label)}"><span class="aqrobat-glyph">${esc(c)}</span></button>`).join("")}</div>
<div class="aqrobat-custom"><label for="mk-custom">Or type your own</label><input type="text" id="mk-custom" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="🐙"></div></fieldset>
<fieldset id="mk-corners"><legend>Corner markers</legend><div class="aqrobat-chips"><button type="button" class="aqrobat-chip" data-corners="black" aria-pressed="true">⬛ corners</button><button type="button" class="aqrobat-chip" data-corners="same" aria-pressed="false">Same as the code</button><button type="button" class="aqrobat-chip" data-corners="red" aria-pressed="false">🟥 corners</button></div></fieldset>
<fieldset id="mk-light"><legend>Light squares</legend><div class="aqrobat-chips"><button type="button" class="aqrobat-chip" data-light="default" aria-pressed="true" id="mk-light-default">▫️ (default)</button><button type="button" class="aqrobat-chip" data-light="white" aria-pressed="false">🤍</button></div></fieldset>
<div class="aqrobat-paper" id="mk-paper"><div class="aqrobat-code" id="mk-code" role="img"></div><p class="aqrobat-code-error" id="mk-error" hidden></p></div>
<p class="aqrobat-evidence" id="mk-evidence"></p>
<div class="aqrobat-actions"><button type="button" class="aqrobat-button" id="mk-copy">Copy the code</button><span id="mk-copy-status" aria-live="polite"></span></div>
<p class="aqrobat-demo__meta" id="mk-stats"></p>`;
    const $ = (id) => box.querySelector(`#${id}`);
    const code = $("mk-code");
    const error = $("mk-error");
    const paper = $("mk-paper");
    const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
    let current = "";
    let rows = null;

    const fail = (message) => {
      current = "";
      rows = null;
      code.hidden = true;
      error.hidden = false;
      error.textContent = message;
      $("mk-evidence").innerHTML = "";
      $("mk-stats").textContent = "";
    };

    const draw = () => {
      if (rows)
        drawCode(code, rows.lines, {
          family: rows.family,
          cells: rows.cells,
          width: fitWidth(paper, 440),
        });
    };

    const update = () => {
      $("mk-copy-status").textContent = "";
      const bytes = new TextEncoder().encode(s.payload).length;
      $("mk-bytes").textContent = `${bytes.toLocaleString("en-US")} of 1,024 bytes`;
      $("mk-bytes").classList.toggle("is-error", bytes > 1024);
      let palette;
      try {
        palette = A.parsePalette(s.chars);
      } catch {
        return fail("Pick one or more visible characters or emoji.");
      }
      const wide = palette.every(A.wideGlyph);
      const squares = palette.every((g) => A.DARK_TILES.includes(g));
      $("mk-corners").hidden = !wide || squares;
      $("mk-light").hidden = !wide;
      $("mk-light-default").textContent = squares ? "⬜ (default)" : "▫️ (default)";
      if (!s.payload) return fail("Type a link or some text.");
      if (bytes > 1024)
        return fail(
          `That’s ${bytes.toLocaleString("en-US")} bytes. Aqrobat takes up to 1,024 and never shortens a link, so it refuses instead.`,
        );
      let parts;
      if (wide && !squares && (s.corners !== "black" || s.light !== "default")) {
        parts = {};
        if (s.corners === "black") parts.corners = parts.centers = "⬛";
        if (s.corners === "red") parts.corners = parts.centers = "🟥";
        if (s.light === "white") parts.light = "🤍";
      } else if (wide && squares && s.light === "white") parts = { light: "🤍" };
      let qr;
      try {
        qr = A.generate(s.payload, parts ? { glyph: s.chars, parts } : { glyph: s.chars });
      } catch (e) {
        return fail(e.message);
      }
      const paste = A.pasteText(qr);
      current = paste.text;
      rows = {
        lines: paste.rows,
        family: wide ? EMOJI_FONT : MONO_FONT,
        cells: qr.modules + 2 * paste.quiet,
      };
      code.hidden = false;
      error.hidden = true;
      code.setAttribute("aria-label", `QR code for ${s.payload}, drawn with ${palette.join(" ")}`);
      draw();
      const [kind, label, text] = makerEvidence(palette, s);
      $("mk-evidence").innerHTML = `${pill(kind, label)}<span>${esc(text)}</span>`;
      const count = [...segmenter.segment(paste.text.replace(/\n/g, ""))].length;
      $("mk-stats").textContent = `Version ${qr.version} · ${qr.modules} × ${qr.modules} squares, plus a 2-square border · ${count.toLocaleString("en-US")} characters`;
    };

    $("mk-input").addEventListener("input", (e) => {
      s.payload = e.target.value;
      update();
    });
    box.addEventListener("click", (e) => {
      const chip = e.target.closest(".aqrobat-chip");
      if (!chip) return;
      for (const key of ["chars", "corners", "light"]) {
        if (chip.dataset[key] === undefined) continue;
        s[key] = chip.dataset[key];
        for (const other of chip.parentElement.querySelectorAll(".aqrobat-chip"))
          other.setAttribute("aria-pressed", String(other === chip));
        if (key === "chars") $("mk-custom").value = "";
      }
      update();
    });
    $("mk-custom").addEventListener("input", (e) => {
      const value = e.target.value.trim();
      if (!value) return;
      s.chars = value;
      for (const chip of $("mk-chars").querySelectorAll(".aqrobat-chip"))
        chip.setAttribute("aria-pressed", "false");
      update();
    });
    $("mk-copy").addEventListener("click", async () => {
      if (!current) return;
      try {
        await navigator.clipboard.writeText(current);
        $("mk-copy-status").textContent = "Copied. Paste it anywhere, then scan the pasted result.";
      } catch {
        const range = document.createRange();
        range.selectNodeContents(code);
        const selection = getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        $("mk-copy-status").textContent = "This page can’t copy here, so the code is selected. Copy it yourself.";
      }
    });
    onResize(box, draw);
    update();
  }

  function pasteDemo(box) {
    const blocks = A.pasteText(A.generate(SITE, { glyph: "█" }));
    const squaresQr = A.generate(SITE, { glyph: "⬛" });
    const squares = A.pasteText(squaresQr);
    const cells = squaresQr.modules + 2 * squares.quiet;
    const MODES = {
      copied: {
        label: "As copied",
        note: "How both codes leave Aqrobat.",
        blocks: ["good", "Lines up", "A monospace font, with every space kept."],
        emoji: ["good", "Lines up", "Each emoji fills one square."],
      },
      gmail: {
        label: "Gmail on a phone",
        note: "Gmail on a phone pastes plain text and collapses every run of spaces into one.",
        blocks: ["bad", "Falls apart", "The light squares were spaces. With each run collapsed, the rows lose their width."],
        emoji: ["good", "Holds", "There are no spaces to lose, and black squares have scanned from Gmail on a phone."],
      },
      font: {
        label: "The app’s own font",
        note: "Most apps show pasted text in their own proportional font.",
        blocks: ["bad", "Drifts", "In most fonts, a block is wider than a space, so every row ends somewhere different."],
        emoji: ["good", "Holds", "Every emoji in a font is the same width, so the rows still line up."],
      },
      loose: {
        label: "Loose line spacing",
        note: "Notion-style editors space lines at about 1.5.",
        blocks: ["bad", "Gaps", "Gaps open between the rows, so the squares come apart."],
        emoji: ["bad", "Gaps", "Gaps between the rows break up the squares. In the lab, 11 of 36 Notion-style cases passed."],
      },
    };
    let mode = "copied";
    box.innerHTML = `<p class="aqrobat-demo__title">Live demo</p>
<div class="aqrobat-chips" role="group" aria-label="What the app does">${Object.entries(MODES).map(([key, m]) => `<button type="button" class="aqrobat-chip" data-mode="${key}" aria-pressed="${key === mode}">${esc(m.label)}</button>`).join("")}</div>
<p class="aqrobat-demo__note" id="pp-note" aria-live="polite"></p>
<div class="aqrobat-pair">
<figure><figcaption>Full blocks: <code>█</code> and spaces</figcaption><div class="aqrobat-paper" id="pp-paper"><div class="aqrobat-code" id="pp-blocks" role="img"></div></div><p class="aqrobat-verdict" id="pp-blocks-v"></p></figure>
<figure><figcaption>Emoji squares: ⬛ and ⬜</figcaption><div class="aqrobat-paper"><div class="aqrobat-code" id="pp-emoji" role="img"></div></div><p class="aqrobat-verdict" id="pp-emoji-v"></p></figure>
</div>`;
    const $ = (id) => box.querySelector(`#${id}`);
    const blocksEl = $("pp-blocks");
    const emojiEl = $("pp-emoji");
    blocksEl.setAttribute("aria-label", `QR code for ${SITE}, drawn with full blocks and spaces`);
    emojiEl.setAttribute("aria-label", `QR code for ${SITE}, drawn with black and white emoji squares`);

    const draw = () => {
      const width = fitWidth($("pp-paper"), 340);
      const L = drawCode(blocksEl, blocks.rows, { family: MONO_FONT, cells, width });
      const E = drawCode(emojiEl, squares.rows, { family: EMOJI_FONT, cells, width });
      if (mode === "gmail")
        blocksEl.textContent = blocks.rows.map((row) => row.replace(/ {2,}/g, " ")).join("\n");
      if (mode === "font") {
        blocksEl.style.fontFamily = PROSE_FONT;
        emojiEl.style.fontFamily = `${PROSE_FONT}, ${EMOJI_FONT}`;
      }
      if (mode === "loose") {
        blocksEl.style.lineHeight = `${L.size * 1.5}px`;
        emojiEl.style.lineHeight = `${E.size * 1.5}px`;
      }
      const m = MODES[mode];
      $("pp-note").textContent = m.note;
      $("pp-blocks-v").innerHTML = `${pill(m.blocks[0], m.blocks[1])} ${esc(m.blocks[2])}`;
      $("pp-emoji-v").innerHTML = `${pill(m.emoji[0], m.emoji[1])} ${esc(m.emoji[2])}`;
    };

    box.addEventListener("click", (e) => {
      const chip = e.target.closest("[data-mode]");
      if (!chip) return;
      mode = chip.dataset.mode;
      for (const other of box.querySelectorAll("[data-mode]"))
        other.setAttribute("aria-pressed", String(other === chip));
      draw();
    });
    onResize(box, draw);
    draw();
  }

  const DEMOS = { maker: makerDemo, paste: pasteDemo };
  for (const box of document.querySelectorAll("[data-aqrobat-demo]")) {
    const run = DEMOS[box.dataset.aqrobatDemo];
    if (!run) continue;
    try {
      run(box);
      box.classList.add("is-live");
    } catch (error) {
      console.error(error);
    }
  }
})();
