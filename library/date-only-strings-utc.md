---
title: Date-only strings are parsed as UTC
type: tip
topic: javascript
added: 2022-02-06
tags: [javascript, dates, forms]
---

`<input type="date">` gives a value like `2021-05-01`. `new Date()` reads a date-only string as midnight UTC, which is still the day before in US time zones:

```js
new Date('2021-05-01').toLocaleDateString('en-US');
// '4/30/2021' in Austin
```

A date with a time and no offset is read as local time, so the two forms disagree.

Swapping dashes for slashes (`2021/05/01`) parses as local time in every browser, but that format isn't in the spec. Building the date from its parts is:

```js
const [year, month, day] = input.value.split('-').map(Number);
const date = new Date(year, month - 1, day);
```
