---
title: "Aqrobat: QR codes, in character"
description: "A free generator that draws working QR codes with emoji and text, then shapes each copy for the app you paste it into."
permalink: /articles/aqrobat/
date: 2026-10-31
storage_free: true
styles:
  - /assets/css/aqrobat-post.css
scripts:
  - /assets/js/aqrobat-core.js
  - /assets/js/aqrobat-demos.js
---

<div class="film-review aqrobat-post">
<header class="film-review__intro">
<h1>Aqrobat: QR codes, in character</h1>
{% include article-date.html %}
<p class="article-subtitle">A QR code you can copy and paste like text, and still scan.</p>
<p><strong><a href="https://ryanjosephkamp.github.io/aqrobat/">Aqrobat</a> makes QR codes out of text.</strong> Every dark square of a standard QR code becomes a character you pick, and every light square becomes a blank. The result isn’t a picture of a QR code. It’s text: you can select it, copy it, and paste it into an email, a chat, or a document, and a phone camera still reads it.</p>
<p>Drawing a scannable QR code with text is the easy part. Making the code survive a paste into another app is the hard part, and that’s what Aqrobat does.</p>
<ul>
<li><strong>Free, and it stays on your device.</strong> No account, no server, no ads, and no tracking. Codes are made in your browser, and nothing you type is sent anywhere.</li>
<li><strong>It knows where the code is going.</strong> Tell it the destination (Gmail, Slack, Google Docs, GitHub, Notion, or one of a few others), and it copies the code in the shape that app keeps: formatted text, plain emoji, a code block, or an image.</li>
<li><strong>The characters are yours.</strong> Emoji squares in six colors, full blocks, <code>#</code>, any emoji, or several at once. The corner markers and the light squares can get characters of their own, too. Want a rocket ship emoji (🚀) QR code, or a smiley face AND a hash character (🙂#), or practically any other combination of text, emoji, etc.? You can do it with Aqrobat.</li>
<li><strong>Your link stays exact.</strong> Up to 1,024 bytes, never shortened. If it doesn’t fit, Aqrobat says so instead of quietly trimming it.</li>
<li><strong>More than a website.</strong> A Chrome extension puts a code straight into the field you’re typing in, and there’s an offline page and a command-line tool.</li>
</ul>
</header>

<section class="film-review__film" aria-labelledby="see-it-work">
<h2 id="see-it-work">See it work</h2>
<p id="see-it-work-description">A 19-second recording of the real page. A link goes in, the grapes get black corners and white blanks, the emoji picker finds a black heart, the corner frames turn red, and one click copies the code for Slack.</p>
<picture>
<source media="(prefers-reduced-motion: reduce)" srcset="{{ '/assets/media/aqrobat/2026-10-31-r1/aqrobat.png' | relative_url }}" />
<img class="aqrobat-film" src="{{ '/assets/media/aqrobat/2026-10-31-r1/aqrobat.gif' | relative_url }}" width="1200" height="1080" alt="Aqrobat at work: a link is typed onto the default emoji-square code, grapes get black-square corners and white blanks, the emoji picker finds a black heart by searching for heart, the corner frames turn red, and one click copies the code for Slack." aria-describedby="see-it-work-description" />
</picture>
</section>

<section class="film-review__essay aqrobat-essay" aria-labelledby="why-i-built-it">
<h2 id="why-i-built-it">Why I built it</h2>
<p><strong>Can text itself be a QR code?</strong></p>
<p>Not just a picture of one. Actual characters you can select and copy.</p>
<p>The answer is yes, and it has been for a while. Terminal tools have printed QR codes with block characters for years, and people have built them out of emoji, too. The catch is that <strong>those codes are made for one place</strong>. A terminal has a monospace font and keeps every space. Paste the same code into an email or a chat, and the app applies its own formatting and breaks the code: it swaps the font, collapses the spaces, stretches the lines, or wraps the rows. The code that looked perfect in the generator doesn’t scan on the other side.</p>
<p>So, yes, text itself <em>can</em> be assembled into a readable QR code, at least in the application that generates the code. But whether the code survives a paste into a different app is a separate question, and this project is my attempt to answer it.</p>
<p><strong>Introducing… Aqrobat: QR codes that survive the paste!</strong></p>
</section>

