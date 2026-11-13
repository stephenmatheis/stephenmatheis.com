---
title: Masonry-style layout with CSS columns
type: technique
topic: css
added: 2024-11-01
tags: [css, layout]
---

CSS columns stack items of different heights with no gaps between them. Set the column count on the container, and keep each item from splitting across two columns.

```css
.grid {
    column-count: 3;
    column-gap: 1rem;
}

.grid > * {
    display: inline-block;
    width: 100%;
    margin-bottom: 1rem;
}
```

`break-inside: avoid` also keeps items whole, without changing their display.

Items fill each column top to bottom before moving to the next, so reading order runs down, not across.
