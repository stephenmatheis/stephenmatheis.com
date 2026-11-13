---
title: IDs used in selectors can't start with a digit
type: tip
topic: javascript
added: 2020-02-16
tags: [javascript, dom, selectors]
---

An `id` of `3` is valid HTML, but `#3` isn't a valid CSS selector, so `querySelector` throws:

```js
document.querySelector('#3'); // SyntaxError
```

Generated ids from a counter hit this first. Prefix them:

```js
function nextId() {
    return `component-${count++}`;
}
```

If the id can't change, escape it or skip selectors:

```js
document.querySelector(`#${CSS.escape(id)}`);
document.getElementById(id);
```
