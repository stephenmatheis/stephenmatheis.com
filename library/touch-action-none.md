---
title: Pan gestures on touch need touch-action
type: tip
topic: css
added: 2025-08-01
tags: [css, touch]
---

On a touch screen, the browser treats a drag as a scroll or a zoom first. It takes the gesture and sends `pointercancel`, so drag handlers stop after a few pixels.

Tell the browser to leave gestures on that element alone:

```css
.handle {
    touch-action: none;
}
```

Motion's `onPan` relies on this, as does any pointer-event drag. Use `pan-x` or `pan-y` instead to keep native scrolling on the other axis.

Put it only on the element being dragged. On a large area it blocks page scrolling.