<section class="film-review__essay aqrobat-essay" aria-labelledby="make-one">
<h2 id="make-one">Make one</h2>
<p>This is Aqrobat’s real encoder, running in this page. Type a link, pick your characters, and point your phone’s camera at the code.</p>
<div class="aqrobat-demo" data-aqrobat-demo="maker" role="group" aria-label="Make a code">
<p class="aqrobat-demo__fallback">This demo needs JavaScript. You can make a code on <a href="https://ryanjosephkamp.github.io/aqrobat/">Aqrobat’s site</a> instead.</p>
</div>
<p>Every dark square is one of your characters. Type several, like 🍇🍓🫐, and they take turns in the order you typed them. Every light square is a blank: ⬜ for the squares, and a mostly white ▫️ for other emoji. There’s no solid QR code hiding behind the characters, either. What you see is all a camera gets.</p>
<p>The line under the code says what’s known about that exact choice: whether it has scanned from Gmail on a real phone, how it did in a Gmail simulator calibrated on real phone scans, or that nobody has tried it yet. On the site, every new code starts out marked <strong>Untested</strong> for the same reason. Fonts, screens, and phones vary, so you scan the pasted result before you rely on it.</p>
</section>

<section class="film-review__essay aqrobat-essay" aria-labelledby="what-apps-do-to-your-code">
<h2 id="what-apps-do-to-your-code">What apps do to your code</h2>
<p>A QR code needs every row the same width and every square roughly square. Apps don’t agree on fonts, line spacing, or what to keep from the clipboard, so a code that leaves the generator in perfect shape can arrive in pieces. Here’s the same link drawn with full blocks and with emoji squares. Pick what the app does:</p>
<div class="aqrobat-demo" data-aqrobat-demo="paste" role="group" aria-label="What apps do to a pasted code">
<p class="aqrobat-demo__fallback">This demo needs JavaScript.</p>
</div>
<p>To find out what actually survives, I built a test lab. It pastes codes with the real clipboard into eight editors (a plain text box, a bare editable page, ProseMirror, Tiptap, Quill, Lexical, CKEditor 5, and Slate, the engines behind many of the web’s text fields) using fonts and spacing like Gmail’s, Google Docs’, Slack’s, Discord’s, and Notion’s. Then two software decoders read every result. After 3,720 pastes, a few rules held up:</p>
<ul>
<li><strong>Emoji squares survive almost anywhere.</strong> In all 1,984 emoji-square cases, every row arrived intact. Every emoji in a font is the same width, so the rows line up whatever font the app picks.</li>
<li><strong>Loose line spacing beats them.</strong> At Notion-style 1.5 spacing, emoji squares passed 11 of 36 cases, so Aqrobat sends Notion a code block instead.</li>
<li><strong>Letters and blocks need a monospace font.</strong> Full blocks passed in code blocks and failed in all 192 rich-text cases, where a block and a space are different widths.</li>
<li><strong>Formatted text depends on the editor.</strong> A bare editable page kept its styles, and the code read in all 24 cases. Lexical, CKEditor, and Slate stripped them in all 24.</li>
</ul>
<p>Those are simulations of the apps’ styles, not the apps themselves, and software reading a screenshot isn’t a phone scan. But they decided what each destination gets:</p>
<table>
<thead><tr><th>Destination</th><th>Pastes as</th><th>Tested characters</th></tr></thead>
<tbody>
<tr><td data-label="Destination">Gmail, Outlook, Word</td><td data-label="Pastes as">Formatted text</td><td data-label="Tested characters">Emoji squares</td></tr>
<tr><td data-label="Destination">Google Docs, Apple Notes, Slack, Discord, plain text</td><td data-label="Pastes as">Plain text</td><td data-label="Tested characters">Emoji squares</td></tr>
<tr><td data-label="Destination">GitHub, Markdown</td><td data-label="Pastes as">Code block</td><td data-label="Tested characters">Full blocks</td></tr>
<tr><td data-label="Destination">Notion</td><td data-label="Pastes as">Code-block text</td><td data-label="Tested characters">Full blocks</td></tr>
<tr><td data-label="Destination">Anywhere else</td><td data-label="Pastes as">Image</td><td data-label="Tested characters">Any</td></tr>
</tbody>
</table>
<p>Every format carries the characters you picked. The destination only decides the wrapper.</p>
</section>

