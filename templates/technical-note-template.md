# Technical Note Template

Use this template for focused implementation notes, workflow notes, debugging
summaries, and small engineering writeups. It should read like a practical note,
not a broad claim about a tool, method, or field.

````markdown
---
title: "[Technical note title]"
description: "[One direct sentence describing the note]"
permalink: /articles/[post-slug]/
---

# [Technical note title]

[Opening paragraph that states the problem, context, and scope of the note.]

## Problem

[Describe the issue, question, workflow, or implementation detail. Include
environment or version details when they matter.]

## Approach

[Describe what you tried or built. Keep this concrete. Use code blocks only
when they help the reader understand or reproduce the work.]

```bash
# Optional command example. Remove this block if not needed.
command_here --flag value
```

## Result

[State the observed result. Avoid overgeneralizing beyond the environment or
inputs described above.]

## Caveats

[List limitations, assumptions, unresolved issues, or conditions that could make
the result different elsewhere.]

## Links

- [Related resource](https://example.com/)
````

## Review Before Publishing

- Replace every bracketed prompt and remove unused optional sections.
- Verify command examples do not include secrets, tokens, local-only private
  paths, or destructive operations.
- Keep results scoped to the tested environment.
- Add caveats when behavior depends on versions, external services, API limits,
  local state, or temporary conditions.
