---
title: "grooph: a whiteboard for AI agent workflows"
description: "Workflow diagrams for AI agents and the people who work with them: who does the work, who checks it, where a person decides, and when it all stops, in 2D and 3D."
permalink: /articles/grooph/
date: 2026-11-01
storage_free: true
styles:
  - /assets/css/grooph-post.css
scripts:
  - /assets/js/grooph.global.js
  - /assets/js/grooph-demos.js
---

<div class="film-review grooph-post">
<header class="film-review__intro">
<h1>grooph: a whiteboard for AI agent workflows</h1>
{% include article-date.html %}
<p class="article-subtitle">grooph = loop + graph</p>
<p>It still blows my mind that I can just ask an agent to build me a Mermaid diagram, and it actually works. In the summer of 2026, after seeing the successes of creators like <a href="https://shumer.dev/">Matt Shumer</a>, who used his so-called <a href="https://somethingbig.ai/gauntlet-loop">Gauntlet Loop</a> to get Opus 5 to build a premium browser FPS game (<a href="https://github.com/mshumer/Claude-of-Duty">Claude of Duty</a>) in one shot (from <a href="https://somethingbig.ai/gauntlet-loop#build-your-own">a single prompt</a>), I wondered if anyone had made a programmable "design language" like Mermaid, but for agent/subagent loop-graph workflow diagrams.</p><p>From what I could tell, nobody had. So, I did it.</p><p><a href="https://ryanjosephkamp.github.io/grooph/">grooph</a> draws workflow diagrams for AI agents and the people who work with them: who does the work, who checks it, where a person decides, and when it all stops. You can draw one yourself, ask an agent to draw it, or take turns.</p><p>Each diagram is a single small JSON file that a person and an agent can both read and write.</p>
<p>There are already plenty of ways to draw a flowchart, and plenty of platforms that build and run agents. grooph is <strong>neither</strong>:</p>
<ul>
<li><strong>It draws, and it never runs anything.</strong> grooph never starts an agent or calls a model, so a diagram works with Claude Code, with Codex, in a chat app, or for a team of people. Nothing you draw leaves your device.</li>
<li><strong>It checks the loops.</strong> Every loop has to say how it stops: a round limit, a budget, a passing check, or a person’s approval. A loop that would run “until it’s perfect” is flagged before anyone starts it.</li>
<li><strong>It’s made for a phone.</strong> The app opens in a browser, needs no account, and works offline once it’s been opened. A link opens the same diagram on any device.</li>
<li><strong>It’s 2D and 3D.</strong> The flat picture reads like a flowchart, and five 3D views show each loop as something you can turn and step through, one edge at a time.</li>
</ul>
</header>

<figure class="grooph-gif">
<img src="{{ '/assets/media/grooph/demo.gif' | relative_url }}" width="1040" height="640" alt="The review gate template in grooph: the flat picture of a builder, a critic, a human merge approval, and a stop in one loop, then the same diagram in 3D, turning while its slider lights a first pass one edge at a time.">
<figcaption>The review gate template, flat and then in 3D, stepping through a first pass one edge at a time.</figcaption>
</figure>

<section class="film-review__essay" aria-labelledby="why">
<h2 id="why">Why I built it</h2><p>Most useful work with AI agents is a loop of some kind. One agent makes a change, another checks it, and the change goes back until it passes – or until somebody decides it’s good enough. Add a test suite, a second reviewer, or a person who has to approve a merge, and the loop gets hard to hold in your head, let alone explain to someone else.</p>
<p>The usual way to describe these loops is a long prompt, and a long prompt is a bad diagram. You can’t see what drives the system, and you can’t see what stops it. That second part matters more than it sounds: a loop with no limit is a loop that can keep spending your money all night. I wanted to draw the loop, see it, and have something tell me when I’d forgotten the way out.</p>
</section>

