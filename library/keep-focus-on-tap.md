---
title: Keep focus and the iPhone keyboard when a button is tapped
type: tip
topic: 'safari & ios'
added: 2026-11-08
tags: [ios, focus]
---

Tapping a button moves focus to it, so the field being typed in loses focus and the on-screen keyboard closes. Cancelling `pointerdown` isn't enough in Safari on an iPhone. It still moves focus on a tap unless `mousedown` is cancelled too.

```ts
import type { SyntheticEvent } from 'react';

function prevent(event: SyntheticEvent) {
    event.preventDefault();
}

export const keepFocus = { onPointerDown: prevent, onMouseDown: prevent };
```

Spread it on anything tapped while typing, such as suggestion rows or extra keys shown over the keyboard:

```tsx
<button type="button" {...keepFocus} onClick={() => insert(text)}>
    {text}
</button>
```

`click` still fires, so the button works as usual.
