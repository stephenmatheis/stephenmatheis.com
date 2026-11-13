---
title: Override Vercel's framework detection in vercel.json
type: tip
topic: tooling
added: 2026-09-22
tags: [vercel]
---

Vercel picks a framework preset per project, which sets the build command and output directory. When one branch uses a different framework than the rest of the project, its builds use the wrong preset.

Set the framework for that branch in `vercel.json`:

```json
{
    "$schema": "https://openapi.vercel.sh/vercel.json",
    "framework": "react-router"
}
```

The file lives in the branch, so other branches keep the project's preset. `"framework": null` selects "Other" and uses the build and output settings as given.
