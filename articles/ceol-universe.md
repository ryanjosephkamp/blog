---
title: "The CEOL Universe: a word list you define yourself"
description: "A free dataset of 10,020,150 candidate English strings, with which word lists hold each one and how it came in, so you can cut a word list under a definition of your own."
permalink: /articles/ceol-universe/
date: 2026-11-01
storage_free: true
styles:
  - /assets/css/ceol-universe-post.css
scripts:
  - /assets/js/ceol-universe-demos.js
---

<div class="film-review ceol-post" data-ceol-data="{{ '/assets/data/ceol-universe.json' | relative_url }}">
<header class="film-review__intro">
<h1>The CEOL Universe: a word list you define yourself</h1>
{% include article-date.html %}
<p class="article-subtitle">10,020,150 candidate English strings, the evidence for each one, and no verdicts</p>
<blockquote>
<p>&ldquo;How do you know that a word is <em>valid</em>?&rdquo;</p>
<p>&ldquo;If it&rsquo;s <em>in the dictionary</em>, obviously.&rdquo;</p>
<p>&ldquo;Which dictionary?&rdquo;</p>
</blockquote>
<p>You might name the usual suspects: <a href="https://www.merriam-webster.com/">Merriam-Webster</a>, <a href="https://www.oed.com/">Oxford English</a>, maybe even <a href="https://www.wiktionary.org/">Wiktionary</a>, and so on.</p>
<p><strong>But these sources don&rsquo;t always agree: at any time, a word on one might not be on another.</strong></p>
<p>A disagreement could reflect several things, e.g.,</p>
<ul>
<li><strong>Timing</strong>: Sources aren&rsquo;t always updated at the same times, so one might be less current than the other. Some may be retired altogether.</li>
<li><strong>Focus</strong>: Specialized, niche, and technical terminology is sometimes deemed out-of-scope by mainstream word repositories (and vice versa), despite meeting other criteria for word validity.</li>
<li><strong>Standards</strong>: Some platforms refuse to publish certain words (slang, profanity, etc.), even if they otherwise qualify as &ldquo;valid.&rdquo;</li>
<li><strong>Definitions (most important)</strong>: Word inclusion criteria and algorithms vary by source. What qualifies as &ldquo;valid&rdquo; isn&rsquo;t the same across platforms, and some might even disagree on the definition of the word &ldquo;word&rdquo; itself &ndash; are spaces allowed? what about hyphens, symbols, or special characters? And the method by which a new candidate string is introduced might differ: some sources are community-maintained (e.g., Wiktionary), whereas others are institutional (e.g., Merriam-Webster, OED).</li>
</ul>
<p>So, if you want to know whether a word is legit, where do you look? Is finding it on a single source enough, or must the string be attested by more than one platform? Which sources are the most credible?</p>
<p>I won&rsquo;t pretend to have an answer to any of these questions.</p>
<p>But in case somebody does, it might be necessary to know which words are on which sources at a given time, where the platforms agree and disagree, and other metadata about English strings, and <em>that</em> is something that I can help with.</p>
<p>The <a href="https://review.common-english-openlist.pages.dev/">CEOL Universe</a> (the Common English OpenList Universe) is a free dataset of 10,020,150 strings that might be English words: single words and their forms, hyphenated compounds, accented loanwords, contractions, and multiword terms. For each one, it records which of 8 published word lists include it, whether it turns up in a large corpus of books, and how it got into the dataset in the first place.</p>
<p>But the CEOL Universe is <strong>not</strong> another word list. It never decides what counts as a word. <strong>You</strong> do:</p>
<ul>
<li><strong>Evidence, not verdicts:</strong> Every row says which sources list the string, which sources couldn&rsquo;t have listed it, and which never measured it. No row claims that a string is a word.</li>
<li><strong>Your definition, your list:</strong> Pick your criteria (listed by at least 4 lists, plain a to z, no language model involved, etc.), and get the exact count, the code that reproduces the list, and a datasheet that describes it.</li>
<li><strong>Versions that never change:</strong> A released version is fixed. A correction comes as a new version with a change log, and every file&rsquo;s hash is on the dataset&rsquo;s card.</li>
<li><strong>Free and open:</strong> The data is CC BY-SA 4.0, and the code is MIT. Every source&rsquo;s notice ships with the data.</li>
</ul>
</header>

