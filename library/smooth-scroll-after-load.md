---
title: Turn on smooth scrolling after the page loads
type: tip
topic: css
added: 2023-11-28
tags: [css, react]
---

With `scroll-behavior: smooth` in the stylesheet, opening a URL with a hash animates the scroll to the anchor instead of starting there.

Leave it out of the CSS and set it once the page has rendered:

```ts
useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
}, []);
```

Since the inline style wins over the stylesheet, the reduced-motion override needs `!important`:

```css
@media (prefers-reduced-motion: reduce) {
    html {
        scroll-behavior: auto !important;
    }
}
```
