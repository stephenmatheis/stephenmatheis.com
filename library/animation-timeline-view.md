---
title: Drive a keyframe animation by scroll position with view()
type: tip
topic: css
added: 2025-01-10
tags: [css, animation]
---

`animation-timeline: view()` ties a keyframe animation to the element's progress through the viewport instead of to time. The animation starts as the element enters and ends as it leaves. No JavaScript or scroll listener is needed.

```css
.card {
    animation: rotate linear;
    animation-timeline: view();
}

@keyframes rotate {
    to {
        rotate: 1turn;
    }
}
```

Set `animation-timeline` after the `animation` shorthand, which resets it.
