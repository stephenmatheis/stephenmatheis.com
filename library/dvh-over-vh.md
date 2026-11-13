---
title: Use 100dvh for full-height layouts on iOS Safari
type: tip
topic: safari & ios
added: 2021-05-02
updated: 2022-06-19
tags: [css, ios, viewport]
---

On iOS Safari, `100vh` is the height with the toolbars hidden, so a full-height layout runs under the toolbar when it's showing. `100dvh` follows the visible height as the toolbars show and hide.

Put the fallback first:

```css
body {
    height: 100vh;
    height: 100dvh;
}
```

Browsers without `dvh` drop the second declaration and keep the first. In the other order, `100vh` wins everywhere.

Before `dvh`, `height: -webkit-fill-available` after `100vh` was the workaround.

`svh` and `lvh` are the fixed small and large heights, if the layout shouldn't change as the toolbars move.
