/*
 * The interactive figures for the Ars Magna article.
 *
 * Four of them, each mounted into a <figure data-demo="..."> in place of its
 * fallback text, so the article's markup stays plain:
 *
 * - search: the site's real engine, loaded into the page, counting and
 *   unranking. Prose can say "counted without listing"; this lets the reader
 *   ask for the millionth anagram and get it.
 * - branching: the scarcest-letter search on a fifteen-word dictionary, step
 *   by step, with the textbook shortcut that silently loses answers.
 * - tray: Build's letter tray, which counts the letters down as you type.
 * - discover: a handful of real Discover cards.
 *
 * Nothing here restates the engine's rules beyond what a figure needs. The
 * branching figure is a teaching copy of the search, small enough to watch;
 * the search figure is the engine itself.
 *
 * The post names where its files live: data-am-demos holds the engine and the
 * dictionary (built by tools/ars-magna-demos), and data-am-discover the cards.
 */
(function () {
  'use strict';

  var SITE = 'https://ars-magna.pages.dev';
  var DICT_BYTES = '3.2 MB';
  var POST = document.querySelector('[data-am-demos]');
  var DEMOS = new URL(POST ? POST.getAttribute('data-am-demos') : './', document.baseURI);
  var CARDS = [];

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (key) {
      if (key === 'text') node.textContent = attrs[key];
      else if (key === 'className') node.className = attrs[key];
      else node.setAttribute(key, attrs[key]);
    });
    (children || []).forEach(function (child) {
      if (child) node.append(child);
    });
    return node;
  }

  function fold(text) {
    return text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  }

  function lettersOf(text) {
    return fold(text).replace(/[^a-z]/g, '');
  }

  // A card belongs to a search when the two use the same letters in any
  // order, as on the site: Sol Terra Luna finds the Luna Terra Sol card.
  function sortedLetters(text) {
    return lettersOf(text).split('').sort().join('');
  }

  function loadCards() {
    var url = POST && POST.getAttribute('data-am-discover');
    if (!url) return Promise.resolve();
    return fetch(url)
      .then(function (response) {
        if (!response.ok) throw new Error('HTTP ' + response.status);
        return response.json();
      })
      .then(function (list) {
        CARDS = list;
      })
      .catch(function () {
        CARDS = [];
      });
  }

  function cardLink(card) {
    return SITE + '/hits/' + card.slug + '/';
  }

  var SECTION_LABEL = { greatest: 'Greatest Hits', interesting: 'Interesting', stretch: 'A stretch' };

  /* ------------------------------------------------------------------ */
  /* Search: the real engine.                                            */
  /* ------------------------------------------------------------------ */

  var enginePromise = null;

  // The engine is a module bundle that announces itself on window. It is
  // only requested once a reader reaches the figure: 3 MB is a fair price
  // for someone about to search, and none at all for someone skimming.
  function loadEngine() {
    if (enginePromise) return enginePromise;
    enginePromise = new Promise(function (resolve, reject) {
      if (window.ArsMagnaEngine) return resolve(window.ArsMagnaEngine);
      var timer = setTimeout(function () {
        reject(new Error('the engine took too long to load'));
      }, 20000);
      window.addEventListener(
        'arsmagna:engine',
        function () {
          clearTimeout(timer);
          resolve(window.ArsMagnaEngine);
        },
        { once: true },
      );
      var script = document.createElement('script');
      script.type = 'module';
      script.src = new URL('engine.js', DEMOS).href;
      script.onerror = function () {
        clearTimeout(timer);
        reject(new Error('the engine script was blocked'));
      };
      document.head.append(script);
    }).then(function (mod) {
      // The worker resolves relative URLs against its own script, not the
      // page, so the dictionary's address is made absolute here.
      return mod.ArsMagnaClient.create(new URL('dict', DEMOS).href).then(function (client) {
        if (client.status.state === 'failed') throw new Error(client.status.message);
        return { client: client, query: mod.DEFAULT_QUERY };
      });
    });
    enginePromise.catch(function () {
      enginePromise = null;
    });
    return enginePromise;
  }

  function formatBig(value) {
    return BigInt(value).toLocaleString('en-US');
  }

  function randomBelow(n) {
    if (n <= 9007199254740991n) return BigInt(Math.floor(Math.random() * Number(n)));
    var digits = '';
    for (var i = 0; i < n.toString().length + 4; i += 1) digits += Math.floor(Math.random() * 10);
    return BigInt(digits) % n;
  }

  function mountSearch(fig) {
    var PRESETS = ['Clint Eastwood', 'Sol Terra Luna', 'William Shakespeare', 'Dormitory', 'The Morse Code', 'Eleven plus two'];
    var input = el('input', {
      id: 'am-search-text',
      className: 'am-input',
      type: 'text',
      value: 'Clint Eastwood',
      autocomplete: 'off',
      spellcheck: 'false',
      maxlength: '60',
    });
    var go = el('button', { className: 'am-btn', type: 'submit', text: 'Search' });
    var form = el('form', { className: 'am-search' }, [
      el('label', { for: 'am-search-text', className: 'am-label', text: 'Any text' }),
      el('div', { className: 'am-row' }, [input, go]),
    ]);
    var chips = el('div', { className: 'am-chips', role: 'group', 'aria-label': 'Examples' });
    PRESETS.forEach(function (text) {
      var chip = el('button', { className: 'am-chip', type: 'button', text: text });
      chip.addEventListener('click', function () {
        input.value = text;
        run();
      });
      chips.append(chip);
    });

    var big = el('span', { className: 'am-big', text: '—' });
    var countLine = el('p', { className: 'am-count' }, [big, el('span', { className: 'am-count-of' })]);
    var meta = el('p', { className: 'am-meta', 'aria-live': 'polite', text: 'Waiting to load the dictionary (' + DICT_BYTES + ').' });
    var onDiscover = el('div', { className: 'am-ondiscover', hidden: '' });
    var results = el('ol', { className: 'am-results', 'aria-label': 'Anagrams' });
    var surprise = el('button', { className: 'am-btn am-btn--quiet', type: 'button', text: 'Surprise me' });
    var gotoInput = el('input', {
      id: 'am-search-goto',
      className: 'am-input am-input--short',
      type: 'text',
      inputmode: 'numeric',
      placeholder: '1,000,000',
      autocomplete: 'off',
    });
    var gotoButton = el('button', { className: 'am-btn am-btn--quiet', type: 'submit', text: 'Go' });
    var gotoForm = el('form', { className: 'am-goto' }, [
      el('label', { for: 'am-search-goto', className: 'am-label am-label--inline', text: 'Go to anagram #' }),
      gotoInput,
      gotoButton,
    ]);
    var siteLink = el('a', { className: 'am-sitelink', href: SITE, target: '_blank', rel: 'noopener', text: 'Open this search on the site' });
    var actions = el('div', { className: 'am-actions' }, [surprise, gotoForm]);

    fig.replaceChildren(
      el('figcaption', { className: 'am-cap', text: 'The real engine, running in this page' }),
      form,
      chips,
      countLine,
      meta,
      onDiscover,
      results,
      actions,
      el('p', { className: 'am-foot' }, [siteLink]),
    );

    var engine = null;
    var total = 0n;
    var seq = 0;

    function setBusy(busy) {
      go.disabled = busy;
      surprise.disabled = busy || total < 2n;
      gotoButton.disabled = busy || total < 1n;
    }

    function showDiscover(text) {
      var letters = sortedLetters(text);
      var match = CARDS.filter(function (card) {
        return sortedLetters(card.input) === letters;
      });
      onDiscover.replaceChildren();
      onDiscover.hidden = match.length === 0;
      match.slice(0, 2).forEach(function (card) {
        onDiscover.append(
          el('p', {}, [
            el('span', { className: 'am-ondiscover-label', text: 'On Discover' }),
            el('a', { href: cardLink(card), target: '_blank', rel: 'noopener', className: 'am-ondiscover-words', text: card.anagram }),
            el('span', { className: 'am-ondiscover-why', text: card.why }),
          ]),
        );
      });
    }

    function row(index, words, highlight) {
      return el('li', { className: highlight ? 'is-picked' : '' }, [
        el('span', { className: 'am-idx', text: '#' + formatBig(index + 1n) }),
        el('span', { className: 'am-words', text: words.join(' ') }),
      ]);
    }

    // A random handful, by position: each one is fetched by unranking, so a
    // position in the ten millions costs the same as the first.
    function drawSample(mine) {
      var want = total < 8n ? Number(total) : 8;
      var picks = [];
      if (total <= 8n) {
        for (var i = 0n; i < total; i += 1n) picks.push(i);
      } else {
        var seen = {};
        while (picks.length < want) {
          var at = randomBelow(total);
          if (!seen[at]) {
            seen[at] = true;
            picks.push(at);
          }
        }
        picks.sort(function (a, b) {
          return a < b ? -1 : a > b ? 1 : 0;
        });
      }
      var started = performance.now();
      return picks
        .reduce(function (chain, index) {
          return chain.then(function (rows) {
            return engine.client.nth(index).then(function (words) {
              rows.push([index, words || []]);
              return rows;
            });
          });
        }, Promise.resolve([]))
        .then(function (rows) {
          if (mine !== seq) return;
          results.replaceChildren.apply(
            results,
            rows.map(function (pair) {
              return row(pair[0], pair[1], false);
            }),
          );
          var ms = Math.max(1, Math.round(performance.now() - started));
          if (total > 8n) meta.textContent = meta.dataset.base + ' · ' + rows.length + ' picked at random positions in ' + ms + ' ms';
        });
    }

    function run() {
      var text = input.value.trim();
      if (!text) return;
      var mine = ++seq;
      siteLink.href = SITE + '/#q=' + encodeURIComponent(text);
      showDiscover(text);
      setBusy(true);
      if (!engine) meta.textContent = 'Loading the dictionary (' + DICT_BYTES + ', once)…';
      loadEngine()
        .then(function (loaded) {
          engine = loaded;
          if (mine !== seq) return;
          meta.textContent = 'Counting…';
          var started = performance.now();
          // The site's own default: $, ! and @ may also stand for a letter.
          var query = Object.assign({}, engine.query, { input: text, leet: ['$', '!', '@'] });
          engine.client.solve(
            query,
            {
              onCount: function (value, candidates, textLeftOut, unused) {
                if (mine !== seq) return;
                var floor = value.charAt(0) === '>';
                total = BigInt(floor ? value.slice(1) : value);
                var ms = Math.max(1, Math.round(performance.now() - started));
                big.textContent = (floor ? 'more than ' : '') + formatBig(total);
                countLine.lastChild.textContent = (total === 1n ? ' anagram of ' : ' anagrams of ') + fold(text);
                var base = 'Standard dictionary · counted in ' + ms + ' ms, in your browser';
                if (textLeftOut) base += ' · the text itself is left out';
                if (unused) base += ' · nothing uses ' + unused;
                meta.dataset.base = base;
                meta.textContent = base;
              },
              onDone: function () {
                if (mine !== seq) return;
                if (total === 0n) {
                  results.replaceChildren();
                  setBusy(false);
                  return;
                }
                drawSample(mine).then(function () {
                  if (mine === seq) setBusy(false);
                });
              },
              onError: function (code, message) {
                if (mine !== seq) return;
                big.textContent = '—';
                countLine.lastChild.textContent = '';
                meta.textContent = message || 'That text could not be searched.';
                results.replaceChildren();
                total = 0n;
                setBusy(false);
              },
            },
            0,
          );
        })
        .catch(function (error) {
          if (mine !== seq) return;
          meta.replaceChildren(
            document.createTextNode('The live search could not start here (' + error.message + '). '),
            el('a', { href: SITE + '/#q=' + encodeURIComponent(text), target: '_blank', rel: 'noopener', text: 'Try it on the site.' }),
          );
          go.disabled = false;
        });
    }

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      run();
    });
    surprise.addEventListener('click', function () {
      if (!engine || total < 2n) return;
      setBusy(true);
      var mine = seq;
      drawSample(mine).then(function () {
        if (mine === seq) setBusy(false);
      });
    });
    gotoForm.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!engine) return;
      var digits = gotoInput.value.replace(/[^0-9]/g, '');
      if (!digits) return;
      var position = BigInt(digits);
      if (position < 1n || position > total) {
        meta.textContent = 'Pick a number from 1 to ' + formatBig(total) + '.';
        return;
      }
      var mine = seq;
      var started = performance.now();
      engine.client.nth(position - 1n).then(function (words) {
        if (mine !== seq) return;
        results.replaceChildren(row(position - 1n, words || [], true));
        meta.textContent =
          'Anagram #' + formatBig(position) + ' of ' + formatBig(total) + ', fetched in ' + Math.max(1, Math.round(performance.now() - started)) + ' ms without listing the ones before it';
      });
    });

    setBusy(false);
    surprise.disabled = true;
    gotoButton.disabled = true;

    // Start when the figure is close to the screen, not on page load.
    if ('IntersectionObserver' in window) {
      var watcher = new IntersectionObserver(
        function (entries) {
          if (entries.some(function (entry) { return entry.isIntersecting; })) {
            watcher.disconnect();
            run();
          }
        },
        { rootMargin: '300px' },
      );
      watcher.observe(fig);
    } else {
      run();
    }
  }

  /* ------------------------------------------------------------------ */
  /* Branching: the search, small enough to watch.                       */
  /* ------------------------------------------------------------------ */

  var ABC = 'abcdefghijklmnopqrstuvwxyz';
  var TEXT = 'dormitory';
  var DICTIONARY = ['dirty', 'roomy', 'dirt', 'riot', 'room', 'tidy', 'dry', 'moo', 'rid', 'rim', 'rod', 'too', 'toy', 'try', 'my'];

  function counts(word) {
    var c = new Array(26).fill(0);
    for (var i = 0; i < word.length; i += 1) c[ABC.indexOf(word[i])] += 1;
    return c;
  }
  function fits(c, rem) {
    return c.every(function (n, i) { return n <= rem[i]; });
  }
  function minus(rem, c) {
    return rem.map(function (n, i) { return n - c[i]; });
  }
  function isEmpty(rem) {
    return rem.every(function (n) { return n === 0; });
  }
  // The engine's own rule: fewest copies left, ties to the earlier letter.
  function scarcest(rem) {
    var best = -1;
    var bestCount = 99;
    rem.forEach(function (n, i) {
      if (n && n < bestCount) {
        bestCount = n;
        best = i;
      }
    });
    return best;
  }
  function an(letter) {
    return ('aefhilmnorsx'.indexOf(letter) >= 0 ? 'an ' : 'a ') + letter;
  }
  function spell(rem) {
    var out = '';
    rem.forEach(function (n, i) {
      for (var k = 0; k < n; k += 1) out += ABC[i];
    });
    return out;
  }

  // Longest first, as the engine orders its candidates.
  var WORDS = DICTIONARY.slice()
    .sort(function (a, b) { return b.length - a.length || (a < b ? -1 : 1); })
    .map(function (w) { return { w: w, c: counts(w) }; });

  function sortedKey(words) {
    return words.slice().sort().join(' ');
  }

  // How each anagram reads best, as the site would order its words; the walk
  // itself picks them in search order (dirt, then roomy).
  var PHRASE = {
    'dirty room': 'dirty room',
    'dirt roomy': 'roomy dirt',
    'dry rim too': 'dry rim too',
    'moo rid try': 'rid moo try',
    'my riot rod': 'riot rod my',
    'rim rod toy': 'rod rim toy',
  };
  function phrase(words) {
    var key = sortedKey(words);
    return PHRASE[key] || words.join(' ');
  }

  // Every anagram by brute force: try everything, keep each set once.
  function reference() {
    var found = {};
    (function go(rem, picked) {
      if (isEmpty(rem)) {
        found[sortedKey(picked)] = true;
        return;
      }
      WORDS.forEach(function (x) {
        if (fits(x.c, rem)) go(minus(rem, x.c), picked.concat(x.w));
      });
    })(counts(TEXT), []);
    return Object.keys(found);
  }

  // The walk, recorded step by step. With `textbook`, word order is enforced
  // along the whole path instead of within one letter's run, which is the
  // shortcut that silently drops answers.
  function trace(textbook) {
    var steps = [];
    var found = [];
    function view(rem, letter, stack, min, current, note, kind) {
      var bucket = [];
      if (letter >= 0) {
        WORDS.forEach(function (x, i) {
          if (!x.c[letter]) return;
          var state = i < min ? 'order' : !fits(x.c, rem) ? 'nofit' : i === current ? 'current' : 'open';
          bucket.push({ w: x.w, state: state });
        });
      }
      steps.push({
        kind: kind,
        left: spell(rem),
        letter: letter >= 0 ? ABC[letter] : '',
        stack: stack.map(function (i) { return WORDS[i].w; }),
        bucket: bucket,
        note: note,
        found: found.slice(),
      });
    }
    function pivot(rem, stack, carry) {
      if (isEmpty(rem)) {
        var words = stack.map(function (i) { return WORDS[i].w; });
        found.push(phrase(words));
        view(rem, -1, stack, 0, -1, 'No letters left: found “' + phrase(words) + '”.', 'found');
        return;
      }
      var letter = scarcest(rem);
      var min = textbook ? carry : 0;
      var copies = rem[letter];
      var note =
        ABC[letter] + ' is the scarcest letter left (' + copies + (copies === 1 ? ' copy' : ' copies') + '). Every anagram from here has a word with ' + ABC[letter] + ', so only those words are tried.';
      if (textbook && min > 0) note += ' The shortcut skips every word listed before “' + WORDS[min].w + '”.';
      view(rem, letter, stack, min, -1, note, 'pivot');
      run(rem, letter, min, stack);
    }
    function run(rem, letter, min, stack) {
      var any = false;
      for (var i = min; i < WORDS.length; i += 1) {
        var x = WORDS[i];
        if (!x.c[letter] || !fits(x.c, rem)) continue;
        any = true;
        var next = minus(rem, x.c);
        stack.push(i);
        view(rem, letter, stack.slice(0, -1), min, i, 'Try “' + x.w + '”. ' + (isEmpty(next) ? 'That uses the last letters.' : 'Letters left: ' + spell(next) + '.'), 'take');
        if (next[letter] > 0) {
          view(next, letter, stack, i, -1, 'Still ' + next[letter] + ' ' + ABC[letter] + ' left, so the next word needs ' + an(ABC[letter]) + ' too. Within one letter, words are taken in list order, from “' + x.w + '” on.', 'same');
          run(next, letter, i, stack);
        } else {
          pivot(next, stack, i);
        }
        stack.pop();
      }
      if (!any) view(rem, letter, stack, min, -1, 'No word with ' + ABC[letter] + ' fits what’s left. Back up.', 'dead');
    }
    pivot(counts(TEXT), [], 0);
    return { steps: steps, found: found };
  }

  function mountBranching(fig) {
    var truth = reference();
    var plans = { runs: trace(false), textbook: trace(true) };
    var mode = 'runs';
    var at = 0;
    var timer = null;

    var pool = el('div', { className: 'am-pool', 'aria-label': 'Letters left' });
    var path = el('p', { className: 'am-path' });
    var bucketTitle = el('p', { className: 'am-label' });
    var bucket = el('ul', { className: 'am-bucket' });
    var note = el('p', { className: 'am-note', 'aria-live': 'polite' });
    var foundTitle = el('p', { className: 'am-label' });
    var foundList = el('ul', { className: 'am-found' });
    var verdict = el('p', { className: 'am-verdict', hidden: '' });

    var step = el('button', { className: 'am-btn', type: 'button', text: 'Step' });
    var play = el('button', { className: 'am-btn am-btn--quiet', type: 'button', text: 'Play' });
    var finish = el('button', { className: 'am-btn am-btn--quiet', type: 'button', text: 'Finish' });
    var reset = el('button', { className: 'am-btn am-btn--quiet', type: 'button', text: 'Reset' });
    var toggle = el('input', { type: 'checkbox', id: 'am-textbook' });
    var toggleLabel = el('label', { className: 'am-toggle', for: 'am-textbook' }, [toggle, document.createTextNode(' Use the textbook shortcut')]);

    fig.replaceChildren(
      el('figcaption', { className: 'am-cap', text: 'Every anagram of “dormitory”, from a fifteen-word dictionary' }),
      el('p', { className: 'am-dict' }, [el('span', { className: 'am-label am-label--inline', text: 'Dictionary ' }), document.createTextNode(DICTIONARY.join(', '))]),
      el('div', { className: 'am-branch' }, [
        el('div', { className: 'am-branch-main' }, [el('p', { className: 'am-label', text: 'Letters left' }), pool, path, bucketTitle, bucket, note]),
        el('div', { className: 'am-branch-side' }, [foundTitle, foundList, verdict]),
      ]),
      el('div', { className: 'am-actions' }, [step, play, finish, reset, toggleLabel]),
    );

    function render() {
      var plan = plans[mode];
      var s = plan.steps[Math.min(at, plan.steps.length - 1)];
      pool.replaceChildren.apply(
        pool,
        s.left.split('').map(function (ch) {
          return el('span', { className: 'am-tile' + (ch === s.letter ? ' is-pivot' : ''), text: ch });
        }),
      );
      if (!s.left) pool.append(el('span', { className: 'am-empty', text: 'none' }));
      path.replaceChildren(el('span', { className: 'am-label am-label--inline', text: 'Words so far ' }), document.createTextNode(s.stack.length ? s.stack.join(' + ') : 'none yet'));
      bucketTitle.textContent = s.letter ? 'Words with ' + s.letter : '';
      bucket.replaceChildren.apply(
        bucket,
        s.bucket.map(function (b) {
          var label = b.state === 'nofit' ? ' (doesn’t fit)' : b.state === 'order' ? ' (earlier in the list)' : '';
          return el('li', { className: 'is-' + b.state, title: label.trim() }, [document.createTextNode(b.w), el('span', { className: 'am-visually-hidden', text: label })]);
        }),
      );
      note.textContent = s.note;
      foundTitle.textContent = 'Found ' + s.found.length + ' of ' + truth.length;
      foundList.replaceChildren.apply(
        foundList,
        s.found.map(function (f) {
          return el('li', { text: f });
        }),
      );
      var done = at >= plan.steps.length - 1;
      verdict.hidden = !done;
      if (done) {
        var have = {};
        plan.found.forEach(function (f) { have[sortedKey(f.split(' '))] = true; });
        // Named as the correct search spells them, in the order it finds them.
        var lost = plans.runs.found.filter(function (f) { return !have[sortedKey(f.split(' '))]; });
        verdict.className = 'am-verdict' + (lost.length ? ' is-bad' : ' is-good');
        verdict.textContent = lost.length
          ? 'Done, and wrong: the shortcut found ' + plan.found.length + ' of ' + truth.length + '. It lost ' + lost.join(', ') + ', without any sign that it had.'
          : 'Done: ' + plan.found.length + ' of ' + truth.length + ', the same set a brute-force search finds, each found once.';
      }
      step.disabled = done;
      finish.disabled = done;
      play.disabled = done;
      if (done) stop();
    }

    function stop() {
      if (timer) clearInterval(timer);
      timer = null;
      play.textContent = 'Play';
    }

    step.addEventListener('click', function () {
      stop();
      at += 1;
      render();
    });
    play.addEventListener('click', function () {
      if (timer) return stop();
      play.textContent = 'Pause';
      timer = setInterval(function () {
        at += 1;
        render();
      }, 650);
    });
    finish.addEventListener('click', function () {
      stop();
      at = plans[mode].steps.length - 1;
      render();
    });
    reset.addEventListener('click', function () {
      stop();
      at = 0;
      render();
    });
    toggle.addEventListener('change', function () {
      stop();
      mode = toggle.checked ? 'textbook' : 'runs';
      at = 0;
      render();
    });
    render();
  }

  /* ------------------------------------------------------------------ */
  /* Tray: Build's letter count.                                         */
  /* ------------------------------------------------------------------ */

  function mountTray(fig) {
    var text = el('input', { id: 'am-tray-text', className: 'am-input', type: 'text', value: 'Dormitory', autocomplete: 'off', spellcheck: 'false', maxlength: '60' });
    var anagram = el('input', { id: 'am-tray-anagram', className: 'am-input', type: 'text', value: 'dirty roo', autocomplete: 'off', spellcheck: 'false', maxlength: '80' });
    var tray = el('div', { className: 'am-tray', role: 'group', 'aria-label': 'Letters to use' });
    var line = el('p', { className: 'am-trayline', 'aria-live': 'polite' });

    fig.replaceChildren(
      el('figcaption', { className: 'am-cap', text: 'The letter tray from Build' }),
      el('div', { className: 'am-traygrid' }, [
        el('div', {}, [el('label', { for: 'am-tray-text', className: 'am-label', text: 'Text' }), text]),
        el('div', {}, [el('label', { for: 'am-tray-anagram', className: 'am-label', text: 'Your anagram' }), anagram]),
      ]),
      el('p', { className: 'am-label', text: 'Letters left · tap one to add it' }),
      tray,
      line,
    );

    function render() {
      var have = counts(lettersOf(text.value));
      var used = counts(lettersOf(anagram.value));
      var tiles = [];
      var extra = [];
      var missing = [];
      for (var i = 0; i < 26; i += 1) {
        var left = have[i] - used[i];
        if (have[i] > 0) {
          var tile = el('button', { type: 'button', className: 'am-tile am-tile--tap' + (left < 0 ? ' is-over' : left === 0 ? ' is-done' : ''), 'data-letter': ABC[i], 'aria-label': ABC[i] + ', ' + Math.max(left, 0) + ' left' }, [
            document.createTextNode(ABC[i]),
            el('span', { className: 'am-tile-n', text: String(left) }),
          ]);
          tiles.push(tile);
        }
        if (left < 0) extra.push(-left + ' extra ' + ABC[i]);
        if (left > 0) missing.push(left + ' missing ' + ABC[i]);
        if (have[i] === 0 && used[i] > 0) {
          tiles.push(el('span', { className: 'am-tile is-over', 'aria-label': ABC[i] + ' is not in the text' }, [document.createTextNode(ABC[i]), el('span', { className: 'am-tile-n', text: String(-used[i]) })]));
        }
      }
      tray.replaceChildren.apply(tray, tiles);
      if (!lettersOf(text.value)) {
        line.className = 'am-trayline';
        line.textContent = 'Type a text to anagram.';
      } else if (!extra.length && !missing.length) {
        line.className = 'am-trayline is-good';
        line.textContent = 'Letters match. Every letter used exactly once.';
      } else {
        line.className = 'am-trayline' + (extra.length ? ' is-bad' : '');
        line.textContent = extra.concat(missing).join(' · ');
      }
    }

    tray.addEventListener('click', function (event) {
      var button = event.target.closest('[data-letter]');
      if (!button) return;
      var letter = button.getAttribute('data-letter');
      // At the caret when the box has one, otherwise at the end.
      var focused = document.activeElement === anagram;
      var start = focused && anagram.selectionStart != null ? anagram.selectionStart : anagram.value.length;
      var end = focused && anagram.selectionEnd != null ? anagram.selectionEnd : start;
      anagram.value = anagram.value.slice(0, start) + letter + anagram.value.slice(end);
      anagram.setSelectionRange(start + 1, start + 1);
      render();
    });
    text.addEventListener('input', render);
    anagram.addEventListener('input', render);
    render();
  }

  /* ------------------------------------------------------------------ */
  /* Discover: real cards.                                               */
  /* ------------------------------------------------------------------ */

  function mountDiscover(fig) {
    var all = CARDS;
    if (!all.length) {
      fig.replaceChildren(
        el('p', { className: 'am-meta' }, [
          document.createTextNode('The sample of cards didn’t load. '),
          el('a', { href: SITE + '/hits', target: '_blank', rel: 'noopener', text: 'See them on Discover.' }),
        ]),
      );
      return;
    }
    var filter = 'all';
    var order = [];
    var at = 0;

    var meta = el('p', { className: 'am-card-meta' });
    var from = el('p', { className: 'am-card-from' });
    var to = el('p', { className: 'am-card-to' });
    var why = el('p', { className: 'am-card-why' });
    var link = el('a', { className: 'am-sitelink', target: '_blank', rel: 'noopener', text: 'Open this card on Discover' });
    var position = el('span', { className: 'am-card-pos', 'aria-live': 'polite' });
    var next = el('button', { className: 'am-btn', type: 'button', text: 'Another' });
    var chips = el('div', { className: 'am-chips', role: 'group', 'aria-label': 'Section' });
    [['all', 'All'], ['greatest', 'Greatest Hits'], ['interesting', 'Interesting'], ['stretch', 'A stretch']].forEach(function (pair) {
      var chip = el('button', { className: 'am-chip', type: 'button', 'aria-pressed': String(pair[0] === filter), text: pair[1] });
      chip.addEventListener('click', function () {
        filter = pair[0];
        chips.querySelectorAll('button').forEach(function (b) {
          b.setAttribute('aria-pressed', String(b === chip));
        });
        shuffle();
        render();
      });
      chips.append(chip);
    });

    fig.replaceChildren(
      el('figcaption', { className: 'am-cap', text: 'A few cards from Discover' }),
      chips,
      el('article', { className: 'am-card' }, [meta, from, to, why, el('p', { className: 'am-foot' }, [link])]),
      el('div', { className: 'am-actions' }, [next, position]),
    );

    function pool() {
      return all.filter(function (card) {
        return filter === 'all' || card.section === filter;
      });
    }
    function shuffle() {
      order = pool();
      for (var i = order.length - 1; i > 0; i -= 1) {
        var j = Math.floor(Math.random() * (i + 1));
        var swap = order[i];
        order[i] = order[j];
        order[j] = swap;
      }
      // Lead with the card the article has been talking about.
      var lead = order.findIndex(function (card) { return card.slug === 'clinteastwood-people-action-old-west'; });
      if (lead > 0 && at === 0) order.unshift(order.splice(lead, 1)[0]);
      at = 0;
    }
    function render() {
      var card = order[at];
      if (!card) return;
      meta.textContent = SECTION_LABEL[card.section] + ' · ' + card.category;
      from.textContent = card.input;
      to.textContent = card.anagram;
      why.textContent = card.why;
      link.href = cardLink(card);
      position.textContent = at + 1 + ' of ' + order.length + ' in this sample';
    }
    next.addEventListener('click', function () {
      at = (at + 1) % order.length;
      render();
    });
    shuffle();
    render();
  }

  var MOUNT = { search: mountSearch, branching: mountBranching, tray: mountTray, discover: mountDiscover };

  function mountAll() {
    // The site recording loops on its own, unless the reader asked for less motion.
    var film = document.querySelector('video[data-am-film]');
    if (film && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      film.removeAttribute('autoplay');
      film.pause();
    }
    // Only Discover waits for the cards; the search picks them up when they arrive.
    var cardsLoaded = loadCards();
    document.querySelectorAll('[data-demo]').forEach(function (fig) {
      var mount = MOUNT[fig.getAttribute('data-demo')];
      if (!mount) return;
      var ready = fig.getAttribute('data-demo') === 'discover' ? cardsLoaded : Promise.resolve();
      ready.then(function () {
        try {
          mount(fig);
        } catch (error) {
          fig.replaceChildren(el('p', { className: 'am-meta', text: 'This demo failed to start: ' + error.message }));
        }
      });
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mountAll);
  else mountAll();
})();
