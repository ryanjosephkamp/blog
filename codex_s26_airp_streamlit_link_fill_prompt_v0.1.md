# Codex S26 AIRP Streamlit Link Fill Prompt v0.1

You are helping Ryan finalize the flagship Markdown article for the **Spring 2026 AI Research Prototype Portfolio (S26 AIRP)**.

This task is **link-extraction and table-update only**.

Do not rewrite the article prose.
Do not change the article title.
Do not change the disclosure or non-overclaiming language.
Do not add scientific claims.
Do not edit repository files.
Do not change repository metadata.
Do not change repository descriptions, topics, project links, visibility, settings, Streamlit links, source code, reports, PDFs, LaTeX files, licenses, data, figures, citations, deployment settings, or scientific claims.

Your only allowed file edit is to the local Markdown article file:

```text
s26_airp_flagship_article_draft_v0.3.md
```

Inside that file, modify only the section bounded by these exact markers:

```markdown
<!-- S26-AIRP-PORTFOLIO-INDEX:START -->
...
<!-- S26-AIRP-PORTFOLIO-INDEX:END -->
```

The table already contains 67 repositories with GitHub links. Preserve the table row order, repository names, GitHub links, and note column unless a note is clearly needed to preserve the existing paper-to-tool or special-caution status.

Your task:

1. For each repository row marked `streamlit_link_pending`, inspect live GitHub repository metadata first, especially the repository homepage/project/details link field.
2. If a Streamlit app URL is present, replace `streamlit_link_pending` with a Markdown link:
   [`Open app`](streamlit_url_here)
3. If repository metadata does not expose the app link, inspect the README for a Streamlit app URL.
4. If no Streamlit link can be found for a Streamlit prototype repository, leave `streamlit_link_pending` unchanged and add `Streamlit link not found by Codex` in the Note column.
5. For the four paper-to-tool repositories, preserve:
   `N/A — paper-to-tool repository`
6. Do not invent Streamlit URLs.
7. Do not infer URLs from repository names unless the exact URL is visible in repository metadata or README.
8. Do not alter any article prose outside the marked index section.
9. Do not alter any repository.

The four paper-to-tool repositories are:

```text
ryanjosephkamp/protein-ebm-dsm-egnn-ald
ryanjosephkamp/spink7-klk5-md-pipeline
ryanjosephkamp/spink7-klk5-md-pipeline-v2
ryanjosephkamp/spink7-klk5-md-pipeline-v3
```

After updating the table, verify:

- The article still contains exactly one `S26-AIRP-PORTFOLIO-INDEX:START` marker.
- The article still contains exactly one `S26-AIRP-PORTFOLIO-INDEX:END` marker.
- The table still contains exactly 67 repository rows.
- Exactly four rows have `N/A — paper-to-tool repository`.
- No article prose outside the marked section changed.
- No repository files or metadata changed.

Provide a final report with:

1. Count of Streamlit links filled.
2. Count of Streamlit placeholders still pending.
3. Count of paper-to-tool N/A rows.
4. Any repositories where a Streamlit link could not be found.
5. Confirmation that only the marked article table section was changed.
