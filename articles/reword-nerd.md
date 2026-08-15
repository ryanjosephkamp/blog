---
title: "reword_nerd: Local prompt packages for text and images"
description: "Review the ReWord Nerd quick guide and product films for its local Text and Image prompt-package workflow."
permalink: /articles/reword-nerd/
robots: "noindex, nofollow"
sitemap: false
unlisted: true
storage_free: true
---

<div class="film-review">
  <header class="film-review__intro">
    <h1>reword_nerd: Local prompt packages for text and images</h1>
    <p class="article-subtitle">A local-first browser workbench for inspectable AI handoffs</p>
    <p>
      I built ReWord Nerd to make the preparation around an AI task easier to inspect. It turns
      reviewed Text and Image inputs into model-tailored prompt packages without calling a model,
      requesting provider credentials, or uploading the selected source material.
    </p>
    <p class="film-review__notice" role="note">
      <strong>Review-only link.</strong> This public-by-link page is unlisted and asks search
      engines not to index it; that is not access control.
    </p>
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
      ReWord Nerd grew out of that question. I wanted the source, settings, warnings, prompts, and
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
    <h2 id="what-reword-nerd-does">What ReWord Nerd does</h2>
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
      I came to think of the package as the real product. A useful handoff needs more than a prompt
      copied into a text file. It needs enough context to explain what the source is, which choices
      were made, what should remain stable, how to run the task, and what a human should verify
      afterward. ReWord Nerd packages that context into deterministic ZIPs and Night Terminal HTML
      companions that remain usable after extraction and offline.
    </p>
    <p>
      The HTML workbooks are deliberately practical. They keep prompts, instructions, provenance,
      and fallbacks together; the Image workbook also keeps each source beside its exact prompt and
      run card. The package can be inspected before it is shared, moved between machines, or used
      with a chosen provider. ReWord Nerd prepares that handoff, but the user remains responsible
      for deciding where it goes next.
    </p>
    <h3>Boundaries and limitations</h3>
    <p>
      Local processing does not make extraction infallible. Documents, OCR, source images, and
      generated prompts still require human review. Image-model output is stochastic, and faces,
      visible text, logos, fine geometry, and structured layouts can drift. Exact retained image
      bytes may also contain EXIF or location metadata, so an exported package should be reviewed
      before it is shared.
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
      of explicit boundaries. The process behind ReWord Nerd ended up reflecting the product
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

  <section class="film-review__essay" aria-labelledby="what-i-learned">
    <h2 id="what-i-learned">What I learned</h2>
    <p>
      The first lesson was that source review is not preliminary polish; it is part of prompt
      quality. A strong prompt cannot compensate for the wrong pages, an unreviewed extraction, a
      missing image, or an instruction that quietly overwrote a detail the user meant to preserve.
      Showing those decisions makes the workflow slower in a useful way.
    </p>
    <p>
      The second lesson was that small interface distinctions carry real meaning. Focus is not the
      same as bulk selection. Inclusion is not the same as either one. Build is not Download. A
      package preview is not merely decoration. Keeping those concepts separate made the workbench
      easier to reason about and made stale or accidental output easier to prevent.
    </p>
    <p>
      I also learned how much presentation matters after export. An offline HTML file can be a
      disposable dump, or it can be the clearest explanation of what a package contains and how to
      use it. Treating those files as real interfaces turned the export from a collection of parts
      into something approachable.
    </p>
  </section>

  <section class="film-review__essay" aria-labelledby="what-comes-next">
    <h2 id="what-comes-next">What comes next</h2>
    <p>
      The next companion piece will be a longer, manually recorded tutorial. It will walk through
      both portals and carry example Text and Image packages into a real model interface so the
      handoff itself is visible, not just the package-building step. The placeholder below will be
      replaced when that video is ready.
    </p>
    <p>
      Beyond that tutorial, I want to keep exploring the boundary between AI assistance and
      inspectable human control. ReWord Nerd is one answer: keep preparation local, make the
      important choices visible, and export an artifact that can be reviewed before another system
      receives it.
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
      <li><a href="https://ryanjosephkamp.github.io/reword-nerd/">ReWord Nerd Text portal</a></li>
      <li><a href="https://ryanjosephkamp.github.io/reword-nerd/image/">ReWord Nerd Image portal</a></li>
      <li><a href="https://ryanjosephkamp.github.io/reword-nerd/updates/">ReWord Nerd Updates archive</a></li>
      <li><a href="https://ryanjosephkamp.github.io/reword-nerd/updates/v0-8-0/">ReWord Nerd v0.8 post</a></li>
      <li><a href="https://github.com/ryanjosephkamp/reword-nerd">ReWord Nerd on GitHub</a></li>
    </ul>
  </section>
</div>

<p class="film-review__cta"><a href="https://ryanjosephkamp.github.io/reword-nerd/">Try reword_nerd.</a></p>
