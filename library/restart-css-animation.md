---
title: Restart a CSS animation by forcing a reflow
type: technique
topic: css
added: 2022-06-20
tags: [css, javascript, animation]
---

Removing an animation and adding it back in the same frame does nothing, because the browser never sees the change. Read a layout property in between to apply the removal first:

```js
function restartAnimation(element) {
    element.style.animation = 'none';
    void element.offsetHeight;
    element.style.animation = '';
}
```

Clearing the inline value hands the animation back to the stylesheet, which starts it from the beginning.

With the Web Animations API, no reflow is needed:

```js
element.getAnimations().forEach((animation) => {
    animation.cancel();
    animation.play();
});
```