<section class="film-review__essay aqrobat-essay" aria-labelledby="gmail-specifically">
<h2 id="gmail-specifically">Gmail, specifically</h2>
<p>On a phone, Gmail pastes plain text and then changes it in two ways that matter for a QR code:</p>
<ul>
<li><strong>Runs of spaces collapse to one.</strong> A letter code uses spaces for its light squares, so it loses its shape. No plain-text layout of letters survived this in testing.</li>
<li><strong>Emoji become Google’s own emoji images.</strong> They all come out the same size, which keeps the rows lined up. But Gmail draws ⬜ as a light gray tile about as bright as most emoji, so a camera can’t tell grapes from the background.</li>
</ul>
<p>I tested this the only way that counts: I sent codes through Gmail from my phone and scanned them off a bigger screen. Black squares scanned. Grapes and smileys didn’t.</p>
<p>So now every emoji other than the squares gets the mostly white ▫️ for its light squares and solid ⬛ corner markers, which are the first thing a camera looks for. In a Gmail simulator calibrated on those phone results, grapes went from 0 of 12 camera trials to 9. Then the real test: on October 29, 2026, grape and black-heart codes laid out that way scanned from Gmail on my phone. Smileys still don’t, because they’re mostly light, so the page warns you before you pick one.</p>
<p>A code in Gmail also reads best on a wide screen, like a laptop or a tablet. On a phone’s screen, it gets squeezed too small. For phone to phone, send the image.</p>
<p>Oh, and one bug I didn’t see coming. On my Samsung phone, copying a code with emoji light squares said “Copied.” and put nothing on the clipboard. The formatted copy was about 860 KB, Android refuses clipboard writes near 1 MB, and Chrome reports success anyway. On Android, Aqrobat now copies big codes as plain text, which is what Gmail on a phone uses anyway, and it tells you so.</p>
</section>

<section class="film-review__essay aqrobat-essay" aria-labelledby="whats-already-out-there">
<h2 id="whats-already-out-there">What’s already out there</h2>
<p>Text QR codes aren’t new, and Aqrobat isn’t the first tool to make them out of emoji. Here’s what I found, starting with the closest:</p>
<table>
<thead><tr><th>Project</th><th>What it does</th><th>How it compares</th></tr></thead>
<tbody>
<tr><td data-label="Project"><a href="https://oshiqr.com/en">OshiQR</a></td><td data-label="What it does">A free web generator that runs in your browser. Makes codes from emoji (any emoji for the dark and light squares), half blocks, or full blocks, and copies them as text or saves an image.</td><td data-label="How it compares">The closest match by far. It notes that text codes need a monospace font, and it suggests saving an image for wider compatibility. Aqrobat shapes each copy for the app it’s going to instead.</td></tr>
<tr><td data-label="Project"><a href="https://shkspr.mobi/blog/?p=37419">Terence Eden’s emoji QR code</a> (2020)</td><td data-label="What it does">A blog experiment: ⬛ and ⬜ emoji, with CSS removing the gaps between them.</td><td data-label="How it compares">It scanned on his devices, but he found it fragile anywhere he couldn’t control the layout. That layout is the part Aqrobat works on.</td></tr>
<tr><td data-label="Project"><a href="https://fukuchi.org/works/qrencode/">qrencode</a> and <a href="https://github.com/gtanner/qrcode-terminal">qrcode-terminal</a></td><td data-label="What it does">Print QR codes with block characters in a terminal.</td><td data-label="How it compares">Built for a monospace terminal, and great there. Not meant for email or chat.</td></tr>
<tr><td data-label="Project"><a href="https://apps.apple.com/app/mojiqr-text-qr-generator/id6754708495">MojiQR</a> (iPhone)</td><td data-label="What it does">Draws QR-style codes with your own words and saves them as images.</td><td data-label="How it compares">Image output, and its developer says not every code will scan.</td></tr>
<tr><td data-label="Project">Picture QR codes: <a href="https://research.swtch.com/qart">QArt codes</a> (2012), logo generators, and AI art codes such as <a href="https://huggingface.co/monster-labs/control_v1p_sd15_qrcode_monster">QR Code Monster</a></td><td data-label="What it does">Put a picture into or around a working QR code.</td><td data-label="How it compares">Images, not text. The AI models’ own pages warn that not every output scans.</td></tr>
</tbody>
</table>
<p>I haven’t tested the other tools’ claims myself. The descriptions above are what each project says about itself, as of October 2026.</p>
</section>

