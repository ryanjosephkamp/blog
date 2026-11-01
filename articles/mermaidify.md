---
title: "mermaidify: a whiteboard that writes Mermaid"
description: "A drawing pad that reads a sketched flowchart or state diagram, right in the browser, and writes the Mermaid code for it, with no AI, no account, and no upload."
permalink: /articles/mermaidify/
date: 2026-11-01
storage_free: true
styles:
  - /assets/css/mermaidify-post.css
scripts:
  - /assets/js/mermaidify-reader.js
  - /assets/js/mermaidify-demos.js
---

<div class="film-review mfy-post">
<header class="film-review__intro">
<h1>mermaidify: a whiteboard that writes Mermaid</h1>
{% include article-date.html %}
<p class="article-subtitle">Sketch a flowchart with your finger, and get code you can paste anywhere – with no AI, no account, and no upload.</p>
<p><a href="https://ryanjosephkamp.github.io/mermaidify/">mermaidify</a> is a drawing pad for diagrams. You sketch a flowchart or a state diagram with a finger, a stylus, or a mouse, press <strong>Mermaidify</strong>, and it writes the <a href="https://mermaid.js.org/">Mermaid</a> code for what you drew: plain text that GitHub, GitLab, Notion, Obsidian, and most docs tools draw as a clean diagram.</p>
</header>

<section class="film-review__essay" aria-labelledby="differently">
<p id="differently">There are already tools that turn a picture of a diagram into code. mermaidify does it <strong>differently</strong>:</p>
<ul>
<li><strong>No AI, no server, no account.</strong> It reads your strokes with geometry, right in your browser, in about three thousandths of a second per drawing. Nothing you draw leaves your device, and once you’ve opened it, it works offline.</li>
<li><strong>It reads as you draw.</strong> Hold still at the end of a shape, and it snaps clean, so you see what it read before you ever ask for the code.</li>
<li><strong>The diagram stays yours to edit.</strong> Name shapes and arrows, change a shape’s look, restyle a line, or edit the code by hand, then copy it, save it as SVG or PNG, or embed it in a web page.</li>
<li><strong>It’s measured, not just demoed.</strong> On 300 hand-drawn flowcharts it was never tuned on, it finds 95% of the shapes and reads 82% of the arrows right.</li>
</ul>
</section>

<figure class="mfy-gif">
<img src="{{ '/assets/media/mermaidify/demo.gif' | relative_url }}" width="1040" height="640" alt="A flowchart sketched on mermaidify’s drawing surface: an oval, a box, an amber diamond that loops back to the box in green, and a red double circle. Mermaidify outlines each shape it read and draws the Mermaid flowchart beside it; then the box is tapped and named Write the draft.">
<figcaption>The example drawing: read, drawn by Mermaid beside it, and a shape named.</figcaption>
</figure>

<section class="film-review__essay" aria-labelledby="try-it">
<h2 id="try-it">Try it right here</h2>
<p>This is mermaidify’s real reader, the same code the app runs, working inside this page. Draw two boxes and an arrow between them, or load the example. Hold still for half a second at the end of a shape or an arrow, and it snaps clean.</p>
<div class="mfy-demo" data-demo="draw" role="group" aria-label="Draw a diagram and see its Mermaid code"><p class="mfy-fallback">This demo needs JavaScript. You can <a href="https://ryanjosephkamp.github.io/mermaidify/">draw in the app</a> instead.</p></div>
<p>The full app at <a href="https://ryanjosephkamp.github.io/mermaidify/">ryanjosephkamp.github.io/mermaidify</a> adds everything this little pad leaves out: names, colors, undo, choosing and moving strokes, templates, zooming, and saving.</p>
</section>

<section class="film-review__essay" aria-labelledby="why-i-built-it">
<h2 id="why-i-built-it">Why I built it</h2>
<p>Mermaid is plain text, it lives right next to the code it describes, and nearly every tool I use can draw it.</p>
<p>But typing Mermaid is a different job from thinking in pictures, and pecking away at a keyboard is nowhere near as fun as doodling a diagram on a page. You stop drawing, start naming nodes A, B, and C, look up which brackets make a diamond, and lose the thread of what you were working out.</p>
<p>The AI tools that turn a photo of a whiteboard into a diagram get surprisingly close, but they want an upload, an account, or a subscription; they take seconds rather than milliseconds; and an AI model’s answer can change from one run to the next. I wanted something that reads my drawing the same way every time, shows me what it read while I’m still drawing, runs on a phone with no connection, and costs nothing.</p>
<p><strong>So I built mermaidify: a whiteboard that writes Mermaid.</strong></p>
</section>

