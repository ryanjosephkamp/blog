---
title: "Link Meteor: grab links, keep their words"
description: "A free Chrome extension that saves links with their real anchor text, exact URLs, and source pages, and exports them to Excel, CSV, Markdown, BibTeX, and more."
permalink: /articles/link-meteor/
date: 2026-11-01
storage_free: true
styles:
  - /assets/css/link-meteor-post.css
---

<div class="film-review lm-post">
<header class="film-review__intro">
<h1>Link Meteor: grab links, keep their words</h1>
{% include article-date.html %}
<p class="article-subtitle">Capture the trail. Keep the source.</p>
<p><strong><a href="https://ryanjosephkamp.github.io/link-meteor/">Link Meteor</a> is a free Chrome extension for collecting links.</strong> Drag a box over any part of a webpage, and every link inside it is saved with its anchor text, its exact URL, and the page it came from, ready for a spreadsheet, a document, a reference manager, or your bookmarks.</p>
<p>Lots of extensions can grab links. Link Meteor is for the times when the details matter:</p>
<ul>
<li><strong>The words stay with the link.</strong> Anchor text and URL are saved as separate fields, never merged and never swapped for the destination’s title. “Download PDF” stays “Download PDF”, a link with no text stays empty, and the same address linked twice under two labels is kept twice.</li>
<li><strong>Research tools, built in.</strong> It reads DOIs, arXiv IDs, PubMed IDs, and ISBNs from addresses, and it exports BibTeX, RIS, CSL-JSON, an annotated bibliography, or an Obsidian note. New in 1.0, it also reads the links inside PDFs.</li>
<li><strong>Clean exports.</strong> Real Excel workbooks, CSV, TSV, Markdown, HTML, JSON, and plain URL lists; rich links for Google Docs, Word, and Notion; Chrome bookmark folders; or up to 500 links opened in tabs at once.</li>
<li><strong>Free and private, with no catch.</strong> No account, no ads, no tracking, no paid tier, and no server. Your collections stay in your browser.</li>
</ul>
<p>It’s made for research: reading lists, literature reviews, and source lists. The same tools work just as well for admin panels, ticket queues, and product lists.</p>
</header>

<section class="film-review__film" aria-labelledby="see-it-on-a-real-page">
<h2 id="see-it-on-a-real-page">See it on a real page</h2>
<p id="see-it-description">A 28-second recording of version 1.0.0 on Link Meteor’s practice page: a region selected and saved, the separate fields, and an Excel export. The captions are part of the picture. The <a href="https://ryanjosephkamp.github.io/link-meteor/#watch">70-second video</a> on Link Meteor’s website also shows grouping by URL and the links inside a PDF.</p>
<picture>
<source media="(prefers-reduced-motion: reduce)" srcset="{{ '/assets/media/link-meteor/2026-11-01-r1/link-meteor-demo.png' | relative_url }}" />
<img class="lm-film" src="{{ '/assets/media/link-meteor/2026-11-01-r1/link-meteor-demo.gif' | relative_url }}" width="1080" height="608" alt="Link Meteor 1.0.0 on its practice page: a drag selects a reading list’s 7 links, Add to collection saves them, the full view shows each link’s anchor text, URL, and source page in separate fields, with an image link’s anchor text left empty, and the downloaded Excel workbook has two columns, anchor text and URL." aria-describedby="see-it-description" />
</picture>
</section>

<section class="film-review__essay" aria-labelledby="try-it-here">
<h2 id="try-it-here">Try it here</h2>
<p>Below is a copy of the reading list from Link Meteor’s <a href="https://ryanjosephkamp.github.io/link-meteor/practice.html">practice page</a>. Press and drag across it, the way you would on a real site with the extension installed. On a phone, tap <strong>Drag with touch</strong> first, or use <strong>Select all</strong>.</p>
<div data-lm-demo="capture"></div>
<p>Click any link in the result to see everything saved with it. A few things to notice:</p>
<ul>
<li><strong>“Download PDF” stays “Download PDF”.</strong> Link Meteor never visits a link’s destination to look up a nicer title. The anchor text is what the page called the link; the destination’s own title is a different fact.</li>
<li><strong>The image link has no text,</strong> so its anchor text stays empty, and the image’s label, “Canopy coverage map”, goes in a separate field.</li>
<li><strong>The first link and “the canopy study” point to the same paper.</strong> Both are kept, each with its own label. Tick <strong>Group by URL</strong> to fold them together, and untick it to get both back. Grouping is a view; nothing is merged or thrown away.</li>
</ul>
</section>

