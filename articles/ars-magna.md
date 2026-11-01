---
title: "Ars Magna: every anagram, exactly"
description: "A free anagram search that finds every anagram of a text, counts them exactly, and explains the good ones."
permalink: /articles/ars-magna/
date: 2026-10-31
storage_free: true
styles:
  - /assets/css/ars-magna-post.css
scripts:
  - /assets/js/ars-magna-demos.js
---

<div class="film-review am-post" data-am-demos="{{ '/assets/ars-magna-demos/' | relative_url }}" data-am-discover="{{ '/assets/data/ars-magna-discover.json' | relative_url }}">
<header class="film-review__intro">
<h1>Ars Magna: every anagram, exactly</h1>
{% include article-date.html %}
<p class="article-subtitle">Ars Magna = anagrams, rearranged</p>
<p><a href="https://ars-magna.pages.dev">Ars Magna</a> finds every anagram of whatever you type. Type <em>Clint Eastwood</em>, and it tells you there are exactly 85,882 ways to rearrange those letters into English words, lists every one of them, and puts <em>Old West action</em> on top.</p>
<p>Even the name is one: <em>ars magna</em> is Latin for “the great art,” and its letters spell <em>anagrams</em>.</p>
</header>

<section class="film-review__film" aria-labelledby="tour-title">
<h2 id="tour-title">A quick tour</h2>
<p>Twenty-one seconds on the live site: a search for <em>Clint Eastwood</em>, a scroll through Discover, and <em>dirty room</em> built by hand from <em>Dormitory</em>.</p>
<video class="film-review__video" data-am-film src="{{ '/assets/media/ars-magna/ars-magna-site.mp4' | relative_url }}" poster="{{ '/assets/media/ars-magna/ars-magna-site-poster.png' | relative_url }}" width="880" height="660" autoplay muted loop playsinline controls preload="metadata" aria-label="Searching for Clint Eastwood, scrolling Discover, and building dirty room from Dormitory"></video>
</section>

<section class="film-review__essay" aria-labelledby="promises">
<p id="promises">Ars Magna isn’t just a list of anagrams, though. It’s built on six promises:</p>
<ul>
<li><strong>Every anagram, counted exactly.</strong> Not a sample, and not the first 500. The exact total comes first, before a single anagram is listed, even when it runs into the millions.</li>
<li><strong>No AI in the search.</strong> The same text gives the same answers every time, and the engine is tested against a brute-force search that’s too simple to be wrong.</li>
<li><strong>It runs on your device.</strong> The search engine is written in Rust and compiled to WebAssembly, so it runs in your browser. After one visit, it works with no network at all.</li>
<li><strong>Open words.</strong> Every word comes from the <a href="https://english-openlist.pages.dev/">English OpenList</a>, pinned to one revision, in four dictionary sizes.</li>
<li><strong>The good ones, explained.</strong> <a href="https://ars-magna.pages.dev/hits">Discover</a> collects 286 anagrams worth keeping, each with one sentence on why it fits.</li>
<li><strong>Free.</strong> No ads, no accounts, and no cookies.</li>
</ul>
</section>

<section class="film-review__essay" aria-labelledby="try-it">
<h2 id="try-it">Try it</h2>
<p>This is the real engine, the same code the site runs, loaded into this page. The first search downloads about 3 MB of dictionary. After that, every search happens on your device.</p>
<figure class="am-figure" data-demo="search"><p class="am-fallback">This demo needs JavaScript. You can <a href="https://ars-magna.pages.dev">search on the site</a> instead.</p></figure>
<p>The total arrives first because counting is much cheaper than listing; more on that below. <em>Surprise me</em> jumps to random positions in the full list without generating the anagrams before them, and <em>Go to</em> fetches any position you name. Try <em>William Shakespeare</em>, then go to anagram #10,000,000.</p>
</section>

