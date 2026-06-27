# Editor Architecture

## 1. Initialization (`Editor()`)

```
Editor({ canvas, textarea, container })
│
├── Create shared state object (EditorState)
│   ├── Geometry: cellWidth, cellHeight, cols, rows
│   ├── Layers: mainLayer, activeLayer, displayLayer (all null/empty at first)
│   ├── Cursor: { x:0, y:0 }, cursorVisible
│   ├── Regions: regions[], activeRegion
│   ├── Selection: selected, selectionAnchor, keyboardAnchor
│   └── History: undoStack[], redoStack[]
│
├── Instantiate modules (in dependency order)
│   ├── Theme          — reads CSS vars, resolves color palette
│   ├── Focus          — region navigation, input registry
│   ├── Layers         — modal/float layer lifecycle
│   ├── CanvasRenderTarget + Renderer — painting backend
│   ├── Cursor         — separate canvas overlay for the blinking block
│   ├── Buffer         — writeChar / deleteChar / handleEnter
│   ├── Selection      — selection range logic
│   ├── History        — undo/redo stacks
│   ├── Keyboard       — keydown handler (wired to <textarea>)
│   ├── Mouse          — mousedown/move/up (wired to container)
│   └── ResponsiveCanvas — font measurement, grid sizing, resize listener
│
├── mouse.add() / keyboard.add() / responsiveCanvas.add()
│   └── ResponsiveCanvas immediately calls setSize() on construction
│       └── → setupCanvas() → layout() → layers.handleLayout(null)
│
└── cursor.render() + textarea.focus()
```

---

## 2. Setting Content (`editor.root.set(node)`)

This is the entry point for putting anything on screen.

```
editor.root.set(layoutNode)
│
└── rebuildMainContent(node, mainLayer)
    │
    ├── compose(node, mainLayer.chars)  ← tui.ts
    │   └── composeNode() recurses the LayoutNode tree
    │       ├── Box     → drawBorder() into chars[], then recurse children
    │       │             with flex layout if flexDirection is set
    │       ├── Text    → writeText() chars into grid
    │       │             if content is a function, registers a DynamicText closure
    │       ├── Textarea → drawBorder() + push Region to regions[]
    │       └── Input   → drawBorder() + push Region + link ref.chars / ref.region
    │
    ├── state.regions = regions      (all focusable areas)
    ├── state.activeRegion = regions[0]
    ├── dynamicTextRedraw = closure  (calls all dynamic getters each frame)
    │
    └── focus.collectInputs(node)    ← focus.ts
        └── walks tree, adds every Input node to inputMap: Map<Region, InputNode>
            and sets ref.requestRender so .value setter can trigger repaints

→ requestRender()
```

---

## 3. The Render Pipeline (every frame)

`requestRender()` is the single entry point from every module. It deduplicates via `requestAnimationFrame`.

```
requestRender()
└── schedules flushRenderPipeline() via RAF (no-op if already scheduled)

flushRenderPipeline()
│
├── Phase 1a: layers.applyInputOverlays(activeLayer)
│   └── For each Input in inputMap:
│       writes cellStyles (bg color, placeholder text) into the active layer
│       — keeps input backgrounds/placeholders in sync without touching chars
│
├── Phase 1b: dynamicTextRedraw?.()
│   └── Calls every dynamic Text getter, writes result back into chars grid
│
├── Phase 2: layers.compositeIntoDisplay()   ← only if modal or float is open
│   └── Uses pre-built layerOwnership Uint8Array bitmap to pick source layer
│       per cell: 0=main, 1=float, 2=modal (modal wins overlaps)
│       Writes into state.displayLayer
│
├── Phase 3: renderer.render(state, theme)
│   ├── computeDirtyRows() — diffs current displayLayer against prevChars/prevStyles
│   │   Null = full repaint; Set<number> = only changed rows
│   ├── target.beginFrame()
│   ├── For each dirty row/cell:
│   │   Resolves foreground, background, gridColor per cell
│   │   (checks: isSelected, isRegionBorder, isPlaceholder)
│   │   → target.paintCell(col, row, RenderedCell)
│   ├── target.endFrame()
│   └── snapshotState() — saves prevChars for next diff
│
├── Phase 4: cursor.render()
│   └── Positions a separate <canvas> overlay over state.cursor {x,y}
│       Draws a filled block in foreground color, then the char in bg color
│       (Separate canvas = cursor can animate via CSS without repainting main canvas)
│
└── Phase 5: editorEvents.afterRender?.()
    └── External hook — used by consumers to update UI (line/col counters, etc.)
```