<section class="film-review__essay" aria-labelledby="why-i-built-it">
<h2 id="why-i-built-it">Why I built it</h2>
<p>I collect links constantly: papers for classes and research, documentation, datasets, and sources for whatever I’m writing. For years, I used <a href="https://link-grabber.com/">Link Grabber</a>, a Chrome extension that lets you hold Command and drag across a page, very intuitively, to grab its links.</p>
<p>But after a mid-2026 update, the extension uses <a href="https://link-grabber.com/">freemium pricing</a> with usage limits. So, I decided to make my own and share it with the world. <strong>For free, forever, for real.</strong></p>
<p>Oh, and it’s way better than Link Grabber.</p>
<p>Before Link Meteor, extensions for collecting URLs frequently failed to figure out what a link should turn into after the grab. A bare URL forgets what the author called it. “Surface temperature and tree canopy in 40 mid-sized cities” becomes <code>doi.org/10.5555/uhi.2024.0142</code>, a “Download PDF” button becomes a file path, and a reading list becomes a column of addresses you have to open one by one to understand. Bookmark managers and tab savers do keep a title, but it’s the destination’s own title, which is not always the same as what the citing page originally called the link.</p>
<p>I wanted a tool that treats a link the way a careful researcher would: anchor text and URL as two fields, plus when and where the link was found. Then I wanted everything that comes next: collections, notes, citations, and exports for every tool I use.</p>
<p><strong>When Link Meteor fails, it says so.</strong> The extension will never quietly lose, merge, or invent anything.</p>
<p><strong>And it’s private</strong>: there’s no account or server anywhere to collect your personal data, slow you down, bombard you with ads, or lock features and functionalities behind a paywall.</p>
<p><strong>“Freemium?” Forget that.</strong></p>
</section>

<section class="film-review__essay" aria-labelledby="what-else-is-out-there">
<h2 id="what-else-is-out-there">What else is out there</h2>
<p>Link Meteor isn’t the first tool in this space, and it owes a lot to the ones before it. Here’s where the tools people usually reach for stand, as of November 2026, going by each one’s store listing, website, or source code:</p>
<table><thead><tr><th scope="col">Tool</th><th scope="col">What it’s for</th><th scope="col">Keeps link text?</th><th scope="col">Saves and exports</th><th scope="col">Cost and data</th></tr></thead><tbody>
<tr><td data-label="Tool"><a href="https://link-grabber.com/">Link Grabber</a></td><td data-label="What it’s for">Grabbing links by dragging, from whole pages, or by crawling a site</td><td data-label="Keeps link text">Not stated</td><td data-label="Saves and exports">CSV, text, clipboard, and bookmarks</td><td data-label="Cost and data">A trial of 20 link actions, then $5 a month or a lifetime license; sends usage analytics</td></tr>
<tr><td data-label="Tool"><a href="https://github.com/from-es/linkclump-plus">Linkclump Plus</a>, a fork of the original Linkclump</td><td data-label="What it’s for">Dragging over links to open, copy, or bookmark them</td><td data-label="Keeps link text">Yes, when copying</td><td data-label="Saves and exports">Clipboard and bookmarks only</td><td data-label="Cost and data">Free</td></tr>
<tr><td data-label="Tool"><a href="https://github.com/az0/linkgopher">Link Gopher</a></td><td data-label="What it’s for">Listing every link on a page</td><td data-label="Keeps link text">No: URLs only, sorted, with duplicates removed</td><td data-label="Saves and exports">A list to copy</td><td data-label="Cost and data">Free</td></tr>
<tr><td data-label="Tool"><a href="https://webscraper.io/">Web Scraper</a> and Instant Data Scraper</td><td data-label="What it’s for">Scraping page data into tables</td><td data-label="Keeps link text">Only if you set it up per site, or the scraper guesses it</td><td data-label="Saves and exports">CSV and Excel</td><td data-label="Cost and data">Free extensions; Web Scraper’s cloud plans are paid</td></tr>
<tr><td data-label="Tool"><a href="https://www.zotero.org/download/connectors">Zotero Connector</a></td><td data-label="What it’s for">Saving papers and pages to a reference library</td><td data-label="Keeps link text">Not its job: it saves items, not the links on a page</td><td data-label="Saves and exports">BibTeX, RIS, and CSL-JSON, through Zotero</td><td data-label="Cost and data">Free</td></tr>
<tr><td data-label="Tool">OneTab, Session Buddy, and Raindrop.io</td><td data-label="What it’s for">Saving tabs and bookmarks</td><td data-label="Keeps link text">Page titles, not link text</td><td data-label="Saves and exports">Varies</td><td data-label="Cost and data">OneTab and Session Buddy are free; Raindrop.io needs an account and has a paid tier</td></tr>
<tr><td data-label="Tool"><strong>Link Meteor</strong></td><td data-label="What it’s for">Links with their words, sources, and citations</td><td data-label="Keeps link text"><strong>Yes, as its own field</strong></td><td data-label="Saves and exports">12 file formats, the clipboard, and bookmarks</td><td data-label="Cost and data">Free, with no account, server, or analytics</td></tr></tbody></table>
<p>Every one of these does something well. Link Grabber does the most, down to crawling whole sites, but after its trial (20 link actions or 1,000 links), the main features cost $5 a month or a one-time lifetime fee, and its privacy policy says it sends usage analytics that can include the address of the page you used it on. Linkclump Plus is free and fast, but its job ends at the clipboard. Zotero is built for managing references, so it saves papers and pages, not the links on a page.</p>
<p>What I couldn’t find anywhere was the combination: link text and URL as separate fields, every occurrence kept with the page it came from, collections you can curate, and citation exports, all free, with nothing sent anywhere. Link Meteor is that combination.</p>
</section>