<section class="film-review__essay" aria-labelledby="why-i-built-it">
<h2 id="why-i-built-it">Why I built it</h2>
<p>I’ve always loved word games, Wordle among them, and the ones about rearranging letters most of all. I even made my own: <a href="https://amordle.vercel.app/">Amordle</a>, a free Wordle–Hurdle hybrid with ranked multiplayer.</p>
<p>Ars Magna started with a joke. OpenAI named its <a href="https://openai.com/index/gpt-5-6/">GPT-5.6 models</a> Sol, Terra, and Luna, and I noticed that <em>Sol Terra Luna</em> rearranges exactly into <a href="https://ars-magna.pages.dev/hits/lunaterrasol-products-loser-natural/"><em>natural loser</em></a>. Then OpenAI’s <a href="https://openai.com/index/gpt-6-astra/">GPT-6 models</a> came out as Astra, Sol, and Luna: <em>a natural loss</em>.</p>
<p>That made me wonder what else was hiding in everyday phrases, people’s names, and longer text: rearrangements that use every letter exactly once, spaces aside, and still say something funny or fitting. I started building Ars Magna on August 10, 2026, to find out.</p>
<p>The tools I found weren’t built for that. Anagram tools have been around for as long as the web has, but many of them list anagrams only until they reach a limit, and the limit is a setting: 500 results, or 10,000, or whatever a server can afford to send. A list that stops at 500 can’t tell you whether there were 600 or 6 million.</p>
<p>You could ask a chatbot instead. It’ll happily rearrange your name, and some of its answers will even use the right letters. Language models read text in word pieces, not single letters, and <a href="https://arxiv.org/abs/2406.11687">researchers have found</a> that they still slip on anagrams, more so on long ones.</p>
<p>And the good anagrams are rare. <em>Clint Eastwood</em> has 85,882 of them at the site’s default settings, and <em>Old West action</em> is one. Most of the other 85,881 look like <em>canto doles wit</em> and <em>dinos etc low at</em>. Listing every anagram is half the job. The other half is finding the ones worth reading, and saying why they work.</p>
<p><strong>So I built Ars Magna: a search that finds every anagram, counts them exactly, and keeps the good ones.</strong></p>
</section>

<section class="film-review__essay" aria-labelledby="prior-art">
<h2 id="prior-art">What came before</h2>
<p>People have rearranged letters for fun for centuries, and computers have helped for decades. A few of the tools and communities that came first:</p>
<ul>
<li><strong><a href="https://wordsmith.org/anagram/">The Internet Anagram Server</a></strong>, by Anu Garg, has run on Wordsmith.org since 1994. It handles phrases in ten languages, and its advanced form shows 500, 1,000, 5,000, or 10,000 results, or all of them.</li>
<li><strong><a href="https://www.anagramgenius.com/">Anagram Genius</a></strong>, by William Tunstall-Pedoe, has been in development since 1988. It’s built to find good anagrams on its own, and its site keeps a hand-picked archive of about 25,000 of them.</li>
<li><strong><a href="https://anagrammy.com/resources/anagram_artist.html">Anagram Artist</a></strong>, by Mike Keith, takes the opposite approach. It’s a free Windows program that helps a person build an anagram by hand, suggesting words and keeping track of the letters left over.</li>
<li><strong><a href="https://packages.debian.org/sid/an"><code>an</code></a></strong> is a command-line anagram generator packaged for Debian. It finds anagrams of a phrase from any word list you give it.</li>
<li><strong><a href="https://anagrammy.com/">The Anagrammy Awards</a></strong> are where people who make anagrams by hand compete, every month, for the best ones.</li>
</ul>
<p>I’m not even the first to use the name. A Macintosh program called <a href="https://www.macintoshrepository.org/7983-ars-magna">Ars Magna</a> was generating every anagram of a phrase from its own dictionary in the 1980s.</p>
<p>Here’s what Ars Magna adds:</p>
<ul>
<li><strong>Exact counts, without listing.</strong> The engine counts a text’s anagrams without generating them. <em>William Shakespeare</em> has 18,113,773, and any one of them can be fetched by its position.</li>
<li><strong>A search you can check.</strong> The same text gives the same answers every time, the tests compare the engine with a brute-force search, and the dictionary is pinned to one revision, so a result can be reproduced next year.</li>
<li><strong>Curation with reasons.</strong> Discover doesn’t just rank anagrams. Every card says, in one sentence, why its anagram fits.</li>
<li><strong>Both ways of working.</strong> Search for every anagram, or build one by hand with the letters counted for you.</li>
<li><strong>Literal input.</strong> Digits and symbols count as themselves. An anagram of <em>Blink-182</em> has to use the 1, the 8, and the 2.</li>
<li><strong>Open data and tools.</strong> The collection and the vocabulary are open datasets, and the engine also ships as a command-line tool and an MCP server.</li>
</ul>
</section>

