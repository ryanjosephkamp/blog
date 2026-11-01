// Interactive demos for the Link Meteor post. They run Link Meteor 1.0.0's own export, citation
// and PDF code (./core/ and ./vendor/pdfjs/, copied unmodified) in this page. Nothing is
// uploaded or sent anywhere. Each demo mounts into an empty <div data-lm-demo="…">.
import { makeExport } from './core/export.js';
import { identifiersOf, IDENTIFIER_LABELS } from './core/identifiers.js';
import { isPdf, pdfProblem, readPdfDocument, MAX_PDF_BYTES } from './core/pdf.js';

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
const coarse = matchMedia('(pointer: coarse)');

// h('p', {class: 'x', text: 'Hi', onclick}, child…): attributes, text and listeners in one call.
function h(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (value == null || value === false) continue;
    if (key === 'text') node.textContent = value;
    else if (key.startsWith('on')) node.addEventListener(key.slice(2), value);
    else node.setAttribute(key, value === true ? '' : value);
  }
  node.append(...children.flat().filter((child) => child != null && child !== false));
  return node;
}

const when = (date) => date.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' });
const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`;
const meteor = () => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24'); svg.setAttribute('aria-hidden', 'true'); svg.classList.add('lm-mark');
  svg.innerHTML = '<path d="M13.2 4.6 19.4 10.8 4.6 20.4Q3.6 19.4 4.6 18.4Z" fill="currentColor" opacity=".35"/><circle cx="16.3" cy="7.7" r="4.4" fill="currentColor"/>';
  return svg;
};

async function copyText(text) {
  try { await navigator.clipboard.writeText(text); return true; } catch { return false; }
}

// Saves a generated file with an ordinary download link.
async function saveFile(filename, data, mime) {
  const href = URL.createObjectURL(new Blob([data], { type: mime }));
  const link = h('a', { href, download: filename });
  document.body.append(link); link.click(); link.remove();
  setTimeout(() => URL.revokeObjectURL(href), 30000);
  return 'saved';
}

/* The selection the capture demo makes, which the export demo reads ----------------------- */
const selection = { records: [], all: [] };
const listeners = new Set();
const onSelection = (fn) => { listeners.add(fn); fn(selection.records.length ? selection.records : selection.all); };
const announce = () => { for (const fn of listeners) fn(selection.records.length ? selection.records : selection.all); };

/* 1. Capture: drag across a reading list ---------------------------------------------------- */
const SOURCE = { url: 'https://journal.example.org/reading-lists/uhi', title: 'Reading list: urban heat islands' };
const LIST = [
  { text: 'Surface temperature and tree canopy in 40 mid-sized cities', href: 'https://doi.org/10.5555/uhi.2024.0142', meta: 'Ortega & Lin, 2024' },
  { text: 'Download PDF', href: 'https://journal.example.org/articles/uhi-2024-0142.pdf', original: '/articles/uhi-2024-0142.pdf', meta: '2.1 MB' },
  { text: 'Night-time heat retention in dense street canyons', href: 'https://doi.org/10.5555/uhi.2023.0877', meta: 'Achebe et al., 2023' },
  { image: 'Canopy coverage map', href: 'https://journal.example.org/figures/canopy-map', original: '/figures/canopy-map', meta: 'Figure 2, image link' },
  { text: 'Cool roofs: a ten-year field comparison', href: 'https://doi.org/10.5555/uhi.2022.0310', meta: 'Varga, 2022' },
  { text: 'Hourly station temperatures, 2015–2025', href: 'https://data.example.com/datasets/station-hourly.xlsx', meta: 'Dataset' },
  { before: 'Methods follow ', text: 'the canopy study', href: 'https://doi.org/10.5555/uhi.2024.0142', after: ' (01).', meta: 'Note' },
];

function mountCapture(root) {
  const layer = h('div', { class: 'lm-layer', 'aria-hidden': 'true' });
  const items = LIST.map((item, index) => {
    const anchor = item.image
      ? h('a', { href: item.href, 'data-original': item.original, 'aria-label': item.image }, h('span', { class: 'lm-thumb', role: 'img', 'aria-label': item.image }))
      : h('a', { href: item.href, 'data-original': item.original, text: item.text });
    const line = h('span', { class: 'lm-line' }, item.before, anchor, item.after, ' ', h('span', { class: 'lm-meta', text: item.meta }));
    return h('li', {}, h('span', { class: 'lm-n', text: String(index + 1).padStart(2, '0') }), line);
  });
  const page = h('div', { class: 'lm-page' },
    h('p', { class: 'lm-site' }, h('span'), h('span'), h('span'), 'journal.example.org/reading-lists/uhi'),
    h('p', { class: 'lm-page-title', text: SOURCE.title }),
    h('ol', { class: 'lm-list' }, items),
    layer);
  const anchors = items.map((li) => li.querySelector('a'));

  const count = h('p', { class: 'lm-count', 'aria-live': 'polite', text: 'Drag across the list' });
  const tbody = h('tbody');
  const table = h('table', { class: 'lm-table', hidden: true },
    h('thead', {}, h('tr', {}, h('th', { scope: 'col', text: 'Anchor text' }), h('th', { scope: 'col', text: 'URL' }))), tbody);
  const empty = h('p', { class: 'lm-empty', text: 'Press and drag over the reading list to select links, the way the extension does on a real page.' });
  const record = h('div', { class: 'lm-record', hidden: true });
  const status = h('p', { class: 'lm-status', role: 'status' });
  const group = h('input', { type: 'checkbox', id: 'lm-group' });
  const copy = h('button', { type: 'button', class: 'lm-btn lm-btn-lime', disabled: true, text: 'Copy text + URL' });
  const touch = h('button', { type: 'button', class: 'lm-btn lm-touch', 'aria-pressed': 'false', text: 'Drag with touch' });
  const card = h('div', { class: 'lm-card' },
    h('div', { class: 'lm-card-head' }, meteor(), h('div', {}, count, h('p', { class: 'lm-dest', text: 'Anchor text and URL, kept in separate fields' }))),
    table, empty,
    h('label', { class: 'lm-check', for: 'lm-group' }, group, ' Group by URL'),
    record,
    h('div', { class: 'lm-actions' }, copy,
      h('button', { type: 'button', class: 'lm-btn', text: 'Select all', onclick: () => selectAll() }),
      h('button', { type: 'button', class: 'lm-btn', text: 'Replay', onclick: () => play() }),
      touch),
    status);
  root.append(h('figure', { class: 'lm-demo lm-capture' },
    h('div', { class: 'lm-stage' }, page, card),
    h('figcaption', {}, h('strong', { text: 'Interactive demo.' }), ' It runs in this page and sends nothing anywhere. On a real site, the extension does the same, including links in scrolling areas, frames, and closed components.')));

  // Mirrors the extension: visible text with whitespace collapsed; an image's label goes in its own field.
  function recordOf(anchor, index, at) {
    const anchorText = anchor.innerText.replace(/\s+/g, ' ').trim();
    const item = LIST[index];
    const context = [item.before, item.text, item.after].filter(Boolean).join('').trim() || item.meta;
    const row = {
      id: `demo-${index + 1}`, anchorText, accessibleLabel: anchorText ? '' : anchor.getAttribute('aria-label') || '',
      url: anchor.href, originalHref: anchor.dataset.original || anchor.getAttribute('href'),
      sourceUrl: SOURCE.url, sourceTitle: SOURCE.title, frameUrl: SOURCE.url,
      capturedAt: at.toISOString(), batchId: 'demo-batch', context: index === 6 ? context : '', notes: '', tags: [],
    };
    return { ...row, occurrences: [row], occurrenceIds: [row.id] };
  }
  selection.all = anchors.map((anchor, index) => recordOf(anchor, index, new Date()));

  const positive = (r) => r.right > r.left && r.bottom > r.top;
  const overlap = (a, b) => positive({ left: Math.max(a.left, b.left), top: Math.max(a.top, b.top), right: Math.min(a.right, b.right), bottom: Math.min(a.bottom, b.bottom) });
  const box = (a, b) => ({ left: Math.min(a.x, b.x), top: Math.min(a.y, b.y), right: Math.max(a.x, b.x), bottom: Math.max(a.y, b.y) });
  let hits = [], start = null, animation = 0, shown = null;

  function mark(rect, origin) {
    return h('div', { class: 'lm-hit', style: `left:${rect.left - origin.left - 2}px;top:${rect.top - origin.top - 1}px;width:${rect.width + 4}px;height:${rect.height + 2}px` });
  }
  function draw(area, pointer) {
    const origin = page.getBoundingClientRect();
    layer.replaceChildren();
    if (!area) return [];
    layer.append(h('div', { class: 'lm-rect', style: `left:${area.left - origin.left}px;top:${area.top - origin.top}px;width:${area.right - area.left}px;height:${area.bottom - area.top}px` }));
    const found = [];
    anchors.forEach((anchor, index) => {
      const rects = [...anchor.getClientRects()].filter(positive);
      if (rects.some((r) => overlap(r, area))) { found.push(index); for (const r of rects) layer.append(mark(r, origin)); }
    });
    if (pointer) {
      const x = Math.min(origin.width - 84, Math.max(4, pointer.x - origin.left + 12));
      const y = Math.min(origin.height - 30, Math.max(4, pointer.y - origin.top + 12));
      layer.append(h('div', { class: 'lm-badge', style: `left:${x}px;top:${y}px`, text: plural(found.length, 'link') }));
    }
    return found;
  }
  function redraw() {
    const origin = page.getBoundingClientRect();
    layer.replaceChildren(...hits.flatMap((index) => [...anchors[index].getClientRects()].filter(positive).map((r) => mark(r, origin))));
  }

  function rows() {
    const records = selection.records;
    if (!group.checked) return records.map((r) => ({ lead: r, members: [r] }));
    const groups = new Map();
    for (const r of records) { if (!groups.has(r.url)) groups.set(r.url, { lead: r, members: [] }); groups.get(r.url).members.push(r); }
    return [...groups.values()];
  }
  function showRecord(entry) {
    shown = entry;
    const dl = (r) => h('dl', {}, [
      ['Anchor text', r.anchorText || 'Empty: the link has no text'],
      r.accessibleLabel && ['Accessible label', r.accessibleLabel],
      ['URL', r.url], ['Original href', r.originalHref],
      ['Source page', `${r.sourceTitle} · ${r.sourceUrl.replace(/^https:\/\//, '')}`],
      r.context && ['Words around it', r.context],
      ['Captured', `${when(new Date(r.capturedAt))}, with its capture batch`],
    ].filter(Boolean).map(([term, value]) => h('div', {}, h('dt', { text: term }), h('dd', { text: value, class: /Empty/.test(value) ? 'lm-nil' : null }))));
    const title = entry.members.length > 1
      ? `One URL, ${entry.members.length} occurrences, each kept with its own label`
      : 'Everything saved with this link';
    record.replaceChildren(h('p', { class: 'lm-record-title', text: title }), ...entry.members.map(dl));
    record.hidden = false;
    for (const button of tbody.querySelectorAll('button')) button.setAttribute('aria-pressed', String(button.dataset.key === entry.lead.id));
  }
  function render() {
    const list = rows();
    tbody.replaceChildren(...list.map((entry) => {
      const r = entry.lead;
      const label = r.anchorText || 'No anchor text';
      const more = entry.members.length > 1 ? h('span', { class: 'lm-chip', text: `+${plural(entry.members.length - 1, 'label')}` }) : null;
      return h('tr', {},
        h('td', {}, h('button', { type: 'button', class: `lm-rowbtn${r.anchorText ? '' : ' lm-nil'}`, 'data-key': r.id, 'aria-pressed': 'false', onclick: () => showRecord(entry) }, label, more)),
        h('td', { class: 'lm-url', text: r.url }));
    }));
    const n = selection.records.length;
    count.textContent = n ? `${plural(n, 'link')} selected${group.checked && list.length !== n ? `, ${plural(list.length, 'URL')}` : ''}` : 'No links in that area';
    table.hidden = !n; empty.hidden = !!n; copy.disabled = !n;
    if (!n) { empty.textContent = 'Nothing was inside that rectangle. Try dragging across the titles.'; record.hidden = true; return; }
    const keep = shown && list.find((entry) => entry.members.some((m) => shown.members.some((s) => s.id === m.id)));
    showRecord(keep || list.find((entry) => entry.lead.anchorText === 'Download PDF') || list[0]);
  }
  function commit(found) {
    hits = found;
    const at = new Date();
    selection.records = found.map((index) => recordOf(anchors[index], index, at));
    status.textContent = '';
    render(); announce();
  }

  const accepts = (event) => event.button === 0 && (event.pointerType !== 'touch' || touch.getAttribute('aria-pressed') === 'true');
  page.addEventListener('pointerdown', (event) => {
    if (!accepts(event)) return;
    cancelAnimationFrame(animation); animation = 0;
    event.preventDefault();
    start = { x: event.clientX, y: event.clientY };
    page.setPointerCapture(event.pointerId);
    draw(box(start, start), start);
  });
  page.addEventListener('pointermove', (event) => { if (start) draw(box(start, { x: event.clientX, y: event.clientY }), { x: event.clientX, y: event.clientY }); });
  page.addEventListener('pointerup', (event) => {
    if (!start) return;
    const end = { x: event.clientX, y: event.clientY };
    const moved = Math.abs(end.x - start.x) + Math.abs(end.y - start.y) > 4;
    const found = moved ? draw(box(start, end)) : [];
    start = null;
    if (moved) commit(found); else redraw();
  });
  page.addEventListener('pointercancel', () => { start = null; redraw(); });
  page.addEventListener('click', (event) => {
    if (!event.target.closest('a')) return;
    event.preventDefault();
    status.textContent = 'Demo links don’t open. On a real page, Link Meteor never opens a link while you select.';
  });
  touch.addEventListener('click', () => {
    const on = touch.getAttribute('aria-pressed') !== 'true';
    touch.setAttribute('aria-pressed', String(on));
    page.classList.toggle('lm-touch-on', on);
    status.textContent = on ? 'Touch drag is on: drag across the list to select. Turn it off to scroll.' : '';
  });
  group.addEventListener('change', () => { if (selection.records.length) render(); });
  copy.addEventListener('click', async () => {
    const tsv = ['Anchor text\tURL', ...selection.records.map((r) => `${r.anchorText}\t${r.url}`)].join('\r\n') + '\r\n';
    status.textContent = await copyText(tsv)
      ? `Copied ${plural(selection.records.length, 'row')} as two columns. Paste into any spreadsheet.`
      : 'This browser blocked the clipboard for the demo.';
  });

  function selectAll() {
    cancelAnimationFrame(animation); animation = 0;
    const origin = page.getBoundingClientRect();
    const first = anchors[0].getBoundingClientRect(), last = anchors.at(-1).getBoundingClientRect();
    commit(draw({ left: origin.left + 8, top: first.top - 6, right: origin.right - 8, bottom: last.bottom + 6 }));
  }
  function play() {
    cancelAnimationFrame(animation);
    const origin = page.getBoundingClientRect();
    const a = anchors[0].getBoundingClientRect(), d = anchors[3].getBoundingClientRect(), c = anchors[2].getBoundingClientRect();
    const from = { x: origin.left + 14, y: a.top - 8 };
    const to = { x: Math.min(origin.right - 16, c.right + 24), y: d.bottom + 8 };
    if (reduceMotion.matches) { commit(draw(box(from, to))); return; }
    const began = performance.now(), duration = 1500, ease = (t) => 1 - (1 - t) ** 4;
    const step = (now) => {
      const t = Math.min(1, (now - began) / duration);
      const p = { x: from.x + (to.x - from.x) * ease(t), y: from.y + (to.y - from.y) * ease(t) };
      const found = draw(box(from, p), p);
      if (t < 1) animation = requestAnimationFrame(step);
      else { animation = 0; draw(box(from, p)); commit(found); }
    };
    animation = requestAnimationFrame(step);
  }
  new ResizeObserver(() => { if (!start && !animation) redraw(); }).observe(page);
  const seen = new IntersectionObserver((entries) => {
    if (entries.some((entry) => entry.isIntersecting)) { seen.disconnect(); setTimeout(play, reduceMotion.matches ? 0 : 600); }
  }, { threshold: 0.5 });
  seen.observe(page);
}

