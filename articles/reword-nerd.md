---
title: "reword_nerd: Rewrite anything with the model you already use"
description: "A browser workbench that hands documents, projects, and images to the AI model you already use, in one paste, and brings the result back for review."
permalink: /articles/reword-nerd/
date: 2026-10-31
storage_free: true
styles:
  - /assets/reword-nerd-demos/demos.css
---

<style>
  /* Only this article's figure needs layout; the demos carry their own scoped styles. */
  .film-review__gif img {
    display: block;
    width: 100%;
    height: auto;
    border: 1px solid var(--line-strong);
  }
  .film-review__gif figcaption {
    margin-top: 0.7rem;
    color: var(--faint);
    font-size: 0.9rem;
  }
  .film-review__essay > pre {
    max-width: 66ch;
    padding: 0.8rem 1rem;
    overflow-x: auto;
    border: 1px solid var(--line);
    background: var(--accent-soft);
    font-family: var(--font-mono);
    font-size: 0.88rem;
    line-height: 1.55;
  }
  .film-review__essay > pre code {
    padding: 0;
    background: none;
  }
</style>

<!-- article:start -->
<div class="film-review">
  <header class="film-review__intro">
    <h1>reword_nerd: Rewrite anything with the model you already use</h1>
    {% include article-date.html %}
    <p class="article-subtitle">A browser workbench that hands your documents, projects, and images to the AI model you already use, in one paste</p>

    <figure class="film-review__film film-review__gif">
      <img
        src="{{ '/assets/media/reword-nerd/2026-10-31/reword-nerd-demo.gif' | relative_url }}"
        alt="A Word document is handed to a coding agent with one command, and the rewrite comes back for comparison and download."
        width="960"
        height="600"
        loading="eager"
        decoding="async"
      />
      <figcaption>A scripted run on the real app with a sample document. The agent's work is simulated; no model was called.</figcaption>
    </figure>

    <p>
      These days, there are some legitimate reasons for wanting to reword text or regenerate
      images with AI. For text, one might want to explore a different writing style, or to change
      the statistical structural word distribution. For images, perhaps the goal is to make
      precise edits to a picture, or to remove hidden pixel content. Regardless of why someone
      would try to do this, the process can be divided into human work and AI work: The human
      provides the context and instructions, and reviews the result from the model; and the AI does
      the hard rewording/regeneration work.
    </p>
    <p>On the human side of this pipeline, there are two main challenges:</p>
    <ol class="film-review__challenges">
      <li>Preparing and submitting everything to the model, i.e., context/prompt engineering.</li>
      <li>Evaluating the performance of the model and correcting its mistakes.</li>
    </ol>
    <p>
      Challenge (2) depends on the specifics of the problem, the selected model, the chosen
      harness, and countless other variables. This process could be automated (e.g., LLM-as-judge),
      but doing so carries its own risks. Especially for important rewording or regeneration tasks,
      human review should still occur at some point.
    </p>
    <p>
      But Challenge (1) is predictable: create prompt packages designed for a given model, and use
      them in the preferred harness. While this is straightforward in principle, it is tedious in
      practice.
    </p>
    <p><strong>reword_nerd solves that problem.</strong> And as of release 0.9, it makes Challenge (2) a lot easier, too.</p>
  </header>

  <section class="film-review__essay" aria-labelledby="why-i-built-it">
    <h2 id="why-i-built-it">Why I built it</h2>
    <p>
      Calling a language or image model is often the easiest part of a workflow. Preparing the
      source carefully is harder: deciding what belongs in context, checking what an extractor
      recovered, preserving the details that matter, and leaving behind a handoff that can still
      be understood after the browser tab is gone.
    </p>
    <blockquote>
      <p>
        What would a prompt workflow look like if preparation, review, and export were treated as
        the product rather than hidden setup steps?
      </p>
    </blockquote>
    <p>
      reword_nerd grew out of that question. I wanted the source, settings, warnings, prompts, and
      run instructions to stay visible long enough for a person to make deliberate choices. The
      result is not an automated rewriting or image-generation service. It is a browser workbench
      for preparing a handoff that can be used in a separate model interface.
    </p>
    <p>
      The first versions did that job, but they asked a lot of the person using them. A finished
      package was a ZIP of prompts, runbooks, and offline workbooks, and getting it into a model
      still took several steps. So, for release 0.9, I rebuilt reword_nerd around a simpler goal:
      <strong>hand the job to the model you already use, in as few pastes as possible</strong>, and
      make it easy to check what comes back.
    </p>
    <p>
      Most people who would use this already pay for ChatGPT, Claude, Gemini, or Grok, or already
      have a coding agent like Claude Code or Codex installed. They shouldn't need another
      subscription, another account, or an API key just to reword a document. And they shouldn't
      have to paste a project into a chat window one file at a time, either.
    </p>
  </section>

  <section class="film-review__essay" aria-labelledby="what-reword-nerd-does">
    <h2 id="what-reword-nerd-does">What reword_nerd does</h2>
    <p>
      reword_nerd is one web page with two modes: <strong>Text</strong> for documents and projects,
      and <strong>Images</strong> for pictures. In both modes, the rhythm is the same:
    </p>
    <ol>
      <li>
        <strong>Add</strong> documents (Word, PDF, Markdown, HTML, LaTeX, plain text, CSV, JSON,
        YAML, and most code), a whole folder or ZIP project, or images. Scanned pages are read with
        OCR.
      </li>
      <li>
        <strong>Check</strong> the text that was read. Fix mistakes, accept text found in scanned
        pages, and choose which files take part.
      </li>
      <li>
        <strong>Set</strong> the goal, tone, length, and language. For images, say what should
        change and what must stay.
      </li>
      <li>
        <strong>Hand off</strong> to wherever the work will run: one command for a coding agent, one
        prompt for a chat app, or one prompt per image for an image tool.
      </li>
    </ol>
    <p>
      There is no server and no account. Files are read on your device, and nothing leaves the
      browser unless you copy it or download it.
    </p>
  </section>

  <section class="film-review__essay" aria-labelledby="hand-it-off">
    <h2 id="hand-it-off">Hand it off in one paste</h2>
    <p>
      Where the work runs changes only the mechanics of the handoff, never the instructions
      themselves:
    </p>
    <ul>
      <li>
        <strong>Coding agents</strong> (Claude Code, Codex, Gemini CLI): download a task folder and
        paste one command. The agent reads <code>TASK.md</code>, works through every stage, saves
        its notes along the way, and writes the result in the original format &ndash; Word files
        included.
      </li>
      <li>
        <strong>Chat apps</strong> (ChatGPT, Claude, Gemini, Grok): copy one prompt. For long or
        delicate documents, <strong>Go step by step</strong> splits the job into four prompts. You
        paste each reply back into reword_nerd, and it goes into the next prompt for you.
      </li>
      <li><strong>Image tools</strong>: more on those below.</li>
    </ul>
    <p>
      Try it with the sample document below. Switch between Claude Code and ChatGPT, change the
      goal, or flip the file to Word and watch the task folder gain a <code>text/</code> copy for
      the agent to read and a Word file to write.
    </p>
    <div class="rn-demo-slot" data-rn-demo="handoff"></div>
    <p>
      The download button builds a real task folder. If you have Claude Code or Codex installed,
      you can unzip it and run the command yourself.
    </p>
  </section>

  <section class="film-review__essay" aria-labelledby="the-method">
    <h2 id="the-method">Decompose, Rewrite, Verify, Final</h2>
    <p>Every rewrite follows the same four stages, whether it runs in an agent or in a chat:</p>
    <ol>
      <li><strong>Decompose:</strong> list every claim, fact, name, and constraint the rewrite must keep.</li>
      <li><strong>Rewrite:</strong> write a new version in genuinely different words and structure.</li>
      <li><strong>Verify:</strong> check for anything lost, added, or changed in meaning.</li>
      <li><strong>Final:</strong> fix what the check found and finish the document.</li>
    </ol>
    <p>
      The first and third stages make the model show its work. An agent saves each stage to its own
      file, so the reasoning stays inspectable after the run is over, and a chat reply ends with the
      model's own fidelity audit. It's a workbook for carrying the task into a model interface
      while keeping the reasoning process visible.
    </p>
  </section>

  <section class="film-review__essay" aria-labelledby="projects">
    <h2 id="projects">Whole folders and projects</h2>
    <p>
      Text accepts individual documents as well as whole folders and ZIP projects, so a project's
      files go to the model together, with their paths. Before anything is read, reword_nerd
      screens the project. Dependency folders, build output, lock files, and nested archives are
      left out, the project's own <code>.gitignore</code> is applied, and files that look like they
      hold passwords or keys are skipped and never kept.
    </p>
    <p>
      In code, the instructions allow changes only to prose: documentation, comments, and
      user-facing strings. Code, identifiers, keys, paths, and numbers never change.
    </p>
    <p>
      Here's a small sample project, screened by the same rules the app uses. Edit the YAML file,
      or add a file name, and see where it lands.
    </p>
    <div class="rn-demo-slot" data-rn-demo="project"></div>
  </section>

  <section class="film-review__essay" aria-labelledby="bring-it-back">
    <h2 id="bring-it-back">Bring it back, if you like</h2>
    <p>
      Handing off is only half of the job. The other half is Challenge (2): checking what the model
      did. So, reword_nerd lets you bring the result back. Paste the reply from a chat, or drop the
      agent's finished folder, and you'll see the rewrite side by side with the original or as
      changes in red and green, read the model's own check, and download the result in the
      original format.
    </p>
    <p>
      The sample reply below was written by hand for this demo, in the format reword_nerd asks
      models to use. Read its last line closely: &ldquo;extended&rdquo; became
      &ldquo;change,&rdquo; and the model's own check still says PASS. A self-check is useful, but
      it doesn't replace reading the changes yourself.
    </p>
    <div class="rn-demo-slot" data-rn-demo="changes"></div>
  </section>

  <section class="film-review__essay" aria-labelledby="no-model">
    <h2 id="no-model">Or reword it yourself</h2>
    <p>
      Sometimes, you don't want a model at all. You can edit the document right on the page, with
      headings, lists, bold, and italics, and <strong>Changes</strong> shows every edit the way a
      code review does (that's the <strong>My own edits</strong> option in the demo above).
    </p>
    <p>
      Then pick a paper style (Paper, White, Sepia, or Night), a serif or sans typeface, and a
      size, and download the document as Word, PDF, a web page, Markdown, or plain text in that
      look.
    </p>
  </section>

  <section class="film-review__essay" aria-labelledby="images">
    <h2 id="images">Images</h2>
    <p>
      Images works the same way. Add pictures directly (PNG, JPEG, WebP, or AVIF), or add a Word
      file, PDF, folder, or ZIP, and reword_nerd pulls out the pictures inside it. Text in each
      picture is read locally with OCR, and you can correct it. Then say what should change and
      what must stay.
    </p>
    <p>
      For Grok Imagine, ChatGPT, Gemini, or Midjourney, reword_nerd writes one prompt per image to
      paste beside the attached picture. An agent that can make images, like Codex, gets a folder
      and one command, and it does the whole set at once. The default goal is a faithful new
      rendition rather than a claim of pixel identity, and the site never sends that request to a
      provider itself.
    </p>
    <div class="rn-demo-slot" data-rn-demo="image"></div>
  </section>

  <section class="film-review__essay" aria-labelledby="how-it-compares">
    <h2 id="how-it-compares">How it compares</h2>
    <p>
      reword_nerd isn't the first tool in this space, and it doesn't replace most of the others.
      Here's where it fits. The prices and limits below are from each vendor's own pages as of
      October 31, 2026, and they change often.
    </p>
    <h3>Paraphrasers</h3>
    <p>
      <a href="https://quillbot.com/paraphrasing-tool">QuillBot</a>,
      <a href="https://www.wordtune.com/pricing">Wordtune</a>,
      <a href="https://www.grammarly.com/plans">Grammarly</a>,
      <a href="https://www.deepl.com/write">DeepL Write</a>, and
      <a href="https://languagetool.org/paraphrasing-tool">LanguageTool</a> are the obvious
      comparison. For a sentence or a paragraph, they're faster than anything else here: one step,
      several alternatives, done. But they run on their own servers, and their free tiers are
      small. QuillBot's free paraphraser takes 100 words at a time, Wordtune allows 10 rewrites a
      day, LanguageTool allows 3 rephrasings a day, and DeepL Write takes 1,500 characters without
      an account. Grammarly is the one that handles files well: its editor takes Word files up to
      100,000 characters and gives them back in the same format.
    </p>
    <p>
      reword_nerd has no cap of its own. The limit is whatever your model's plan allows.
    </p>
    <h3>AI inside the editor</h3>
    <p>
      <a href="https://support.microsoft.com/en-us/word/copilot/edit-rewrite-content">Copilot in Word</a>,
      <a href="https://support.google.com/docs/answer/13951448">Gemini in Google Docs</a>, and
      <a href="https://support.claude.com/en/articles/14465370-use-claude-for-word">Claude for Word</a>
      edit the live document, and Claude for Word can use tracked changes. That's a real advantage:
      editing in place keeps formatting that a rebuilt file can't fully match. But each one ties you
      to one vendor and one plan, and each one lives inside its own editor, so a LaTeX project or a
      codebase is out of reach.
    </p>
    <h3>Prompt packers</h3>
    <p>
      Developers will recognize the task folder's cousins.
      <a href="https://github.com/yamadashy/repomix">Repomix</a>,
      <a href="https://github.com/coderamp-labs/gitingest">gitingest</a>,
      <a href="https://github.com/simonw/files-to-prompt">files-to-prompt</a>, and
      <a href="https://github.com/mufeedvh/code2prompt">code2prompt</a> pack a repository into one
      file for a model, and Repomix scans for secrets, too.
      <a href="https://github.com/abinthomasonline/repo2txt">repo2txt</a> does it in a static page
      with no uploads, which is the closest design to reword_nerd's. But a packer's output is
      context, not a job. A task folder also tells the agent what to do, in what order, where to
      save each stage, and what to write back.
    </p>
    <h3>Converters</h3>
    <p>
      <a href="https://github.com/microsoft/markitdown">MarkItDown</a>,
      <a href="https://github.com/docling-project/docling">Docling</a>, and
      <a href="https://pandoc.org/">Pandoc</a> turn documents into Markdown for a model, and they
      handle more formats and harder layouts than reword_nerd does. Pandoc even
      <a href="https://pandoc.org/app/">runs in the browser</a> now. They convert, though; they
      don't rewrite, verify, or compare.
    </p>
    <h3>Image tools</h3>
    <p>
      ChatGPT, Gemini, Grok Imagine, and Midjourney can all edit an uploaded picture directly, and
      direct editing keeps a likeness better than a regeneration from a prompt. Tools like
      Midjourney's <a href="https://docs.midjourney.com/hc/en-us/articles/32497889043981-Describe">Describe</a>
      and <a href="https://github.com/pharmapsychotic/clip-interrogator">CLIP Interrogator</a> go
      the other way, from a picture to a prompt. reword_nerd writes the instructions for a careful
      regeneration, keeps the picture's own text intact, and batches a whole folder for an agent.
    </p>
    <h3>So, what's different?</h3>
    <ul>
      <li><strong>Your files stay in your browser</strong> until you hand them off.</li>
      <li><strong>It works with the model you already use,</strong> and the one you switch to next year.</li>
      <li><strong>It makes the model show its work</strong>, with an inventory before the rewrite and a check after it.</li>
      <li><strong>It brings the result back</strong> for a line-by-line review and a download in the original format.</li>
      <li><strong>It takes documents, scans, projects, and images</strong> in one place.</li>
    </ul>
    <p>
      If you only need to polish a sentence, a paraphraser is faster. For a long document, a whole
      project, or a folder of images, that's what reword_nerd is for.
    </p>
  </section>

  <section class="film-review__essay" aria-labelledby="privacy">
    <h2 id="privacy">Privacy and limits</h2>
    <p>
      reword_nerd is a static web page. Files are read on your device, and nothing is sent anywhere
      unless you copy it or download it. Saving your workspace between visits is off until you
      turn it on, and then it stays in your browser. You can export the workspace as a ZIP at any
      time.
    </p>
    <p>
      That boundary covers reword_nerd itself. Once you hand a job off, your text goes to the model
      you chose, under that company's terms.
    </p>
    <p>
      Local processing does not make extraction infallible. <strong>Documents, OCR, source images,
      and generated prompts still require human review.</strong> Image-model output is stochastic,
      and faces, visible text, logos, fine geometry, and structured layouts can drift. A rebuilt
      Word or PDF file keeps headings, lists, tables, and emphasis, but not every detail of the
      original layout. And exact image bytes may contain EXIF or location metadata, so
      <strong>review what you hand off before you share it</strong>.
    </p>
  </section>

  <section class="film-review__essay" aria-labelledby="use-it">
    <h2 id="use-it">Use it</h2>
    <p>
      Open <a href="https://ryanjosephkamp.github.io/reword-nerd/">reword_nerd</a> in any modern
      browser. There's nothing to install and no account to make. Choose <strong>Rewrite
      text</strong> or <strong>Regenerate images</strong>, or start with <strong>Try a sample
      document</strong>.
    </p>
    <p>
      To hand off to a coding agent, you'll need that agent installed and signed in:
      <a href="https://docs.anthropic.com/en/docs/claude-code/overview">Claude Code</a>,
      <a href="https://github.com/openai/codex">Codex</a>, or
      <a href="https://github.com/google-gemini/gemini-cli">Gemini CLI</a>. reword_nerd gives you
      the command, and the agent asks before it writes files. For chat apps and image tools, the
      account you already have is enough. (One exception: as of October 31, 2026,
      <a href="https://grok.com/plans">Grok's plans page</a> lists Grok Imagine only on paid
      plans.)
    </p>
    <p>
      reword_nerd is open source under the MIT license. To run it locally, you'll need Node.js 22
      or later:
    </p>
    <pre><code>git clone https://github.com/ryanjosephkamp/reword-nerd.git
cd reword-nerd
npm install
npm run dev</code></pre>
    <p>
      Updates are written up on the
      <a href="https://ryanjosephkamp.github.io/reword-nerd/updates/">Updates page</a>, which has
      an RSS feed. Bugs and ideas go to
      <a href="https://github.com/ryanjosephkamp/reword-nerd/issues/new/choose">GitHub issues</a>.
    </p>
  </section>

  <section class="film-review__links" aria-labelledby="project-links">
    <h2 id="project-links">Project links</h2>
    <ul>
      <li><a href="https://ryanjosephkamp.github.io/reword-nerd/">reword_nerd</a></li>
      <li><a href="https://ryanjosephkamp.github.io/reword-nerd/app/">Rewrite text</a></li>
      <li><a href="https://ryanjosephkamp.github.io/reword-nerd/app/?mode=images">Regenerate images</a></li>
      <li><a href="https://ryanjosephkamp.github.io/reword-nerd/updates/v0-9-0/">Release 0.9 notes</a></li>
      <li><a href="https://ryanjosephkamp.github.io/reword-nerd/updates/">Updates</a></li>
      <li><a href="https://github.com/ryanjosephkamp/reword-nerd">reword_nerd on GitHub</a></li>
    </ul>
  </section>
</div>

<p class="film-review__cta"><a href="https://ryanjosephkamp.github.io/reword-nerd/">Try reword_nerd.</a></p>
<!-- article:end -->

<script type="module" src="{{ '/assets/reword-nerd-demos/demos.js' | relative_url }}"></script>
