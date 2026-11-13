---
title: Check for the client with useSyncExternalStore
type: technique
topic: react
added: 2026-09-25
tags: [react, ssr]
---

Values that differ between server and browser, like random numbers or the current time, cause hydration mismatches. The usual fix is a `mounted` flag set in `useEffect`, which costs an extra render.

`useSyncExternalStore` takes a server snapshot and a client snapshot. React uses the server one on the server and during hydration, then switches to the client one. Nothing changes, so `subscribe` is a no-op.

```ts
import { useSyncExternalStore } from 'react';

function subscribe() {
    return () => {};
}

export function useIsClient() {
    return useSyncExternalStore(
        subscribe,
        () => true,
        () => false,
    );
}
```

Render a placeholder while `useIsClient()` is `false`. It also avoids lint rules that flag `setState` inside an effect.