<section class="film-review__essay aqrobat-essay" aria-labelledby="what-aqrobat-does-differently">
<h2 id="what-aqrobat-does-differently">What Aqrobat does differently</h2>
<ul>
<li><strong>A format for each app, chosen by testing.</strong> Formatted text for Gmail, Outlook, and Word; emoji squares for Google Docs, Apple Notes, Slack, and Discord; a code block for GitHub, Markdown, and Notion; and an image for everything else.</li>
<li><strong>Evidence, kept separate.</strong> Decoding in software, surviving a paste, and scanning on a phone are three different claims. Aqrobat never says a code scans until that exact output has been scanned.</li>
<li><strong>Parts.</strong> The corner frames, the corner centers, and the light squares can each get their own character, and the page warns you when a choice is likely to stop a camera.</li>
<li><strong>An extension that measures the field.</strong> It reads the font of the field you’re typing in and packs the characters to keep the squares square, so the code skips the clipboard entirely. Your draft is kept, selected text is never replaced, and Undo removes the code.</li>
<li><strong>Recipes.</strong> A small JSON file stores the exact input and every setting, so the same code can be rebuilt anywhere, character for character.</li>
<li><strong>The same core everywhere.</strong> The site, the offline page, the extension, and the command-line tool all run the same code, with no runtime dependencies.</li>
</ul>
</section>

<section class="film-review__essay aqrobat-essay" aria-labelledby="how-to-use-it">
<h2 id="how-to-use-it">How to use it</h2>
<h3>On the web</h3>
<ol>
<li>Open <a href="https://ryanjosephkamp.github.io/aqrobat/">Aqrobat</a>.</li>
<li>Type a link or some text.</li>
<li>Pick the characters that draw the dark squares.</li>
<li>Pick where the code will go, then press Copy.</li>
<li>Paste it, and scan the pasted result with your phone before you send it.</li>
</ol>
<p>It works offline, too. The <a href="https://ryanjosephkamp.github.io/aqrobat/downloads/aqrobat-offline.html">offline page</a> is the whole generator in one HTML file that opens straight from your disk.</p>
<h3>In Chrome</h3>
<p>The extension isn’t in the Chrome Web Store, so it installs by hand:</p>
<ol>
<li>Download and unzip <a href="https://ryanjosephkamp.github.io/aqrobat/downloads/aqrobat-extension.zip">the extension</a>.</li>
<li>Open <code>chrome://extensions</code> and turn on <strong>Developer mode</strong>.</li>
<li>Choose <strong>Load unpacked</strong> and pick the unzipped folder.</li>
</ol>
<p>Then choose Aqrobat in the toolbar to make a code for the page you’re on, or right-click a link or a selection. Want to try insertion first? The <a href="https://ryanjosephkamp.github.io/aqrobat/downloads/aqrobat-insertion-practice.html">practice page</a> needs no install. The extension asks only for <code>activeTab</code>, <code>scripting</code>, <code>storage</code>, and <code>contextMenus</code>, so it can reach a page only after you click it there.</p>
<h3>From the command line</h3>
<p>With Node 22 or newer, from a clone of <a href="https://github.com/ryanjosephkamp/aqrobat">the repository</a>:</p>
<pre><code>node bin/aqrobat.mjs 'https://example.com' --format tiles
node bin/aqrobat.mjs 'https://example.com' --glyph '🍇' --format paste
node bin/aqrobat.mjs 'https://example.com' --format recipe --out qr.json</code></pre>
<p>It has no dependencies, and it never overwrites a file.</p>
</section>

