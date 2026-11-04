---
title: "resmon: a research monitor for the people"
description: "A free, open-source desktop app that watches the research literature for you, keeps every paper on your own computer, and records what every source did on every run."
permalink: /articles/resmon/
date: 2026-11-04
storage_free: true
styles:
  - /assets/css/resmon-post.css
scripts:
  - /assets/js/resmon-demos.js
---

<div class="film-review rm-post">
<header class="film-review__intro">
<h1>resmon: a research monitor for the people</h1>
{% include article-date.html %}
<p class="article-subtitle">Research moves fast. resmon does, too.</p>
<p>In most industries, there’s no shortage of cheap ways to keep up with current events.</p>
<p>If you work in finance, for example, you might get an alert from <a href="https://apps.apple.com/us/app/stocks/id1069512882">Apple Stocks</a> when the price of a niche stock goes too far up or down, or you might start your morning with a cup of joe and a skim of the latest <a href="https://www.wsj.com/">Wall Street Journal</a> issue.</p>
<p>Acting on an opportunity before it disappears, or mitigating a risk before it gets out of hand, is nearly impossible when you don’t know what’s going on in your field.</p>
<p>If you do science for a living, then stumbling upon an important paper early can save you time, effort, and money. But in some disciplines, there’s simply too much literature to review without making literature review your full-time job.</p>
<p>While it’s generally unwise to delegate a full <em>review</em> to AI, it seems perfectly reasonable, perhaps even resourceful, to have an LLM filter the signal from the noise, so you only have to read what’s most relevant to your own work.</p>
<p>Tools for this exist. But the good ones aren’t free, and they don’t give you total control.</p>
<p><strong><a href="https://ryanjosephkamp.github.io/resmon/">resmon</a> changes that.</strong></p>
<p><strong>resmon</strong> (short for <em>research monitor</em>) is a free, open-source desktop app that watches the research literature for you. It searches open sources like <a href="https://arxiv.org/">arXiv</a>, <a href="https://pubmed.ncbi.nlm.nih.gov/">PubMed</a>, <a href="https://openalex.org/">OpenAlex</a>, <a href="https://www.crossref.org/">Crossref</a>, and <a href="https://www.biorxiv.org/">bioRxiv</a>, on a schedule or whenever you ask. It keeps every paper it finds in a database on your computer, and each morning, it shows you what arrived overnight on a map of everything you’ve collected.</p>
<p>Many services can already email you new papers, and you can always follow amazing accounts like <a href="https://x.com/_akhaliq">this one</a> on social media if they’re in your field.</p>
<p>But resmon is completely, unapologetically yours.</p>
<p>How you use it is up to you. Bring your own keys, connect your own harnesses and subscriptions, load your own local model, or use it without AI entirely – it doesn’t need AI for routines or manual searches.</p>
<p>Control it in the desktop app or from the command line, and if you do use popular AI harnesses like Claude Code and ChatGPT Codex, you can tell your agent there to operate resmon and fetch context from your library.</p>
<p>It will never steal your data, charge you a fee, or cram ads down your throat. Create as many or as few routines as your heart desires. But be aware that research platforms set rate limits! resmon tells you what they are and where to look in case they’ve changed recently.</p>
<p>While resmon is the product of months and months of independent development, this release is only the first of many.</p>
<p><a href="https://github.com/ryanjosephkamp/resmon/issues/new">Let me know</a> if something feels broken or missing, or if you want to help me take this app to the next level.</p>
<p>— Ryan</p>
<p><strong>resmon: a research monitor for the people</strong></p>
<ul>
<li><strong>Every source accounted for.</strong> Every run records what every source did: answered, answered with nothing, answered in part, couldn’t be asked, failed, or left no record. When a source goes quiet, resmon tells you.</li>
<li><strong>Many sources, one collection.</strong> Ask one source in depth (a <em>Deep Dive</em>) or many at once (a <em>Deep Sweep</em>), or save the search as a <em>watch</em> that runs on a schedule. resmon removes the duplicates, and everything lands in one collection you can search by words or by meaning.</li>
<li><strong>Your computer, your data.</strong> No account, no resmon server, and no telemetry. Your collection is a SQLite database on your own disk, and your keys stay in your operating system’s keychain.</li>
<li><strong>AI-first, but AI-optional.</strong> Paper summaries and an assistant run through the Claude Code or Codex sign-in you already have, or through your own API key. Nothing is billed through resmon, and nothing in resmon needs AI to work.</li>
<li><strong>Free and open source.</strong> MIT licensed, with builds for macOS, Windows, and Linux.</li>
</ul>
</header>

