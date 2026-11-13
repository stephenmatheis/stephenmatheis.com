---
title: React's onSelect lags behind the caret
type: tip
topic: react
added: 2026-07-14
tags: [react, dom]
---

The native `selectionchange` event fires at `document` and doesn't pass through React's root. React can only synthesize `onSelect` while it handles some other event, like the next `keydown` or a `mouseup`. An arrow press that moves the caret in a textarea may not reach `onSelect` until the next key goes down.

Listen to the native event instead, and check that the textarea is the focused element:

```js
useEffect(() => {
    function handleSelectionChange() {
        const node = textAreaRef.current;

        if (!node || document.activeElement !== node) return;

        setCursorPos(node.selectionDirection === 'backward' ? node.selectionStart : node.selectionEnd);
    }

    document.addEventListener('selectionchange', handleSelectionChange);

    return () => document.removeEventListener('selectionchange', handleSelectionChange);
}, []);
```

It fires as soon as the browser moves the caret.
