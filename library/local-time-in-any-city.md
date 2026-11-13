---
title: Show the time in any city without a date library
type: technique
topic: javascript
added: 2022-06-19
tags: [javascript, intl, dates]
---

`toLocaleTimeString` takes any IANA time zone, named `Area/City`:

```js
new Date().toLocaleTimeString('en-US', {
    timeZone: 'Asia/Tokyo',
    hour12: false,
    timeZoneName: 'long',
});
// '14:05:09 Japan Standard Time'
```

Multi-word cities use underscores: `America/New_York`.

Splitting that string on spaces depends on the locale's format. `formatToParts` returns the pieces by name:

```js
const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Tokyo',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'long',
}).formatToParts(new Date());

const hour = parts.find((part) => part.type === 'hour').value;
```
