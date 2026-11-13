---
title: Don't encode "not an enemy" as hp 0
type: tip
topic: games
added: 2026-07-28
tags: [rust, gamedev]
---

A marker stored as an `Entity` with `hp: 0`, meant to never count as a live enemy, also fails the entity's own liveness check:

```rust
pub fn alive(&self) -> bool {
    self.hp > 0 && self.ttl != Some(0)
}
```

The next tick's cleanup removes it:

```rust
self.entities.retain(|e| e.alive());
```

A value that already means something to shared code can't also carry a second meaning. Give the object its own field instead:

```rust
pub station: Option<(f64, f64)>,
```

A test that ticks the simulation forward and asserts the outcome (the ship eventually docks) guards against this better than looking at the render, since the marker only existed for one tick.
