---
title: "Spring 2026 AI Research Prototype Portfolio"
description: "A collection of 67 AI-driven case studies I used to explore how far LLM assistance can (and can't) go in scientific research."
permalink: /articles/s26-airp/
date: 2026-06-24
scripts:
  - /assets/js/s26-airp-repositories.js
---

# Spring 2026 AI Research Prototype Portfolio

{% include article-date.html %}

<p class="article-subtitle">What happens when you hand the whole research process to an AI, 67 times</p>

In spring 2026, I built the **Spring 2026 AI Research Prototype Portfolio (S26 AIRP)**: 67 repositories of research-flavored apps, simulations, and papers, made mostly by AI under my direction.

Most of the repositories are research-themed Streamlit prototypes. Four are paper-to-tool projects that turn an idea from the academic literature into a working pipeline. All of them were case studies in the same question: how much of the scientific research process can a language model carry, and where does it fall down?

One thing up front: **none of this is validated science, and most of it was made by AI.** The PDFs look like IEEE papers and the apps look like lab tools, but nothing here has been checked by a domain expert, and I'm not claiming otherwise. I built the portfolio to teach myself how research is done and to find out how much of it a model can do on its own. That was the whole point, and it's why the AI's role isn't hidden anywhere in these repositories.

## Repository graph

The graph below provides a visual entry point into the 67 S26 AIRP repositories. GitHub links are included for every repository, and Streamlit app links are included where applicable.

{::nomarkdown}

<section
  class="s26-repo-explorer"
  data-s26-repo-explorer
  data-repositories-url="{{ '/assets/data/s26-airp-repositories.json' | relative_url }}"
  aria-label="S26 AIRP repository explorer"
>
  <div class="repo-layout">
    <section class="graph-panel" aria-label="S26 AIRP repository graph">
      <div class="graph-controls">
        <label class="search-field" for="repo-search">
          <span>Search</span>
          <input
            id="repo-search"
            type="search"
            autocomplete="off"
            placeholder="name, language, topic, type"
          />
        </label>
        <div class="graph-actions">
          <div class="graph-mode" id="graph-mode" aria-label="Graph view mode">
            <span>View</span>
            <button type="button" data-graph-mode="2d" aria-pressed="true">2D</button>
            <button type="button" data-graph-mode="3d" aria-pressed="false">3D</button>
          </div>
          <button class="text-button" id="reset-view" type="button">Reset</button>
          <div class="graph-help-list" aria-label="Graph explanation">
            <span class="graph-help">
              <button
                class="graph-help-trigger"
                type="button"
                aria-expanded="false"
                aria-describedby="graph-help-connections"
              >
                Connections <span aria-hidden="true">?</span>
              </button>
              <span class="graph-tooltip" id="graph-help-connections" role="tooltip" hidden>
                Lines connect nearby S26 repositories with shared language, topics, tags,
                descriptions, or metadata terms. Selected repositories show the strongest semantic
                neighbors.
              </span>
            </span>
            <span class="graph-help">
              <button
                class="graph-help-trigger"
                type="button"
                aria-expanded="false"
                aria-describedby="graph-help-data"
              >
                Data <span aria-hidden="true">?</span>
              </button>
              <span class="graph-tooltip" id="graph-help-data" role="tooltip" hidden>
                This article view uses a static S26 AIRP repository snapshot reconciled against the
                original Portfolio Index table.
              </span>
            </span>
          </div>
        </div>
      </div>
      <div class="cluster-row" id="cluster-row" aria-label="S26 repository filters"></div>
      <p class="filter-summary" id="filter-summary" aria-live="polite">
        Showing S26 AIRP repositories.
      </p>
      <div class="canvas-wrap" id="canvas-wrap">
        <canvas id="repo-canvas" aria-hidden="true"></canvas>
        <p class="graph-hint" id="graph-hint">Select a repository to view details.</p>
      </div>
      <p class="small-note">
        In 2D, drag to pan. In 3D, drag to rotate. Scroll or pinch to zoom.
      </p>
    </section>

    <aside class="repo-side" aria-label="S26 repository details">
      <section class="inspector" id="repo-inspector" tabindex="-1" aria-live="polite">
        <h2>Select a repository</h2>
        <p>
          Choose an S26 AIRP repository to see its public description, language, update date, tags,
          and links.
        </p>
      </section>
    </aside>

  </div>
</section>

{:/nomarkdown}

## Why I built this portfolio

Short version: I had no research experience, I wasn't in a lab, and I needed to learn how research actually works. So I had an AI do it, over and over, and watched closely.

Longer version: somewhere in undergrad I figured out that the only thing that really gets me going is a problem nobody has a clean answer to yet. Deriving a result for myself, even one that had been known for a century, felt better than anything else I did in school. Discovering something new, or inventing something useful that nobody had thought of, was the only kind of work I could imagine wanting for a career.