<section class="film-review__film" aria-labelledby="see-it">
<h2 id="see-it">See it</h2>
<p id="see-it-description">A loop from resmon’s tour, recorded with real searches of the public sources: Today’s map with the new papers ringed and numbered, a Deep Sweep asking several sources at once, and the Source wall marking what each source did on each run.</p>
<img class="rm-film" src="{{ '/assets/media/resmon/2026-11-03-r1/resmon-tour.gif' | relative_url }}" width="880" height="495" alt="resmon’s tour: Today’s map of the collection with the new papers ringed and numbered, a Deep Sweep asking several sources at once, and the Source wall marking what each source did on each run" aria-describedby="see-it-description">
</section>

<section class="film-review__essay" aria-labelledby="why-i-built-it">
<h2 id="why-i-built-it">Why I built it</h2>
<p>These days, it seems like there’s a new frontier model released every week, and AI research has never been so exciting. <a href="https://www.youtube.com/@twominutepapers">What a time to be alive!</a></p>
<p>While it’s challenging (but fun!) to keep up with the state of the art, it’s also easy to let the science get ahead of you.</p>
<p><strong>resmon</strong> is the open-source research monitor that makes staying current with your field as easy as reading a morning newspaper, so you can focus on what matters the most.</p>
</section>

<section class="film-review__essay" aria-labelledby="what-else-is-out-there">
<h2 id="what-else-is-out-there">What else is out there</h2>
<p>resmon isn’t the first tool for following new papers, and it borrows good ideas from several of them. Here’s how the ones researchers usually reach for compare, going by each tool’s own help pages and pricing pages as of November 2026:</p>
<table class="rm-stack">
<thead>
<tr><th scope="col">Tool</th><th scope="col">What it watches</th><th scope="col">Account and data</th><th scope="col">When a search breaks</th><th scope="col">Cost</th></tr>
</thead>
<tbody>
<tr><td data-label="Tool"><a href="https://scholar.google.com/intl/en/scholar/help.html">Google Scholar</a> alerts</td><td data-label="What it watches">Google Scholar’s own index: a search, an author, or citations to a paper, by email several times a week</td><td data-label="Account and data">Any email address works; a Google account manages them all</td><td data-label="When a search breaks">Not described. Scholar says it can’t guarantee uninterrupted coverage of any source.</td><td data-label="Cost">No paid tier</td></tr>
<tr><td data-label="Tool"><a href="https://info.arxiv.org/help/subscribe.html">arXiv</a> email and RSS</td><td data-label="What it watches">arXiv only, by category rather than keyword, daily</td><td data-label="Account and data">No account; the list is arXiv’s</td><td data-label="When a search breaks">A status page for its RSS feeds</td><td data-label="Cost">No paid tier</td></tr>
<tr><td data-label="Tool"><a href="https://pubmed.ncbi.nlm.nih.gov/help/">PubMed</a> alerts</td><td data-label="What it watches">PubMed (and other NCBI databases): any saved query, by email daily, weekly, or monthly, or RSS</td><td data-label="Account and data">A free My NCBI account, on NCBI’s servers</td><td data-label="When a search breaks">Its help says an update may miss citations, and the next one will include them</td><td data-label="Cost">Free</td></tr>
<tr><td data-label="Tool"><a href="https://www.semanticscholar.org/faq">Semantic Scholar</a></td><td data-label="What it watches">Its own corpus: authors, papers, topics, and AI-recommended feeds, by email daily or weekly</td><td data-label="Account and data">An account and an online library</td><td data-label="When a search breaks">Not described</td><td data-label="Cost">Free</td></tr>
<tr><td data-label="Tool"><a href="https://www.elsevier.com/products/scopus">Scopus</a> and <a href="https://webofscience.zendesk.com/hc/en-us/articles/20016493256721-Saved-Searches-and-Alerts">Web of Science</a></td><td data-label="What it watches">Their own indexes: saved searches and citations, by email</td><td data-label="Account and data">An institutional account</td><td data-label="When a search breaks">Scopus sends nothing when nothing is new. Web of Science will email you when nothing is new, if you ask it to.</td><td data-label="Cost">Institutional subscription, with no public price</td></tr>
<tr><td data-label="Tool"><a href="https://feedly.com/i/pro">Feedly</a> or <a href="https://www.zotero.org/support/feeds">Zotero</a> feeds</td><td data-label="What it watches">Any RSS feed you find and paste in, such as a PubMed search’s</td><td data-label="Account and data">Feedly: an account, in its cloud. Zotero: your computer, with optional sync.</td><td data-label="When a search breaks">Not described</td><td data-label="Cost">Feedly: free for up to 100 feeds, Pro $6 a month billed annually. Zotero: free.</td></tr>
<tr><td data-label="Tool"><a href="https://www.researchrabbit.ai/pricing">ResearchRabbit</a> and <a href="https://www.litmaps.com/pricing">Litmaps</a></td><td data-label="What it watches">Their own catalogs, explored from seed papers and citations; Litmaps emails a map’s new matches</td><td data-label="Account and data">An account, on their servers</td><td data-label="When a search breaks">Not described</td><td data-label="Cost">Free tiers; paid plans from $10 a month billed annually</td></tr>
<tr><td data-label="Tool"><a href="https://support.elicit.com/en/articles/17220392-routines-in-elicit">Elicit</a> Routines</td><td data-label="What it watches">Its own index, built from Semantic Scholar, PubMed, and OpenAlex and updated weekly; an AI agent runs your instructions daily or weekly</td><td data-label="Account and data">An account</td><td data-label="When a search breaks">An optional email when a run fails</td><td data-label="Cost">Pro plans and up (Academic Pro is $39 a month billed annually), and each run draws on your plan’s usage</td></tr>
<tr><td data-label="Tool"><a href="https://www.scholar-inbox.com/landing">Scholar Inbox</a></td><td data-label="What it watches">New AI papers on arXiv and other open venues, ranked by a model you train</td><td data-label="Account and data">An account, on servers in Europe</td><td data-label="When a search breaks">Not described</td><td data-label="Cost">Free</td></tr>
<tr><td data-label="Tool"><strong>resmon</strong></td><td data-label="What it watches">The open sources you choose, each asked directly, on demand or on your schedule</td><td data-label="Account and data"><strong>No account;</strong> a database on your computer</td><td data-label="When a search breaks"><strong>A record of what every source did on every run</strong></td><td data-label="Cost">Free and open source; AI on your own plan or key</td></tr>
</tbody>
</table>
<p>Each of these is the right tool for something. Google Scholar reaches well beyond the open sources, and PubMed’s alerts are free and take any query. Semantic Scholar’s feeds and Scholar Inbox’s ranking recommend papers you didn’t know to search for. If your library pays for Scopus or Web of Science, their alerts cover what those indexes cover.</p>
<p>But almost all of them watch one index: Google Scholar’s, arXiv’s, PubMed’s, or the vendor’s own merged catalog, which ResearchRabbit, Elicit, and Consensus each say they update weekly. arXiv’s own alerts follow categories, not keywords. A feed reader can mix sources, but only after you hunt down a feed for every search, one source at a time.</p>
<p>And about searches that quietly break, their pages say very little. Scopus sends no email at all when nothing is new, which is exactly when you’d want to know why. Web of Science and Elicit each go one step further, with an optional email for an empty result or a failed run. None of the pages I read describes a record of what each source did on each run. The clearest statement of the problem I found comes from a competitor: <a href="https://docs.consensus.app/use-cases/scheduled-research-pipeline.md">Consensus</a>, an AI research engine whose docs list no alerts of its own, publishes a recipe for tracking new papers on a schedule with your own script, and its advice is to log the empty runs, too, to tell “no new evidence” from “the job silently broke three weeks ago.”</p>
<p>Almost all of them also keep your searches on their servers, behind an account, and the ones with AI run it inside their own service. resmon asks each source itself, keeps everything on your computer, and writes down what happened every time.</p>
</section>

