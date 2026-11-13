---
title: Preload images that a theme switch swaps in
type: tip
topic: html
added: 2021-05-03
tags: [html, images, dark-mode]
---

An image whose `src` changes when the theme switches loads only at that moment, so it blinks or shows blank for a moment. Preload both versions:

```html
<link rel="preload" as="image" href="light.png" />
<link rel="preload" as="image" href="dark.png" />
```

If the swap follows the system theme, `<picture>` picks the right image before the page loads, with nothing to swap:

```html
<picture>
    <source srcset="dark.png" media="(prefers-color-scheme: dark)" />
    <img src="light.png" alt="" />
</picture>
```