<section class="film-review__essay" aria-labelledby="how-it-works">
<h2 id="how-it-works">How the search works</h2>
<p>An anagram on Ars Magna follows strict rules. Every letter of the text is used exactly once, nothing is added, nothing is dropped, and spaces can move anywhere. Capitals, punctuation, and accents don’t count, so <em>Beyoncé</em> has three e’s.</p>
<p>Under those rules, a text is just a bag of letters. <em>Dormitory</em> is one d, one i, one m, two o’s, two r’s, one t, and one y, and finding its anagrams means finding every way to split that bag into words.</p>
<p>The obvious method tries every word that fits, then every word that fits what’s left, and so on. It works, and it’s slow, because thousands of words fit at every step. So Ars Magna asks a sharper question first: which letter is scarcest? If one d is left, then exactly one word in every finished anagram contains that d, so only the words with a d need trying. Trying a few dozen words instead of thousands cuts the work by one to two orders of magnitude.</p>
<p>There’s a catch. A naive search finds <em>dirty room</em> and <em>room dirty</em> as two different answers. The textbook fix is to take words in a fixed order, and combined with the scarcest-letter trick, it’s wrong. It doesn’t produce wrong anagrams. It quietly loses right ones. The fix is to stay on one letter until every copy of it is used, and to keep words in order only within that stretch. Then every anagram is found exactly once.</p>
<p>The demo below runs both versions on a fifteen-word dictionary. Step through the search, then turn on the textbook shortcut and run it again.</p>
<figure class="am-figure" data-demo="branching"><p class="am-fallback">This step-by-step demo needs JavaScript.</p></figure>
<p>That’s why the engine’s most important test compares it with a brute-force search that’s far too slow for real use, but too simple to be wrong. The two have to find the same set of anagrams, not just the same number.</p>
<h3>Counting without listing</h3>
<p>Different paths through the search often leave the same letters behind, and the same leftover letters always have the same number of anagrams. So the engine remembers each count the first time it works one out. <em>William Shakespeare</em> has 18,113,773 anagrams at the site’s default settings, and the engine counts them in 10,899 steps, about 38 milliseconds on my laptop.</p>
<p>Because it knows how many anagrams sit under every branch, it can also walk straight to the ten millionth one without listing the 9,999,999 before it. That’s what <em>Surprise me</em> and <em>Go to</em> do in the demo at the top.</p>
</section>

<section class="film-review__essay" aria-labelledby="the-words">
<h2 id="the-words">The words</h2>
<p>Each word comes from the <a href="https://english-openlist.pages.dev/">English OpenList</a>, a free list of English words that I also built (<a href="{{ '/articles/english-openlist/' | relative_url }}">its own post</a> explains how), pinned to one revision so results can be reproduced. There are four nested dictionaries to choose from:</p>
<ul>
<li><strong>Common:</strong> 39,986 everyday words.</li>
<li><strong>Standard</strong> (the default): 314,042 words, every attested word in the list.</li>
<li><strong>Full:</strong> 378,879 words, the whole list at that revision.</li>
<li><strong>Extended:</strong> 378,881 words, the whole list plus the site’s own additions, each with a meaning and a source.</li>
</ul>
<p>Standard leaves out 64,837 entries that the source data generated by rule, like <em>abacteremicer</em> and <em>nonlivabler</em>, which would otherwise flood the results with words nobody uses. Full still has them. Opening a result says where each of its words came from, and 119,630 words have a definition from <a href="https://wordnet.princeton.edu/">WordNet</a>.</p>
<p>Nothing you type is replaced by something else, so a number is never read as its name. <em>Blink-182</em> has no anagram made of words alone, since no word has a digit, but turning on the shorthand and blend classes finds terms that use the 1, the 8, and the 2. A few symbols can also stand in for a letter: <em>Ke$ha</em> gives <em>$hake</em>.</p>
</section>

