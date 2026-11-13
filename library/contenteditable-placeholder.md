---
title: Placeholder text for contenteditable with :empty
type: technique
topic: css
added: 2019-05-18
tags: [css, contenteditable, forms]
---

`contenteditable` elements have no `placeholder`. Put the text in an attribute and show it with a pseudo-element while the element is empty:

```html
<div contenteditable placeholder="Write a comment..."></div>
```

```css
[contenteditable][placeholder]:empty::before {
    content: attr(placeholder);
    color: lightgray;
    pointer-events: none;
}
```

`pointer-events: none` keeps clicks on the text from landing on the pseudo-element instead of placing the caret.

Some browsers leave a `<br>` behind after the user deletes everything, so `:empty` stops matching. Clear the element on `input` when its text is empty.