<section class="film-review__essay">
<p>grooph is primarily a design language and a workflow drawing tool for humans and agents, not a bundle of hooks and skills to force a model to follow a graph that you've designed.</p><p>If you want to enforce a specific structure in your chosen harness, you can install the grooph npm package, which turns a diagram into a set of instructions that actually direct the work of your agents.</p><p>However, if you do choose that route, note that it might add friction and inefficiencies to your workflow.</p><p>I conducted a couple of empirical studies to compare the grooph package to the traditional prompt alternative (as Matt Shumer used in the Gauntlet Loop example), and the results suggest that, at least for the relatively small and short examples being tested, the package didn’t beat the same design written as a plain prompt. What did help, in both forms, was a reviewer who held evidence the builder couldn’t see.</p><p>In the first study (27 runs), the package scored the same as plain instructions on held-out checks, cost up to twice as much, and came last in three of four projects with a blind judge.</p><p>In the second (24 runs), the same instructions written as prose did just as well but were cheaper, and the package took two to eight times as many turns.</p><p>So, grooph dropped the directing and kept the drawing: <a href="https://ryanjosephkamp.github.io/grooph/docs/experiments/">what the experiments found</a> has the numbers and the data.</p>
</section>

<section class="film-review__essay" aria-labelledby="out-there">
<h2 id="out-there">What’s already out there</h2>
<p>The tools near grooph fall into three groups, and each one does something grooph doesn’t try to do.</p>
<ul>
<li><strong>Visual agent builders</strong> such as OpenAI’s <a href="https://developers.openai.com/api/docs/guides/agent-builder">Agent Builder</a>, <a href="https://n8n.io/">n8n</a>, <a href="https://flowiseai.com/">Flowise</a>, and <a href="https://www.langflow.org/">Langflow</a> let you lay out agents on a canvas and then run them there. The diagram is the program, so it lives on the platform that runs it.</li>
<li><strong>Framework tools</strong> such as <a href="https://blog.langchain.com/langgraph-studio-the-first-agent-ide">LangGraph Studio</a> draw the graph of an app built with that framework and step through it as it runs.</li>
<li><strong>Diagram tools</strong> such as <a href="https://mermaid.js.org/">Mermaid</a>, draw.io, and Excalidraw draw anything at all. Mermaid even added an <a href="https://mermaid.js.org/syntax/agentflow.html">agentflow</a> diagram type in version 12, still in beta. But a general diagram doesn’t know that a loop needs a way out, or that one box is a person’s approval and not another step.</li>
</ul>
<p>grooph sits between them. It has the vocabulary of the agent platforms – builders, critics, checks, human gates, stops, and the brakes on every loop – with the portability of a diagram. It runs nothing, it belongs to no framework, and it reads and writes Mermaid, both flowcharts and agentflows, so a grooph diagram goes anywhere Mermaid does.</p>
</section>