<section class="film-review__essay" aria-labelledby="from-one-paragraph-to-every-open-tab">
<h2 id="from-one-paragraph-to-every-open-tab">From one paragraph to every open tab</h2>
<p>A region is the quickest way in, but you choose how much to collect, and Link Meteor shows the scope before it captures:</p>
<ul>
<li><strong>A region:</strong> press <kbd>Option</kbd>+<kbd>Shift</kbd>+<kbd>L</kbd> on a Mac (<kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>L</kbd> on Windows and Linux) and drag. Scroll while dragging to reach more, or add another region.</li>
<li><strong>Hold a key and drag:</strong> hold <kbd>Z</kbd>, or <kbd>Command</kbd> on a Mac and <kbd>Ctrl</kbd> elsewhere, and drag on any site you’ve allowed. One choice allows every site, with a list of sites to skip. Typing in a text field never triggers it.</li>
<li><strong>This page:</strong> every loaded link, including links inside closed web components and frames.</li>
<li><strong>Tabs and windows:</strong> tabs you pick, this window, or every window, up to 100 tabs per capture, each with its own result. Or save the tabs themselves as links.</li>
<li><strong>A PDF:</strong> from a PDF’s tab, or a PDF file on your computer.</li>
</ul>
<p>New in 1.0, there are three bigger captures, each with a counter, a Stop button, a stated limit, and one Undo: <strong>Scroll to the end first</strong> for pages that load more as you scroll (up to 50 screens), <strong>Follow Next</strong> through up to 20 pages, and <strong>Capture their pages…</strong> for up to 20 links you choose. None of them crawl. They go one level deep at most, and the links they find are saved, never followed.</p>
<p>When a page can’t be read, Link Meteor says so. A capture across several tabs reports each one separately, and a page with no links is never confused with a page it wasn’t allowed to read.</p>
</section>