<section class="film-review__essay" aria-labelledby="already-out-there">
<h2 id="already-out-there">What’s already out there</h2>
<p>Turning a sketch into a diagram isn’t a new idea, and some of the tools that do it are very good. They fall into three groups.</p>
<h3>AI tools that read a photo or a prompt</h3>
<p><a href="https://mermaid.ai/products/ai">Mermaid AI</a>, from the team behind Mermaid, takes a prompt, a document, or an image of a diagram and gives you Mermaid code. <a href="https://docs.eraser.io/docs/image-import">Eraser</a> imports a photo of a hand-drawn diagram, <a href="https://help.lucid.co/hc/en-us/articles/30324063850516-Generate-a-diagram-with-AI-in-Lucidchart">Lucidchart</a> rebuilds an uploaded image as editable shapes, and <a href="https://plus.excalidraw.com/ai">Excalidraw</a> turns text into a diagram. And of course, you can hand a photo to ChatGPT, Claude, or Gemini and ask for Mermaid.</p>
<p>They’re impressive, but they all run on someone else’s model. That means an account, an upload, and usually credits: as of October 2026, Mermaid AI’s free plan comes with 15 AI credits, Eraser’s with 3, and Excalidraw’s with 10 requests a day. They read a finished picture rather than ink as you draw it. And none of the vendor pages I read says how often they get a diagram right.</p>
<h3>Note apps that tidy your shapes</h3>
<p><a href="https://support.gingerlabs.com/hc/en-us/articles/226905028-Creating-and-Styling-Perfect-Shapes">Notability</a>, <a href="https://www.goodnotes.com/blog/shape-recognition">Goodnotes</a>, <a href="https://support.apple.com/en-us/108919">Apple Notes</a>, Samsung Notes, and Concepts all turn a rough circle into a clean one, most of them when you hold your pen still at the end. (mermaidify borrows that gesture.) But a clean circle is all you get: the app doesn’t know which shapes your lines connect, so there’s no diagram to export.</p>
<p>Two come closer. Microsoft’s <a href="https://support.microsoft.com/en-us/office/convert-ink-to-shapes-in-office-8ca00db0-4342-4bde-bbb2-92d6cb5e2e45">Ink to Shape</a> turns a line drawn between two shapes into a real connector. And <a href="https://www.myscript.com/notes">MyScript</a> reads a whole hand-drawn diagram, handwriting included, into a graph of nodes and edges. Neither writes Mermaid, and MyScript’s engine is a commercial SDK.</p>
<h3>Research</h3>
<p>Reading hand-drawn flowcharts from pen strokes has been studied for over a decade, on datasets like FC_A, FC_B, and Google’s <a href="https://github.com/google-research/google-research/tree/master/didi_dataset">DIDI</a>. The best published model I found, <a href="https://madoc.bib.uni-mannheim.de/58430/">Arrow R-CNN</a>, is a neural network that gets 83.9% of DIDI’s text-free diagrams exactly right. That’s better than mermaidify’s 67%, though not a head-to-head number: it was trained on DIDI, scored a little more loosely, and timed on a data-center GPU. A few open-source projects pair a drawing canvas with a vision model, such as <a href="https://github.com/RishabSA/Sketch2Graphviz">Sketch2Graphviz</a>, which needs a server with a large GPU.</p>
<h3>Where mermaidify fits</h3>
<p>As far as I could find, mermaidify is the only tool that reads live ink into shapes and arrows and writes Mermaid entirely in the browser, with no model, no server, no account, and no key. It’s free, it works offline, it reads state diagrams as well as flowcharts, and it publishes its accuracy on drawings it was never tuned on.</p>
<p>It’s also weaker in certain areas. It doesn’t read handwriting, so you type the names. It can’t read a photo of a whiteboard you’ve already drawn on. And a well-trained neural network still reads more drawings. <strong>The trade: mermaidify does it in a few thousandths of a second, on any phone, for free, and gives the same answer every time.</strong></p>
</section>

