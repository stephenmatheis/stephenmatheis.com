---
title: max-width and max-height media queries are inclusive
type: tip
topic: css
added: 2025-08-18
tags: [css]
---

`max-height: 1056px` matches when the viewport is exactly 1056px tall. 1056px is 11in at CSS's fixed 96px per inch, so a layout meant for screens shorter than a letter page also applied to a viewport that fits one exactly.

Subtract a pixel to exclude the boundary:

```css
@media (max-height: 1055px) {
    /* shorter than 11in */
}
```

Range syntax states it directly:

```css
@media (height < 1056px) {
    /* shorter than 11in */
}
```

With `max-` queries, pair breakpoints as `min-width: 816px` and `max-width: 815px` so no width matches both.
