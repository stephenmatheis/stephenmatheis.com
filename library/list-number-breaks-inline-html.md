---
title: A line starting with "1." breaks out of inline HTML in markdown
type: tip
topic: markdown
added: 2026-11-09
tags: [markdown, github]
---

In CommonMark and GitHub Flavored Markdown, an ordered list can interrupt a paragraph, but only when it starts at `1.`. A paragraph that opens with `<samp>` and continues with numbered lines turns into a `<p>` that ends early, followed by a real `<ol>`. The `<samp>` styling is lost after the first line.

```md
<samp>Steps:\
1. Do this.\
2. Then that.</samp>
```

Escape the period so it stays text:

```md
<samp>Steps:\
1\. Do this.\
2\. Then that.</samp>
```

Only `1.` interrupts a paragraph, but escaping every number keeps the source consistent and survives reordering.
