# Project / Portfolio Article Template

Use this template for posts about a project, repository group, portfolio item,
or interactive artifact. It is intentionally conservative: it helps explain
what exists, how to read it, and what boundaries apply without adding claims the
project does not support.

```markdown
---
title: "[Project or portfolio title]"
description: "[One direct sentence describing the project or portfolio item]"
permalink: /articles/[post-slug]/
date: "[YYYY-MM-DD]"
---

# [Project or portfolio title]

{% include article-date.html %}

<p class="article-subtitle">[Optional subtitle. Remove this line if it is not useful.]</p>

[Opening paragraph that states what the project is and what this post covers.]

## Overview

[Describe the project, repository group, artifact, or portfolio item in plain
language. Keep the description factual.]

## What It Contains

[List or describe the main pieces: repositories, app links, documents,
interfaces, datasets, prototypes, demos, or writeups. Keep this section tied to
verifiable public artifacts.]

## How To Read It

[Explain the intended reader path. For example: start with the article, inspect
the repository, then open a demo link if available.]

## Boundaries

[State what the project does not claim. If work is exploratory, provisional,
domain-sensitive, incomplete, or not independently validated, say that
plainly.]

## Links

- [Repository](https://example.com/)
- [Demo or related page](https://example.com/)
```

## Review Before Publishing

- Remove the subtitle line if the post does not need it.
- Keep an interactive figure's script in `assets/js/` and its data in
  `assets/data/`, and check it at phone width and in both themes.
- Keep repository, demo, and article links factual.
- Do not imply validation, peer review, experimental support, production
  readiness, or scientific correctness unless separately reviewed and sourced.
- Run `docs/blog-authoring-checklist.md`.
