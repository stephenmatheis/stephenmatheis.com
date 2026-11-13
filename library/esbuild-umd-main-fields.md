---
title: Prefer the module field when esbuild bundles for Node
type: tip
topic: tooling
added: 2026-09-01
tags: [esbuild, build]
---

With `platform: "node"`, esbuild resolves a package's `main` field before `module`. Some packages point `main` at a UMD build that calls its factory with a bound `require`, which esbuild can't follow statically. The inner `require("./impl/format")` is left in the bundle as a runtime call against the output folder and fails at load with "Cannot find module".

`jsonc-parser` is one. Prefer the ESM entry instead:

```js
await esbuild.build({
    entryPoints: ['src/extension.ts'],
    bundle: true,
    platform: 'node',
    format: 'cjs',
    mainFields: ['module', 'main'],
});
```

To check, search the bundle for relative `require("./` calls. There should be none.
