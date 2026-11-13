---
title: Set print paper size and margins with @page
type: tip
topic: css
added: 2021-04-17
tags: [css, print]
---

`@page` sets the sheet itself, so the document doesn't need padding to keep off the paper's edges:

```css
@page {
    size: letter;
    margin: 0.5in;
}
```

The margin applies to every printed page, including ones a long document breaks onto. Padding on `body` only applies at the start and end of the document.

The print dialog's own margin setting can override it. "Default" uses the `@page` margins.