<section class="film-review__essay" aria-labelledby="keep-it-organized">
<h2 id="keep-it-organized">Keep it organized</h2>
<p>Captures land in named collections saved on your computer. Review them in Chrome’s side panel next to the page you’re reading, or in a full view with anchor text, URL, and source in their own columns.</p>
<figure class="lm-figure">
<img src="{{ '/assets/media/link-meteor/2026-11-01-r1/shot-workbench.webp' | relative_url }}" width="1600" height="1111" loading="lazy" decoding="async" alt="The Link Meteor full view in a browser tab: collections and site access on the left; in the middle, the capture options, then 102 links grouped by URL, with the first link shown four times, also labeled “the canopy study”, and expanded to show its reading status, star, and the words around it; export options on the right." />
<figcaption>The full view after capturing the practice page, grouped by URL, with the first link’s four occurrences opened.</figcaption>
</figure>
<ul>
<li>Search anchor text, URLs, source pages, the words around each link, notes, and tags.</li>
<li>Filter by site, by file type, or by links that stay on the source site.</li>
<li>Add notes and tags, mark links Unread, Reading, or Read, and star the ones that matter.</li>
<li>Add up to 20 columns of your own, such as a deadline or a contact, and fill one in for many links at once.</li>
<li>Move or copy links between collections, or import them from spreadsheets, PDFs, bookmarks, or pasted text.</li>
<li>See a collection at a glance in Insights: its sites, file types, reading status, repeats, and captures by week.</li>
<li>Undo removals, imports, and moves, and back up every collection to one file.</li>
</ul>
</section>

<section class="film-review__essay" aria-labelledby="take-it-anywhere">
<h2 id="take-it-anywhere">Take it anywhere</h2>
<p>Copy two clean columns straight into a spreadsheet, or download a file in whatever format your next tool wants. This preview runs Link Meteor’s own export code on the links you selected above:</p>
<div data-lm-demo="export"></div>
<p>A few details that matter when you open the file:</p>
<ul>
<li>A CSV cell that looks like a formula starts with an apostrophe, so a spreadsheet won’t run it.</li>
<li>In an Excel workbook, every cell is stored as text, so a label like “3-4” never turns into a date.</li>
<li>An empty anchor stays empty in Markdown instead of being filled with the URL.</li>
<li>Files are named after the collection and the time by default, and you choose which columns go out, in what order.</li>
</ul>
</section>

<section class="film-review__essay" aria-labelledby="made-for-research">
<h2 id="made-for-research">Made for research</h2>
<p>Link Meteor reads the identifiers that addresses already contain: DOIs, arXiv IDs, PubMed and PMC IDs, and ISBNs. When you capture from a paper’s own page, it also keeps the citation details that the page publishes about itself (title, authors, date, and journal), along with the words around each link. Paste a link below to see what it can read from the address alone:</p>
<div data-lm-demo="identifiers"></div>
<p>Notice what’s missing: no authors and, for most links, no year. Link Meteor never visits a link’s destination to fill those in. If you want them, <strong>Page details lookup</strong> can fetch them, but it’s off until you turn it on, it runs only when you click <em>Look up details</em>, and it sends nothing but the DOI, arXiv ID, or PubMed ID to <a href="https://www.crossref.org/">Crossref</a>, <a href="https://datacite.org/">DataCite</a>, or <a href="https://www.ncbi.nlm.nih.gov/">NCBI</a>.</p>
<h3>The links inside PDFs</h3>
<p>Papers link to their data, code, and references, and those links are usually stuck inside the PDF. On a PDF’s tab, <strong>Capture this PDF</strong> reads each link with the words under it, the page it’s on, and the words around it, or, in a reference list, the whole reference. A preview shows everything before anything is saved. Try it with the practice paper, or with any PDF on your computer:</p>
<div data-lm-demo="pdf" data-sample="{{ '/assets/media/link-meteor/2026-11-01-r1/practice-paper.pdf' | relative_url }}"></div>
<p>It works the other way, too: select links to PDFs, and download them as one ZIP or combine them into one PDF in the order you choose.</p>
</section>

<section class="film-review__essay" aria-labelledby="private-by-construction">
<h2 id="private-by-construction">Private by construction</h2>
<p>Link Meteor has no server to send anything to. Chrome stores your collections on your computer, and Link Meteor visits a site only when you ask it to: to open a link, download a file, read a PDF, or capture a page. Site access is optional, and the only feature that sends anything anywhere is the lookup above, which stays off until you turn it on. <a href="#how-its-built">How it’s built</a> explains how that’s enforced.</p>
</section>

