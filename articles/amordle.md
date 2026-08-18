---
title: "Amordle: the Lichess of Wordle"
description: "A free Wordle–Hurdle hybrid with ranked multiplayer, any word length from 2 to 35, and no ads."
permalink: /articles/amordle/
date: 2026-08-17
storage_free: true
styles:
  - /assets/css/amordle-figures.css
scripts:
  - /assets/js/amordle-marking-demo.js
  - /assets/js/amordle-help-figures.js
  - /assets/js/amordle-charts.js
  - /assets/js/amordle-video-expand.js
---

<style>
  /* The demo's tiles are the game's own .tile markup, painted by the exported
     figure stylesheet, so only layout belongs here. */
  /* The row itself is the game's .board-row; only the outer spacing is ours. */
  .marking-demo__board { margin: 1rem 0; display: flex; justify-content: center; }
  .marking-demo { --tile-size: 2.75rem; }
  .marking-demo__examples { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 0.75rem; }
  .marking-demo label { display: block; margin-bottom: 0.35rem; }
  .marking-demo input {
    font: inherit; padding: 0.4rem 0.6rem; text-transform: uppercase; letter-spacing: 0.15em;
    width: 10rem; color: var(--ink); background: var(--background, transparent);
    border: 1px solid var(--border, currentColor);
  }
  /* Buttons inside a figure take the game's colors; left to the browser they
     were grey-on-grey and unreadable in the light theme. */
  .marking-demo__examples button,
  .help-replay {
    font: inherit; padding: 0.35rem 0.75rem; cursor: pointer;
    color: var(--ink); background: var(--surface-raised, transparent);
    border: 1px solid var(--border, currentColor); border-radius: 0;
  }
  .marking-demo__examples button:hover,
  .help-replay:hover { border-color: var(--accent, currentColor); }
  .help-replay { margin-top: 0.75rem; }
  /* The CSS fallback for browsers that refuse fullscreen inside an iframe. */
  .video-expand { font: inherit; padding: 0.35rem 0.75rem; cursor: pointer; margin: 0.5rem 0; }
  .film-review__video.is-expanded {
    position: fixed; inset: 0; z-index: 50; width: 100vw; height: 100vh;
    max-width: none; background: #000; object-fit: contain;
  }
  body.has-expanded-video { overflow: hidden; }
  .amordle-chart { margin: 1.5rem 0; }
  .amordle-chart input[type="range"] { width: min(100%, 28rem); display: block; margin: 0.35rem 0 0.75rem; }
  .amordle-chart__readout p { margin: 0.2rem 0; }
  /* Centred under the plot it describes, rather than hugging the left edge. */
  .amordle-chart__table { border-collapse: collapse; margin: 0.75rem auto 0; }
  .amordle-chart__table th, .amordle-chart__table td { border: 1px solid currentColor; padding: 0.3rem 0.6rem; text-align: right; }
</style>