<section class="film-review__essay" aria-labelledby="quiet-or-broken">
<h2 id="quiet-or-broken">A quiet week, or a broken search?</h2>
<p>This is resmon’s <strong>Source wall</strong> from the demo collection the tour was recorded in, exported from the app unedited: three searches and three watch runs from November 3, 2026, each one asked of the public sources for real. Each column is a run, each row is a source, and each mark says what that source did on that run. Click or tap any mark to read resmon’s record of it.</p>
<div class="rm-figure" data-resmon-demo="wall" data-src="{{ '/assets/data/resmon-wall.json' | relative_url }}"><p class="rm-error">Loading the Source wall…</p>
</div>
<p>Two marks on the Deep Sweep for “protein structure” are worth a closer look. Semantic Scholar was asked, and it refused: HTTP 429, <em>too many requests</em>, after four attempts. In most tools, that run would simply come back with fewer papers. resmon draws it as a failure, apart from an empty answer, because <em>a source that didn’t answer</em> and <em>a source that had nothing</em> are different facts.</p>
<p>On the same run, DBLP couldn’t be asked at all. It filters by publication year only, so it can’t answer a three-day window, and resmon says so instead of quietly widening your search. The <strong>Watchdog</strong>, on the same Health screen, reads the wall for you: it reports sources that fail again and again, watches that are overdue, and departures from your own history, and it says what it can’t judge yet.</p>
</section>