<section class="film-review__essay" aria-labelledby="what-it-reads">
<h2 id="what-it-reads">What it reads</h2>
<p>mermaidify reads two kinds of diagram, flowcharts and state diagrams, from the same drawing.</p>
<ul>
<li><strong>Shapes:</strong> boxes, ovals, circles, diamonds, hexagons, parallelograms, trapezoids, triangles, boxes in boxes, and double circles, each as the Mermaid shape it looks like. A shape drawn around other shapes is a group.</li>
<li><strong>Arrows:</strong> a line with its head drawn as a hook, a V, a triangle, or a filled knot, at either end or both, in one stroke or apart. Curved lines read too, a dashed line is dotted in Mermaid, and a line drawn twice over is thick.</li>
<li><strong>State diagrams:</strong> a small filled dot is a start, a ring around a dot is an end, a diamond is a choice, and a shape around shapes is a composite state.</li>
<li><strong>Any order, any number of strokes.</strong> Draw the arrows first if you like, or a box in four separate lines. On 300 drawings, each read in five shuffled orders, 298 came out the same every time.</li>
</ul>
</section>

<section class="film-review__essay" aria-labelledby="how-it-reads">
<h2 id="how-it-reads">How the reader sees a drawing</h2>
<p>There’s no machine learning in mermaidify’s reader. It’s about 2,000 lines of geometry, and every decision it makes can be pointed at. Step through the example to see them:</p>
<div class="mfy-demo" data-demo="xray" role="group" aria-label="The example drawing, step by step, as the reader sees it"><p class="mfy-fallback">This demo needs JavaScript.</p></div>
<p>Because nothing is learned, the reader never guesses differently from one run to the next, and when it misreads, the reason is a rule I can look at and fix. Most of the work in this project went into those rules: when a hook is a head and when it’s just a wobble, when a line that stops short of a box still belongs to it, and when a small closed scribble is a filled dot rather than a tiny circle.</p>
</section>

<section class="film-review__essay" aria-labelledby="on-a-phone">
<h2 id="on-a-phone">Drawing on a phone, not a desktop</h2>
<p>mermaidify is built for a finger or a stylus first, because that’s where sketching happens.</p>
<ul>
<li><strong>Hold to snap.</strong> Hold still at the end of a shape, and it becomes the clean shape it’s closest to; at the end of a line, and it straightens; at the end of an arrow, and it becomes a clean arrow you can aim before you lift.</li>
<li><strong>Select, move, and snap later.</strong> Press any stroke and drag it, drag a box around several, and copy, group, turn, or snap them clean after the fact.</li>
<li><strong>Two erasers.</strong> One takes whole strokes; the other takes only the ink it passes over, to cut a line free of the box it was drawn with.</li>
<li><strong>Add what’s hard to draw.</strong> Clean shapes, arrows one way or both ways, and 18 templates, including eight agent workflows from <a href="https://ryanjosephkamp.github.io/grooph/">grooph</a>, my tool for designing them.</li>
<li><strong>A real pen works like a pen.</strong> Once it sees a stylus, a resting palm draws nothing, and your fingers move the drawing instead.</li>
</ul>
</section>

<section class="film-review__essay" aria-labelledby="how-well">
<h2 id="how-well">How well it reads</h2>
<p>A demo can be made to look good with the right drawing, so I measured mermaidify on drawings I didn’t make. <a href="https://github.com/google-research/google-research/tree/master/didi_dataset">DIDI</a> is a dataset from Google of flowcharts people drew by hand, each over a chart that says what should be there. I tuned the reader on one part of it and scored it on another part it had never seen.</p>
<div class="mfy-demo" data-demo="accuracy" role="group" aria-label="How well mermaidify reads, on people’s drawings and on generated ones"><p class="mfy-fallback">This chart needs JavaScript. The <a href="https://ryanjosephkamp.github.io/mermaidify/docs/accuracy/">accuracy page</a> has every number.</p></div>
<p>A whole drawing only counts when every shape and every arrow in it is right, which is why that number is the lowest. And there are real limits:</p>
<ul>
<li><strong>It doesn’t read handwriting.</strong> You type a shape’s name, or let your phone’s keyboard turn handwriting into text. Handwritten words inside a shape are left out of the reading.</li>
<li><strong>Two kinds of diagram, for now:</strong> flowcharts and state diagrams. Sequence diagrams and mind maps would be the natural next ones.</li>
<li><strong>Mermaid lays the diagram out its own way.</strong> mermaidify reads what connects to what and which way the drawing runs, but not exactly where you put each shape.</li>
</ul>
<p>The <a href="https://ryanjosephkamp.github.io/mermaidify/docs/accuracy/">accuracy page</a> in the docs has every number, how it’s measured, and what it gets wrong most.</p>
</section>

