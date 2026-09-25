import { useSyncExternalStore } from 'react';

/**
 * True in the browser, false while rendering on the server (and during the
 * very first render in the browser, while React hydrates the server's HTML).
 *
 * This is for things that must never be rendered on the server, like random
 * numbers or the current time. The server and the browser would produce
 * different values, and React would complain that the page it hydrated
 * doesn't match the HTML it received.
 *
 * The usual trick is `useEffect(() => setMounted(true), [])`, but that renders
 * twice for no reason. `useSyncExternalStore` takes two snapshot functions:
 * one for the server (and hydration), one for the browser. React uses the
 * server one while hydrating, then switches to the browser one, without an
 * extra effect. There's nothing to subscribe to, so `subscribe` does nothing.
 */
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