<section class="film-review__essay" aria-labelledby="try-it">
<h2 id="try-it">Try it right here</h2>
<p>These are eight of grooph’s twenty templates, drawn in this page by grooph’s own drawing script. Pick a workflow, then a view and a look. Each 3D view shows the loops differently: as stairs you climb a round at a time, as panes stacked toward you, as a spiral, as rings, or as columns.</p>
<div class="grooph-demo" data-demo="pick" data-src="{{ '/assets/data/grooph-demos.json' | relative_url }}" role="group" aria-label="Pick a workflow, a view, and a look"><p class="grooph-fallback">This demo needs JavaScript. You can <a href="https://ryanjosephkamp.github.io/grooph/#/templates">open the templates in the app</a> instead.</p></div>
<p>And this is the app itself, in a frame, holding the Review gate template as a graph. Tap <strong>3D</strong> at its top right, then turn the diagram and step through its first pass, one edge at a time.</p>
<figure class="grooph-live">
<iframe src="https://ryanjosephkamp.github.io/grooph/#/open?d=rVfbbtw2EP0VQi9tAWkRA31aP7S5GL0AbYEkSB8KA6GlkcRYIgWS2vXC3X_vGZK6beykBfrkJTkazpw5Z4Z-zA7Z_irP7pWusn3WWDm0WZ5Vpsz2j1gag_X-RZ4pPnatGgrfUlGrB1hp2RN232FXYFfE3QNZp4wObhsjO1g8Pnrp7s9n8cZoEseWtCCYnYTy1AulxeNj2VJ53ynnYaWccK05auGNaE1X5eIjPJDzRWn6XurqfP4oBukcuVxgKaRoR-wLOQzWHMiFaHqyDe0QkJf44TmfVlpNziGispNjRfBXUXbOs05pkg2xzSC9J4vwM0sHRceikZ7gpbam327-eMWfVuRKqwYfUs5eirtRdRVZofqho560j9EwADvxUsDWq5JzlqK25FpRGu3pwYuAQDSuVF2HxDhpYUY_jF7IRiqNpRRH-PDAcMbsWtRSdSPcCUt-tAE5djQFc1S-FW9vPvxy8-eurybQGELRGMbLzBgG2ATnl6NSxhFcfqKS8xOycybd4C6u2In3WHTgi3DeDC5WORhIuxTLo-QI0owIoJRDLoydNivlgH3ZwmOFeu3EqxQ8B5tgc6ggIVSvyHJ4CuZ8x0F2qpIezupONu5atIQimoY0mdEVE-gRXQfasqeBIi68lyw4R22wYcMVzB4NioAxfz1GCaR0s1kyoI32ixhezefWdLT5oIenjinGrllN3hrdMIeoro0FQ7NWNSy_O6uoxvKNmbnDjAmBwkme4gY53E78wVTqUC8bcc1RIVkt1YYsLdOGS15V4IgTJIFbjfiVbkIJnDwBTdajqJgPwIDF1J124u0YLw5UTPoTd4SASZzMiMsGxB4pVZnwZdQIn1rBMj4ae49PToYZ3UrPsCoNTjOu2ZQhNjdtAOslh29Zfok3VyjTd9ltnkVhzE7KVupmAw5cvP755e8_3byDjz0ylD5ZcSBqIiKHHrmUMHEMRAILxcdVsuvMkS9ibNH-OmLnVCk_L-yoi3jr7TlPbIm0epYsr6fjxJXZ_L9T5VcWjVhgmNtF3EqoothowNztxMA9Cu03FyUu1U3q4B0FOIIJ1wrU8MrVigImkSpsjQXwG3VP6D6ji1czF5yCDE-4pztxiwC-mAc-Qiz9OkJvRgTmnqEYs8dRVwsrox7xkfB2dCFYmXh3HTj4iZPPw89EQYyinfhAtlKlj30uBHQ5eni6uNhp0_0uWF9DbqGnFKByRbqkpZ-F5gwgZlDRyDTfeUdBeVt2R-t6lTdPpC1W0q1h6UgeAtpRyAUH_pk2tuyfdbLf1ncJMWQbu_4hocJWcVzzch9R-jtMEvy5zP95EfA0omKKZqMDno76xF-slLKoI4yaab4mhYQhNO0lmfwWRlIc7nhP5Bl-9AOL4P3SusOIqb6qgJ2I3pT_AY5MmNsBw_R24ATCvIttpCaq7mR5v4q6MnoVLw-7JdI38QxggMa84cay5BfH-Za7RbOeJFSk0VDMsk9vjGVkeLPuCnMt_k9epdcFXF2-sT4n3YwBpZgLZssS-BxpiHtJg7WDjWS8TmNm7lPOuaTPOd9wJ_kP9is3i02RipZcbT4O7tL51x1FcnzJ1b9Jm8sSmP6NW1MMJOEX1IokcZQuBHs7rXvq79BY2dly4TI_lqjgM3hnEV5U7anEbuPwwVXcVPs4rvCE42G0iWGRVOh3bsDXMfCkjPW5DTNqyybGdxqL1qtalovlF0jJIEmIasBMYTCzm9DOL1odZhPGGvoBNDBNsCpKWm6nXHy5PPEPBj3wq_TFjqdueNKukwMiRew46zx6-VDgVkys0FVQtWz__eo8vmxDfaTDc52Jl169oZV2qldoa1cvzoELg-lUqdY9Y5gqqJzpwi1LJ3rixJVmoPnfupnQQ6FNwbO1wAG_dxYnnx9c-Lg9n_8B" title="The Review gate template as a graph, in the grooph app" loading="lazy" referrerpolicy="no-referrer"></iframe>
<figcaption>The live app, as a share link opens it. The whole diagram is in the frame’s address, so nothing is sent anywhere.</figcaption>
</figure>
</section>

