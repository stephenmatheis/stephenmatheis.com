---
title: Let iOS handle the on-screen keyboard
type: note
topic: 'safari & ios'
added: 2026-11-05
tags: [ios, css]
---

iOS doesn't shrink the layout viewport when the keyboard opens. Workarounds for that tend to stack up: resizing the app to `visualViewport.height`, toggling a `keyboard` class when the height drops, cancelling `touchmove` so the page can't be dragged, scrolling boxes by hand, moving the input out of sight while iOS scrolls to it.

Removing all of them, about 230 lines, and using plain CSS left iOS to scroll the page and the boxes itself:

```css
.app {
    height: 100dvh;
}

.prompt-keys {
    display: none;

    @media (hover: none) {
        .app:has(.prompt-input:focus, .editor-text:focus) & {
            display: grid;
        }
    }
}
```

A focused text field on a touch screen (`hover: none`) stands in for "the keyboard is up". To put the keyboard away, blur the field when `matchMedia('(hover: none)').matches`.
