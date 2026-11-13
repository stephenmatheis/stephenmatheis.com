---
title: Pick sentinels that agree with Go's zero value
type: tip
topic: go
added: 2026-07-28
tags: [go, rust]
---

Porting a Rust `Option<i32>` to a plain Go `int` means choosing a sentinel for `None`. If the sentinel isn't the zero value, every struct literal that omits the field gets the zero value's meaning instead.

In Rust, `ttl: None` meant "lives forever" and `Some(0)` meant expired. The Go port used `-1` for forever, with this check:

```go
func (e Entity) Alive() bool {
    return e.HP > 0 && e.TTL != 0
}
```

Any `Entity{...}` that left out `TTL` got `TTL: 0` and was dead on arrival. It compiled and looked correct.

Either set the sentinel explicitly at every construction site, or flip the encoding so zero is the safe default (for example, `0` = infinite and a separate countdown for finite lifetimes). A `*int` also works when `nil` should mean "unset".