<figure class="ceol-film">
<video data-ceol-film src="{{ '/assets/media/ceol-universe/2026-11-01-r1/ceol-universe-compose.mp4' | relative_url }}" poster="{{ '/assets/media/ceol-universe/2026-11-01-r1/ceol-universe-compose-poster.png' | relative_url }}" width="960" height="534" autoplay muted loop playsinline controls preload="metadata" aria-label="Composing a list on the CEOL site: criteria chosen, the count and the charts following, the code copied, and the list's datasheet opened" aria-describedby="ceol-film-caption"></video>
<figcaption id="ceol-film-caption">Composing a list on the <a href="https://review.common-english-openlist.pages.dev/compose/">CEOL site</a>: choose the criteria, watch the count and the charts follow over every row, copy the code, and open the list&rsquo;s datasheet.</figcaption>
</figure>

<h2 id="why-i-built-it">Why I built it</h2>
<p>The CEOL Universe started as a side effect of my other word list. I built the <a href="https://english-openlist.pages.dev/">English OpenList</a> as a free English word list for word games, and it now supplies <a href="https://amordle.vercel.app/">Amordle</a>, <a href="https://ars-magna.pages.dev/">Ars Magna</a>, and <a href="https://ryanjosephkamp.github.io/portfolios/anagram-tiles/">Anagram Tiles</a>. Building it meant taking in nearly 10 million strings and ruling on every one of them: on the list, or off it.</p>
<p>Every word list makes those calls. Almost none of them shows its work. A list tells you that a string is in; it doesn&rsquo;t tell you why, who else agrees, or what was never checked.</p>
<p>And what should count changes with the use. A word game needs one list, a spell-checker needs another, and a study of how language models cope with uncommon or made-up strings needs a third. No single list fits all three.</p>
<p>So I separated the evidence from the verdicts. The CEOL Universe keeps every candidate, along with everything recorded about where it came from, and leaves the definition to whoever uses it. You choose the rule, and the dataset gives you the list that meets it, with the evidence for every entry.</p>

