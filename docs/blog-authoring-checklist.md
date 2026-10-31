# Blog Authoring Checklist

Use this checklist before publishing a new post or a change to one.

## Choose A Template

- Use `templates/standard-article-template.md` for essays, reflections, project
  notes, and public updates.
- Use `templates/project-portfolio-article-template.md` for project,
  repository-group, portfolio, or interactive-artifact posts.
- Use `templates/technical-note-template.md` for focused implementation notes,
  workflow notes, debugging summaries, or small engineering writeups.

## Draft

- Choose a clear title and a stable, lowercase, descriptive URL slug.
- Decide whether the post belongs under `/articles/`.
- Add the publication date in `YYYY-MM-DD` format.
- Write a one-sentence description for the front matter.
- Open with a paragraph that says what the post covers.
- Keep the post focused on one main idea, project, note, or update.
- Replace every bracketed placeholder from the template.
- Remove unused optional sections before review.

## Style

- American English and US dates (October 31, 2026).
- The Oxford comma, and a comma after an introductory word or phrase.
- Plain and direct: the number, the name, or the example over the general
  claim. No filler, hype, or decorative metaphors.
- Write about the work and how it works, not the story of how it was produced,
  unless that story is the post's subject.

## Claims And Framing

- Claims about what Ryan built, tested, wrote, or observed are supported by the
  post, a linked artifact, or a cited source.
- Interpretation is separated from fact.
- Provisional, exploratory, or unfinished work is marked clearly.
- The post does not imply validation, peer review, experimental support,
  production readiness, or scientific correctness unless separately reviewed and
  sourced.
- Scientific or domain-specific content from a prototype is described as what
  the software does, not as a validated finding, and does not invite clinical,
  safety, or operational decisions.
- Limitations that are central to the work are stated where they matter, not
  only at the bottom.

## Links

- Every link resolves to the intended destination.
- Link text is descriptive and doesn't overstate what the destination shows.
- No private notes, local paths, credentials, tokens, or unpublished account
  details appear in the post.

## Layout And Accessibility

- Preview the post on desktop and at phone width.
- No page-level horizontal overflow; long links, tables, code blocks, and images
  wrap or scroll inside their own containers.
- Headings are in a sensible order.
- Keyboard focus stays visible on interactive elements.
- The theme switcher still defaults to System, and the page reads well in light
  and dark modes.

## Publish

- Add or update the article entry in `index.md` when the post should appear on
  the blog home page.
- Add or update the article entry in `articles/index.md` when the post should
  appear in the articles index.
- Use a branch and pull request for every change.
- Preview `/blog/`, `/blog/articles/`, and the new article path before merge.
- Check the live page after the merge and the GitHub Pages build.
