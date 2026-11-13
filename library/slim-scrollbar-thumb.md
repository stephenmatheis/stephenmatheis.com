---
title: Inset a scrollbar thumb with a transparent border
type: technique
topic: css
added: 2021-04-15
tags: [css, scroll, webkit]
---

A transparent border with `background-clip: content-box` draws the thumb smaller than its track, so it floats with space around it:

```css
::-webkit-scrollbar {
    width: 12px;
    height: 12px;
}

::-webkit-scrollbar-thumb {
    border: 3px solid transparent;
    border-radius: 8px;
    background-clip: content-box;
    background-color: gray;
}
```

`width` alone makes the thumb thinner but leaves it touching the edges.

In Chrome 121 and later, setting `scrollbar-width` or `scrollbar-color` on an element turns off its `::-webkit-scrollbar` styles. The standard properties have no way to inset the thumb.