I didn't take a straight path there. I started college in computer science, then walked away from it in 2018 or 2019, well before ChatGPT, because I was convinced the software jobs I was training for wouldn't last long enough for me to have a full career in them. I took a year off, came back, and wandered my way to a BS in neuroscience and a BA in math. By the end, two things were clear: I wanted to spend my life discovering things, and AI was going to become the tool every field discovers things with. So I applied to a master's program in computer science with no research experience, no industry experience, and the wrong undergraduate degrees. To my surprise, I got in.

After my first semester, I took stock of what I was missing. I could handle the coursework. What I couldn't do was run a study from start to finish: plan it, survey the literature, design an experiment, choose sensible metrics, analyze the results, write them up, and say honestly what the limitations were. I also couldn't reliably read a paper critically, and I couldn't build the software a real study needs. Nobody was going to teach me any of that, because I wasn't in a lab.

S26 AIRP was my answer. For each project I picked a research-flavored topic, often in a field I knew almost nothing about, and guided a language model through the entire publication lifecycle: literature review, hypothesis, code, experiments, figures, write-up, limitations. Then I studied what happened. Which tools did it reach for? Which decisions did it make on its own, and which did it need me for? Where did it hallucinate, and did a different harness, prompt, or context strategy make that better or worse? Along the way I picked up the current state of the art in building software with AI, from vibe coding and multi-agent systems to prompt, context, loop, and graph engineering, because there was no other way to get through 67 of these.

So the goal was never to produce real biology, chemistry, biophysics, or protein-design research. The goal was to learn the process, learn the tools, and find out how much of the process the tools can carry. The scientific themes gave the projects structure and forced them to deal with everything a real paper has to deal with: notation, domain vocabulary, simulations, mathematical objects, figures, citations, and the constant temptation to overclaim.

## What the portfolio contains

S26 AIRP contains 67 public GitHub repositories.

Most are Streamlit-linked exploratory prototypes. These include visual simulations, interface experiments, chemistry and physics demonstrations, molecular or protein-themed prototypes, AI/ML architecture demonstrations, and documentation-heavy research-style artifacts.

Four repositories are paper-to-tool prototypes. These are not Streamlit simulations. They are closer to exploratory research-tool or pipeline prototypes inspired by academic literature and should be read with especially clear attention to the portfolio's disclosure language.

Each repository includes a top-level README notice and a root-level `AI_DISCLOSURE.md` file explaining the project context, the role of AI assistance, the provisional status of scientific/domain-specific content, intended use, non-use, and the relationship between the repository and the broader S26 AIRP portfolio.

## How AI assistance fit into the workflow

The repositories were made mostly by AI. I chose the topics, set the goals and constraints, steered, reviewed, and rewrote when something was wrong. The models did the bulk of the code, debugging, interfaces, documentation, reports, LaTeX, and figures. The prompt engineering, context engineering, and harness design were mine, and they were a large part of what I was there to learn.

This is not a conventionally authored research portfolio, and it isn't trying to be one. None of that is hidden; it's the point. One lesson of the portfolio is that these tools can produce polished, official-looking artifacts far faster than anyone can validate them, and the gap between how a result looks and how much it has actually been checked is exactly what I wanted to see up close.

## What the scientific themes are doing here

Many repositories use themes from physics, chemistry, computational biology, biophysics, molecular simulation, protein design, or related scientific areas.

Those themes should be understood as **software-development testbeds**. They created challenging contexts for:

- building interactive interfaces,
- structuring technical explanations,
- visualizing abstract processes,
- experimenting with simulation-like workflows,
- generating scientific-style documentation,
- testing where AI assistance can drift or overclaim,
- and learning how to disclose the difference between a prototype and validated research.

The scientific content should be treated as provisional. The repositories are not intended for scientific, biomedical, clinical, engineering, operational, or safety-relevant decision-making without independent expert review and validation.

## What this portfolio demonstrates

The portfolio is most useful as evidence of technical and methodological work around:

- the research process itself, practiced end to end dozens of times: planning, literature review, experiment design, metrics, analysis, write-up, and limitations,
- AI-assisted software prototyping,
- Streamlit interface development,
- research-themed application design,
- prompt and context engineering,
- documentation workflows,
- LaTeX and report-generation workflows,
- hallucination and overclaiming mitigation,
- portfolio-scale disclosure and transparency practices,
- and the practical limits of AI-generated scientific and technical content.

It is not a collection of peer-reviewed papers, accepted manuscripts, submitted manuscripts, validated studies, or experimentally supported scientific findings.

## How to read the repositories

