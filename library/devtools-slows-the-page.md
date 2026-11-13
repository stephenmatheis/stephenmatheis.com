---
title: Open DevTools can make a page slow
type: tip
topic: tooling
added: 2022-02-06
tags: [chrome, devtools, performance]
---

Scrolling and resizing in a heavy editor component were slow only while DevTools was open. Closing DevTools fixed it.

DevTools adds work as the page runs, especially with the Elements panel open on a page that changes the DOM often. Before chasing a slowdown, check whether it happens with DevTools closed.
