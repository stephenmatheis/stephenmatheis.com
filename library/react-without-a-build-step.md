---
title: React in a single HTML file with no build step
type: technique
topic: react
added: 2022-06-20
tags: [react, babel]
---

React's UMD builds and Babel Standalone run JSX in the browser, which fits a coding exercise or prototype that has to be one file:

```html
<script src="https://unpkg.com/react@17.0.2/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@17.0.2/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/@babel/standalone@7.13.12/babel.min.js"></script>

<div id="root"></div>

<script type="text/babel">
    function App() {
        return <h1>Hello</h1>;
    }

    ReactDOM.render(<App />, document.getElementById('root'));
</script>
```

Babel compiles in the browser on every load, so it's slow and not for production.

React 19 removed the UMD builds. With newer versions, use an import map pointing at an ES module CDN such as esm.sh, and write `React.createElement` or use htm instead of JSX.
