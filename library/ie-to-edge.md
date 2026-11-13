---
title: 'Send Internet Explorer users to Edge with microsoft-edge:'
type: note
topic: html
added: 2021-12-03
tags: [html, internet-explorer, edge]
---

On Windows, a link with the `microsoft-edge:` scheme opens the URL after it in Edge. An app that didn't support Internet Explorer sent IE users to a fallback page with a button that reopened it in Edge:

```js
if (/MSIE|Trident/.test(navigator.userAgent)) {
    location.href = 'ie.html';
}
```

```js
document.querySelector('#launch').href = 'microsoft-edge:' + location.href.replace('ie.html', 'app.html');
```

An earlier attempt launched Chrome through ActiveX's `WScript.Shell`. It stopped working after the network moved to a new domain.

Microsoft retired Internet Explorer in 2022.
