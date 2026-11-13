---
title: Vercel blocks deploys of vulnerable Next.js versions
type: tip
topic: tooling
added: 2026-09-22
tags: [vercel, nextjs]
---

Vercel refuses to deploy a known-vulnerable version of Next.js. The build runs and succeeds, then the deployment fails at "Deploying outputs". The same applies to other flagged packages, such as `next-mdx-remote`.

Old branches that deployed fine before start failing this way without any code change.

A patch bump within the same minor is usually enough, and avoids the breaking changes of a minor or major upgrade:

```sh
npm install next@15.5.26
```

Check the lockfile too. A `^15.5.0` range in `package.json` doesn't help if the lockfile still pins the vulnerable version.