<section class="film-review__essay" aria-labelledby="whats-new">
<h2 id="whats-new">What’s new, on a map</h2>
<p><strong>Today</strong> is the first thing you see when you open resmon: your whole collection drawn as a map, which resmon calls the <em>plate</em>, with every paper collected since you last pressed <strong>Mark all read</strong> ringed and numbered in the order it arrived. Papers that sit close together share wording, or meaning once an embedding model you’ve set up has read 90% of the collection, and each region is named by its most distinctive words.</p>
<p>Here’s the plate from the same demo collection. Point at (or tap) any paper to see what it is, find a title or author, or zoom in with the buttons and drag to look around.</p>
<div class="rm-figure" data-resmon-demo="plate" data-src="{{ '/assets/data/resmon-plate.json' | relative_url }}"><p class="rm-error">Loading the plate…</p>
</div>
<p class="rm-figure__caption">From the engine’s own map and Today, exported unedited from a collection built on November 3, 2026: three watches’ papers from arXiv, and three searches’ papers from the sources they asked. For the watches’ earlier papers, the day each was collected, and so how bright it’s drawn, is set from its publication date.</p>
<p>Papers fade as they age: the brightest were collected today, and the faintest six months ago or more. The dashed lines mark each watch’s papers. And “new” is a fact about your collection, not about the paper. A paper published years ago and found last night is new, while opening Today records nothing, so an accidental look doesn’t empty tomorrow’s list.</p>
</section>

