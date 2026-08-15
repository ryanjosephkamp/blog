---
title: "reword_nerd: Local prompt packages for text and images"
description: "Review the reword_nerd quick guide and product films for its local Text and Image prompt-package workflow."
permalink: /articles/reword-nerd/
storage_free: true
---

<div class="film-review">
  <header class="film-review__intro">
    <h1>reword_nerd: Local prompt packages for text and images</h1>
    <p class="article-subtitle">A local-first browser workbench for text rewording and image regeneration prompt packages</p>
    <details class="film-review__brand-mark" open>
      <summary>Animated reword_nerd icon (toggle visibility)</summary>
      <img
        src="{{ '/assets/images/reword-nerd-icon.gif' | relative_url }}"
        alt="Animated teal reword_nerd pyramid icon"
        width="960"
        height="960"
        loading="lazy"
        decoding="async"
      />
    </details>
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
    <p><strong>reword_nerd solves that problem.</strong></p>
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
      for preparing a portable package that can be used in a separate model interface.
    </p>
  </section>

  <figure class="film-review__film">
    <figcaption>
      <h2 id="combined-title">Combined Quick Guide</h2>
      <p id="combined-description">A silent 90-second walkthrough pairing the complete Text and Image quick starts with authorized product demo media.</p>
    </figcaption>
    <video
      class="film-review__video"
      controls
      playsinline
      preload="metadata"
      poster="{{ '/assets/media/reword-nerd/2026-08-14-r1/reword-nerd-combined-quick-guide-r04-poster.webp' | relative_url }}"
      aria-labelledby="combined-title"
      aria-describedby="combined-description"
    >
      <source src="{{ '/assets/media/reword-nerd/2026-08-14-r1/reword-nerd-combined-quick-guide-r04-review.mp4' | relative_url }}" type="video/mp4" />
      <source src="{{ '/assets/media/reword-nerd/2026-08-14-r1/reword-nerd-combined-quick-guide-r04-review.webm' | relative_url }}" type="video/webm" />
    </video>
    <p class="film-review__transcript"><a href="{{ '/assets/media/reword-nerd/2026-08-14-r1/reword-nerd-combined-quick-guide-r04-transcript.txt' | relative_url }}">Plain-text transcript</a></p>
  </figure>

  <section class="film-review__essay" aria-labelledby="what-reword-nerd-does">
    <h2 id="what-reword-nerd-does">What reword_nerd does</h2>
    <p>
      The site has two isolated companion portals. The teal Text portal is the default workspace
      for documents and safe text projects. The orange Image portal prepares reference-image
      prompts. They share a visual language, but they do not share session data or silently
      convert one kind of work into the other.
    </p>
    <p>
      In both portals, the basic rhythm is the same: add a source, inspect what was retained,
      choose the settings that should shape the prompt, confirm the reviewed state, and build a
      ZIP in memory. Download is a separate action. That separation is small, but important: a
      package does not leave the browser merely because it was created.
    </p>
  </section>

  <section class="film-review__essay" aria-labelledby="the-text-workbench">
    <h2 id="the-text-workbench">The Text workbench</h2>
    <p>
      Text accepts individual documents as well as bounded folders and ZIP projects. It exposes
      extracted text, inert source previews, recoverable assets, and optional local OCR candidates
      for review. PDF sources can be read continuously or opened as a page gallery, which makes a
      long document feel more like a document and less like a sequence of modal steps.
    </p>
    <p>
      A confirmed source can produce either a One-shot workflow or a four-stage Manual workflow:
      Decompose, Rewrite, Verify, and Final. The resulting schema-6 package includes prompts,
      runbooks, reviewed source material, provenance, hashes, and responsive offline HTML. It is a
      workbook for carrying the task into a model interface while keeping the reasoning process
      inspectable.
    </p>
  </section>

  <section class="film-review__essay" aria-labelledby="the-image-companion">
    <h2 id="the-image-companion">The Image companion</h2>
    <p>
      Image accepts PNG, JPEG, WebP, and AVIF directly and can recover supported visuals from
      bounded PDF, DOCX, folder, and ZIP inputs. Focusing an image, selecting it for a bulk change,
      and including it in the package are intentionally separate actions. Defaults affect future
      admissions, selected-image masks apply only the checked settings, and a focused image can
      still be refined on its own.
    </p>
    <p>
      Optional English OCR runs locally and contributes text only after review. Once the image set
      is confirmed, the schema-1 package creates one source-image, prompt, and provider run-card
      pair for every included image. The default goal is a faithful new rendition rather than a
      claim of pixel identity, and the site never sends that request to a provider itself.
    </p>
  </section>

  <figure class="film-review__film">
    <figcaption>
      <h2 id="marketing-30-title">30-second product film</h2>
      <p id="marketing-30-description">A concise overview of local intake, the Text and Image portals, prompt-package exports, and the no-credentials boundary.</p>
    </figcaption>
    <video
      class="film-review__video"
      controls
      playsinline
      preload="metadata"
      poster="{{ '/assets/media/reword-nerd/2026-08-14-r1/reword-nerd-marketing-30-r04-poster.webp' | relative_url }}"
      aria-labelledby="marketing-30-title"
      aria-describedby="marketing-30-description"
    >
      <source src="{{ '/assets/media/reword-nerd/2026-08-14-r1/reword-nerd-marketing-30-r04-review.mp4' | relative_url }}" type="video/mp4" />
      <source src="{{ '/assets/media/reword-nerd/2026-08-14-r1/reword-nerd-marketing-30-r04-review.webm' | relative_url }}" type="video/webm" />
    </video>
    <p class="film-review__transcript"><a href="{{ '/assets/media/reword-nerd/2026-08-14-r1/reword-nerd-marketing-30-r04-transcript.txt' | relative_url }}">Plain-text transcript</a></p>
  </figure>

  <section class="film-review__essay" aria-labelledby="why-the-package-matters">
    <h2 id="why-the-package-matters">Why the package matters</h2>
    <p>
      A useful handoff needs more than a prompt copied into a text file. It needs enough context to
      explain what the source is, which choices were made, what should remain stable, how to run the
      task, and what a human should verify afterward. reword_nerd packages that context into
      deterministic ZIPs and Night Terminal HTML companions that remain usable after extraction and
      offline.
    </p>
    <p>
      The HTML workbooks are deliberately practical. They keep prompts, instructions, provenance,
      and fallbacks together; the Image workbook also keeps each source beside its exact prompt and
      run card. The package can be inspected before it is shared, moved between machines, or used
      with a chosen provider. reword_nerd prepares that handoff, but the user remains responsible
      for deciding where it goes next.
    </p>
    <h3>Boundaries and limitations</h3>
    <p>
      Local processing does not make extraction infallible. <strong>Documents, OCR, source images,
      and generated prompts still require human review.</strong> Image-model output is stochastic,
      and faces, visible text, logos, fine geometry, and structured layouts can drift. Exact retained
      image bytes may also contain EXIF or location metadata, so <strong>an exported package should
      be reviewed before it is shared</strong>.
    </p>
  </section>

  <section class="film-review__essay" aria-labelledby="building-with-ai">
    <h2 id="building-with-ai">Building it with AI assistance</h2>
    <p>
      I developed and refined the project with substantial AI assistance across implementation,
      testing, design iteration, documentation, and Remotion media. That assistance made a broad
      project possible, but it did not remove the need to decide what the product should do or to
      review whether each change actually matched that intent.
    </p>
    <p>
      In practice, the work depended on checkpoints, test-first changes, deterministic fixtures,
      privacy scans, visual comparisons, focused accessibility reviews, and staged release gates.
      AI increased the speed at which alternatives could be explored; it also increased the value
      of explicit boundaries. The process behind reword_nerd ended up reflecting the product
      itself: intermediate state should be visible, important transitions should be deliberate,
      and the final artifact should be independently inspectable.
    </p>
  </section>

  <figure class="film-review__film">
    <figcaption>
      <h2 id="marketing-60-title">60-second product film</h2>
      <p id="marketing-60-description">An expanded look at the Text and Image workflows, local processing boundary, and deterministic HTML and ZIP package exports.</p>
    </figcaption>
    <video
      class="film-review__video"
      controls
      playsinline
      preload="metadata"
      poster="{{ '/assets/media/reword-nerd/2026-08-14-r1/reword-nerd-marketing-60-r04-poster.webp' | relative_url }}"
      aria-labelledby="marketing-60-title"
      aria-describedby="marketing-60-description"
    >
      <source src="{{ '/assets/media/reword-nerd/2026-08-14-r1/reword-nerd-marketing-60-r04-review.mp4' | relative_url }}" type="video/mp4" />
      <source src="{{ '/assets/media/reword-nerd/2026-08-14-r1/reword-nerd-marketing-60-r04-review.webm' | relative_url }}" type="video/webm" />
    </video>
    <p class="film-review__transcript"><a href="{{ '/assets/media/reword-nerd/2026-08-14-r1/reword-nerd-marketing-60-r04-transcript.txt' | relative_url }}">Plain-text transcript</a></p>
  </figure>

  <section class="film-review__essay" aria-labelledby="what-comes-next">
    <h2 id="what-comes-next">What comes next</h2>
    <p>
      The next companion piece will be a longer, manually recorded tutorial. It will walk through
      both portals and carry example Text and Image packages into a real model interface so the
      handoff itself is visible, not just the package-building step. The placeholder below will be
      replaced when that video is ready.
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
      <li><a href="https://ryanjosephkamp.github.io/reword-nerd/">reword_nerd Text portal</a></li>
      <li><a href="https://ryanjosephkamp.github.io/reword-nerd/image/">reword_nerd Image portal</a></li>
      <li><a href="https://ryanjosephkamp.github.io/reword-nerd/updates/">reword_nerd Updates archive</a></li>
      <li><a href="https://ryanjosephkamp.github.io/reword-nerd/updates/v0-8-0/">reword_nerd v0.8 post</a></li>
      <li><a href="https://github.com/ryanjosephkamp/reword-nerd">reword_nerd on GitHub</a></li>
    </ul>
  </section>
</div>

<p class="film-review__cta"><a href="https://ryanjosephkamp.github.io/reword-nerd/">Try reword_nerd.</a></p>
