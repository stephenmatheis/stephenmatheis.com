---
title: Ignore touch in hover handlers with pointerType
type: tip
topic: javascript
added: 2025-07-30
tags: [javascript, touch]
---

After a tap, touch browsers fire compatibility mouse events, including `mouseover`. Hover effects driven by `onMouseOver` and `onMouseLeave` turn on with the tap and stay on, since no `mouseleave` follows.

Use pointer events and return early for touch:

```tsx
<button
    onPointerOver={(event) => {
        if (event.pointerType === 'touch') return;

        showOverlay();
    }}
    onPointerLeave={(event) => {
        if (event.pointerType === 'touch') return;

        hideOverlay();
    }}
/>
```

`pointerType` is `'mouse'`, `'pen'`, or `'touch'`. Pen hover still works.
