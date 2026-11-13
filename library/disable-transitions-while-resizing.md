---
title: Turn off transitions while the window is resizing
type: technique
topic: javascript
added: 2022-06-19
tags: [javascript, css, resize]
---

An element positioned from JavaScript with a CSS transition lags behind while the window is resized, because every new position starts another transition. Remove the transition during the resize and restore it once resizing stops:

```js
let restoreTransition;

window.addEventListener('resize', () => {
    clearTimeout(restoreTransition);

    slider.classList.remove('transition');
    positionSlider();

    restoreTransition = setTimeout(() => {
        slider.classList.add('transition');
    }, 200);
});
```

Each `resize` event clears the timer, so the class comes back 200ms after the last one.