<section class="film-review__essay" aria-labelledby="one-document">
<h2 id="one-document">One small document</h2>
<p>Everything in a grooph diagram comes from one JSON document: its nodes, its edges, its loops, and the stops on each loop. That’s what makes it work with agents. An agent writes the document, grooph checks it, and you look at the picture instead of the JSON. You can also edit the document directly – try it below.</p>
<div class="grooph-demo" data-demo="doc" data-src="{{ '/assets/data/grooph-demos.json' | relative_url }}" role="group" aria-label="Edit a grooph document and see its picture"><p class="grooph-fallback">This demo needs JavaScript.</p></div>
</section>

<section class="film-review__essay" aria-labelledby="stop">
<h2 id="stop">Loops that know when to stop</h2>
<p>grooph’s checker reads a diagram the way a careful reviewer would. It has more than thirty rules, each with a code, an example that breaks it, and a sentence on how to fix it. The ones that matter most are about loops and the people in them:</p>
<ul>
<li><strong>A loop needs a stop.</strong> A round limit (“at most 4 rounds”), a budget (“30 minutes,” “10 dispatches”), a bar to pass, or a person’s approval. A loop with only a round limit gets a warning too, because a round limit is a backstop, not a definition of done.</li>
<li><strong>A critic needs a bar.</strong> A loop that a critic judges has to say what passing means, such as a checklist or a test, so the critic doesn’t invent a new standard every round. A critic also gets the work’s evidence, not the builder’s whole context, and grooph suggests a different model for it, since a second opinion from the same model tends to make the same mistakes.</li>
<li><strong>Irreversible steps go through a person.</strong> A step marked irreversible, such as publishing or merging, can’t be reached on any path that skips a person’s decision. A human gate is drawn as a trapezoid, so you can see exactly where you’ll be asked.</li>
</ul>
<p>The app checks as you draw, and its badge says how many issues are left. The command line checks the same way, with the same codes, and the <a href="https://ryanjosephkamp.github.io/grooph/docs/rules/">rules page</a> lists every one.</p>
</section>

<section class="film-review__essay" aria-labelledby="your-way">
<h2 id="your-way">Draw it your way</h2>
<ul>
<li><strong>By hand,</strong> in the editor, on a phone or a computer: add agents, checks, gates, and stops, connect them, and draw loops with their stops. Or start from one of the <a href="https://ryanjosephkamp.github.io/grooph/docs/field-guide/">twenty templates</a>, or from one of four plans for people to follow.</li>
<li><strong>With an agent.</strong> In Claude Code, the <code>grooph-design</code> skill proposes one to three diagrams for the work you describe, with a link that compares them side by side on your phone. A chat app can draw with grooph too, and the app’s <strong>Paste a document</strong> opens whatever the chat gives you.</li>
<li><strong>From Mermaid.</strong> Paste a Mermaid flowchart or agentflow, and grooph opens it as a diagram, listing everything it had to guess.</li>
<li><strong>By sketching.</strong> Every diagram has a third view, <strong>Sketch</strong>, beside the picture and 3D. Draw the workflow with a pen, a finger, or a mouse – the drawing page is from <a href="https://ryanjosephkamp.github.io/mermaidify/">mermaidify</a>, my sketch-to-Mermaid tool, with all its bells and whistles – and press <strong>Make it a graph</strong>. A box represents an agent, a diamond is a critic, a trapezoid a person’s approval, and arrows that come back around are a loop. Redraw a diagram you already have, and every step keeps what a drawing can’t say, like its brief and its model.</li>
</ul>
</section>

<section class="film-review__essay" aria-labelledby="share">
<h2 id="share">Share it</h2>
<p>A diagram leaves grooph in whatever form the next person needs: a link that opens it in the app on any device, an embed for a web page, an SVG or PNG picture, a one-file offline page, Mermaid text, or a <code>PLAN.md</code> for people to follow. A link carries the whole document inside it, compressed, after the <code>#</code>, so opening one sends your diagram to no server. The pictures in this post come from grooph’s script for web pages: one script tag draws a diagram inline as SVG, with nothing fetched.</p>
</section>

<section class="film-review__essay" aria-labelledby="use">
<h2 id="use">Use it</h2>
<p>Open <a href="https://ryanjosephkamp.github.io/grooph/">ryanjosephkamp.github.io/grooph</a>. There’s nothing to install and no account, and your diagrams stay in your browser. For the command line, you need Node 22 or later:</p>
<pre><code>npm install --global grooph
grooph template use review-gate --name "Ship the fix" --out fix.grooph.json
grooph validate fix.grooph.json
grooph image fix.grooph.json --out fix.png
grooph share fix.grooph.json</code></pre>
<p>Most commands end with a <code>next:</code> line that says what to run after them. The <a href="https://ryanjosephkamp.github.io/grooph/docs/quickstart/">quickstart</a> covers the app, the command line, and drawing with an agent.</p>
</section>