<section class="film-review__essay aqrobat-essay" aria-labelledby="how-its-built">
<h2 id="how-its-built">How it’s built</h2>
<p>Aqrobat is plain JavaScript: ES modules, HTML, and CSS, with no framework and no runtime dependencies. One core runs in three places: the website, the Chrome extension, and Node. Here’s the stack, and why each piece is there:</p>
<table>
<thead><tr><th>Piece</th><th>Built with</th><th>Why</th></tr></thead>
<tbody>
<tr><td data-label="Piece">Core</td><td data-label="Built with">JavaScript ES modules, no runtime dependencies</td><td data-label="Why">Runs unchanged in a page, an extension, and Node.</td></tr>
<tr><td data-label="Piece">QR encoding</td><td data-label="Built with"><a href="https://www.nayuki.io/page/qr-code-generator-library">Project Nayuki’s QR Code generator</a> (MIT), vendored</td><td data-label="Why">A proven, standard encoder. Aqrobat changes how the grid is drawn, never the code itself.</td></tr>
<tr><td data-label="Piece">Characters</td><td data-label="Built with"><code>Intl.Segmenter</code></td><td data-label="Why">One emoji can be several code points (flags, skin tones, families), and each still has to fill one square.</td></tr>
<tr><td data-label="Piece">Square cells</td><td data-label="Built with">Canvas text measurement</td><td data-label="Why">Fonts disagree about widths, so Aqrobat measures them instead of guessing.</td></tr>
<tr><td data-label="Piece">Website</td><td data-label="Built with">Static HTML, CSS, and ES modules on GitHub Pages</td><td data-label="Why">No server and no account, and nothing you type leaves your browser.</td></tr>
<tr><td data-label="Piece">Copying</td><td data-label="Built with">The async Clipboard API, with HTML and plain text in one copy</td><td data-label="Why">Rich editors take the formatting, and plain-text apps take the characters.</td></tr>
<tr><td data-label="Piece">Extension</td><td data-label="Built with">Chrome Manifest V3, with <code>activeTab</code>, <code>scripting</code>, <code>storage</code>, and <code>contextMenus</code></td><td data-label="Why">The fewest permissions that work.</td></tr>
<tr><td data-label="Piece">Command line</td><td data-label="Built with">Node 22</td><td data-label="Why">Scripts can make codes and recipes without a browser.</td></tr>
<tr><td data-label="Piece">Emoji picker</td><td data-label="Built with">Unicode 16.0’s emoji list and CLDR 46’s keywords, built into the page</td><td data-label="Why">Search by name, like a phone keyboard, with no network call.</td></tr>
<tr><td data-label="Piece">Tests</td><td data-label="Built with">Node’s test runner, Playwright driving Chrome, and the ZXing and jsQR decoders</td><td data-label="Why">Software checks every change. A phone has the final word.</td></tr></tbody></table>
<p><strong>No framework, no dependencies.</strong> The page is one screen with a few dozen controls, and the core has to run in a browser tab, an extension, and a terminal. Plain ES modules run in all three as they are. Nothing gets installed when you use Aqrobat, there’s nothing to keep up to date, and the whole generator fits in one HTML file that works offline. The only build step is a short Node script that inlines the modules into that file and packs the extension.</p>
<p><strong>A standard encoder, unchanged.</strong> QR encoding is a solved problem, and every phone camera already reads standard codes. Aqrobat uses Project Nayuki’s encoder as published, keeps its license, and only changes how the finished grid is drawn. Text outside ASCII goes in as UTF-8, marked with the QR standard’s ECI 26, so an emoji in your link comes back as the same emoji.</p>
<p><strong>Deterministic on purpose.</strong> The same input and settings always give the same code, character for character. That’s what makes recipes work, and it’s what makes the code testable: a test can rebuild any code and compare it exactly.</p>
<p><strong>The extension edits like you do.</strong> It inserts a code through the browser’s own editing commands instead of rewriting the page, so the editor sees an ordinary edit, and Undo takes it back out. With <code>activeTab</code>, it can’t touch a page until you click it there.</p>
<p><strong>Tested in software, settled on a phone.</strong> Unit tests run on Node’s built-in test runner. Browser tests use Playwright to drive Chrome, copy every destination’s format, and read the rendered codes with ZXing and jsQR. The paste lab uses the same setup with the real clipboard and eight editor engines. The Gmail simulator draws a pasted code the way Gmail does (Arial, Google’s Noto emoji, and collapsed spaces), then runs 12 camera-like trials on it, scaled, blurred, noisy, and tilted. Its results match all seven codes I’ve sent through Gmail and tried with my phone. Software can say a code is likely to work, but only a phone can say it does.</p>
<p>Even the demo at the top is the real page: Playwright records it frame by frame, and ffmpeg turns the frames into the GIF. Aqrobat is MIT licensed, and GitHub Actions runs the unit tests and a Prettier format check on every pull request.</p>
</section>

