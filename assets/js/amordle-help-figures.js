/*
 * Replays the Amordle Help-page figures on this article.
 *
 * The frames are not authored here. They are exported from the game's own
 * builders by scripts/export-help-figures.mjs in the amordle repository, where
 * every tile colour, keyboard state and price is computed by `scoreGuess`,
 * `deriveKeyboardEvidence` and `continuationCost`. This file only draws what it
 * is given and advances a timer, so a figure on the blog cannot teach a rule the
 * game does not follow.
 *
 * The markup matches figure-parts.tsx class for class, because the stylesheet is
 * the game's own — exported alongside it by scripts/export-help-figure-css.mjs.
 *
 * Like the originals: a figure starts when it scrolls into view, plays once, and
 * can be replayed on demand. Reduced-motion readers get the final frame and no
 * animation at all.
 */
(function () {
  'use strict';

  var EVIDENCE_CLASS = {
    correct: 'is-correct',
    present: 'is-present',
    absent: 'is-absent',
    removed: 'is-removed',
    unknown: 'is-unknown',
    draft: '',
  };
  var EVIDENCE_MARK = { correct: '✓', present: '~', absent: '×', removed: '−' };
  var KEYBOARD_ROWS = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];
  var COMBAT_NAMES = ['Nova', 'Rook'];

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = text;
    return node;
  }

  function tile(data) {
    var classes = ['tile'];
    var evidence = EVIDENCE_CLASS[data.state];
    if (evidence) classes.push(evidence);
    if (data.revealed) classes.push('is-revealed');
    var node = el('div', classes.join(' '));
    if (!data.letter) return node;
    node.appendChild(el('span', 'tile-letter', data.letter.toUpperCase()));
    var mark = EVIDENCE_MARK[data.state];
    if (mark) {
      var span = el('span', 'tile-evidence', mark);
      span.setAttribute('aria-hidden', 'true');
      node.appendChild(span);
    }
    return node;
  }

  /*
   * Boards and keyboards are built once and then UPDATED, never rebuilt.
   *
   * The first version replaced the whole stage on every frame. The classes were
   * all correct — a probe caught `.key.is-pressed` on twelve of eighteen samples
   * — but a brand-new element has nothing to transition from, so the game's
   * `--duration-feedback` ease never ran and a keypress read as a flicker rather
   * than a press. The Help page's own comment says that easing is what makes it
   * read as a press, and it is only available to an element that survives.
   */
  function board(wrap, rows) {
    if (!wrap) wrap = el('div', 'help-board');
    var list = rows || [];

    while (wrap.children.length > list.length) wrap.removeChild(wrap.lastChild);
    while (wrap.children.length < list.length) {
      var entry = el('div', 'help-board-entry');
      entry.appendChild(el('span', 'help-row-meta'));
      entry.appendChild(el('div', 'board-row'));
      wrap.appendChild(entry);
    }

    list.forEach(function (row, index) {
      var entry = wrap.children[index];
      var meta = entry.firstChild;
      var line = entry.lastChild;
      var metaClass = row.seed ? 'help-row-meta is-seed' : 'help-row-meta';
      if (meta.className !== metaClass) meta.className = metaClass;
      if (meta.textContent !== (row.meta || '')) meta.textContent = row.meta || '';
      var lineClass = row.draft ? 'board-row is-draft' : 'board-row';
      if (line.className !== lineClass) line.className = lineClass;

      var tiles = row.tiles || [];
      while (line.children.length > tiles.length) line.removeChild(line.lastChild);
      while (line.children.length < tiles.length) line.appendChild(el('div', 'tile'));
      tiles.forEach(function (data, position) {
        syncTile(line.children[position], data);
      });
    });
    return wrap;
  }

  function syncTile(node, data) {
    var classes = ['tile'];
    var evidence = EVIDENCE_CLASS[data.state];
    if (evidence) classes.push(evidence);
    if (data.revealed) classes.push('is-revealed');
    var className = classes.join(' ');
    if (node.className !== className) node.className = className;

    if (!data.letter) {
      if (node.firstChild) node.textContent = '';
      return;
    }
    var letter = node.querySelector('.tile-letter');
    if (!letter) {
      node.textContent = '';
      letter = el('span', 'tile-letter');
      node.appendChild(letter);
    }
    var glyph = data.letter.toUpperCase();
    if (letter.textContent !== glyph) letter.textContent = glyph;

    var mark = EVIDENCE_MARK[data.state];
    var evidenceNode = node.querySelector('.tile-evidence');
    if (mark) {
      if (!evidenceNode) {
        evidenceNode = el('span', 'tile-evidence');
        evidenceNode.setAttribute('aria-hidden', 'true');
        node.appendChild(evidenceNode);
      }
      if (evidenceNode.textContent !== mark) evidenceNode.textContent = mark;
    } else if (evidenceNode) {
      node.removeChild(evidenceNode);
    }
  }

  function keyboard(wrap, evidence, pressed) {
    if (!wrap) {
      wrap = el('div', 'keyboard');
      KEYBOARD_ROWS.forEach(function (row, rowIndex) {
        var line = el('div', 'keyboard-row');
        if (rowIndex === 2) line.appendChild(el('span', 'key is-wide is-unknown', 'SUBMIT'));
        row.split('').forEach(function (letter) {
          var key = el('span', 'key is-unknown');
          key.appendChild(el('span', 'key-glyph', letter.toUpperCase()));
          var mark = el('span', 'key-evidence');
          mark.setAttribute('aria-hidden', 'true');
          key.appendChild(mark);
          key.dataset.key = letter;
          line.appendChild(key);
        });
        if (rowIndex === 2) line.appendChild(el('span', 'key is-wide is-unknown', 'DELETE'));
        wrap.appendChild(line);
      });
    }

    Array.prototype.forEach.call(wrap.querySelectorAll('.key'), function (key) {
      var letter = key.dataset.key;
      var classes;
      if (letter) {
        var state = (evidence && evidence[letter]) || 'unknown';
        classes = ['key', EVIDENCE_CLASS[state] || 'is-unknown'];
        if (pressed === letter) classes.push('is-pressed');
        var mark = key.querySelector('.key-evidence');
        var glyph = state === 'absent' || state === 'removed' ? EVIDENCE_MARK[state] : '';
        if (mark && mark.textContent !== glyph) mark.textContent = glyph;
      } else {
        classes = ['key', 'is-wide', 'is-unknown'];
        if (pressed === key.textContent.toLowerCase()) classes.push('is-pressed');
      }
      var className = classes.join(' ');
      if (key.className !== className) key.className = className;
    });
    return wrap;
  }

  function calendar(days) {
    var wrap = el('div', 'help-calendar');
    var weekdays = el('div', 'help-weekdays');
    ['M', 'T', 'W', 'T', 'F', 'S', 'S'].forEach(function (label) {
      weekdays.appendChild(el('span', null, label));
    });
    wrap.appendChild(weekdays);
    var grid = el('div', 'help-calendar-grid');
    (days || []).forEach(function (day) {
      var classes = ['help-day'];
      if (day.future) classes.push('is-future');
      if (day.target) classes.push('is-target');
      if (day.selected) classes.push('is-selected');
      if (day.unlocked) classes.push('is-unlocked');
      var cell = el('span', classes.join(' '));
      cell.appendChild(el('span', null, String(day.day)));
      cell.appendChild(el('small', null, day.label));
      grid.appendChild(cell);
    });
    wrap.appendChild(grid);
    return wrap;
  }

  function toolBar(parts, key, label, firing) {
    if (!parts[key]) {
      parts[key] = el('div', 'help-tool-bar');
      parts[key].appendChild(el('span', 'help-tool-button'));
    }
    var button = parts[key].firstChild;
    var className = firing ? 'help-tool-button is-firing' : 'help-tool-button';
    if (button.className !== className) button.className = className;
    if (button.textContent !== label) button.textContent = label;
    return parts[key];
  }

  function note(parts, text) {
    if (!parts.note) parts.note = el('p', 'help-note');
    if (parts.note.textContent !== (text || '')) parts.note.textContent = text || '';
    return parts.note;
  }

  /** Appends each part once, in order, and leaves it there for later frames. */
  function place(stage, nodes) {
    nodes.forEach(function (node) {
      if (node && node.parentNode !== stage) stage.appendChild(node);
    });
  }

  function toggleAttribute(node, name, value, on) {
    if (on) {
      if (node.getAttribute(name) !== value) node.setAttribute(name, value);
    } else if (node.hasAttribute(name)) {
      node.removeAttribute(name);
    }
  }

  /* One renderer per figure, each mirroring its component in figures.tsx. */
  var RENDERERS = {
    go: function (stage, frame, meta, parts) {
      parts.board = board(parts.board, frame.rows);
      place(stage, [parts.board, note(parts, frame.note)]);
    },
    combat: function (stage, frame, meta, parts) {
      var evidence = frame.evidence || {};
      if (!parts.combat) {
        parts.combat = el('div', 'help-combat');
        parts.sides = [0, 1].map(function (seat) {
          var side = el('div', 'help-combat-side');
          if (seat === 1) side.setAttribute('data-accent', 'violet');
          side.appendChild(el('div', 'help-combat-name', COMBAT_NAMES[seat]));
          return side;
        });
        parts.keyboards = parts.sides.map(function (side) {
          var kb = keyboard(null, {}, undefined);
          side.appendChild(kb);
          return kb;
        });
        parts.boardWrap = el('div', 'help-combat-board');
        parts.board = board(null, []);
        parts.boardWrap.appendChild(parts.board);
        parts.combat.appendChild(parts.sides[0]);
        parts.combat.appendChild(parts.boardWrap);
        parts.combat.appendChild(parts.sides[1]);
      }

      [0, 1].forEach(function (seat) {
        var active = frame.seat === seat;
        var className = active ? 'help-combat-side is-active' : 'help-combat-side';
        if (parts.sides[seat].className !== className) parts.sides[seat].className = className;
        keyboard(parts.keyboards[seat], evidence, active ? frame.pressed : undefined);
      });
      // The board takes the accent of whoever is on move.
      toggleAttribute(parts.boardWrap, 'data-accent', 'violet', frame.seat === 1);
      board(parts.board, frame.rows);
      place(stage, [parts.combat, note(parts, frame.note)]);
    },
    reveal: function (stage, frame, meta, parts) {
      var bar = toolBar(parts, 'bar', 'Reveal one letter · ' + meta.revealPrice + ' coins', frame.firing);
      parts.board = board(parts.board, frame.rows);
      place(stage, [bar, parts.board, note(parts, frame.note)]);
    },
    // No board: the remove figure is the keyboard, and the label is the game's.
    remove: function (stage, frame, meta, parts) {
      var bar = toolBar(parts, 'bar', 'Remove wrong letters · ' + meta.removePrice + ' coins', frame.firing);
      parts.keyboard = keyboard(parts.keyboard, frame.evidence || {}, undefined);
      place(stage, [bar, parts.keyboard, note(parts, frame.note)]);
    },
    daily: function (stage, frame, meta, parts) {
      // The calendar has no transitions to preserve and changes shape between
      // frames, so it is the one part still redrawn wholesale.
      if (!parts.calendarSlot) parts.calendarSlot = el('div');
      parts.calendarSlot.textContent = '';
      parts.calendarSlot.appendChild(calendar(frame.days));
      var bar = toolBar(parts, 'bar', 'Unlock · ' + meta.dailyUnlockPrice + ' coins', frame.firing);
      place(stage, [parts.calendarSlot, bar, note(parts, frame.note)]);
    },
    continue: function (stage, frame, meta, parts) {
      parts.board = board(parts.board, frame.rows);
      if (!parts.result) parts.result = el('div', 'help-result');
      parts.result.textContent = frame.result || '';
      parts.result.hidden = !frame.result;
      var bar = toolBar(parts, 'bar', 'Open another row · ' + meta.continuePrice + ' coins', frame.firing);
      place(stage, [parts.board, parts.result, bar, note(parts, frame.note)]);
    },
  };

  function mount(figure, frames, meta) {
    var name = figure.getAttribute('data-amordle-figure');
    var render = RENDERERS[name];
    if (!render || !frames || !frames.length) return;

    var stage = figure.querySelector('[data-figure-stage]');
    var replay = figure.querySelector('[data-figure-replay]');
    if (!stage) return;

    var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var timer = null;
    var index = 0;

    // Persistent per figure, so every frame updates the same elements.
    var parts = {};

    function draw(at) {
      render(stage, frames[at], meta, parts);
    }

    function stop() {
      if (timer) window.clearTimeout(timer);
      timer = null;
    }

    function step() {
      draw(index);
      if (index >= frames.length - 1) {
        stop();
        return;
      }
      var hold = frames[index].hold || 700;
      timer = window.setTimeout(function () {
        index += 1;
        step();
      }, hold);
    }

    function play() {
      stop();
      index = 0;
      step();
    }

    if (reduced) {
      // The last frame is the finished state, which is the whole lesson without
      // any of the movement.
      draw(frames.length - 1);
      if (replay) replay.hidden = true;
      return;
    }

    draw(0);
    if (replay) replay.addEventListener('click', play);

    if ('IntersectionObserver' in window) {
      var seen = false;
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting || seen) return;
            seen = true;
            play();
          });
        },
        { threshold: 0.35 },
      );
      observer.observe(figure);
    } else {
      play();
    }
  }

  /*
   * Inline data first, network second.
   *
   * The published page links the JSON and fetches it, which keeps the document
   * small. But a preview may be a single self-contained file under a policy that
   * forbids fetch of any kind — including a data: URL — and there the figures
   * all rendered their fallback text. Reading an embedded block when one is
   * present covers both without the page having to know which it is.
   */
  function loadFigureData() {
    var inline = document.getElementById('amordle-figure-data');
    if (inline && inline.textContent.trim()) {
      try {
        return Promise.resolve(JSON.parse(inline.textContent));
      } catch (error) {
        /* Fall through to the network. */
      }
    }
    var source = document.querySelector('[data-figures-url]');
    if (!source) return Promise.reject(new Error('no figure data'));
    return fetch(source.getAttribute('data-figures-url')).then(function (response) {
      if (!response.ok) throw new Error('figure data unavailable');
      return response.json();
    });
  }

  function ready() {
    var figures = document.querySelectorAll('[data-amordle-figure]');
    if (!figures.length) return;

    loadFigureData()
      .then(function (data) {
        // Every price comes from the export, never restated here.
        var meta = {
          revealPrice: data.prices.reveal,
          removePrice: data.prices.remove,
          dailyUnlockPrice: data.prices.dailyUnlock,
          continuePrice: data.continuePrice,
        };
        Array.prototype.forEach.call(figures, function (figure) {
          mount(figure, data.figures[figure.getAttribute('data-amordle-figure')], meta);
        });
      })
      .catch(function () {
        Array.prototype.forEach.call(figures, function (figure) {
          var stage = figure.querySelector('[data-figure-stage]');
          if (stage) stage.textContent = 'This figure could not load. The Help page has it too.';
        });
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
  } else {
    ready();
  }
})();
