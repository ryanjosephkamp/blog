# Blog Authoring Checklist

Use this checklist before publishing or asking Codex to publish a new post.

## Choose A Template

- Use `templates/standard-article-template.md` for essays, reflections, project
  notes, and public updates.
- Use `templates/project-portfolio-article-template.md` for project,
  repository-group, portfolio, or interactive-artifact posts.
- Use `templates/technical-note-template.md` for focused implementation notes,
  workflow notes, debugging summaries, or small engineering writeups.
- Use `docs/blog-disclosure-framing-checklist.md` when the post involves AI
  assistance, research-themed prototypes, scientific language, public
  repositories, external links, provisional work, or domain-sensitive material.

## Draft

- Choose a clear title and URL slug.
- Decide whether the post belongs under `/articles/`.
- Write a one-sentence description for the front matter.
- Keep the post focused on one main idea, project, note, or update.
- Replace every bracketed prompt from the template.
- Remove unused optional sections before review.

## Review

- Check that all claims are supported by the post or linked sources.
- Mark provisional, exploratory, unfinished, or AI-assisted work clearly.
- Remove private notes, local-only reminders, and placeholder text.
- Verify links and link text.
- Confirm tables, code blocks, images, and long URLs behave on mobile.
- Confirm no secrets, credentials, private file paths, or destructive commands
  appear in the post.
- Confirm the post does not imply validation, peer review, experimental support,
  production readiness, or scientific correctness unless separately reviewed and
  sourced.

## Publish

- Add or update the article entry in `index.md` when the post should appear on
  the blog home page.
- Add or update the article entry in `articles/index.md` when the post should
  appear in the articles index.
- Use a branch and PR workflow for tracked changes.
- Preview `/blog/`, `/blog/articles/`, and the new article path before merge.
- Verify the live page after merge and GitHub Pages build.
- Record the final live URL in the closeout.
