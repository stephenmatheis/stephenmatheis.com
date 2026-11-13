---
title: Gradient text with background-clip
type: tip
topic: css
added: 2023-02-09
tags: [css]
---

Paint a gradient as the element's background, clip the background to the text, and make the text itself transparent so the background shows through.

```css
.gradient {
    background-image: linear-gradient(90deg, #f06, #48f);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    color: transparent;
}
```

Keep the `-webkit-` prefixed `background-clip` for older Safari and Chrome.