<section class="film-review__essay" aria-labelledby="before-you-ask">
<h2 id="before-you-ask">Before you ask</h2>
<p>Every source speaks its own dialect. resmon asks arXiv for papers with all of your terms, bioRxiv takes any of them, and Crossref and Semantic Scholar rank by relevance, so they may return papers that contain none of your words. Some sources date papers to the day, and others only to the year. Some won’t answer at all without a free API key.</p>
<p>resmon keeps a catalog of what each source does, and before you press <strong>Ask</strong>, it tells you what that means for this search. It doesn’t guess how many papers you’ll get. Try it with the catalog resmon ships; it starts with the sources of the Deep Sweep in the wall above.</p>
<div class="rm-figure" data-resmon-demo="planner" data-src="{{ '/assets/data/resmon-sources.json' | relative_url }}" data-days="7" data-preset="openalex,crossref,europepmc,pubmed,plos,hal,zenodo,dblp,doaj,semantic_scholar"><p class="rm-error">Loading the catalog…</p>
</div>
<p class="rm-figure__caption">The notes are the ones resmon’s search form writes, worked out from the same catalog. In the app, the button starts the run.</p>
</section>

<section class="film-review__film" aria-labelledby="the-tour">
<h2 id="the-tour">The whole tour</h2>
<p id="tour-description">Two minutes and 13 seconds, in seven chapters, recorded in the same demo collection with real searches of the public sources.</p>
<video id="rm-tour" class="film-review__video" controls="" playsinline="" preload="metadata" poster="{{ '/assets/media/resmon/2026-11-03-r1/resmon-tour-poster.webp' | relative_url }}" aria-labelledby="the-tour" aria-describedby="tour-description">
<source src="{{ '/assets/media/resmon/2026-11-03-r1/resmon-tour.mp4' | relative_url }}" type="video/mp4">
</video>
<div data-resmon-demo="chapters" data-video="rm-tour" data-src="{{ '/assets/media/resmon/2026-11-03-r1/resmon-tour-chapters.json' | relative_url }}"></div>
</section>

<section class="film-review__essay" aria-labelledby="what-else-it-does">
<h2 id="what-else-it-does">What else it does</h2>
<ul>
<li><strong>Watches for people, too.</strong> Follow a researcher’s new papers, or watch for retractions and corrections on their papers. Every match to a person says how it was made: by ORCID, by name and affiliation, or by name alone. Only the first is evidence of identity.</li>
<li><strong>Search what you hold.</strong> Search the whole collection by words or by meaning, filter by source, category, author, and date, and export references as BibTeX, RIS, or CSV. A coverage audit compares what a watch found with what you meant it to find, and a shared-wording scan finds abstracts that repeat each other word for word.</li>
<li><strong>Keep your reading.</strong> A reading queue; copies of your PDF, TXT, and MD files in a folder you choose; and <em>Evidence</em> projects, where you pin exact passages and ask questions of the excerpts you pick, with every quote checked against the text.</li>
<li><strong>Reports, delivered.</strong> Every run writes a report. Send it by email, to a folder, to an Atom feed, or to a signed webhook, with a record of whether each one arrived.</li>
<li><strong>Back it up.</strong> Back up all of resmon to a folder you pick, such as the one Google Drive for desktop syncs, and restore it on another computer.</li>
</ul>
</section>