<h2 id="whats-already-out-there">What&rsquo;s already out there</h2>
<p>There&rsquo;s no shortage of English word lists. There&rsquo;s a shortage of lists that tell you anything beyond the string.</p>
<ul>
<li><strong>Lexicons:</strong> <a href="https://wordnet.princeton.edu/">WordNet</a> and <a href="https://en.wiktionary.org/">Wiktionary</a> are rich (senses, definitions, relations), but each one records only its own entries. Princeton says WordNet is no longer developed, and Wiktionary is edited every day, so a reading of it is only good for its date.</li>
<li><strong>Spell-checker lists:</strong> <a href="https://wordlist.aspell.net/">SCOWL</a> sorts words into sizes by how common they are, for spell-checkers, and the hunspell dictionaries are built from it. SCOWL&rsquo;s original version left out hyphenated and open compounds, and as of February 2026, its original format is no longer maintained.</li>
<li><strong>Word-game lists:</strong> ENABLE (173,528 words) and YAWL (264,097) are in the public domain, but ENABLE reflects the Official Scrabble Players Dictionary as of January 1, 1998. The official tournament lists themselves are proprietary.</li>
<li><strong>Big text files:</strong> <a href="https://github.com/dwyl/english-words">dwyl/english-words</a> has over 466,000 entries, but its own README says the copyright still belongs to the original publisher, and no entry says where it came from. Moby Words II, released in 2002, has 354,984 single words and nothing else about them.</li>
<li><strong>Frequency lists:</strong> wordfreq and the Google Books Ngrams tell you how often a string occurs, not whether anyone lists it, and wordfreq&rsquo;s author has said it won&rsquo;t be updated again.</li>
</ul>
<p>Each of these records its own membership. None of them records which <em>other</em> lists hold a string, clearly distinguishes &ldquo;not measured&rdquo; from &ldquo;not listed,&rdquo; and is checkpointed by date.</p>
<p>That&rsquo;s the gap the CEOL Universe fills:</p>
<ul>
<li><strong>A listing per source:</strong> For each candidate, its status in 8 published lists: WordNet 3.0, a dated Wiktionary dump, 4 hunspell dictionaries (American, British, Canadian, and Australian), ENABLE, and SCOWL.</li>
<li><strong>&ldquo;Not measured&rdquo; isn&rsquo;t &ldquo;no&rdquo;:</strong> A list that can&rsquo;t hold a class of string (a list with no hyphens can&rsquo;t hold a hyphenated one) is recorded as unable to, not as leaving it out. For comparison, wordfreq returns 0 for a word it doesn&rsquo;t know.</li>
<li><strong>A grammar, not a guess:</strong> The candidates are the output of a spelling grammar that is code you can run. It admits hyphens, accents, apostrophes, ligatures, a diaeresis, and spaces, and every row is marked with the classes it carries.</li>
<li><strong>The same ID in every version:</strong> Each row&rsquo;s ID is derived from the string alone, so a string keeps its ID from one version to the next.</li>
<li><strong>Models and generators, marked:</strong> The rows the English OpenList decided with a language model, and the rows its synthetic engine made, are marked, so a list can keep them or drop them.</li>
</ul>

<div class="ceol-demo" data-ceol-demo="composer"><p class="ceol-demo__fallback">This demo needs JavaScript. You can compose a list on the <a href="https://review.common-english-openlist.pages.dev/compose/">CEOL site</a>.</p></div>

<h2 id="how-the-lists-compare">How the lists compare</h2>
<p>Because every candidate is checked against every list, the lists can finally be measured against each other. Of the 9,725,285 single-token rows, 1,089,968 (11.2%) are listed by at least 1 of the 8 lists. Most of those are listed by a single family of lists, and 43.7% of them by Wiktionary and nothing else. The consensus core, the rows listed by 2 or more independent families, is 417,864 rows.</p>

<div class="ceol-demo" data-ceol-demo="overlap"><p class="ceol-demo__fallback">This chart needs JavaScript. The <a href="https://review.common-english-openlist.pages.dev/research/report/">technical report</a> has the same figures.</p></div>

<p>Some of it is what you&rsquo;d expect: of ENABLE&rsquo;s words that Wiktionary could hold, Wiktionary holds 96%. Some of it isn&rsquo;t: WordNet holds only 8% of what Wiktionary holds, because Wiktionary is about 10 times bigger, inflected forms included, and WordNet lists base forms.</p>

<h2 id="how-it-was-built">How it was built</h2>
<p>Version 1.0 starts from the English OpenList&rsquo;s whole intake, the 9,653,999 strings it took in, whichever way it ruled. Then the sources are read again under the spelling grammar, every source&rsquo;s coverage is reconciled until nothing a source lists is missing, and multiword terms come in from WordNet and Wiktionary. Every step has its own committed record, and the release build checks the result before anything ships.</p>

<div class="ceol-demo" data-ceol-demo="build"><p class="ceol-demo__fallback">This demo needs JavaScript. <a href="https://review.common-english-openlist.pages.dev/built/">How it was built</a> has the same steps.</p></div>

