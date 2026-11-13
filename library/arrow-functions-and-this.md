---
title: Callbacks that rely on this can't be arrow functions
type: tip
topic: javascript
added: 2021-03-10
tags: [javascript, jquery, events]
---

jQuery and libraries built on it, like DataTables, pass the element to handlers as `this`. Arrow functions don't have their own `this`, so inside one it's whatever `this` was outside the handler:

```js
$('#table').on('click', 'tr', function () {
    const row = table.row(this).data(); // the clicked row
});

$('#table').on('click', 'tr', () => {
    const row = table.row(this).data(); // not the row
});
```

Converting callbacks to arrow functions during a cleanup breaks these quietly. Leave a comment on any handler that must stay a `function`, or use the event's `currentTarget` instead:

```js
$('#table').on('click', 'tr', (event) => {
    const row = table.row(event.currentTarget).data();
});
```
