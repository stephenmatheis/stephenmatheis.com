---
title: Ignore selection changes while the mouse button is down
type: technique
topic: javascript
added: 2026-07-14
tags: [dom, selection]
---

`selectionchange` fires on every step of a mouse drag. Re-rendering or scrolling in response mid-drag moves the text under the pointer, and in WebKit it can corrupt the selection itself: the start snaps to 0 on the first drag movement.

Set a flag on `mousedown`, skip selection updates while it's set, and apply one update on `mouseup`:

```js
const mouseDown = useRef(false);

function handleSelectionChange() {
    if (mouseDown.current) return;
    // ...
}

function handleMouseUp() {
    if (!mouseDown.current) return;

    mouseDown.current = false;
    setCursorPos(textAreaRef.current.selectionEnd);
}

window.addEventListener('mouseup', handleMouseUp);
```

Listen for `mouseup` on `window`, since a drag can end outside the element.

`selectionDirection` is `'none'` for mouse selections in Chrome and WebKit. To tell which end of a dragged range moved, compare each end's line with the pointer's position at release.
