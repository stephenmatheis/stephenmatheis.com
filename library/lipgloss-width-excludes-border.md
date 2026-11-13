---
title: lipgloss Width and Height don't include the border
type: tip
topic: go
added: 2026-07-28
tags: [go, lipgloss]
---

In lipgloss v1, `Style.Width(n)` and `Style.Height(n)` size the block including padding but not the border or margins. A border adds two more columns and two more rows.

Passing the full available size to a bordered pane overshoots. Vertically, the top of the layout scrolls out of the alt-screen buffer. Horizontally, the right border wraps to the next line.

Subtract the border first:

```go
pane := lipgloss.NewStyle().Border(lipgloss.RoundedBorder())

pane.
    Width(width - pane.GetHorizontalBorderSize()).
    Height(height - pane.GetVerticalBorderSize()).
    Render(content)
```

Subtract margins too if the style has any. `GetHorizontalFrameSize` returns margins, padding and border together, which is more than needed here because padding already sits inside `Width`.