<h2 id="the-catch">The catch</h2>
<p>A dataset like this is only useful if you know its weak spots, so here they are up front. (The dataset&rsquo;s card puts them first, too.)</p>
<ul>
<li><strong>Most rows rest on a single corpus.</strong> 8,024,536 rows (80.1%) came in through the English OpenList, are on none of the 8 lists, and appear in Google Books. For 7,900,248 of them, Google Books is the only evidence, and Google Books is scanned text, with recognition errors.</li>
<li><strong>Some rows were made, not found.</strong> 330,386 rows came from the English OpenList&rsquo;s synthetic engine (affixes, chemical names, scientific prefixes, and Greek plurals), and 137,485 rows of its list were decided with a language model. Both are marked.</li>
<li><strong>Some lists can&rsquo;t be published.</strong> The build measured 13 lists, and 5 of them are withheld for license reasons, so the published listing counts 8.</li>
<li><strong>No definitions.</strong> The CEOL Universe records no senses, parts of speech, pronunciations, or etymologies. WordNet, Wiktionary, and the CMU Pronouncing Dictionary already do that well.</li>
</ul>

<h2 id="use-it">Use it</h2>
<p>The dataset lives on <a href="https://huggingface.co/datasets/ryanjosephkamp/ceol-universe">Hugging Face</a> in 7 configs: every row (<code>universe</code>, 10,020,150 rows), the single-token rows with their features (<code>features</code>), the rows a published list holds (<code>panel-listed</code>, 1,384,833), the English OpenList at a pinned revision (<code>eol-valid</code>, 344,713), multiword rows (<code>spaced</code>, 294,865), rows with a hyphen, an accent, a diaeresis, an apostrophe, or a ligature (<code>exceptions</code>, 209,883), and a small <code>sample</code> (38,988) for trying it out.</p>
<pre><code>from datasets import load_dataset

rows = load_dataset(
    "ryanjosephkamp/ceol-universe",
    "universe",
    revision="v1.0",
    split="candidates",
)
print(rows.num_rows)  # 10,020,150</code></pre>
<p>Or, query it straight from the hub with DuckDB:</p>
<pre><code>SELECT count(*)
FROM 'hf://datasets/ryanjosephkamp/ceol-universe@v1.0/data/universe.parquet';</code></pre>
<p>Or, skip the code entirely. On the <a href="https://review.common-english-openlist.pages.dev/">site</a>, you can look a string up and read its record, compose a list and take its code, chart every dimension of every row, and read the dataset&rsquo;s documentation, limitations first. A list you compose there comes with a datasheet, so whatever you ship says what&rsquo;s in it.</p>
<p>For research, the site also carries a technical report with the method and every figure, a review of comparable resources, and a study kit for drawing a reproducible sample of candidates and labeling it under a definition of your own.</p>

