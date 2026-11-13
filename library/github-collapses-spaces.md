---
title: GitHub collapses spaces inside inline HTML
type: tip
topic: markdown
added: 2026-11-09
tags: [github, markdown]
---

Runs of spaces inside `<samp>` (or any inline element) in a README collapse to one space when rendered. GitHub's stylesheet doesn't set `white-space: pre` on them, so columns aligned in the raw file come out ragged.

Pad with non-breaking spaces (U+00A0) instead. Browsers don't collapse them, and in an editor they look like ordinary spaces.

To preview what a README will actually look like:

```sh
gh api -X POST /markdown -f mode=markdown -f text="$(cat README.md)"
```

Use `mode=markdown`. `mode=gfm` renders the way comments do, turning every newline into a `<br>`, which isn't how READMEs render.
