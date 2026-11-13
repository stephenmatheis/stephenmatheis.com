---
title: Scroll a line-numbered textarea and its gutter as one box
type: technique
topic: css
added: 2026-11-05
tags: [css, forms]
---

Syncing a gutter's `scrollTop` to a textarea's on every `scroll` event lags, especially on touch. Instead, make the textarea as big as its text so it never scrolls, and put it beside the gutter in a wrapper that does.

```css
.editor {
    display: flex;
    overflow: auto;
    scroll-padding-left: calc(var(--digits) * 1ch + 3ch);
}

.gutter {
    position: sticky;
    left: 0;
    z-index: 1;
    flex: none;
    height: calc(var(--lines) * 1lh + 3lh);
    min-height: 100%;
    background: var(--bg);
    white-space: pre;
}

.text {
    flex: 1 0 auto;
    width: calc(var(--longest) * 1ch + 3ch);
    height: calc(var(--lines) * 1lh + 3lh);
    min-height: 100%;
    overflow: hidden;
    white-space: pre;
    resize: none;
}
```

On `input`, set `--lines`, `--longest` and `--digits` from the text. The extra `3lh` and `3ch` leave room for a character or line typed before the next count.

The sticky gutter covers the left edge when scrolled sideways. `scroll-padding-left` keeps the caret clear of it when the browser scrolls the caret into view.
