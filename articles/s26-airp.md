---
title: "Spring 2026 AI Research Prototype Portfolio"
description: "AI-assisted research software prototyping in practice"
permalink: /articles/s26-airp/
scripts:
  - /assets/js/s26-airp-repositories.js
---

# Spring 2026 AI Research Prototype Portfolio

<p class="article-subtitle">AI-Assisted Research Software Prototyping in Practice</p>

In spring 2026, I built the **Spring 2026 AI Research Prototype Portfolio (S26 AIRP)**: a 67-repository portfolio of AI-assisted research software prototypes.

The portfolio explores **AI-assisted research software prototyping** and **LLM-assisted scientific software development**. Most of the repositories are research-themed Streamlit prototypes, while four are paper-to-tool repositories built around academic-literature-inspired workflows. Across the portfolio, scientific and technical themes are used as challenging testbeds for software development, interface design, documentation, report generation, and AI-assisted workflow design.

The most important framing is also the simplest: **these repositories are not presented as validated scientific research**. They are software-engineering, workflow-design, interface-development, documentation, and AI-methodology artifacts. Scientific and domain-specific content in the repositories is provisional and has not been independently validated by domain experts.

## Why I built this portfolio

I created S26 AIRP to explore what modern AI tools can and cannot do in a rapid research-software prototyping workflow.

The goal was not to produce validated biology, chemistry, biophysics, molecular simulation, or protein-design research. Instead, I wanted to study a practical question from a computer-science and AI perspective:

> What happens when LLM-assisted development tools are used to rapidly prototype research-themed software systems, documentation, interfaces, reports, and workflows?

Scientific themes gave the projects structure. They forced the prototypes to deal with visualizations, simulations, notation, domain vocabulary, mathematical objects, documentation challenges, and citation-like workflows. That made them useful testbeds for studying AI-assisted software development.

## What the portfolio contains

S26 AIRP contains 67 public GitHub repositories.

Most are Streamlit-linked exploratory prototypes. These include visual simulations, interface experiments, chemistry and physics demonstrations, molecular or protein-themed prototypes, AI/ML architecture demonstrations, and documentation-heavy research-style artifacts.

Four repositories are paper-to-tool prototypes. These are not Streamlit simulations. They are closer to exploratory research-tool or pipeline prototypes inspired by academic literature and should be read with especially clear attention to the portfolio’s disclosure language.

Each repository includes a top-level README notice and a root-level `AI_DISCLOSURE.md` file explaining the project context, the role of AI assistance, the provisional status of scientific/domain-specific content, intended use, non-use, and the relationship between the repository and the broader S26 AIRP portfolio.

## How AI assistance fit into the workflow

The repositories were developed with substantial AI assistance.

AI tools were used for activities such as software prototyping, code generation, debugging support, interface iteration, documentation, report drafting, LaTeX formatting, prompt engineering, and context engineering. This makes the portfolio an AI-assisted artifact rather than a conventionally authored research portfolio.

That AI-assisted origin is not hidden. It is central to the project. One of the lessons of the portfolio is that AI tools can accelerate ambitious software prototyping, but they can also produce polished artifacts whose scientific appearance may exceed their actual validation status. S26 AIRP is partly an exploration of that tension.

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

## Portfolio index

The explorer below provides a complete index of the 67 S26 AIRP repositories. GitHub links are included for every repository. Streamlit app links are included where applicable; the four paper-to-tool repositories do not have Streamlit apps and are marked accordingly. Some repository descriptions include additional caution language where the topic is especially domain-sensitive.

<!-- S26-AIRP-PORTFOLIO-INDEX:START -->

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

    <aside class="repo-side" aria-label="S26 repository details and activity">
      <section class="inspector" id="repo-inspector" tabindex="-1" aria-live="polite">
        <h2>Select a repository</h2>
        <p>
          Choose an S26 AIRP repository to see its public description, language, update date, tags,
          and links.
        </p>
      </section>
      <section class="activity" aria-labelledby="activity-title">
        <h2 id="activity-title">S26 repo activity</h2>
        <div
          class="activity-bars"
          id="activity-bars"
          aria-label="Recent S26 AIRP repository update activity"
        ></div>
        <p class="activity-detail small-note" id="activity-detail" aria-live="polite">
          Focus a bar to read the week count.
        </p>
        <p class="small-note">
          Approximate view based on public repository timestamps, not GitHub's contribution
          calendar.
        </p>
      </section>
    </aside>

  </div>

  <section class="repo-index" aria-labelledby="repo-index-title">
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
</section>

{:/nomarkdown}

<!-- S26-AIRP-PORTFOLIO-INDEX:END -->

## What I learned

S26 AIRP taught me that AI-assisted development can make ambitious prototypes possible quickly, but it also increases the need for deliberate framing.

The same workflow that can generate code, interfaces, diagrams, and reports can also create artifacts that look more authoritative than they are. That is especially important when scientific language, citations, or publication-style formatting are involved.

For me, the main lesson is not that AI tools should be avoided. It is that AI-assisted technical work needs careful context management, clear disclosure, and honest boundaries around validation.

## Future directions

S26 AIRP provides a foundation for more deliberate work on AI-assisted software development, research-tool prototyping, interface design, documentation workflows, and project-scale transparency. The most useful follow-on writing will be practical: what worked, what failed, how AI-assisted workflows can be made more legible, and where current AI systems still require human judgment, validation, and restraint.
