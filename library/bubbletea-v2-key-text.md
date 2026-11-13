---
title: Read typed text from Key().Text in Bubble Tea v2
type: tip
topic: go
added: 2026-07-28
tags: [go, bubbletea]
---

In Bubble Tea v2, `msg.String()` on a key press returns the keystroke name for anything that isn't plain text. The space bar comes back as `"space"`, not `" "`. A text input built on `String()` with a `len(s) == 1` check drops every space, and since `len` counts bytes, it drops multi-byte characters too.

Use `msg.Key().Text`. It holds the printable characters for the key press and is empty for keys that don't produce text:

```go
case tea.KeyPressMsg:
    switch msg.String() {
    case "enter":
        // submit
    case "backspace":
        // delete
    default:
        if text := msg.Key().Text; text != "" {
            input.WriteString(text)
        }
    }
```

Keep `String()` for matching named keys like `"enter"` or `"ctrl+c"`.
