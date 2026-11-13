---
title: Edge ignores autocomplete="off"
type: tip
topic: html
added: 2021-12-03
tags: [html, forms, edge]
---

Edge still offered saved values on text fields with `autocomplete="off"`. `autocomplete="new-password"` turned the suggestions off:

```html
<input type="text" autocomplete="new-password" list="autocompleteOff" />
```

The `list` attribute points at a datalist that doesn't exist, which also kept the suggestion dropdown from opening.

Browsers treat `autocomplete` as a hint. Recheck in each browser whenever a form depends on it.
