---
title: Let the page drive long work in a Safari extension
type: technique
topic: 'safari & ios'
added: 2026-11-06
tags: [safari, extensions]
---

Safari stops an extension's background page whenever it has nothing left to answer, along with its timers. A background that injects a script and awaits a long result, like archiving a page, can be stopped partway and never finish.

Invert it. The background injects a function that starts the work and returns at once. The page does the slow part and sends each piece back with `runtime.sendMessage`, which wakes the background again.

```js
function capturePage(id) {
    const ext = globalThis.browser ?? globalThis.chrome;

    (async () => {
        await ext.runtime.sendMessage({ type: 'capture-text', id, page: readText() });
        await ext.runtime.sendMessage({ type: 'capture-done', id });
    })();
}

await ext.scripting.executeScript({ target: { tabId }, func: capturePage, args: [id] });
```

Anything kept in memory is gone when the background restarts, so keep progress in `storage.session` and handle each message from what's stored. Split large payloads into chunks across several messages.

A page that closes mid-task never reports back. Mark tasks older than a cutoff as finished on the next wake.
