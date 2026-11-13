---
title: Separate mailto recipients with semicolons for Outlook
type: tip
topic: html
added: 2021-05-12
tags: [html, email, outlook]
---

RFC 6068 separates `mailto:` addresses with commas. Outlook didn't accept commas but did accept semicolons:

```js
location.href = `mailto:${emails.join(';')}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
```

Line breaks in the body have to be `%0D%0A`. `\n` and `<br>` don't work. `encodeURIComponent` turns `\n` into `%0A` only, so replace newlines with `\r\n` before encoding.
