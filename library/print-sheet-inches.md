---
title: Lay out a printed page in inches and line heights
type: technique
topic: css
added: 2026-03-07
tags: [css, print]
---

CSS inches map to real inches in print, so a letter page can be sized directly. Vertical spacing in multiples of `--line-height` keeps text on a baseline grid, on screen and on paper.

```css
.sheet {
    width: 8.5in;
    padding-inline: 0.5in;
    margin: 0 auto;
}

@media print {
    .sheet {
        height: 11in;
        padding-top: calc((11in - (var(--line-height) * 55.5)) / 2);
    }
}
```

The content is 55.5 lines tall, so the padding centers it vertically on the page.

Keep the fixed height in the print block. On screen, an 11in box cuts off or leaves a gap at most viewport sizes.

Minimum heights follow the same rule: `min-height: calc(var(--line-height) * 15)` instead of `250px`.
