---
title: Size a canvas character grid from font metrics
type: technique
topic: canvas
added: 2026-06-20
tags: [canvas, typography]
---

For a monospace grid on a canvas, measure the cell instead of hardcoding it. Width is the advance of one glyph. Height is the font's bounding box, which is the same for every glyph.

```ts
function getCellSize(element: HTMLElement) {
    const style = getComputedStyle(element);
    const ctx = document.createElement('canvas').getContext('2d');

    if (!ctx) return { width: 0, height: 0 };

    ctx.font = `${parseFloat(style.fontSize)}px ${style.fontFamily}`;

    const metrics = ctx.measureText('M');

    return {
        width: metrics.width,
        height: metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent,
    };
}
```

`actualBoundingBoxAscent` and `actualBoundingBoxDescent` describe the ink of the measured string, so they change with the glyph. Use the `fontBoundingBox` pair for row height.

Divide the viewport by these values to get columns and rows, and map pointer coordinates back to cells with `Math.floor`.
