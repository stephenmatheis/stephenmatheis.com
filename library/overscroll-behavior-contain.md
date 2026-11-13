---
title: overscroll-behavior stops scroll chaining to the page
type: tip
topic: css
added: 2020-02-16
tags: [css, scroll]
---

When a scroll container inside a page reaches its end, more wheel or touch scrolling moves the page behind it. Stop that on the inner container:

```css
.list {
    overflow-y: auto;
    overscroll-behavior: contain;
}
```

`contain` also turns off the bounce and pull-to-refresh that would otherwise pass through. `none` does the same and also removes the container's own bounce.