---

## 4. Keyboard Events

```
keydown on <textarea>
└── Keyboard.handleKeyDown(event)
    │
    ├── Cmd/Ctrl shortcuts (no preventDefault on movement keys)
    │   ├── Cmd+A → selection.selectAll()
    │   ├── Cmd+C → clipboard.writeText(getSelectedText())
    │   ├── Cmd+V → clipboard.readText() → history.snapshot() + buffer.writeChar() per char
    │   ├── Cmd+X → clipboard copy + history.snapshot() + clearSelected() + cursor.jumpTo()
    │   └── Cmd+Z / Cmd+Shift+Z → history.undo() / history.redo()
    │
    ├── Movement keys (arrows, Home, End)
    │   └── selection.withSelection(cursorFn, extending)
    │       If extending (Shift held): sets/extends keyboardAnchor → state.selected
    │       If not extending: clears keyboardAnchor and selected, then moves
    │       Cursor functions: moveCursor(dx,dy), wordJumpLeft/Right, lineStart/End, regionStart/End
    │
    ├── Enter
    │   ├── If active Input → inputActions.emitEvent('enter') + emitChangeIfChanged()
    │   └── Else → buffer.handleEnter()  (moves cursor to start of next line)
    │
    ├── Tab / Shift+Tab → focus.focusNext() / focus.focusPrev()
    │
    ├── Backspace
    │   ├── history.snapshot()
    │   ├── If selected → clearSelected() + cursor.jumpTo(start)
    │   └── Else → buffer.deleteChar()
    │
    ├── Escape → layers.hideModal() or layers.hideFloat()
    │
    └── Printable char (key.length === 1)
        ├── history.snapshot()
        ├── selection.clearSelection()
        ├── buffer.writeChar(char)   → writes to activeLayer.chars[y][x], moves cursor
        └── inputActions.emitEvent('input')   → fires Input's 'input' handler

→ requestRender()
```

---

## 5. Mouse Events

```
mousedown
├── pixelToCell(clientX, clientY) → cell {x, y}
├── layers.dismissFloatIfOutside(cell)  (closes float if click is outside)
├── focus.focusAtCell(x, y)
│   ├── focus.checkAndEmitChange()  (emit 'change' on previously focused Input)
│   ├── Find region containing (x,y) in state.regions
│   ├── state.activeRegion = that region
│   └── state.cursor = clicked cell (or endOfContent if cell is empty)
├── state.isDragging = true
├── selection.startMouseSelection(cursor)  (sets selectionAnchor, clears selected)
└── requestRender()

mousemove (while isDragging)
├── pixelToCell() → clamp to activeRegion bounds
├── Clamp to endOfContent (can't select past real content)
├── cursor.jumpTo(cell)
├── selection.extendMouseSelection(cell)  (state.selected = anchor..cell)
└── requestRender()

mouseup
└── selection.endMouseSelection()  (clears selectionAnchor, keeps state.selected)
```

---

## 6. Layer System (Modal & Float)