/* 2. Exports: Link Meteor's own export code on the selected links -------------------------- */
const FORMATS = [
  ['xlsx', 'Excel', 'Excel workbook', 'A real .xlsx file with a bold, frozen header, filters, clickable links, and an About sheet. Every cell is stored as text, so labels never turn into formulas, numbers, or dates.'],
  ['csv', 'CSV', 'CSV', 'Quotes, commas, and line breaks are escaped. Cells that look like formulas start with an apostrophe, so spreadsheets import them as text.'],
  ['markdown', 'Markdown', 'Markdown links', 'One [anchor text](URL) per line. An empty anchor stays empty instead of being filled with the URL.'],
  ['html', 'HTML', 'HTML table', 'A plain table. Text from the page is escaped, so it can never run as markup.'],
  ['json', 'JSON', 'JSON with full provenance', 'Every field of every link, including the source page, frame, capture time, and batch.'],
  ['text', 'URL list', 'URL list', 'One URL per line, exactly as captured.'],
  ['bibtex', 'BibTeX', 'BibTeX', 'For LaTeX and reference managers. A DOI, arXiv ID, or ISBN in an address becomes its own field.'],
  ['ris', 'RIS', 'RIS', 'The format Zotero, EndNote, and Mendeley import.'],
  ['csl', 'CSL-JSON', 'CSL-JSON', 'The citation data that Zotero, Pandoc, and other citeproc tools read.'],
  ['annotated', 'Annotated', 'Annotated bibliography', 'A numbered Markdown list, with your notes, tags, and the words around each link under its entry.'],
  ['obsidian', 'Obsidian', 'Obsidian note', 'A Markdown note with front matter, ready for a vault.'],
];
const ABOUT = () => ({ exportedAt: new Date(), collection: 'Urban heat islands: sources', view: 'All links', filters: [], version: '1.0.0' });

