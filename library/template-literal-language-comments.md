---
title: Highlight HTML and CSS inside template literals with a comment
type: tip
topic: tooling
added: 2020-02-16
tags: [javascript, editor, vscode]
---

A comment naming the language before a template literal lets an editor extension highlight what's inside it:

```js
const markup = /*html*/ `
    <div class="card">${title}</div>
`;

const styles = /*css*/ `
    .card {
        padding: 1rem;
    }
`;
```

In VS Code, the es6-string-html extension reads these comments. The comment has no effect at runtime, so it works in plain JavaScript with no build step.

Formatters may not format the embedded code the way a tagged template like `html` or `css` from a library gets formatted.