<section class="film-review__essay" aria-labelledby="install-it">
<h2 id="install-it">Install it</h2>
<p>Link Meteor isn’t in the Chrome Web Store yet, so it installs by hand, in about two minutes:</p>
<ol>
<li><a href="https://ryanjosephkamp.github.io/link-meteor/downloads/link-meteor-1.0.0.zip">Download Link Meteor 1.0.0</a> (a 3 MB ZIP), and unzip it into a folder you’ll keep.</li>
<li>Open <code>chrome://extensions</code>, and turn on <strong>Developer mode</strong>.</li>
<li>Choose <strong>Load unpacked</strong>, and select the unzipped folder.</li>
<li>Pin Link Meteor to the toolbar, open the <a href="https://ryanjosephkamp.github.io/link-meteor/practice.html">practice page</a>, press <kbd>Option</kbd>+<kbd>Shift</kbd>+<kbd>L</kbd> (<kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>L</kbd> on Windows and Linux), and drag across a section.</li>
</ol>
<p>The <a href="https://ryanjosephkamp.github.io/link-meteor/install.html">installation guide</a> has a video walkthrough and explains how to update from an earlier version. Bugs and ideas go to <a href="https://github.com/ryanjosephkamp/link-meteor/issues">GitHub issues</a>.</p>
</section>

<section class="film-review__essay" aria-labelledby="how-its-built">
<h2 id="how-its-built">How it’s built</h2>
<p>Link Meteor is plain JavaScript: ES modules, HTML, and CSS, written for Chrome’s Manifest V3, with no framework, no bundler, and no npm dependencies. Here’s the stack, and why each piece is there:</p>
<table><thead><tr><th scope="col">Piece</th><th scope="col">Built with</th><th scope="col">Why</th></tr></thead><tbody>
<tr><td data-label="Piece">Extension</td><td data-label="Built with">Manifest V3: a service worker, a page script injected when you use it, and Chrome’s side panel</td><td data-label="Why">The page script draws inside a shadow root, so a page’s styles can’t break Link Meteor, and Link Meteor can’t break the page.</td></tr>
<tr><td data-label="Piece">Permissions</td><td data-label="Built with"><code>activeTab</code>, plus optional permissions</td><td data-label="Why">Installing asks for almost nothing, and your click gives access to the page you’re on. Site access, tabs, bookmarks, and downloads are asked for by the feature that needs them, with the reason on screen.</td></tr>
<tr><td data-label="Piece">Saved data</td><td data-label="Built with"><code>chrome.storage.local</code>, behind one queue</td><td data-label="Why">Collections stay on your computer, and two saves can never race.</td></tr>
<tr><td data-label="Piece">Core</td><td data-label="Built with">Plain modules with no access to Chrome or the page</td><td data-label="Why">Unit tested in Node. The same code runs the website’s export preview and the demos in this post.</td></tr>
<tr><td data-label="Piece">Excel and ZIP files</td><td data-label="Built with">Small writers of its own</td><td data-label="Why">No dependencies, and full control over text-typed cells, a bold frozen header, filters, and real hyperlinks.</td></tr>
<tr><td data-label="Piece">PDFs</td><td data-label="Built with">Mozilla’s <a href="https://mozilla.github.io/pdf.js/">PDF.js</a>, unmodified and pinned to one version</td><td data-label="Why">A proven PDF reader. A test checks its files’ hashes, and it loads, in one worker, only when you read a PDF.</td></tr>
<tr><td data-label="Piece">Page details lookup</td><td data-label="Built with">A sandboxed page that can reach three addresses</td><td data-label="Why">Everywhere else, the extension can’t make network requests at all.</td></tr>
<tr><td data-label="Piece">Website</td><td data-label="Built with">Static HTML, CSS, and JavaScript on GitHub Pages</td><td data-label="Why">Self-hosted fonts and no third-party requests: the same rules as the extension.</td></tr>
<tr><td data-label="Piece">Tests</td><td data-label="Built with">Node’s test runner, <a href="https://playwright.dev/">Playwright</a> driving Chrome for Testing, Python’s openpyxl, and GitHub Actions</td><td data-label="Why">The browser tests load the real extension, and every pull request runs them on macOS, Windows, and Linux.</td></tr>
<tr><td data-label="Piece">Minimum Chrome</td><td data-label="Built with">Chrome 116</td><td data-label="Why">The first version that lets an extension open its side panel from its own toolbar button (<code>chrome.sidePanel.open</code>).</td></tr></tbody></table>
<p><strong>No framework, no dependencies.</strong> Link Meteor’s screens are panels, lists, and forms. Its hard parts are Chrome’s APIs and file formats, where a framework wouldn’t help. Without a build step, the extension you install is the source code, copied as is: quick to load, easy to read, and nothing upstream can change under it.</p>
<p><strong>One queue for every save.</strong> Chrome can stop and restart an extension’s service worker at any moment. So every change to saved state, from a capture to an Undo, goes through a single serialized queue, and a failed write leaves the last good copy in place.</p>
<p><strong>A sealed door for the one online feature.</strong> The extension’s pages have a content security policy of <code>connect-src 'none'</code>, so they can’t make network requests at all. Page details lookup runs in a separate sandboxed page whose policy allows exactly three addresses: the APIs of Crossref, DataCite, and NCBI. It sends no cookies and no referrer.</p>
<h3>How I tested it</h3>
<p>Every release lists what was tested, how, and what wasn’t. For 1.0.0, that’s 362 unit tests on Node’s built-in test runner, and 20 automated browser suites in which Playwright drives Chrome for Testing with the real extension loaded, down to pressing its toolbar button through Chrome’s DevTools protocol. GitHub Actions runs them on macOS, Windows, and Linux. The suites that need Chrome’s real permission prompts ran with Allow clicked by hand, the oldest supported Chrome (116) got its own run, and I checked the release by hand with real pages and papers. Excel exports are read back independently with Python’s openpyxl, and each release is packaged as a deterministic ZIP with a SHA-256 hash for every file.</p>
<p>The <a href="https://ryanjosephkamp.github.io/link-meteor/practice.html">practice page</a> publishes an answer key for every section, so anyone can check that a drag selects exactly the links it should. The full results, including the gaps, are in the <a href="https://github.com/ryanjosephkamp/link-meteor/blob/main/docs/ACCEPTANCE.md">testing notes</a>.</p>
</section>

