---
title: Bubble Tea recovers its own panics
type: tip
topic: go
added: 2026-07-28
tags: [go, bubbletea, wish]
---

`tea.Program.Run()` recovers panics from `Update` and `View` itself. It restores the terminal and returns an error wrapping `tea.ErrProgramPanic` instead of re-panicking.

In a Wish server, a panic inside the interactive Bubble Tea session never reaches `recover.Middleware`. That middleware only protects handlers with no recovery of their own, such as exec commands and custom middleware.

To let panics propagate to an outer recover, pass `tea.WithoutCatchPanics()` when creating the program.