function mountExport(root) {
  const tabs = FORMATS.map(([id, label], index) => h('button', { type: 'button', role: 'tab', id: `lm-tab-${id}`, 'aria-controls': 'lm-export-panel', 'aria-selected': String(index === 0), tabindex: index === 0 ? '0' : '-1', 'data-format': id, text: label }));
  const noteTitle = h('strong');
  const noteText = h('span');
  const output = h('div', { class: 'lm-output', id: 'lm-export-panel', role: 'tabpanel', 'aria-labelledby': 'lm-tab-xlsx' });
  const source = h('p', { class: 'lm-source' });
  const status = h('p', { class: 'lm-status', role: 'status' });
  const download = h('button', { type: 'button', class: 'lm-btn lm-btn-lime', text: 'Download this sample' });
  const copy = h('button', { type: 'button', class: 'lm-btn', text: 'Copy' });
  root.append(h('figure', { class: 'lm-demo lm-export' },
    h('div', { class: 'lm-tabs', role: 'tablist', 'aria-label': 'Export format' }, tabs),
    h('p', { class: 'lm-note' }, noteTitle, ' ', noteText),
    output,
    h('div', { class: 'lm-actions' }, download, copy),
    status, source));

  let format = 'xlsx', rows = [];
  const result = () => makeExport(rows, { format, columns: ['anchorText', 'url'], about: ABOUT() });
  function render() {
    const [, , title, text] = FORMATS.find(([id]) => id === format);
    noteTitle.textContent = `${title}.`; noteText.textContent = text;
    output.setAttribute('aria-labelledby', `lm-tab-${format}`);
    source.textContent = selection.records.length
      ? `Showing the ${plural(rows.length, 'link')} you selected above.`
      : `Showing all ${plural(rows.length, 'link')} in the reading list. Select some above to change it.`;
    status.textContent = '';
    copy.hidden = format === 'xlsx';
    if (format === 'xlsx') {
      const sheet = h('table', { class: 'lm-sheet' },
        h('tr', { class: 'lm-colhead', 'aria-hidden': 'true' }, h('th', { class: 'lm-rownum' }), h('th', { text: 'A' }), h('th', { text: 'B' })),
        h('tr', { class: 'lm-header' }, h('td', { class: 'lm-rownum', 'aria-hidden': 'true', text: '1' }), h('th', { scope: 'col', text: 'Anchor text' }), h('th', { scope: 'col', text: 'URL' })),
        rows.map((row, index) => h('tr', {}, h('td', { class: 'lm-rownum', 'aria-hidden': 'true', text: String(index + 2) }),
          h('td', { class: row.anchorText ? null : 'lm-nil', text: row.anchorText }), h('td', { class: 'lm-url', text: row.url }))));
      output.replaceChildren(h('div', { class: 'lm-scroll' }, sheet));
      return;
    }
    let text2 = result().data;
    if (text2.length > 6000) text2 = `${text2.slice(0, 6000)}\n…`;
    output.replaceChildren(h('pre', { tabindex: '0', 'aria-label': `${title} output`, text: text2 }));
  }
  function choose(tab, focus = false) {
    for (const other of tabs) { const on = other === tab; other.setAttribute('aria-selected', String(on)); other.tabIndex = on ? 0 : -1; }
    format = tab.dataset.format;
    if (focus) tab.focus();
    render();
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => choose(tab));
    tab.addEventListener('keydown', (event) => {
      const move = { ArrowRight: index + 1, ArrowLeft: index - 1, Home: 0, End: tabs.length - 1 }[event.key];
      if (move === undefined) return;
      event.preventDefault(); choose(tabs[(move + tabs.length) % tabs.length], true);
    });
  });
  download.addEventListener('click', async () => {
    const made = result();
    await saveFile(`urban-heat-islands-sample.${made.extension}`, made.data, made.mime);
    status.textContent = `Saved urban-heat-islands-sample.${made.extension}.`;
  });
  copy.addEventListener('click', async () => { status.textContent = await copyText(result().data) ? 'Copied.' : 'This browser blocked the clipboard for the demo.'; });
  onSelection((records) => { rows = records; render(); });
}

