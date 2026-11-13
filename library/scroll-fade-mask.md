---
title: Fade the edges of a scroll box with mask-image
type: technique
topic: css
added: 2026-10-19
tags: [css, scroll]
---

A mask fades the content itself, so it works over any background, unlike a gradient overlay or a shadow. Toggle a class for each edge that is hiding content, based on `scrollTop`, `clientHeight` and `scrollHeight`.

```scss
.fade {
    --fade: 32px;

    scroll-padding-block: var(--fade);
}

.below {
    mask-image:
        linear-gradient(to bottom, #000 calc(100% - var(--fade)), transparent),
        linear-gradient(#000, #000);
    mask-size:
        calc(100% - var(--scrollbar, 0px)) 100%,
        var(--scrollbar, 0px) 100%;
    mask-position:
        left top,
        right top;
    mask-repeat: no-repeat;
}
```

The mask covers the scrollbar too. The second, solid layer sits over a strip as wide as the scrollbar, so the thumb never dims. `--scrollbar` is the scrollbar's width.

`scroll-padding-block` keeps a focused field or the caret out of the faded band when the browser scrolls it into view.

For `.above`, flip the gradient to `to top`. With both, use one gradient that is transparent at each end.
