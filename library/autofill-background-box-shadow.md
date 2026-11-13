---
title: Cover Chrome's autofill background with an inset box-shadow
type: tip
topic: css
added: 2019-07-13
tags: [css, forms, chrome]
---

Chrome paints autofilled inputs with its own background color, and `background-color` can't override it. A large inset shadow in the field's color paints over it:

```css
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
    box-shadow: 0 0 0 30px whitesmoke inset;
}
```

The spread only has to be larger than half the field's height. Set `-webkit-text-fill-color` too if the autofill text color also needs to change.

`:autofill` is the standard name for the same pseudo-class.