The best way to read S26 AIRP is to separate software value from scientific validation.

A repository may be useful as a software prototype, interface demonstration, workflow artifact, or documentation experiment even if its scientific/domain-specific content is provisional. The README notices and `AI_DISCLOSURE.md` files are intended to make that distinction visible before readers encounter polished reports, apps, or scientific-style language.

In other words, the portfolio is best read as:

> an AI-assisted research software prototyping experiment using scientific themes as testbeds, not as validated domain research.

## Why it's public

Two reasons. The visualizations are genuinely cool, and I wanted people to be able to play with them. And I think it's worth seeing, concretely, that you don't need to know anything about biophysics or computational biology to produce a portfolio of AI research slop that looks like this. That's a fact about the tools, and it's better demonstrated than described. Read the repositories the way you'd read anything that was mostly written by a model: with interest, and without trusting it.

## What I learned

S26 AIRP taught me the nuts and bolts of building things with AI, gave me real fluency in the scientific method, and made me a much more critical reader of papers, including AI-generated ones. It also left me with a few opinions.

**Some of the research process can be delegated, and some of it can't.** Boilerplate code, plotting, LaTeX, refactoring, first-draft summaries of a literature, and the hundred small tasks that used to eat a day each: hand them to a model. Deciding what question is worth asking, judging whether a result is real, and catching a confident, well-formatted mistake: those are still yours. Working out where that line sits, and how much responsibility and credit you should take for work you delegated across it, turned out to be one of the most interesting parts of the whole exercise.

**Hallucination doesn't go away with better engineering.** I tried a lot of scaffolding: carefully engineered prompts and contexts, multi-agent setups, loops where one model audited and reconciled another's work, even audits across different model providers. Some of it helped a lot, some of it hurt, and none of it made the output trustworthy without a human reading it critically. Humans make mistakes too, and maybe one day the models will be close to perfect, but today none of this is a paper-writing engine. The scientist still has to do a lot of the science.

**Ideas are expensive now, and execution is cheap.** It used to be the other way around: anyone could have a great idea, and what mattered was being able to build it. When someone who knows nothing about a field can build almost anything they can describe, that flips. What the models still can't do well is generate a genuinely good research question, recognize a good idea when they see one, or tell which of a dozen directions is worth pursuing. Taste is the biggest gap I saw, bigger than hallucination, and I suspect it's the last hurdle before the systems people mean when they say AGI. It also means the people who spent their careers mastering technical execution are watching machines learn their trade, while people who have spent their lives on ideas without the skills to execute them can suddenly build what they imagine. That's a real shift in what's valuable, in industry and, I think, in academia. I haven't seen many people write about it, and it has become something like a guiding philosophy for how I work.

**People will stop judging work by how well it's made.** When almost everything is implemented by AI, implementation quality stops being a signal. Any well-written paragraph gets assumed to be AI-written; any polished website gets assumed to be AI-designed; before long the same will be true of papers and books. I don't think that's good or bad, just a sign of the times, the way any well-researched article written after Google was assumed to have used the internet. Most of the market will prefer the AI-made version, because it will be better in every way you can measure. But there will be a market for what you can't measure, the human touch, in products, in art, and maybe in research too. This portfolio is not that. It's the opposite: a public record of how easy research-shaped output is to generate now, and a reminder to read everything, including this post, critically.

## Future directions

S26 AIRP was a training ground, and it did its job. What I learned from it now goes into the work I actually care about: my thesis, the research tooling I'm building, and the writing I want to do about doing research with these models in the loop. The most useful posts I could write next are practical ones: which parts of the process I now hand to a model without a second thought, which parts I never will, and what a research workflow looks like when the human's job is mostly ideas and judgment.

---

## Portfolio index

The index below lists the 67 S26 AIRP repositories. GitHub links are included for every repository. Streamlit app links are included where applicable; the four paper-to-tool repositories do not have Streamlit apps and are marked accordingly.

<!-- S26-AIRP-PORTFOLIO-INDEX:START -->

{::nomarkdown}

<section class="repo-index s26-repo-index" aria-labelledby="repo-index-title">
  <div class="section-heading split-head">
    <div>
      <h3 id="repo-index-title">Repositories</h3>
    </div>
    <div class="list-tools" aria-label="Repository list controls">
      <span class="small-note" id="repo-list-note">Showing the current filtered set.</span>
      <div class="sort-controls" id="repo-sort-controls" aria-label="Sort repositories"></div>
      <div class="limit-controls" id="list-limit-controls" aria-label="Rows to show"></div>
    </div>
  </div>
  <div class="repo-list" id="repo-list"></div>
</section>

{:/nomarkdown}

<!-- S26-AIRP-PORTFOLIO-INDEX:END -->