<section class="film-review__essay" aria-labelledby="discover">
<h2 id="discover">Discover</h2>
<p><a href="https://ars-magna.pages.dev/hits">Discover</a> is the part of the site I’d show a friend first. It holds 286 anagrams in three sections:</p>
<ul>
<li><strong>Greatest Hits</strong> (54): the best of them, picked by hand.</li>
<li><strong>Interesting</strong> (80): anagrams that name the original, or have a clear, specific link to it.</li>
<li><strong>A stretch</strong> (152): a looser link, arguable in a sentence.</li>
</ul>
<p>Each card gives the text, its anagram, and one sentence on why the two fit.</p>
<figure class="am-figure" data-demo="discover"><p class="am-fallback">This demo needs JavaScript. The cards are all on <a href="https://ars-magna.pages.dev/hits">Discover</a>.</p></figure>
<p>Readers can vote for the cards they like. They can also put any anagram from a search forward for a place on the page, or submit one they built by hand.</p>
<p>New candidates can also come from the news. A nightly job takes the names and titles of the previous day’s most-viewed Wikipedia articles and runs them through the engine. Then a routine that uses a large language model judges how closely each anagram relates to its original and how it reads, and it reads the readers’ promotions the same way. Nothing goes up until I approve it.</p>
<p>The routine is paused for now, so I review promotions myself, regularly. I plan to turn it back on, and if promotions pile up, I’ll review them more often.</p>
<p>There are no accounts and no cookies. A vote is tied to a random id your browser makes, a <a href="https://www.cloudflare.com/application-services/products/turnstile/">Cloudflare Turnstile</a> check keeps bots out, and pressing Vote again takes the vote back. The whole collection is an open dataset on Hugging Face, <a href="https://huggingface.co/datasets/ryanjosephkamp/ars-magna-greatest-hits">ars-magna-greatest-hits</a>.</p>
</section>

<section class="film-review__essay" aria-labelledby="build">
<h2 id="build">Build</h2>
<p><a href="https://ars-magna.pages.dev/build">Build</a> is for making an anagram yourself. Type a text, and the letter tray lists its letters. Type your anagram, and the tray counts down: a letter used too often turns red, and one line says exactly what’s wrong.</p>
<figure class="am-figure" data-demo="tray"><p class="am-fallback">This demo needs JavaScript. You can <a href="https://ars-magna.pages.dev/build">try Build on the site</a> instead.</p></figure>
<p>On the site, Build also checks every word against the dictionary you choose, and sets the two sides against each other in figures: letters, vowels, the rarest letters, word lengths, how common the words are, and a map with a line from each letter to where it went. Both boxes live in the page’s address, so a check is a link you can send.</p>
</section>

<section class="film-review__essay" aria-labelledby="how-its-built">
<h2 id="how-its-built">How it’s built</h2>
<p>Ars Magna is a static website with a search engine inside it. Everything a search needs runs in your browser, and the only thing a server does is store votes and promotions. That one decision shaped the rest: a search costs nothing to serve, what you search for stays on your device unless you promote an anagram, and the site keeps working offline.</p>
<h3>The engine: Rust, compiled to WebAssembly</h3>
<p>A hard search visits millions of states, so the engine is written in Rust, and it counts in 128-bit integers, which stay exact long after a JavaScript number would start rounding. The core library has no dependencies at all. The same code builds three ways: to WebAssembly for the site, with wasm-bindgen and wasm-pack (159 KB); as a native command-line tool; and behind the MCP server. One engine means the site, the command line, and the tests can’t disagree.</p>
<ul>
<li><strong>Letters as bytes.</strong> A word, or a bag of leftover letters, is 32 one-byte counts packed into four 64-bit integers. Checking whether a word fits what’s left, the step a hard search repeats tens of millions of times, then takes a few integer instructions, eight letters at a time, with no branches.</li>
<li><strong>Classes, not words.</strong> Words with the same letters, like <em>listen</em>, <em>silent</em>, and <em>tinsel</em>, collapse into one class before the search starts, so 378,879 words become 350,489 classes. The search walks the classes and spells each result at the end, which is also why one row stands for every spelling of its letters.</li>
<li><strong>A worker thread.</strong> The engine runs in a Web Worker, off the page’s main thread, so typing never stutters. A search can’t be interrupted from inside, so when you type before it finishes, the page throws that worker away and starts a fresh one.</li>
</ul>
<h3>The site: TypeScript, React, Vite, and Tailwind CSS</h3>
<p>The interface is React 19 in TypeScript, built with Vite and styled with Tailwind CSS. The result list is virtualized with TanStack Virtual: only the rows on screen exist on the page, and rows come from the engine 250 at a time as you scroll, so a long list costs no more to draw than a short one. Searches, Build checks, and Discover cards all live in the page’s address, so any of them is a link.</p>
<h3>The dictionary: a build step, not a server</h3>
<p>A TypeScript build step fetches the English OpenList at its pinned revision, sorts it into the four tiers, and writes three compact binary files, named by a hash of their contents. A file that can never change can be cached forever, so after the first visit, the dictionary loads from your browser’s cache and a service worker serves the rest of the site offline. Compressed with brotli, the first visit downloads about 0.9 MB of dictionary instead of 3.2 MB. The definitions are split into 514 small files, fetched only for the words you open.</p>
<h3>Hosting: Cloudflare Pages</h3>
<p>Cloudflare Pages serves the site. Votes and promotions are the one part that needs a server: a few Pages Functions, in TypeScript, check each one with Turnstile and store it in a D1 database, which is SQLite. The build runs in GitHub Actions instead of Cloudflare’s build image, so the project controls its own Rust toolchain, and the dictionary files are committed, so publishing never depends on a download from anyone else.</p>
<h3>Tests that check the right thing</h3>
<ul>
<li><strong>The brute-force oracle</strong> from above, which compares every answer, not just the count.</li>
<li><strong>A performance gate</strong> that counts the states a search visits instead of timing it. A timer fails on a slow computer; a count fails only when the search itself got worse.</li>
<li><strong>Vitest</strong> for the TypeScript: the worker protocol, the exports, Build’s analysis, and the votes.</li>
</ul>
</section>