<div class="film-review" data-figures-url="{{ '/assets/data/amordle-help-figures.json' | relative_url }}">
  <header class="film-review__intro">
    <h1>Amordle: the Lichess of Wordle</h1>
    {% include article-date.html %}
    <p class="article-subtitle">Amordle = Wordle + Hurdle + Lichess &ndash; Ads</p>

    <p>
      <a href="https://amordle.vercel.app/">Amordle</a> combines
      <a href="https://en.wikipedia.org/wiki/Wordle">Wordle</a> and
      <a href="https://www.arkadium.com/games/hurdle/">Hurdle</a> into a single platform, with a
      competitive multiplayer experience inspired by <a href="https://lichess.org/">Lichess</a>.
    </p>
    <p>
      But Amordle is <strong>not</strong> merely a combination of these games. It&rsquo;s an
      <strong>upgrade</strong>:
    </p>
    <ul>
      <li>
        <strong>No ads, no paywalls, no nonsense.</strong> Amordle is completely free &ndash;
        forever.
      </li>
      <li>
        <strong>Comprehensive word lists:</strong> Solutions come from the
        <a href="https://english-openlist.pages.dev/">English OpenList</a>, the world&rsquo;s
        largest list of Scrabble-compatible (and Wordle-compatible) English words. No valid
        English word is off-limits.
      </li>
      <li>
        <strong>Game customization:</strong> Choose your own word lengths, solution difficulty,
        and puzzle count (for GO/Hurdle). Want to play 2-letter Wordle, or something crazy like
        35-letter Hurdle? Amordle has you covered.
      </li>
      <li>
        <strong>Multiplayer:</strong> Play public or private Practice matches, or play ranked
        Amordle COMBAT to earn an Elo and climb the leaderboards, just like in online chess.
      </li>
    </ul>
  </header>

  <section class="film-review__film" aria-labelledby="explainer-title">
    <h2 id="explainer-title">How it plays</h2>
    <p id="explainer-description">
      A 62-second explainer. Real gameplay, not mock-ups: an OG puzzle solved, a GO chain
      carrying its answers forward, and a COMBAT match with a keyboard each side of one shared
      board.
    </p>
    <video
      class="film-review__video"
      controls
      playsinline
      preload="metadata"
      poster="{{ '/assets/media/amordle/2026-08-16-r1/amordle-explainer-poster.png' | relative_url }}"
      aria-labelledby="explainer-title"
      aria-describedby="explainer-description"
    >
      <source src="{{ '/assets/media/amordle/2026-08-16-r1/amordle-explainer.mp4' | relative_url }}" type="video/mp4" />
    </video>
    <p class="film-review__transcript"><a href="{{ '/assets/media/amordle/2026-08-16-r1/amordle-explainer-transcript.txt' | relative_url }}">Plain-text transcript</a></p>
  </section>

  <section class="film-review__essay" aria-labelledby="why-i-built-it">
    <h2 id="why-i-built-it">Why I built it</h2>
    <p>
      For years, my family and I played the daily Wordle and Hurdle puzzles every night, and we
      had lots of fun doing so. But every game has its limitations. Eventually, the problems with
      Wordle and Hurdle began to detract from the gameplay experience.
    </p>
    <p>
      Wordle is unmistakably a commercial product, and virtually everything that <em>can</em> be
      paywalled in Wordle <em>is</em>. I understand that the game has to make money somehow, but
      when the average player spends more time on watching ads than on playing the actual game,
      the product is no longer a game that happens to have advertisements in it &ndash; it&rsquo;s
      an advertisement that happens to have a game in it. The only free way to play without being
      overwhelmed by ads is in airplane mode, which is a minor inconvenience for me but perhaps a
      major one for someone else.
    </p>
    <p>
      For a game as simple as Wordle, players should not need to pay to play. As of August 2026, a
      Wordler wanting an ad-free experience in the official game must buy a
      <a href="https://www.nytimes.com/subscription/games">New York Times Games subscription</a>,
      which is $6.99 per month or $49.99 per year. That&rsquo;s right: to remove ads,
      <strong>you have to pay for a <em>subscription</em></strong>. Not just a one-time fee. A
      recurring payment. <strong>That is absurd.</strong>
    </p>
    <p>
      Wordle is an extremely easy game to vibe code, and there are plenty of AI subscription plans
      that cost under $49.99 per month. Pick a good one, pay for only one month, and make your own
      Wordle without ads. Or, just play Amordle, and never see a Wordle ad again.
    </p>
    <p>
      Hurdle isn&rsquo;t much better, either. Originally by
      <a href="https://www.arkadium.com/">Arkadium</a>, the game itself is a bit more complicated
      than classic Wordle, but the app/product is notably simpler: no practice mode (only daily
      puzzles), no way to unlock past dailies, no in-game consumables, no player histories, etc.
      Oh, and it still has ads, although there is a way to play with an ad blocker.
    </p>
    <p>
      As with Wordle, Hurdle can absolutely be vibe coded in short order. Or, you can play Amordle.
    </p>
    <p>And there are many valuable features missing from both games:</p>
    <ul>
      <li>
        No word list transparency: Neither NYT nor Arkadium posts an official list of all words
        used by their game.
      </li>
      <li>
        No customization: Players can&rsquo;t choose their own word lengths, word list
        difficulties, puzzle counts (for Hurdle), keyboard colors, custom account avatar images,
        etc.
      </li>
      <li>
        No multiplayer: Wordle and Hurdle are strictly solo-only games, making play with friends
        and family harder than it needs to be, and precluding competitive ranked matchmaking
        altogether.
      </li>
    </ul>
    <p>
      <strong>
        To solve all these problems, I created Amordle &ndash; the Lichess of Wordle.
      </strong>
    </p>
  </section>

  <section class="film-review__essay" aria-labelledby="the-rules">
    <h2 id="the-rules">The rules</h2>
    <p>There are two modes. Both use the same marking rule.</p>

    <h3>OG</h3>
    <p>OG is Wordle, upgraded. One puzzle, one answer, one colored tile per guess letter:</p>
    <ul>
      <li><strong>Green (✓)</strong> — the letter is in the word, in that position.</li>
      <li><strong>Yellow (~)</strong> — the letter is in the word, somewhere else.</li>
      <li><strong>Dark (×)</strong> — the letter is not in the word.</li>
    </ul>
    <p>
      If a guess has more copies of a letter than the answer contains, the extras are marked
      dark. That rule is the one people get wrong, so there is a demo for it below.
    </p>

    <h3>GO chains</h3>
    <p>
      GO is Hurdle, upgraded: the same game, but as a chain of puzzles. Five, seven, or ten of
      them, and always five for the Daily. The catch is that each answer you solve carries
      forward as a guess in the next puzzle, so you never start a chain puzzle from nothing —
      you start it holding evidence you earned.
    </p>
    <figure class="amordle-figure help-example help-figure" data-amordle-figure="go">
      <figcaption>ONE ANSWER BECOMES THE NEXT PUZZLE&rsquo;S EVIDENCE</figcaption>
      <div class="help-stage" data-figure-stage aria-hidden="true"></div>
      <button class="help-replay" type="button" data-figure-replay>Replay the GO chain</button>
    </figure>

    <h3>Practice and Daily</h3>
    <p>
      <strong>Practice</strong> is where the customization lives: 2 to 35 letters, three nested
      difficulties, and optional Hard Mode. Play as much of it as you want.
    </p>
    <p>
      <strong>Daily</strong> is one puzzle a day, five letters, the same word for everybody. The
      Solo Daily rolls over at your local midnight. The ranked COMBAT Daily uses UTC instead, so
      that a ranked match is the same puzzle at the same moment everywhere.
    </p>
    <p>
      Finishing either Daily keeps your streak — OG or GO, and finishing counts rather than
      winning. A Daily you lose still keeps it.
    </p>

    <h3>Hard Mode</h3>
    <p>Optional, and the same as it is in Wordle and Hurdle. Every clue becomes binding:</p>
    <ul>
      <li>Green letters have to stay where they are.</li>
      <li>Yellow letters have to appear at least as often as the evidence shows.</li>
      <li>Dark letters have to be avoided when they are ruled out entirely.</li>
    </ul>
  </section>

  <section class="film-review__essay" aria-labelledby="marking-demo">
    <h2 id="marking-demo">Try the marking rule</h2>
    <p>
      Every tile answers one question about one letter. The part people get wrong is what happens
      when a guess repeats a letter more often than the answer does, so the answer here is fixed
      and you can type at it.
    </p>
    <!-- help-figure is load-bearing, not decoration: `.help-figure .tile` is what
         sets a tile's width and font size from --tile-size. Without it the rule
         never matched, tiles sized to their text, and the letter and its evidence
         glyph landed on top of each other in an 11px box. -->
    <div class="marking-demo amordle-figure help-figure" data-marking-demo>
      <p>The answer is <strong>SENSE</strong>.</p>
      <label for="marking-input">Your guess</label>
      <input id="marking-input" data-marking-input maxlength="5" autocomplete="off" spellcheck="false" value="SASSY" />
      <div class="marking-demo__board" data-marking-board aria-live="polite"></div>
      <p data-marking-note></p>
      <div class="marking-demo__examples">
        <button type="button" data-marking-example="SASSY">SASSY</button>
        <button type="button" data-marking-example="MESSY">MESSY</button>
        <button type="button" data-marking-example="SEEDS">SEEDS</button>
        <button type="button" data-marking-example="SENSE">SENSE</button>
      </div>
    </div>
    <p>
      The marking happens in two passes. First every letter sitting in the right position turns
      green and uses up that copy of the letter. Then whatever is left over is matched from left
      to right against the copies still unspoken for. That is why <code>SASSY</code> against
      <code>SENSE</code> gives you two greens and then a dark S: the answer has two S's, both of
      them already claimed, so the third copy has nothing left to earn.
    </p>
  </section>

  <section class="film-review__essay" aria-labelledby="multiplayer">
    <h2 id="multiplayer">COMBAT and ranked play</h2>
    <p>
      COMBAT is Amordle against another person. You share one board and take turns: you guess,
      they guess, and both of you read the same evidence. Refreshing never spends a turn, and a
      rejected guess changes nothing.
    </p>
    <p>
      You can play a public match against whoever is queued, or send a private challenge to a
      specific player. Practice matches are unranked. Ranked matches move your Elo.
    </p>
    <figure class="amordle-figure help-example help-figure" data-amordle-figure="combat">
      <figcaption>BOTH PLAYERS READ ONE BOARD</figcaption>
      <div class="help-stage" data-figure-stage aria-hidden="true"></div>
      <button class="help-replay" type="button" data-figure-replay>Replay the COMBAT match</button>
    </figure>

    <p>
      Rather than merging all ratings into one average Elo, Amordle keeps them in separate pools.
      A rating only means something when everyone holding it played the same game, and a
      forty-five minute match and a one-minute match ask for different skills — a rating that
      mixed them would describe neither. So each combination keeps its own.
    </p>
    <p>10 clocks × 2 game modes (OG/GO) × 2 Hard mode options (on/off) = 40 game combinations.</p>
    <p>
      Plus one for each of the two ranked Daily modes. Your rating in one says nothing about your
      rating in another, and you can be provisional in one while established in another.
    </p>
    <p>
      A new rating starts at 1200 and is marked provisional until you have played ten games in
      that pool, during which it moves further and faster so it can find your level quickly.
    </p>
  </section>

  <section class="film-review__essay" aria-labelledby="scoring">
    <h2 id="scoring">Transparent scoring</h2>
    <p>
      A rating is only worth having if you believe it. So the game publishes the arithmetic:
      <a href="https://amordle.vercel.app/methodology">the methodology page</a> gives the
      expected-score equation, both K factors, the rating pools, the experience formula, the
      level curve, and what every coin costs. Every number on that page is read out of the code
      that runs, and the page names the file and line each one comes from.
    </p>
    <p>
      That page exists for the moment your rating goes <em>down</em>. Losing points is the point
      at which "the system is rigged" is easiest to believe and hardest to disprove, and the
      honest answer is to show the equation rather than ask to be trusted.
    </p>

    <div class="amordle-chart" data-rating-chart>
      <h3>What a win is worth</h3>
      <p>
        Ratings move by how surprising the result was, not by how many games you have won. Drag
        the slider to set how much stronger or weaker your opponent is.
      </p>
      <label for="rating-difference">Opponent&rsquo;s rating, relative to yours</label>
      <input id="rating-difference" type="range" min="-600" max="600" step="10" value="0" data-rating-input />
      <div data-rating-plot></div>
      <div class="amordle-chart__readout" data-rating-readout aria-live="polite"></div>
    </div>
  </section>

  <section class="film-review__essay" aria-labelledby="coins">
    <h2 id="coins">Coins and tools</h2>
    <p>
      Coins are earned by playing and cannot be bought. There is no shop, no currency pack, and
      nothing behind a payment. That is deliberate: the moment you can buy an advantage, a rating
      stops meaning anything.
    </p>
    <p>What you can spend them on:</p>
    <ul>
      <li><strong>Reveal one letter</strong> — 25 coins. Places a letter in your draft row.</li>
      <li><strong>Remove wrong letters</strong> — 40 coins. Rules five letters off the keyboard.</li>
      <li><strong>Unlock a past Daily</strong> — 60 coins. Opens a date you missed.</li>
      <li>
        <strong>Another guess</strong> — a computed price. Adds exactly one attempt in Practice,
        and gets more expensive each time you do it.
      </li>
    </ul>
    <p>
      These are Solo tools. None of them exist in COMBAT, ranked or not — there is no version of
      a match where one player can spend their way to an advantage. Unlocking a past Daily also
      cannot repair a broken streak: the streak only ever moves forward.
    </p>

    <figure class="amordle-figure help-example help-figure" data-amordle-figure="reveal">
      <figcaption>REVEAL ONE LETTER</figcaption>
      <div class="help-stage" data-figure-stage aria-hidden="true"></div>
      <button class="help-replay" type="button" data-figure-replay>Replay the reveal tool</button>
    </figure>

    <figure class="amordle-figure help-example help-figure" data-amordle-figure="remove">
      <figcaption>REMOVE FIVE WRONG LETTERS</figcaption>
      <div class="help-stage" data-figure-stage aria-hidden="true"></div>
      <button class="help-replay" type="button" data-figure-replay>Replay the remove tool</button>
    </figure>

    <figure class="amordle-figure help-example help-figure" data-amordle-figure="daily">
      <figcaption>UNLOCK A PAST DAILY</figcaption>
      <div class="help-stage" data-figure-stage aria-hidden="true"></div>
      <button class="help-replay" type="button" data-figure-replay>Replay unlocking a past Daily</button>
    </figure>

    <figure class="amordle-figure help-example help-figure" data-amordle-figure="continue">
      <figcaption>CONTINUE PAST THE LAST ROW</figcaption>
      <div class="help-stage" data-figure-stage aria-hidden="true"></div>
      <button class="help-replay" type="button" data-figure-replay>Replay continuing past the last row</button>
    </figure>

    <div class="amordle-chart" data-continuation-chart>
      <h3>What another guess costs</h3>
      <p>
        Each extra guess is priced from how much word is left and how many you have already
        bought, so the second one is never as cheap as the first.
      </p>
      <div data-continuation-plot></div>
      <table class="amordle-chart__table" data-continuation-table></table>
    </div>
  </section>

  <section class="film-review__essay" aria-labelledby="words">
    <h2 id="words">Where the words come from</h2>
    <p>
      Every word comes from the
      <a href="https://english-openlist.pages.dev/">English OpenList</a>, an open dataset of all
      Scrabble-valid (and Wordle-valid) English words that I also built. It is published in full,
      so the vocabulary this game draws on can be inspected rather than simply taken on trust.
    </p>
    <p>
      It is also the reason the game can offer 2 to 35 letters at all. Most word games ship a
      hand-curated list of a few thousand five-letter words, and that list is the ceiling. Start
      from the largest Scrabble-compatible English word list instead, and no valid English word is
      off-limits — the game can just ask for a 19-letter answer at standard difficulty and get
      one.
    </p>
  </section>

  <section class="film-review__essay" aria-labelledby="access">
    <h2 id="access">Accessibility and privacy</h2>
    <p>
      The game targets WCAG 2.2 AA. It works by keyboard and by touch, respects reduced motion
      and forced colors, and keeps your public player identity separate from your private
      account data. Spectators cannot see private requests, hidden answers, or anything that
      would change a match. Guest progress stays separate when you sign in.
    </p>
  </section>

  <section class="film-review__essay" aria-labelledby="play-it">
    <h2 id="play-it">Play it</h2>
    <p>
      <a href="https://amordle.vercel.app">amordle.vercel.app</a>. You can play Solo without an
      account. Signing in is what adds ranked COMBAT, a rating, coins, and a Daily streak.
    </p>
    <p>
      Updates get written up as they ship, with a short video when the change is something you
      can see, in the
      <a href="https://ryanjosephkamp.github.io/amordle-updates/">Amordle changelog</a>.
    </p>
  </section>

  <section class="film-review__essay" aria-labelledby="whats-next">
    <h2 id="whats-next">What comes next</h2>
    <p>
      The next companion piece will be a longer, manually recorded tutorial: a full game of each
      mode start to finish, a ranked COMBAT match against a real opponent, and a walk through the
      methodology page so the rating math is visible rather than described. The placeholder below
      will be replaced when that video is ready.
    </p>
  </section>

  <section class="film-review__placeholder" aria-labelledby="youtube-tutorial">
    <h2 id="youtube-tutorial">YouTube tutorial</h2>
    <p><strong>Coming soon</strong></p>
    <p>The longer tutorial is planned. This text-only placeholder embeds nothing and makes no request.</p>
  </section>

  <section class="film-review__links" aria-labelledby="project-links">
    <h2 id="project-links">Project links</h2>
    <ul>
      <li><a href="https://amordle.vercel.app">Play Amordle</a></li>
      <li><a href="https://amordle.vercel.app/help">How to play</a></li>
      <li><a href="https://amordle.vercel.app/methodology">How scoring works</a></li>
      <li><a href="https://ryanjosephkamp.github.io/amordle-updates/">Amordle changelog</a></li>
      <li><a href="https://english-openlist.pages.dev/">English OpenList</a></li>
    </ul>
  </section>
</div>