<section class="film-review__essay aqrobat-essay" aria-labelledby="what-it-cant-do-yet">
<h2 id="what-it-cant-do-yet">What it can’t do (yet)</h2>
<ul>
<li><strong>Wrapped rows break a code.</strong> Narrow windows and long links, which make bigger codes, are the usual causes. Make the font smaller, widen the window, or shorten the link.</li>
<li><strong>Light emoji don’t scan.</strong> 🙂 and 🐱 are mostly light, and the page warns you about them.</li>
<li><strong>Loose line spacing hurts emoji squares,</strong> and editors that strip formatting lose formatted text’s layout.</li>
<li><strong>Dark-mode code blocks invert the code:</strong> light blocks on a dark background, which some phone readers won’t accept.</li>
<li><strong>It isn’t secret.</strong> A character QR code is decoration, not encryption. Anyone with a camera can read it.</li>
<li><strong>Real-app testing is still thin.</strong> Gmail has real phone scans. Google Docs, Slack, Discord, Notion, Outlook, and Word have been tested only in simulation so far.</li>
</ul>
</section>

<section class="film-review__essay aqrobat-essay" aria-labelledby="a-side-quest-can-prose-be-a-qr-code">
<h2 id="a-side-quest-can-prose-be-a-qr-code">A side quest: can prose be a QR code?</h2>
<p><strong>There’s a harder version of the original question: Can ordinary, readable prose, words you can select and copy, also be a QR code that a phone scans?</strong></p>
<p><strong>Short answer: yes, but not invisibly.</strong> Prose scanned when each letter was set in one of two tones, dark or light, so the tones draw the code. A 1,114-word passage in 8-point Impact on a Letter page survived a copy and paste from one Word document into another, and it scanned easily.</p>
<p><strong>Early results: if a human can’t easily tell that something is a QR code, then a machine can’t, either.</strong></p>
<p><strong>I’m still trying to find a way to hide a QR code in natural-language prose, and I will update Aqrobat and this blog post as I discover more. Stay tuned!</strong></p>
<figure class="aqrobat-figure">
<img src="{{ '/assets/media/aqrobat/2026-10-31-r1/impact-page.png' | relative_url }}" width="840" height="840" loading="lazy" decoding="async" alt="A square block of small mixed-case Impact prose with black and gray letters." />
<figcaption>9-point Impact, mixed case, with each letter black or gray. Both phone scanner apps I tried read it. Try yours.</figcaption>
</figure>
<p>Prose that looks ordinary never scanned. Uniform text didn’t, words arranged on a QR grid didn’t, and heavy against regular weight didn’t. For fixed text where each letter can only be bold or regular, the error correction math rules it out: the best arrangement left at least 42 wrong codewords in a block that can repair 14.</p>
<p><strong>In other words, a camera can’t find a QR code that a person can’t see. FOR NOW.</strong></p>
<p>I’m still not convinced that it’s impossible to hide a QR code in a block of text.</p>
<p>The full notes, with the pages that scanned and the ones that didn’t, are on the <a href="https://ryanjosephkamp.github.io/aqrobat/research/">research page</a>.</p>
</section>

<section class="film-review__links" aria-labelledby="project-links">
<h2 id="project-links">Project links</h2>
<ul>
<li><a href="https://ryanjosephkamp.github.io/aqrobat/">Open Aqrobat</a></li>
<li><a href="https://ryanjosephkamp.github.io/aqrobat/downloads/aqrobat-extension.zip">Chrome extension (ZIP)</a></li>
<li><a href="https://ryanjosephkamp.github.io/aqrobat/downloads/aqrobat-offline.html">Offline page</a></li>
<li><a href="https://ryanjosephkamp.github.io/aqrobat/downloads/aqrobat-insertion-practice.html">Insertion practice page</a></li>
<li><a href="https://ryanjosephkamp.github.io/aqrobat/research/">Prose QR research</a></li>
<li><a href="https://github.com/ryanjosephkamp/aqrobat">Aqrobat on GitHub</a></li>
<li><a href="https://github.com/ryanjosephkamp/aqrobat/blob/main/docs/text-portability.md">Paste formats, in detail</a></li>
</ul>
</section>
</div>