<section class="film-review__essay" aria-labelledby="install-it">
<h2 id="install-it">Install it</h2>
<p>Download resmon 1.0.0 from the <a href="https://github.com/ryanjosephkamp/resmon/releases/latest">latest release</a>. Each build carries its own Python runtime, so you don’t need Python, Node, or anything else installed first.</p>
<table class="rm-stack">
<thead>
<tr><th scope="col">Platform</th><th scope="col">File</th><th scope="col">Status</th></tr>
</thead>
<tbody>
<tr><td data-label="Platform">macOS, Apple Silicon</td><td data-label="File">DMG</td><td data-label="Status"><strong>Tested:</strong> installed and used daily</td></tr>
<tr><td data-label="Platform">macOS, Intel</td><td data-label="File">DMG</td><td data-label="Status">Built and launched once by the release workflow’s check; not used daily</td></tr>
<tr><td data-label="Platform">Windows (x64)</td><td data-label="File">Installer (<code>.exe</code>)</td><td data-label="Status">Built and launched once by the release workflow’s check; not used daily</td></tr>
<tr><td data-label="Platform">Linux (x64)</td><td data-label="File">AppImage</td><td data-label="Status">Built and launched once by the release workflow’s check; not used daily</td></tr>
</tbody>
</table>
<p><strong>So far, I’ve tested resmon only on Apple Silicon Macs.</strong> The other builds are made and launched by the same automated release check, but nobody has used them day to day yet. If something goes wrong on one of them, please <a href="https://github.com/ryanjosephkamp/resmon/issues">open an issue</a> with your system and what happened.</p>
<p><strong>On a Mac,</strong> open the DMG and drag resmon to Applications. The builds aren’t signed, so the first time, macOS may say <em>“resmon.app” is damaged and can’t be opened</em>. It isn’t damaged; that’s how macOS refuses unsigned apps downloaded from the internet. Run this once, then open resmon normally:</p>
<pre><code>xattr -dr com.apple.quarantine /Applications/resmon.app</code></pre>
<p><strong>On Windows,</strong> run the installer, and if SmartScreen warns you, choose <strong>More info</strong>, then <strong>Run anyway</strong>. The Library (your files and Evidence) is unavailable on Windows; the rest of the app works. <strong>On Linux,</strong> mark the AppImage executable (<code>chmod +x resmon-*.AppImage</code>) and run it.</p>
<p>The Windows and Linux builds update themselves. On a Mac, download the new DMG and replace the app. The <a href="https://ryanjosephkamp.github.io/resmon/guide/install/">install guide</a> covers all of this, plus running from source.</p>
</section>

<section class="film-review__essay" aria-labelledby="first-watch">
<h2 id="first-watch">Your first watch</h2>
<p>You don’t need an AI plan or any keys to start: resmon searches every source that needs no key, with no AI at all.</p>
<ol>
<li><strong>Ask once.</strong> Press <kbd>⌘</kbd><kbd>D</kbd> (<kbd>Ctrl</kbd>+<kbd>D</kbd> on Windows and Linux) for a Deep Dive into one source, or <kbd>⇧</kbd><kbd>⌘</kbd><kbd>D</kbd> for a Deep Sweep across several. Type your terms, choose the sources and dates, and press <strong>Ask</strong>. The run opens on its own page, with each source’s recorded outcome, the papers, a map, and a report.</li>
<li><strong>Make it a watch.</strong> Press <strong>Watch this search</strong>, and choose when it runs: every day, weekdays, weekly, monthly, or every few hours. By default, each run asks for the papers published since the previous one. Before you save, the <strong>What it will do</strong> panel restates your choices as sentences, warnings included.</li>
<li><strong>Turn on the background service.</strong> A resmon window doesn’t run your watches; the background service does, whether or not a window is open. Turn on <strong>Settings › In the background › Run resmon in the background</strong>. Until you do, resmon tells you that your watches won’t run.</li>
<li><strong>Read Today.</strong> Tomorrow morning, open resmon and read what arrived. Press <strong>Mark all read</strong> when you’re done.</li>
</ol>
<p>The <a href="https://ryanjosephkamp.github.io/resmon/guide/quick-start/">quick start</a> walks through the same steps with every option, and <kbd>⌘</kbd><kbd>K</kbd> opens a command palette that goes anywhere in the app.</p>
</section>

