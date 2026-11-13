---
title: Headless Chrome --screenshot mis-sizes cross-origin iframes
type: tip
topic: tooling
added: 2026-09-23
tags: [chrome, testing]
---

Chrome's `--screenshot` flag renders cross-origin iframes at the wrong size, so a page that embeds other sites doesn't look like it does in a browser.

Capture through the DevTools protocol instead, with `Page.captureScreenshot`. Puppeteer's `page.screenshot()` uses it:

```js
await page.setViewport({ width: 1280, height: 800 });
await page.goto(url, { waitUntil: 'networkidle0' });
await page.screenshot({ path: 'shot.png' });
```

For plain pages, `--screenshot` works:

```sh
chrome --headless --screenshot=shot.png --window-size=1280,800 --virtual-time-budget=6000 "$url"
```

Run captures one at a time. With `--user-data-dir`, headless Chrome can hang after writing the screenshot.