<h2 id="under-the-hood">Under the hood</h2>
<p>The CEOL Universe is 3 pieces of software: a Python pipeline that builds the dataset, a static site that explores it, and a small Python kit for studies. Here&rsquo;s what each one uses, and why.</p>
<h3>The pipeline: Python, with Parquet out</h3>
<ul>
<li><strong>Python 3.11:</strong> The build, the analysis, and the checks are Python, because the sources already have good Python tools. <code>nltk</code> reads WordNet, <code>wordfreq</code> scores frequency, and <code>spylls</code>, a pure-Python port of hunspell, checks candidates against the 4 hunspell dictionaries, affix rules included.</li>
<li><strong>A grammar you can run:</strong> What counts as a candidate is <code>pipeline/ceol/grammar.py</code>, not a paragraph of prose. Every string in the dataset passes it, and every row records which of its classes (hyphenated, accented, spaced, and so on) the string carries.</li>
<li><strong>Parquet, 1 file per config:</strong> Columnar, compressed, and readable by pandas, Polars, DuckDB, Arrow, and Hugging Face&rsquo;s <code>datasets</code> library with no glue code. The release build writes the files with <code>pyarrow</code>, then checks each one before it ships: every ID distinct, each config exactly its rule&rsquo;s filter, and nothing withheld left in.</li>
<li><strong>IDs from the string:</strong> A row&rsquo;s ID is the first 16 hexadecimal digits of the SHA-256 hash of its string, so a string has the same ID in every version, whatever order the build happened to meet it in.</li>
<li><strong>Every figure from code:</strong> No number in the card, the report, or the site is typed by hand. A check re-derives every quoted figure from the committed records, and the repository&rsquo;s checks fail if one drifts.</li>
</ul>
<h3>Hosting: Hugging Face, with a tag per version</h3>
<p>The dataset lives on Hugging Face because it gives a dataset a free, versioned home. Each release is a tag (<code>v1.0</code>), every file is addressable at that tag, and the same address works from Python, from DuckDB&rsquo;s <code>hf://</code> paths, and from a browser. A dataset card and a Croissant metadata file describe it, in the 2 formats dataset tools already read.</p>
<h3>The site: Astro, React islands, and no server</h3>
<ul>
<li><strong>Astro 7 and React 19, in TypeScript:</strong> Most of the site is documentation, which Astro renders to plain HTML at build time. Only the interactive parts (the composer, the profile, and the lookup) load React, and only on the pages that use them.</li>
<li><strong>A count cube instead of a database:</strong> Counting 10 million rows in a browser isn&rsquo;t practical, and a server would cost money forever. So the build precomputes the number of rows for every combination of 12 columns: 10,174 cells, in a 325 KB file. The site answers any combination of criteria exactly by adding up cells. The composer above runs on a folded copy of it.</li>
<li><strong>Code that&rsquo;s tested against the counts:</strong> The composer writes the same list as DuckDB SQL, Polars, and pandas, and a test runs all 3 on version 1.0&rsquo;s files and holds each one to the cube&rsquo;s count.</li>
<li><strong>Downloads without a server:</strong> &ldquo;Download the list&rdquo; reads only the columns it needs from the Parquet file on Hugging Face, by HTTP range requests (<code>hyparquet</code>), then zips the list, its datasheet, and the notices in the browser (<code>fflate</code>). In testing, the whole universe came out as a 30 MB zip in about 15 seconds.</li>
<li><strong>Static hosting:</strong> The built site is plain files on Cloudflare Pages, deployed with <code>wrangler</code>. There&rsquo;s no backend, no database, and nothing to keep running.</li>
</ul>
<h3>The study kit and the checks</h3>
<p><code>ceolkit</code> is a small Python package, with Jupyter notebooks, that loads a pinned version and draws a stratified sample by a public rule, so 2 people who use the same seed get the same sample. Every pull request runs the pipeline&rsquo;s and the kit&rsquo;s tests (pytest), the figure check, and a link check on GitHub Actions, and the site has its own tests (Vitest).</p>

<h2 id="and-the-english-openlist">And the English OpenList</h2>
<p>The English OpenList, the list that started all of this, is still its own project, with its own <a href="https://english-openlist.pages.dev/">site</a>, <a href="https://github.com/ryanjosephkamp/english-openlist">repository</a>, and nightly updates. The CEOL Universe holds a dated copy of it as one of its configs. I wrote about it in <a href="https://ryanjosephkamp.github.io/blog/articles/english-openlist/">its own post</a>.</p>

<h2 id="project-links">Project links</h2>
<ul>
<li><a href="https://review.common-english-openlist.pages.dev/">The CEOL Universe&rsquo;s site</a></li>
<li><a href="https://review.common-english-openlist.pages.dev/compose/">Compose a list</a></li>
<li><a href="https://review.common-english-openlist.pages.dev/dataset/limitations/">The dataset&rsquo;s limitations</a></li>
<li><a href="https://huggingface.co/datasets/ryanjosephkamp/ceol-universe">The dataset on Hugging Face</a></li>
<li><a href="https://github.com/ryanjosephkamp/ceol-universe">The code on GitHub</a></li>
<li><a href="https://english-openlist.pages.dev/">The English OpenList</a></li>
</ul>

</div>