<section class="film-review__essay" aria-labelledby="what-it-doesnt-do-yet">
<h2 id="what-it-doesnt-do-yet">What it doesn’t do (yet)</h2>
<ul>
<li><strong>Desktop Chrome only, for now.</strong> There’s no Firefox, Safari, or mobile version. An earlier version (0.3.0) worked in Brave and Microsoft Edge when I checked them by hand, but I haven’t checked 1.0.0 there.</li>
<li><strong>Not in the Chrome Web Store yet.</strong> It installs by hand, as above.</li>
<li><strong>No crawling.</strong> It reads what you point it at, one level deep at most.</li>
<li><strong>No cloud copy.</strong> Collections live in one Chrome profile, and a backup file moves them to another computer.</li>
<li><strong>Only real links.</strong> Scanned PDF pages are pictures, an address printed without a link isn’t picked up, and a JavaScript-only button isn’t a link.</li>
</ul>
<p>The <a href="https://github.com/ryanjosephkamp/link-meteor/blob/main/CHANGELOG.md">changelog</a> lists the known issues in 1.0.0.</p>
</section>

<section class="film-review__links" aria-labelledby="project-links">
<h2 id="project-links">Project links</h2>
<ul>
<li><a href="https://ryanjosephkamp.github.io/link-meteor/">Link Meteor website</a></li>
<li><a href="https://ryanjosephkamp.github.io/link-meteor/install.html">Installation guide</a></li>
<li><a href="https://ryanjosephkamp.github.io/link-meteor/guide.html">User guide</a></li>
<li><a href="https://ryanjosephkamp.github.io/link-meteor/practice.html">Practice page</a></li>
<li><a href="https://ryanjosephkamp.github.io/link-meteor/privacy.html">Privacy and permissions</a></li>
<li><a href="https://github.com/ryanjosephkamp/link-meteor">Source code on GitHub</a></li>
<li><a href="https://github.com/ryanjosephkamp/link-meteor/releases/tag/v1.0.0">Version 1.0.0 release notes</a></li>
<li><a href="https://github.com/ryanjosephkamp/link-meteor/issues">Report a bug or suggest a feature</a></li>
</ul>
</section>

</div>

<script type="module" src="{{ '/assets/link-meteor-demos/mount.js' | relative_url }}"></script>
