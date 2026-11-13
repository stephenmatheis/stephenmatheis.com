---
title: CRT effect in CSS
type: technique
topic: css
added: 2023-12-08
tags: [css, animation]
---

Three layers make a CRT look.

Color fringing is a `text-shadow` with a blue copy offset one way and a red copy offset the other, animated through keyframes with random offsets:

```css
@keyframes fringe {
    0% {
        text-shadow: 0.44px 0 1px rgb(0 30 255 / 0.5), -0.44px 0 1px rgb(255 0 80 / 0.3), 0 0 3px;
    }
    5% {
        text-shadow: 2.79px 0 1px rgb(0 30 255 / 0.5), -2.79px 0 1px rgb(255 0 80 / 0.3), 0 0 3px;
    }
    /* ...every 5% */
}
```

Scanlines are a pseudo-element covering the screen, with a 2px repeating gradient over a faint RGB stripe:

```css
.crt::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
        linear-gradient(rgb(18 16 16 / 0) 50%, rgb(0 0 0 / 0.25) 50%),
        linear-gradient(90deg, rgb(255 0 0 / 0.06), rgb(0 255 0 / 0.02), rgb(0 0 255 / 0.06));
    background-size: 100% 2px, 3px 100%;
    pointer-events: none;
}
```

Flicker is a second pseudo-element with a dark tint and a fast `opacity` animation through random values.

Both pseudo-elements need `pointer-events: none`, or they block clicks and text selection underneath.