```
Normal state:
  activeLayer  → mainLayer  (Buffer writes here)
  displayLayer → mainLayer  (Renderer reads here — same object, no allocation)

editor.modal.show(node)
├── layers.showModal(node)
│   ├── Save current regions + activeRegion index
│   ├── applyInputOverlays(mainLayer)  — freeze main input styles
│   ├── state.modalLayer = createLayer()
│   ├── state.activeLayer = modalLayer    ← redirect all writes
│   ├── state.displayLayer = createLayer() ← compositor target
│   ├── positionModal() → center on screen
│   ├── compose(positioned, modalLayer.chars)  → modal regions
│   ├── focus.collectInputs(positioned)
│   └── focus.focusRegion(0)
└── requestRender()

editor.modal.hide()
├── layers.hideModal(currentNode)
│   ├── state.modalLayer = null
│   ├── state.activeLayer = mainLayer     ← restore writes to main
│   ├── state.displayLayer = mainLayer    ← no composite needed
│   ├── state.regions = savedRegions
│   ├── focus.collectInputs(currentNode)  — re-register main inputs
│   └── focus.focusRegion(savedIndex)
└── requestRender()

editor.float.show(node, anchor?)
├── layers.showFloat(node, anchor)
│   ├── state.floatLayer = createLayer()
│   ├── positionFloat() — absolute / cell-relative / corner anchor
│   ├── compose(positioned, floatLayer.chars)
│   ├── state.displayLayer = createLayer()  (only if not already composited)
│   └── rebuildOwnership()  — rebuilds Uint8Array bitmap
│   Note: float does NOT redirect activeLayer — focus stays on main/modal
└── requestRender()
```

---

## 7. Resize

```
window 'resize'
└── responsiveCanvas.setSize()
    ├── setupCanvas()
    │   ├── Re-read CSS vars (font family, size)
    │   ├── measureText('M') → cellWidth, cellHeight
    │   ├── Compute cols = floor(innerWidth / cellWidth) - 4
    │   │           rows = floor(innerHeight / cellHeight) - 2
    │   ├── Resize canvas element + set DPR transform
    │   └── Allocate fresh mainLayer (rows × cols grids of '' and null)
    │       state.mainLayer = state.activeLayer = state.displayLayer = freshLayer
    │
    ├── onResize()
    │   ├── theme.refresh()         (re-read CSS color vars)
    │   └── renderer.invalidateAll()  (force full repaint next frame)
    │
    └── layout() → layers.handleLayout(currentNode)
        ├── If modal open: rebuild main + modal at new size, reposition modal
        └── Else: rebuildMainContent(currentNode, mainLayer)
                  + rebuild float if open

→ requestRender()
```

---

## 8. Input Widget Lifecycle

```
// Setup (in consumer code)
const nameInput = Input({ width: 20, placeholder: 'Name' })
    .on('input', val => ...)
    .on('change', val => ...)
    .on('enter', val => ...)

editor.root.set(Box({}, nameInput))
│
└── compose() registers:
    ├── ref.chars = mainLayer.chars    (direct pointer into the grid)
    ├── ref.region = { x, y, width, height }
    └── inputMap.set(region, node)

// Reading value (any time)
nameInput.value
└── reads ref.chars[ref.region.y].slice(x, x+width).join('').trimEnd()

// Writing value programmatically
nameInput.value = 'hello'
└── clears region cells, writes chars into grid, calls ref.requestRender()

// Event flow on keypress (printable char)
buffer.writeChar(char)           → writes to chars grid
inputActions.emitEvent('input')  → fires .on('input', handler)

// Event flow on Tab / blur
focus.checkAndEmitChange()
└── if value !== valueOnFocus → fires .on('change', handler), updates valueOnFocus

// Event flow on Enter
inputActions.emitEvent('enter')  → fires .on('enter', handler)
inputActions.emitChangeIfChanged()
```

---

## Key Invariants

**State is shared by mutation.** All modules hold a reference to the same `state` object. There's no message passing — modules read and write `state` directly, then call `requestRender()`.

**`activeLayer` is the write target.** `Buffer`, `History`, and `Input.value` all write to `state.activeLayer.chars`. During a modal, `activeLayer` points at `modalLayer` instead of `mainLayer`. Never write to `mainLayer.chars` directly.

**`displayLayer` is the read target.** The `Renderer` only reads `state.displayLayer`. During compositing it's a separate merged buffer; otherwise it aliases `mainLayer`.

**Regions are the focus unit.** Every focusable area (Textarea, Input) gets a `Region`. The cursor is always clamped to `state.activeRegion`'s bounds. `inputMap` links regions to Input nodes; Textarea regions have no entry there.

**`requestRender()` is the only way to trigger a repaint.** Modules never call `flushRenderPipeline()` directly.