<section class="film-review__essay" aria-labelledby="built">
<h2 id="built">How it’s built</h2>
<p>grooph is TypeScript from end to end, in one repository with four parts that share a core. The choices below all come from the same two goals: it should be fast on an ordinary phone, and nothing should leave your device unless you send it.</p>
<ul>
<li><strong>A core with no dependencies.</strong> The document’s schema, the checker, the layout, the pictures, and Mermaid in and out live in one package that depends on nothing. The same code runs in the app, the command line, the MCP server, and the script for web pages, so a diagram checks and draws the same everywhere.</li>
<li><strong>The app: React and React Flow, built with Vite.</strong> React Flow handles the editable canvas, which is the hard part of a diagram editor on a touch screen. Everything else loads only when it’s used – the 3D views, export, Mermaid import, the Sketch view – so the first load is about 163 KB, compressed, and a check fails the build when it grows past its budget.</li>
<li><strong>Offline by default.</strong> The app is a progressive web app: a service worker keeps every file it needs, and your diagrams live in the browser’s own database. A share link puts the whole document, compressed with fflate, after the <code>#</code> of the address, the part a browser never sends to a server.</li>
<li><strong>Pictures drawn by grooph itself.</strong> The flat picture is SVG from grooph’s own layout, and it’s deterministic: the same document and theme give the same bytes, so the tests can compare pictures exactly. The 3D views use no WebGL and no 3D library. A small projection draws each scene on a 2D canvas, with the cards as real page elements on top, so the text stays sharp and an older phone keeps up.</li>
<li><strong>Drawing by hand: mermaidify’s page.</strong> The Sketch view is the drawing page of mermaidify, brought in whole and pinned to one of its releases by checksum, so a test fails if the copy ever drifts. Its reader finds shapes and arrows in the strokes themselves, with geometry and no model, in a few milliseconds. grooph reads what it found as Mermaid, through the same reader that opens pasted Mermaid, and remembers which strokes drew which step, which is how a redrawn diagram keeps every step’s details.</li>
<li><strong>A command line in one file.</strong> The <code>grooph</code> command is a single bundled script for Node 22 or later, with the checker, the pictures, share links, and an MCP server that gives an agent grooph’s drawing tools.</li>
<li><strong>Tested like a product.</strong> About 1,970 automated tests, about 390 of them in a real browser at phone size, plus checks for the performance budgets, the docs, and the version number. The Mermaid grooph writes is also read back by a second, independent Mermaid reader, <a href="https://pele.run/">Pele</a>, to catch anything another tool would choke on.</li>
<li><strong>Hosted on GitHub Pages,</strong> and released under the MIT license.</li>
</ul>
</section>

<section class="film-review__essay" aria-labelledby="limits">
<h2 id="limits">What it doesn’t do</h2>
<p>grooph doesn’t run your agents, and it doesn’t make them better on its own; the experiments above say as much. It’s a way to plan a workflow, check it, and show it to someone. A few parts are marked experimental in the app and the docs, because they work and are tested but may change: watching a live session draw itself, the MCP server, the Sketch view, and the lab that keeps the old compiler.</p>
</section>

<section class="film-review__links" aria-labelledby="project-links">
<h2 id="project-links">Project links</h2>
<ul>
<li><a href="https://ryanjosephkamp.github.io/grooph/">Use grooph</a></li>
<li><a href="https://ryanjosephkamp.github.io/grooph/docs/quickstart/">Quickstart</a></li>
<li><a href="https://ryanjosephkamp.github.io/grooph/docs/">The docs</a></li>
<li><a href="https://github.com/ryanjosephkamp/grooph">grooph on GitHub</a></li>
<li><a href="https://www.npmjs.com/package/grooph">grooph on npm</a></li>
<li><a href="https://ryanjosephkamp.github.io/mermaidify/">mermaidify</a></li>
</ul>
</section>

</div>