<section class="film-review__essay" aria-labelledby="use-it">
<h2 id="use-it">Use it</h2>
<p>Open <a href="https://ars-magna.pages.dev">ars-magna.pages.dev</a>. There’s nothing to install and no account to make, and after the first visit, the search works offline.</p>
<p>The code is on <a href="https://github.com/ryanjosephkamp/ars-magna">GitHub</a> under the MIT license. To run the site yourself, you need Node 22 or later, pnpm, and a Rust toolchain with the <code>wasm32-unknown-unknown</code> target:</p>
<pre><code>pnpm install
pnpm wasm:build
pnpm dev</code></pre>
<p>The same engine runs from the command line:</p>
<pre><code>cargo run --release -p anagram-cli -- solve "Clint Eastwood" --limit=10</code></pre>
<p>It also ships as an MCP server, with tools to solve, count, fetch the nth anagram, and explain a word, so an AI assistant can look anagrams up instead of guessing at them. After <code>pnpm wasm:build</code>, <code>node packages/mcp/bin/ars-magna-mcp.js</code> starts it. The site’s vocabulary is an open dataset too: <a href="https://huggingface.co/datasets/ryanjosephkamp/ars-magna-vocabulary">ars-magna-vocabulary</a>.</p>
</section>

<section class="film-review__essay" aria-labelledby="limits">
<h2 id="limits">What it doesn’t do yet</h2>
<ul>
<li><strong>English only.</strong> Letters from other scripts are skipped, and the page says how many.</li>
<li><strong>Some totals are too big to list.</strong> <em>The United States of America</em> has 116,576,660,306 anagrams. The count is exact, but nobody should try to list them, and exports stop at 100,000 rows.</li>
<li><strong>The order is a judgment call.</strong> The default order tries to put readable anagrams first, and it doesn’t always manage. For <em>Dormitory</em>, it still lists <em>dryroom it</em> above <em>dirty room</em>.</li>
</ul>
</section>

<section class="film-review__links" aria-labelledby="project-links">
<h2 id="project-links">Project links</h2>
<ul>
<li><a href="https://ars-magna.pages.dev">Ars Magna</a></li>
<li><a href="https://ars-magna.pages.dev/hits">Discover</a></li>
<li><a href="https://ars-magna.pages.dev/build">Build</a></li>
<li><a href="https://ars-magna.pages.dev/how">How Discover works</a></li>
<li><a href="https://github.com/ryanjosephkamp/ars-magna">Ars Magna on GitHub</a></li>
<li><a href="https://huggingface.co/datasets/ryanjosephkamp/ars-magna-greatest-hits">The Discover dataset</a></li>
<li><a href="https://huggingface.co/datasets/ryanjosephkamp/ars-magna-vocabulary">The vocabulary dataset</a></li>
<li><a href="https://english-openlist.pages.dev/">The English OpenList</a></li>
</ul>
</section>

</div>