<section class="film-review__essay" aria-labelledby="use-it">
<h2 id="use-it">Use it</h2>
<p>Open <a href="https://ryanjosephkamp.github.io/mermaidify/">ryanjosephkamp.github.io/mermaidify</a> on a phone, a tablet, or a computer. There’s nothing to install, no account, and nothing to pay. Draw, press Mermaidify, tap a shape to name it, and copy the code.</p>
<p>To keep it for offline use, install it: <strong>Install</strong> in the address bar in Chrome or Edge; <strong>File</strong>, then <strong>Add to Dock</strong> in Safari on a Mac; or <strong>Add to Home Screen</strong> on a phone. It opens in a window of its own and updates itself when you’re back online.</p>
<p>To put a diagram on a web page, press <strong>Copy embed code</strong> under the diagram. The frame it gives you carries the diagram’s code in its own address, so nothing is stored anywhere.</p>
</section>

<section class="film-review__essay" aria-labelledby="how-its-built">
<h2 id="how-its-built">How it’s built</h2>
<p>mermaidify is a static website: a few HTML pages, TypeScript, and CSS, built into plain files that GitHub Pages serves. There’s no backend at all, which is the point. Here are the main pieces, and why I chose them.</p>
<ul>
<li><strong>TypeScript, with no UI framework.</strong> The heart of the app is one canvas that ink is drawn on; the rest is a toolbar, a few menus, and a code box. A framework like React would add weight to every page load on a phone without making the canvas any better, so the pages are plain TypeScript working with the page directly.</li>
<li><strong>The reader is a module of its own.</strong> It’s about 2,000 lines of TypeScript with no dependencies at all: strokes go in as lists of points, and a reading and its Mermaid text come out. Because it never touches a page, it runs the same in a browser, in a worker, and in Node, which is how the tests run it, and how this post runs it, too.</li>
<li><strong>Geometry, not machine learning.</strong> Each closed stroke is resampled and compared against the outlines of Mermaid’s shapes, a head is found where a line turns sharply back near its end, and each end of a line attaches to the nearest shape it points into. Rules like these run in a few milliseconds on any phone, need no model to download, and can be fixed one misread drawing at a time.</li>
<li><strong>Mermaid draws the diagram.</strong> mermaidify only writes the text; <a href="https://mermaid.js.org/">Mermaid</a> 12 lays it out and renders it as SVG right in the page. It loads the first time it’s needed, so the drawing pad opens fast.</li>
<li><strong>Pointer Events and a 2D canvas for the ink.</strong> One API covers a finger, a stylus, and a mouse; coalesced events keep fast strokes smooth; and the pointer’s type is how a palm is told apart from a pen.</li>
<li><strong>Vite builds it.</strong> Each page is its own entry, and every path is relative, so the same build runs at any address. The build also writes a service worker that lists every file it made, which is what lets the site work offline and install as an app.</li>
<li><strong>Everything ships with the site.</strong> Mermaid, the reader, and the fonts (Atkinson Hyperlegible Next and Mono, from the Braille Institute) are all served from the same place, with nothing loaded from anywhere else, so offline really means offline, and nothing you draw is sent anywhere.</li>
<li><strong>Tests that measure, not just pass.</strong> There are 141 unit tests on Node’s built-in test runner; 214 browser runs in <a href="https://playwright.dev/">Playwright</a> that draw with simulated pens, fingers, and mice at a phone’s size and a computer’s; and a benchmark of 2,000 generated drawings plus the 300-drawing DIDI score. Each score has a floor in CI on GitHub Actions, so a change that makes the reader worse can’t slip in quietly.</li>
</ul>
<p>It’s all MIT licensed, and the <a href="https://github.com/ryanjosephkamp/mermaidify">source is on GitHub</a>, along with the benchmark and the scripts that score it.</p>
</section>

<section class="film-review__links" aria-labelledby="project-links">
<h2 id="project-links">Project links</h2>
<ul>
<li><a href="https://ryanjosephkamp.github.io/mermaidify/">Use mermaidify</a></li>
<li><a href="https://ryanjosephkamp.github.io/mermaidify/docs/quickstart/">Quickstart</a></li>
<li><a href="https://ryanjosephkamp.github.io/mermaidify/docs/">The docs</a></li>
<li><a href="https://ryanjosephkamp.github.io/mermaidify/docs/accuracy/">How well it reads</a></li>
<li><a href="https://github.com/ryanjosephkamp/mermaidify">mermaidify on GitHub</a></li>
<li><a href="https://github.com/ryanjosephkamp/mermaidify/releases/tag/v1.0.0">Release notes for 1.0</a></li>
<li><a href="https://mermaid.js.org/">Mermaid</a></li>
</ul>
</section>

</div>
