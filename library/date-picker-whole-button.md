---
title: Open the native date picker from a custom button
type: technique
topic: css
added: 2021-04-15
tags: [css, forms, webkit]
---

Lay an invisible date input over the button, then stretch its picker icon so a click anywhere lands on it:

```css
.date-button {
    position: relative;
}

.date-button input[type='date'] {
    position: absolute;
    inset: 0;
    opacity: 0;
}

.date-button input[type='date']::-webkit-calendar-picker-indicator {
    position: absolute;
    top: -150%;
    left: -150%;
    width: 300%;
    height: 300%;
    cursor: pointer;
}
```

This only works in Chromium. `showPicker()` now does it from a click handler in every major browser:

```js
button.addEventListener('click', () => input.showPicker());
```
