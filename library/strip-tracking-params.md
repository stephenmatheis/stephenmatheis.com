---
title: Strip tracking parameters before comparing URLs
type: tip
topic: javascript
added: 2026-11-06
tags: [urls, javascript]
---

The same page saved twice can arrive with different `utm_*`, `fbclid` or `gclid` parameters, or with a text-fragment link (`#:~:text=...`) from a search result or a shared highlight. Left in, they make one page look like several.

Remove them before storing or de-duplicating. Keep ordinary `#anchors`.

```ts
const TRACKING = /^(utm_\w+|fbclid|gclid|dclid|gbraid|wbraid|msclkid|mc_cid|mc_eid|igshid|_hsenc|_hsmi|mkt_tok|yclid|ref_src|si)$/i;

function clean(url: URL) {
    for (const key of [...url.searchParams.keys()]) {
        if (TRACKING.test(key)) url.searchParams.delete(key);
    }

    url.hash = /^#(:~:|$)/.test(url.hash) ? '' : url.hash;

    return url;
}
```

Copy the keys with `[...url.searchParams.keys()]` before deleting. Deleting while iterating the live list skips entries.

Every path that adds URLs (an API, an importer, an extension) needs the same rules, or a later save won't match an earlier one.
