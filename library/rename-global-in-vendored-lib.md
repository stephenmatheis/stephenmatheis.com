---
title: Rename a global in a vendored library and assert the count
type: technique
topic: 'safari & ios'
added: 2026-11-06
tags: [build, extensions]
---

Libraries that run in both browsers and extensions often branch on `globalThis.browser`. Safari defines it for extensions and Chrome doesn't, so the same library can take a different path in Safari. SingleFile, for one, hands its timers and frame messages to the extension's background when `browser` exists.

To force the plain-page path, rename the global when copying the library in. Count the occurrences first and fail the build if the number changes, so an upgrade can't quietly add a reference the rename misses or drop one it depends on:

```js
const uses = script.split('globalThis.browser').length - 1;

if (uses !== 5) {
    throw new Error(`SingleFile reads globalThis.browser ${uses} times, not 5`);
}

const singleFile = script.replaceAll('globalThis.browser', 'globalThis.singleFileHasNoBrowser');
```

Note the change in a comment at the top of the vendored file.
