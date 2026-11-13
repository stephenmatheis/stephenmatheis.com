---
title: Wait for web fonts before measuring text on a canvas
type: tip
topic: canvas
added: 2026-06-27
tags: [canvas, fonts]
---

`measureText` uses whatever font is loaded at the moment it runs. If a web font hasn't arrived yet, it measures the fallback, and anything sized from those metrics (a character grid, for example) comes out wrong and stays wrong.

Preload the font so the download starts early:

```html
<link rel="preload" href="/fonts/DepartureMono-Regular.woff2" as="font" type="font/woff2" crossorigin />
```

Then wait for it before measuring:

```ts
await document.fonts.ready;

startEditor();
```

Both are needed. Preload alone doesn't guarantee the font has arrived when the script runs. Without preload, `fonts.ready` can resolve before the font is requested, because the browser only fetches a web font once something on the page uses it. The `crossorigin` attribute is required on font preloads, even same-origin, or the browser fetches the font twice.