<section class="film-review__essay" aria-labelledby="outside-the-window">
<h2 id="outside-the-window">From a terminal, or another program</h2>
<p>resmon ships with a <code>resmon</code> command. Choose <strong>Install “resmon” Command in PATH</strong> (in the resmon menu on a Mac, or the Help menu on Windows and Linux), then ask it what resmon has collected and how your watches are doing:</p>
<pre><code>resmon today            # papers first collected since you last marked all read, by watch
resmon wall             # every source's answer to each recent run
resmon service status   # which resmon it reached, and whether your watches will run</code></pre>
<p>Every command takes <code>--json</code>. The command never opens the database or starts resmon itself: it asks the running resmon, and with nothing running, it says where it looked and exits with status 3.</p>
<p>resmon also ships an <a href="https://modelcontextprotocol.io/">MCP</a> server, so an AI tool you already use can work with your collection through 25 tools: 18 that read, and 7 that change something, such as starting a search or creating a watch. Every tool says whether it needs a person’s approval, nothing destructive is exposed, and a watch created through a tool starts out inactive.</p>
<p>Inside the app, <strong>Ask</strong> is an assistant that answers from resmon through those same tools. When it wants to change something, it shows you the exact call with <strong>Allow</strong> and <strong>Deny</strong>, and nothing runs until you answer.</p>
</section>

<section class="film-review__essay" aria-labelledby="how-its-built">
<h2 id="how-its-built">How it’s built</h2>
<p>resmon is three parts that talk only over HTTP on your own computer: a Python engine, an Electron shell, and Atlas, the interface the shell shows. Here’s the stack, and why each piece is there:</p>
<table class="rm-stack">
<thead>
<tr><th scope="col">Piece</th><th scope="col">Built with</th><th scope="col">Why</th></tr>
</thead>
<tbody>
<tr><td data-label="Piece">Engine</td><td data-label="Built with">Python, <a href="https://fastapi.tiangolo.com/">FastAPI</a>, and httpx, bound to <code>127.0.0.1</code></td><td data-label="Why">One engine owns the sources, the schedule, the reports, and every rule about what a result means. The window, the command line, and the MCP server all ask it, so they can’t disagree.</td></tr>
<tr><td data-label="Piece">Data</td><td data-label="Built with">SQLite, with <a href="https://github.com/asg017/sqlite-vec"><code>sqlite-vec</code></a> for search by meaning</td><td data-label="Why">Your collection is one file on your disk that any SQLite can read. Vectors are plain rows, and their index can always be rebuilt.</td></tr>
<tr><td data-label="Piece">Scheduler</td><td data-label="Built with">APScheduler, with its jobs in the database</td><td data-label="Why">Jobs survive restarts, and only the background service fires them, so exactly one process runs your watches.</td></tr>
<tr><td data-label="Piece">Shell</td><td data-label="Built with"><a href="https://www.electronjs.org/">Electron</a></td><td data-label="Why">One app for macOS, Windows, and Linux, with what only a desktop app can do: menus, file pickers, notifications, the background service, and updates.</td></tr>
<tr><td data-label="Piece">Interface (Atlas)</td><td data-label="Built with">React and TypeScript, built with Vite, with TanStack Query</td><td data-label="Why">Every call the window makes goes through one typed client generated from the engine’s OpenAPI schema, so the interface and the engine agree on every route.</td></tr>
<tr><td data-label="Piece">Command line</td><td data-label="Built with">Python’s standard library, and nothing else</td><td data-label="Why">It installs anywhere Python 3.10 runs, and it reads only what the running resmon reports.</td></tr>
<tr><td data-label="Piece">MCP server</td><td data-label="Built with">MCP over standard input and output</td><td data-label="Why">Another program gets the same tools as the assistant, with the same rules: approval before changes, and nothing destructive.</td></tr>
<tr><td data-label="Piece">AI connections</td><td data-label="Built with">The <code>claude</code> and <code>codex</code> commands, run as child processes, or a key for Anthropic, OpenAI, Google, xAI, DeepSeek, Alibaba, or Together AI, a local Ollama model, or any OpenAI-compatible endpoint</td><td data-label="Why">You use a plan you already pay for, or a key you already hold. resmon never sees your sign-in, and a key goes to the keychain and only to its provider.</td></tr>
<tr><td data-label="Piece">Packaging</td><td data-label="Built with">electron-builder, with a relocatable CPython from python-build-standalone</td><td data-label="Why">Installing resmon never means installing Python.</td></tr>
</tbody>
</table>
<p><strong>A local server that checks who’s asking.</strong> Binding to <code>127.0.0.1</code> isn’t a boundary on its own, because any web page you open can send a request to your own computer. So every request to the engine needs a token minted when it starts, a loopback <code>Host</code>, and, from a browser, the exact origin of resmon’s own window. There’s no setting that turns this off.</p>
<p><strong>Your AI, kept on a short leash.</strong> With Claude Code or Codex, resmon runs the command you installed and signed into; it never handles your sign-in itself. Summary calls run with the command’s tools switched off and its sandbox read-only, because abstracts are text from the internet, and a command can run things. A Codex conversation in Ask gets the read tools only, because <code>codex exec</code> has no way to hold a call for your approval.</p>
<h3>How I tested it</h3>
<p>GitHub Actions runs the tests on every pull request. On the last run over the 1.0 code, that was:</p>
<ul>
<li><strong>4,876 engine tests</strong> (pytest), passing on each of Python 3.10, 3.11, and 3.12, with 5 skipped. The 108 tests that ask the live public sources are left out of the default run.</li>
<li><strong>787 interface tests</strong> (Jest), covering Atlas, the Electron shell, and the build scripts.</li>
<li><strong>Two suites that drive the real app</strong> with <a href="https://playwright.dev/">Playwright</a>: 126 route checks on Linux, and 128 window checks on a real macOS window server, with 6 and 4 skipped.</li>
</ul>
<p>Speed has a rule of its own. resmon’s performance harness measures the app against a recorded baseline, and no measurement may get more than 10% slower at the median, or 20% at the 95th percentile, without my sign-off. And before it publishes anything, the release workflow builds all four installers and launches each one against an isolated copy of resmon.</p>
</section>

