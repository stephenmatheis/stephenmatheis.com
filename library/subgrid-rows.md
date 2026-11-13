---
title: Align rows that have a wrapper with subgrid
type: technique
topic: css
added: 2026-11-09
tags: [css, grid]
---

A grid only lines up its direct children. Wrapping each row in an element (an `li` per job, say) breaks the alignment, because the wrapper becomes the grid item and its children size themselves independently.

Give the parent the tracks, then let each wrapper span every track and borrow them with `subgrid`:

```css
ul {
    display: grid;
    grid-template-columns: repeat(3, max-content);
}

li {
    display: grid;
    grid-column: 1 / -1;
    grid-template-columns: subgrid;
}
```

The cells inside each `li` now sit on the `ul`'s columns, so a long value in one row widens that column for every row.

Changing the `li` to `display: flex` or `block` turns subgrid off. That makes stacking at narrow widths a media query with no `nth-child` math.

`subgrid` on the parent does nothing useful. It borrows from the parent's own parent, which usually isn't a grid.
