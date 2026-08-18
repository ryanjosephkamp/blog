/*
 * A small marking demo for the Amordle article.
 *
 * It exists to teach the one rule people reliably get wrong: what happens when
 * a guess repeats a letter more often than the answer contains it. Prose
 * describes that badly and a static picture only shows one case, so the reader
 * gets to type and watch.
 *
 * The answer is SENSE precisely because it repeats S and E. Marking runs the
 * same two passes the game does: exact positions first, then leftovers matched
 * left to right against what is actually left over.
 */
(function () {
  'use strict';

  var ANSWER = 'SENSE';

  function mark(guess, answer) {
    var states = new Array(guess.length).fill('absent');
    var remaining = {};

    // Pass one: exact positions. These consume a letter before anything else
    // gets a chance at it, which is why a later copy can come back dark.
    for (var i = 0; i < guess.length; i += 1) {
      if (guess[i] === answer[i]) {
        states[i] = 'correct';
      } else {
        remaining[answer[i]] = (remaining[answer[i]] || 0) + 1;
      }
    }

    // Pass two: what is left, left to right.
    for (var j = 0; j < guess.length; j += 1) {
      if (states[j] === 'correct') continue;
      var letter = guess[j];
      if (remaining[letter] > 0) {
        states[j] = 'present';
        remaining[letter] -= 1;
      }
    }
    return states;
  }

  var GLYPH = { correct: '✓', present: '~', absent: '×' };
  var WORDS = {
    correct: 'right letter, right place',
    present: 'right letter, wrong place',
    absent: 'not in the word',
  };

  function ready() {
    var root = document.querySelector('[data-marking-demo]');
    if (!root) return;

    var input = root.querySelector('[data-marking-input]');
    var board = root.querySelector('[data-marking-board]');
    var note = root.querySelector('[data-marking-note]');
    if (!input || !board || !note) return;

    function render() {
      var guess = (input.value || '').toUpperCase().replace(/[^A-Z]/g, '').slice(0, 5);
      if (input.value !== guess) input.value = guess;

      board.innerHTML = '';
      var states = guess.length === 5 ? mark(guess, ANSWER) : null;

      /*
       * The game's own tile markup and classes, not a lookalike.
       *
       * The first version styled its own tiles and hardcoded the colours, and an
       * absent tile came out near-black text on a near-black fill in dark mode —
       * invisible. Rendering what the board renders means the exported game
       * stylesheet paints these too, in whichever scheme the page is in.
       */
      var row = document.createElement('div');
      row.className = 'board-row';
      for (var i = 0; i < 5; i += 1) {
        var state = states ? states[i] : 'empty';
        var cell = document.createElement('div');
        cell.className = state === 'empty' ? 'tile' : 'tile is-' + state;
        if (guess[i]) {
          var letter = document.createElement('span');
          letter.className = 'tile-letter';
          letter.textContent = guess[i].toUpperCase();
          cell.appendChild(letter);
          if (states) {
            // The screen reader gets the meaning, not the colour.
            cell.setAttribute('aria-label', guess[i] + ': ' + WORDS[state]);
            var glyph = document.createElement('span');
            glyph.className = 'tile-evidence';
            glyph.setAttribute('aria-hidden', 'true');
            glyph.textContent = GLYPH[state];
            cell.appendChild(glyph);
          }
        }
        row.appendChild(cell);
      }
      board.appendChild(row);

      if (!states) {
        note.textContent = 'Type a five-letter word to see how it would be marked.';
        return;
      }
      if (guess === ANSWER) {
        note.textContent = 'Solved. Every tile is green because every letter is where it belongs.';
        return;
      }
      var repeated = {};
      var duplicated = false;
      for (var k = 0; k < guess.length; k += 1) {
        repeated[guess[k]] = (repeated[guess[k]] || 0) + 1;
        if (repeated[guess[k]] > 1) duplicated = true;
      }
      note.textContent = duplicated
        ? 'Note the repeated letters: a copy only earns a color if the answer still has one spare.'
        : 'No repeated letters in that guess. Try one that repeats a letter.';
    }

    input.addEventListener('input', render);
    root.addEventListener('click', function (event) {
      var button = event.target.closest('[data-marking-example]');
      if (!button) return;
      input.value = button.getAttribute('data-marking-example');
      render();
      input.focus();
    });

    render();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
  } else {
    ready();
  }
})();
