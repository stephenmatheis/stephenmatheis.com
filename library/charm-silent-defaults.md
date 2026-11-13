---
title: Two Charm defaults that fail silently
type: note
topic: go
added: 2026-07-28
tags: [go, charm]
---

`charmbracelet/log` defaults to `InfoLevel`. `Debug` calls are dropped with no error, so they look broken until the level is set:

```go
logger := log.NewWithOptions(w, log.Options{
    Level: log.DebugLevel,
})
```

`huh.Form` has no Escape binding. Its quit key is `ctrl+c`, so a form embedded in a larger Bubble Tea app keeps focus with no way back out short of quitting. Handle Escape before passing the message to the form:

```go
if key, ok := msg.(tea.KeyMsg); ok && key.String() == "esc" && form.State == huh.StateNormal {
    form.State = huh.StateAborted
    return m, nil
}
```
