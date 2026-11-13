---
title: crypto.randomUUID needs a secure context
type: tip
topic: javascript
added: 2026-07-15
tags: [javascript, web-apis]
---

`crypto.randomUUID()` only exists in secure contexts: HTTPS, `localhost` and `127.0.0.1`. Loading a dev server from a phone over plain HTTP to a LAN IP (`http://192.168.x.x:5173`) isn't one, so `crypto.randomUUID` is `undefined` there and calling it throws.

`crypto.getRandomValues()` has no such restriction. Build the same v4 UUID from it by setting the version and variant bits by hand:

```js
function randomId() {
    const bytes = crypto.getRandomValues(new Uint8Array(16));

    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;

    const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');

    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}
```

To test the fallback, shadow it with `Object.defineProperty(crypto, 'randomUUID', { value: undefined })`. It lives on `Crypto.prototype`, so `delete crypto.randomUUID` does nothing.