/* 3. Identifiers: what an address alone says ----------------------------------------------- */
const EXAMPLES = [
  ['arXiv paper', 'https://arxiv.org/abs/1706.03762', 'Attention Is All You Need'],
  ['DOI link', 'https://doi.org/10.1038/s41586-020-2649-2', 'Array programming with NumPy'],
  ['Publisher page', 'https://www.science.org/doi/10.1126/science.1225829', 'the CRISPR paper'],
  ['PubMed record', 'https://pubmed.ncbi.nlm.nih.gov/32015507/', 'Abstract'],
  ['Book by ISBN', 'https://openlibrary.org/isbn/9780262046305', 'Introduction to Algorithms'],
  ['No identifier', 'https://www.nature.com/articles/s41586-020-2649-2', 'Nature article page'],
];

function mountIdentifiers(root) {
  const url = h('input', { id: 'lm-ids-url', type: 'url', inputmode: 'url', autocomplete: 'off', spellcheck: 'false', value: EXAMPLES[0][1] });
  const text = h('input', { id: 'lm-ids-text', type: 'text', autocomplete: 'off', value: EXAMPLES[0][2] });
  const chips = h('p', { class: 'lm-ids', 'aria-live': 'polite' });
  const bib = h('pre', { tabindex: '0', 'aria-label': 'BibTeX for this link' });
  const examples = EXAMPLES.map(([label, address, anchor]) => h('button', { type: 'button', class: 'lm-btn', text: label, onclick: () => { url.value = address; text.value = anchor; render(); } }));
  root.append(h('figure', { class: 'lm-demo lm-identifiers' },
    h('div', { class: 'lm-fields' },
      h('div', { class: 'lm-field' }, h('label', { for: 'lm-ids-url', text: 'A link’s address' }), url),
      h('div', { class: 'lm-field' }, h('label', { for: 'lm-ids-text', text: 'Its anchor text' }), text)),
    h('div', { class: 'lm-actions' }, examples),
    chips,
    h('p', { class: 'lm-label', text: 'BibTeX from the address and anchor text alone' }),
    bib,
    h('figcaption', {}, h('strong', { text: 'Interactive demo.' }), ' Nothing is looked up: this is only what the address itself says, read by Link Meteor’s own code.')));

  function render() {
    let address = url.value.trim();
    if (address && !/^[a-z][a-z0-9+.-]*:/i.test(address)) address = `https://${address}`;
    let valid = true;
    try { address = new URL(address).href; } catch { valid = false; }
    if (!valid || !address) { chips.replaceChildren('Enter a web address, such as an arXiv or DOI link.'); bib.textContent = ''; return; }
    const row = { id: 'one', anchorText: text.value.replace(/\s+/g, ' ').trim(), accessibleLabel: '', url: address, originalHref: address, sourceUrl: '', sourceTitle: '', frameUrl: '', capturedAt: new Date().toISOString(), batchId: 'demo', notes: '', tags: [] };
    const ids = identifiersOf(row);
    const found = Object.entries(ids).filter(([, value]) => value);
    chips.replaceChildren(...(found.length
      ? [h('span', { class: 'lm-label', text: 'Found: ' }), ...found.map(([key, value]) => h('span', { class: 'lm-chip', text: `${IDENTIFIER_LABELS[key] || key} ${value}` }))]
      : ['No identifier in this address, so none is invented.']));
    bib.textContent = makeExport([{ ...row, occurrences: [row], occurrenceIds: ['one'] }], { format: 'bibtex' }).data.trim();
  }
  url.addEventListener('input', render);
  text.addEventListener('input', render);
  render();
}

