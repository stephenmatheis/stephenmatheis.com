---
title: Safari before 14.1 ignored dateStyle
type: note
topic: safari & ios
added: 2021-04-18
tags: [javascript, intl, safari]
---

`toLocaleDateString` with `dateStyle: 'full'` didn't format in Safari. Spelling out each part did:

```js
new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
});
// 'Sunday, April 18, 2021'
```

Safari 14.1 added `dateStyle` and `timeStyle` later that month. The separate options still give more control over which parts appear.
