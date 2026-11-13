---
title: Jest needs a Node flag for native ES modules
type: tip
topic: tooling
added: 2022-07-29
tags: [jest, node, testing]
---

Jest runs tests as CommonJS. To test code written as native ES modules (`"type": "module"`) without a transform, run Jest through Node with the VM modules flag:

```json
{
    "scripts": {
        "test": "node --experimental-vm-modules node_modules/jest/bin/jest.js"
    }
}
```

Without it, the first `import` fails with `Cannot use import statement outside a module`. The flag prints an experimental warning on every run.

Vitest and Node's built-in `node --test` run ES modules without a flag.