/* 4. PDFs: the links inside a PDF, with their words and pages ------------------------------ */
const OPTIONS = { isEvalSupported: false, disableFontFace: true, useSystemFonts: false, useWorkerFetch: false, enableXfa: false, verbosity: 0 };
let library;
function pdfjs() {
  library ||= import('./vendor/pdfjs/pdf.min.mjs').then((lib) => {
    lib.GlobalWorkerOptions.workerSrc = new URL('./vendor/pdfjs/pdf.worker.min.mjs', import.meta.url).href;
    return { lib, worker: new lib.PDFWorker({ name: 'link-meteor-demo' }) };
  });
  return library;
}
async function readPdf(bytes) {
  if (bytes.length > MAX_PDF_BYTES) throw new Error(`This PDF is larger than ${MAX_PDF_BYTES / 1024 / 1024} MB, the most Link Meteor reads.`);
  if (!isPdf(bytes)) throw new Error('This file isn’t a PDF.');
  const { lib, worker } = await pdfjs();
  const task = lib.getDocument({ data: bytes.slice(), worker, ...OPTIONS });
  try { return await readPdfDocument(await task.promise, { address: '' }); } finally { await task.destroy().catch(() => {}); }
}

function mountPdf(root) {
  const sample = root.dataset.sample;
  const input = h('input', { type: 'file', accept: 'application/pdf,.pdf', id: 'lm-pdf-file', class: 'lm-visually-hidden' });
  const status = h('p', { class: 'lm-status', role: 'status' });
  const about = h('div', { class: 'lm-pdf-about', hidden: true });
  const results = h('div', { class: 'lm-pdf-links' });
  const drop = h('div', { class: 'lm-drop' },
    h('p', {}, h('strong', { text: 'Drop a PDF here' }), ', or:'),
    h('div', { class: 'lm-actions' },
      h('button', { type: 'button', class: 'lm-btn lm-btn-lime', text: 'Read the practice paper', onclick: () => readSample() }),
      h('label', { class: 'lm-btn', for: 'lm-pdf-file', tabindex: '0', onkeydown: (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); input.click(); } } }, 'Choose a PDF…'),
      input));
  root.append(h('figure', { class: 'lm-demo lm-pdf' },
    drop, status, about, results,
    h('figcaption', {}, h('strong', { text: 'Interactive demo.' }), ' The PDF is read in this page with Link Meteor’s own PDF code and Mozilla’s PDF.js. It’s never uploaded.')));

  let busy = false;
  async function run(name, load) {
    if (busy) return;
    busy = true; status.textContent = `Reading ${name}…`; about.hidden = true; results.replaceChildren();
    try {
      const report = await readPdf(await load());
      show(name, report);
    } catch (error) {
      status.textContent = pdfProblem?.(error) || error.message || 'This PDF couldn’t be read.';
    } finally { busy = false; }
  }
  function show(name, report) {
    const { links, citation = {}, pageCount, skipped = [], internal = 0 } = report;
    const left = [internal && `${plural(internal, 'link')} to places inside the PDF`, skipped.length && `${plural(skipped.length, 'link')} Link Meteor can’t save`].filter(Boolean);
    status.textContent = `${name}: ${plural(links.length, 'link')} on ${plural(pageCount, 'page')}${left.length ? `, leaving out ${left.join(' and ')}` : ''}.`;
    const facts = [['Title', citation.title], ['DOI', citation.doi], ['arXiv', citation.arxiv]].filter(([, value]) => value);
    about.hidden = !facts.length;
    about.replaceChildren(h('p', { class: 'lm-label', text: 'What the PDF says about itself' }), h('dl', {}, facts.map(([term, value]) => h('div', {}, h('dt', { text: term }), h('dd', { text: value })))));
    if (!links.length) { results.replaceChildren(h('p', { class: 'lm-empty', text: 'No web links in this PDF. Scanned pages are pictures, and an address printed without a link isn’t a link.' })); return; }
    results.replaceChildren(h('div', { class: 'lm-scroll' }, h('table', { class: 'lm-table lm-table-light' },
      h('thead', {}, h('tr', {}, h('th', { scope: 'col', text: 'Page' }), h('th', { scope: 'col', text: 'Anchor text and the words around it' }), h('th', { scope: 'col', text: 'URL' }))),
      h('tbody', {}, links.slice(0, 200).map((link) => h('tr', {},
        h('td', { class: 'lm-num', text: String(link.pdfPage) }),
        h('td', {}, h('span', { class: link.anchorText ? 'lm-anchor' : 'lm-anchor lm-nil', text: link.anchorText || 'No anchor text' }), link.context ? h('span', { class: 'lm-context', text: link.context }) : null),
        h('td', { class: 'lm-url', text: link.url })))))));
  }
  function readSample() {
    run('The practice paper', async () => new Uint8Array(await (await fetch(sample)).arrayBuffer()));
  }
  const readFile = (file) => run(file.name, async () => new Uint8Array(await file.arrayBuffer()));
  input.addEventListener('change', () => { if (input.files[0]) readFile(input.files[0]); input.value = ''; });
  drop.addEventListener('dragover', (event) => { event.preventDefault(); drop.classList.add('lm-over'); });
  drop.addEventListener('dragleave', () => drop.classList.remove('lm-over'));
  drop.addEventListener('drop', (event) => {
    event.preventDefault(); drop.classList.remove('lm-over');
    const file = [...(event.dataTransfer?.files || [])][0];
    if (file) readFile(file);
  });
}

const DEMOS = { capture: mountCapture, export: mountExport, identifiers: mountIdentifiers, pdf: mountPdf };
// Mounts every empty demo container in `scope`. Safe to call again after the page re-renders.
export function mountDemos(scope = document) {
  for (const root of scope.querySelectorAll('[data-lm-demo]')) {
    if (root.childElementCount) continue;
    try { DEMOS[root.dataset.lmDemo]?.(root); }
    catch (error) { root.append(h('p', { class: 'lm-empty', text: `This demo couldn’t start: ${error.message}` })); }
  }
}
