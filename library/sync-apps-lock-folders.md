---
title: File sync and antivirus apps cause EPERM in dev servers
type: tip
topic: tooling
added: 2022-02-06
tags: [node, windows, tooling]
---

A dev server that watches or renames files can fail with errors like:

```console
EPERM: operation not permitted, watch
EPERM: operation not permitted, rename './src/old-name' -> './src/new-name'
```

Antivirus and file sync apps, like OneDrive, iCloud Drive and Dropbox, lock folders while they scan or upload them. Pause them and retry, or keep projects outside synced folders.

A rename that failed partway can leave broken paths behind, so check imports after restarting.
