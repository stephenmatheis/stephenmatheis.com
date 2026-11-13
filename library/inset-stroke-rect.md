---
title: Inset strokeRect by half the line width
type: tip
topic: canvas
added: 2026-06-22
tags: [canvas]
---

`strokeRect` centers the stroke on the rectangle's edge, so half of it lands outside the rectangle. On a grid of cells, that half overlaps the neighboring cell.

This matters with partial repaints. `clearRect` on one row doesn't reach the bit of stroke that spilled into the row next to it, so semi-transparent grid lines get drawn over themselves and darken with every repaint.

Inset the rectangle by half the line width so every stroked pixel stays inside the cell:

```ts
const lineWidth = 0.5;
const half = lineWidth / 2;

ctx.lineWidth = lineWidth;
ctx.strokeRect(x + half, y + half, cellWidth - lineWidth, cellHeight - lineWidth);
```
