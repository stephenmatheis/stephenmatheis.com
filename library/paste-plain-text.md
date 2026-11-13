---
title: Paste plain text into a contenteditable
type: technique
topic: javascript
added: 2021-04-15
tags: [javascript, contenteditable, clipboard]
---

Pasting into a `contenteditable` keeps the source's formatting. Cancel the paste and insert the plain text yourself:

```js
editor.addEventListener('paste', (event) => {
    event.preventDefault();

    const text = event.clipboardData.getData('text/plain');

    document.execCommand('insertText', false, text);
});
```

`execCommand` is deprecated but still the only insert that keeps the browser's undo history. `insertHTML` keeps markup, so use `insertText`.

If the element never needs formatting, `contenteditable="plaintext-only"` does this without JavaScript.