<section class="film-review__essay" aria-labelledby="what-it-doesnt-do-yet">
<h2 id="what-it-doesnt-do-yet">What it doesn’t do (yet)</h2>
<ul>
<li><strong>Tested only on Apple Silicon Macs, so far.</strong> The Intel Mac, Windows, and Linux builds pass the release check, but they haven’t been used day to day.</li>
<li><strong>Unsigned builds.</strong> The first launch on a Mac needs the one command above, and Macs don’t update themselves.</li>
<li><strong>Open sources only.</strong> resmon asks open scholarly sources. Google Scholar, Scopus, and Web of Science aren’t among them.</li>
<li><strong>Watches need the background service.</strong> Without it, nothing runs on schedule, and resmon says so wherever it matters.</li>
<li><strong>One computer at a time.</strong> There’s no phone app and no sync. A backup moves your collection to another computer.</li>
<li><strong>No Library on Windows,</strong> for the reason above.</li>
</ul>
</section>

<section class="film-review__links" aria-labelledby="project-links">
<h2 id="project-links">Project links</h2>
<ul>
<li><a href="https://ryanjosephkamp.github.io/resmon/">resmon website</a></li>
<li><a href="https://ryanjosephkamp.github.io/resmon/guide/quick-start/">Quick start</a></li>
<li><a href="https://ryanjosephkamp.github.io/resmon/guide/install/">Install and launch</a></li>
<li><a href="https://ryanjosephkamp.github.io/resmon/guide/overview/">The guide</a></li>
<li><a href="https://github.com/ryanjosephkamp/resmon/releases/tag/v1.0.0">Version 1.0.0 release notes</a></li>
<li><a href="https://github.com/ryanjosephkamp/resmon">Source code on GitHub</a></li>
<li><a href="https://github.com/ryanjosephkamp/resmon/issues">Report a bug or suggest a feature</a></li>
</ul>
</section>
</div>
