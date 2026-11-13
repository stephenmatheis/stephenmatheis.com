---
title: Clear the cells under an overlay in a character grid
type: tip
topic: canvas
added: 2026-06-21
tags: [canvas, tui]
---

When a modal is drawn into a character grid, only the cells it writes change: borders, titles, text. Empty cells inside the box keep whatever was there before, so the content underneath shows through the gaps.

Clear the modal's rectangle first, then draw the modal:

```ts
for (let row = rect.y; row < rect.y + rect.h; row++) {
    for (let col = rect.x; col < rect.x + rect.w; col++) {
        chars[row][col] = '';
    }
}

compose(modal, chars);
```

The same applies when compositing two layers. Inside the modal's rectangle, an empty modal cell has to stay empty instead of falling back to the layer below.

Snapshot the rectangle before clearing it and restore the snapshot when the modal closes.
