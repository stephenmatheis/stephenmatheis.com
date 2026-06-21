# TUI System — Architecture & Flow

Canvas-based terminal UI. No DOM widgets — everything is characters written into a `string[][]` grid and painted with `ctx.fillText`.

---

## File Map

```
lib/editor/
  tui.ts       — component constructors (Box, Text, Textarea, Input) and compose()
  editor.ts    — Editor() closure: state, buffer layers, modal/float, draw()
  setup.ts     — Canvas() — canvas sizing and the layout callback
  render.ts    — render() — paints the display buffers to the canvas
  keyboard.ts  — Keyboard() — all keydown handling
  mouse.ts     — MouseHandlers() — click, drag, select
  buffer.ts    — Buffer() — writeChar, deleteChar, handleEnter
  cursor.ts    — Cursor() — moveCursor and all jump/word/line/doc variants
  history.ts   — History() — snapshot, undo, redo
  selection.ts — Selection() — mouse and keyboard range selection
  index.ts     — public re-exports
```

---

## 1. Initialization

```
Editor({ canvas, textarea, container })
  │
  ├─ create EditorState (all fields zero/empty)
  │    chars: [][]           ← active write target
  │    displayChars: [][]    ← what render reads
  │    cellStyles: [][]      ← active style target
  │    displayCellStyles: [][] ← what render reads for styles
  │    regions: []           ← focusable areas
  │    activeRegion          ← currently focused region
  │    cursor: { x, y }
  │    ...selection, history, flags
  │
  ├─ create subsystems (all receive state + action callbacks)
  │    Cursor(state)
  │    Buffer({ state, moveCursor })
  │    Selection(state)
  │    History({ state, draw, clearSelection })
  │    Keyboard({ state, draw, cursor, buffer, history,
  │               selection, focus, inputActions,
  │               modalActions, floatActions })
  │    MouseHandlers({ canvas, textarea, state, actions })
  │
  ├─ Canvas({ canvas, ctx, state, draw, layout })
  │    └─ setSize() → setupCanvas()
  │         ├─ measure cell size from CSS font vars
  │         ├─ resize canvas element (DPR-aware)
  │         ├─ allocate state.chars and state.cellStyles grids
  │         └─ call layout(chars)  ← editor.ts layout callback
  │
  └─ attach event listeners (mousedown/move/up, keydown, resize)
```

---

## 2. Component Model (tui.ts)

Four node kinds. All are plain objects assignable to `LayoutNode`.

```
LayoutNode
  ├─ BoxNode      { kind:'box', children, border, flex, padding, … }
  │    └─ pure layout container — draws border, recurses into children
  │
  ├─ TextNode     { kind:'text', content, align, … }
  │    └─ static leaf — writes content string into chars at its position
  │
  ├─ TextareaNode { kind:'textarea', border, title, … }
  │    └─ free-typing leaf — draws border, pushes one Region
  │
  └─ InputNode    { kind:'input', placeholder, background, … }
       └─ single-line leaf — draws optional border, pushes one Region,
          wires ref.chars and ref.region for event reading

Input() returns InputHandle (superset of InputNode):
  .on('input' | 'change' | 'enter', cb)  ← non-enumerable, safe to spread
  .value (get/set)                        ← reads/writes chars via ref

INPUT_ID symbol key is enumerable so it survives { ...node } spreads
in the flex layout loop — that's how the registry lookup works on
positional copies.
```

---

## 3. compose() — Building the Char Buffer

```
compose(rootNode, chars[][])
  │
  └─ composeNode(node, chars, regions[])   ← recursive
       │
       ├─ kind:'text'
       │    └─ writeText() → chars[y][x..] = content chars
       │
       ├─ kind:'textarea'
       │    ├─ drawBorder() if border
       │    └─ regions.push({ innerX, innerY, innerW, innerH })
       │
       ├─ kind:'input'
       │    ├─ drawBorder() if border
       │    ├─ regions.push(region)
       │    └─ ref.chars = chars, ref.region = region  ← wires read/write
       │
       └─ kind:'box'
            ├─ drawBorder() if border
            └─ flex layout loop:
                 ├─ compute fixed sizes (width/height on non-flex children)
                 ├─ distribute remaining space to flex children
                 └─ recurse: composeNode({ ...child, x, y, width, height }, …)
                              ↑ spread assigns position — INPUT_ID copies with it

returns Region[]  (used as state.regions)
```

---

## 4. Buffer Layers

Three parallel grids. When no overlay is active, the first two are the **same object** (zero compositing overhead).

```
┌─────────────────────────────────────────────────────────────┐
│                      mainChars                              │
│  The permanent main-layout buffer. compose() always         │
│  writes here. composeStatusBar() always writes here.        │
│  Never touched by modal or float operations.                │
└───────────────────────────┬─────────────────────────────────┘
                            │
          no overlay        │         modal open
          ┌─────────────────┴─────────────────────┐
          │                                       │
          ▼                                       ▼
   state.chars = mainChars              state.chars = modalChars
   (same reference)                     (fresh grid, redirected
                                         in showModal)

┌─────────────────────────────────────────────────────────────┐
│                    floatChars  (nullable)                   │
│  Separate grid allocated by showFloat(). compose() writes   │
│  the float node here. state.chars is NOT redirected —       │
│  main layout stays the active write target.                 │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                   state.displayChars                        │
│  What render() reads. Points to mainChars when no overlay   │
│  is active. Becomes a separate composite grid when any      │
│  overlay is open (compositeChars() fills it each draw).     │
└─────────────────────────────────────────────────────────────┘

Same three-layer pattern mirrors in cellStyles:
  mainCellStyles / state.cellStyles / state.displayCellStyles
```

---

## 5. The draw() Cycle

Called after every state mutation (keystroke, focus change, mouse click, overlay open/close, resize).

```
draw()
  │
  ├─ applyInputOverlays()
  │    └─ for each (region, inputNode) in inputMap:
  │         reads ref value, writes CellStyle { bg, placeholder }
  │         into state.cellStyles (the active style layer)
  │         → main styles go into mainCellStyles when no modal
  │         → modal styles go into state.cellStyles (modal layer)
  │
  ├─ composeStatusBar(config, state, mainChars)   [if configured]
  │    └─ always writes to mainChars, never to state.chars
  │       so the status bar lives in the base layer regardless
  │       of overlay state
  │
  ├─ if (currentModal || currentFloat)
  │    ├─ compositeChars()     ← merge layers → state.displayChars
  │    └─ compositeStyles()    ← merge layers → state.displayCellStyles
  │
  └─ render(ctx, state)
       └─ for each cell (row, col):
            char      = state.displayChars[row][col]
            cellStyle = state.displayCellStyles[row][col]
            ├─ fill bg rect if cellStyle.bg
            ├─ fill cursor or selection rect
            ├─ fillText(char) if char present
            └─ fillText(placeholder) if empty and cellStyle.placeholder
```

---

## 6. Compositing (Three-Layer Merge)

```
compositeChars() / compositeStyles()

For each cell (r, c):

  inModal = modalRect && cell is inside modalRect
  inFloat = floatRect && cell is inside floatRect

  ┌──────────┬────────────────────────────────────────────────┐
  │ inModal  │ read from state.chars (= modalChars)           │
  ├──────────┼────────────────────────────────────────────────┤
  │ inFloat  │ read from floatChars                           │
  │ (not     │ cellStyle = null (floats have no style layer   │
  │  modal)  │   in v1 — no input backgrounds in floats)      │
  ├──────────┼────────────────────────────────────────────────┤
  │ neither  │ read from mainChars / mainCellStyles            │
  └──────────┴────────────────────────────────────────────────┘

Empty cells inside a bounding rect never backfill from a lower
layer — the rect acts as a hard clip. That's what prevents main
chars from bleeding through an empty modal interior.

Layer priority (highest → lowest):
  modal (state.chars) → float (floatChars) → main (mainChars)
```

---

## 7. Modal Flow

Focus-trapping overlay. Redirects the active write layer so keystrokes go to the modal, not the main layout.

```
editor.modal.show(node)
  │
  ├─ save: savedRegions, savedRegionIndex
  ├─ snapshot mainCellStyles (run applyInputOverlays into a fresh grid
  │   before swapping inputMap — captures current placeholder/bg state)
  ├─ mainChars = state.chars          ← save main write layer
  ├─ state.chars = createGrid('')     ← fresh modal write layer
  ├─ state.cellStyles = createGrid(null)
  ├─ state.displayChars = createGrid('')    ← composite output
  ├─ state.displayCellStyles = createGrid(null)
  ├─ positionModal() → centers on canvas, returns { positioned, x,y,w,h }
  ├─ modalRect = { x, y, w, h }
  ├─ compose(positioned, state.chars) → modalRegions
  ├─ state.regions = modalRegions      ← Tab now cycles modal regions only
  ├─ inputMap.clear() + collectInputs(positioned)
  └─ focusRegion(0) → draw()

editor.modal.hide()
  │
  ├─ currentModal = null, modalRect = null
  ├─ state.chars = mainChars           ← restore write layer
  ├─ state.cellStyles = mainCellStyles
  ├─ if no float open:
  │    state.displayChars = mainChars  ← back to same-object fast path
  │    state.displayCellStyles = mainCellStyles
  ├─ state.regions = savedRegions      ← restore main Tab order
  ├─ inputMap.clear() + collectInputs(currentNode)
  └─ focusRegion(savedRegionIndex) → draw()
```

---

## 8. Float Flow

Non-trapping overlay. Does NOT redirect `state.chars` — main layout stays fully interactive underneath.

```
editor.float.show(node, anchor?)
  │
  ├─ currentFloat = node
  ├─ mainCellStyles = state.cellStyles   ← capture before allocating composite
  │                                        (mainCellStyles starts as [] — only set
  │                                         in modal path — so this ensures
  │                                         compositeStyles has valid data)
  ├─ floatChars = createGrid('')
  ├─ positionFloat(node, anchor) → { positioned, x,y,w,h }
  │    anchor types:
  │      'absolute'  → x, y directly
  │      'cell'      → offset from a cell position (above/below/left/right)
  │      'corner'    → canvas corner + optional px offset
  │    all results clamped to canvas bounds
  ├─ floatRect = { x, y, w, h }
  ├─ compose(positioned, floatChars)   ← float node written to its own buffer
  ├─ if state.displayChars === mainChars:
  │    allocate separate displayChars + displayCellStyles grids
  │    (no-op if modal already did this)
  └─ draw()

editor.float.hide()          also: Escape key, click-outside
  │
  └─ clearFloat()            ← state teardown only, no draw
       ├─ currentFloat = null, floatChars = null, floatRect = null
       └─ if no modal: displayChars = mainChars (restore fast path)
     draw()

click-outside-to-dismiss (mouse.ts handleMouseDown):
  dismissFloatIfOutside(cell) → boolean
    ├─ if float open AND cell outside floatRect: clearFloat(), return true
    └─ else: return false

  handleMouseDown:
    floatDismissed = dismissFloatIfOutside(cell)
    if !focusAtCell(cell):
      if floatDismissed: draw()   ← no other draw would run on early return
      return
    … normal focus/select/draw path
```

---

## 9. Layout Resize

On every window resize, `setSize()` reallocates `state.chars` and `state.cellStyles` to new dimensions, then fires the `layout(chars)` callback.

```
setSize() → setupCanvas() → layout(chars)
  │
  ├─ if modal open:
  │    rebuild mainChars at new size
  │    re-run applyLayout(currentNode, mainChars)   ← main stays composed
  │    snapshot fresh mainCellStyles
  │    allocate new modal write layer (state.chars, state.cellStyles)
  │    state.displayChars = chars   ← fresh grid from setup = composite output
  │    reposition + recompose modal at new canvas center
  │    if float also open: recompose float at new position
  │
  ├─ if no modal:
  │    mainChars = chars
  │    applyLayout(currentNode, mainChars)
  │    if float open:
  │      allocate fresh displayChars + displayCellStyles grids
  │      recompose float at new position
  │    else:
  │      displayChars = chars   ← same-object fast path
  │      displayCellStyles = state.cellStyles
  │
  └─ draw()
```

---

## 10. Input Event System

```
Input() call
  ├─ allocate InputRef in module-level inputRegistry (keyed by numeric id)
  └─ return InputHandle with:
       .on(event, cb) → stores cb in ref.handlers[event]
       .value (get)   → reads from ref.chars at ref.region
       .value (set)   → writes into ref.chars at ref.region, calls ref.draw()

collectInputs(node) — called after every compose
  └─ walks the composed node tree, for each InputNode:
       ref.draw = draw
       inputMap.set(ref.region, node)   ← region → node lookup

Events fired by Keyboard:
  'input'  → emitted on every printable keydown (after writeChar)
  'enter'  → emitted on Enter
  'change' → emitted when focus leaves a field AND value has changed
             (focusNext / focusPrev / Enter all call checkAndEmitChange)

emitInputEvent(event):
  → getActiveInput() via inputMap.get(state.activeRegion)
  → readInputValue(ref) — reads chars[region.y][region.x..x+width].trimEnd()
  → ref.handlers[event]?.(value)
```

---

## 11. Keyboard & Mouse

```
Keyboard handleKeyDown(event)
  │
  ├─ Cmd/Ctrl shortcuts (select-all, copy, paste, cut, undo, redo) → return early
  │
  ├─ Arrow keys  → cursor.moveCursor / wordJump / lineJump / docJump
  │                 wrapped in selection.withSelection (Shift extends selection)
  ├─ Tab         → focusNext / focusPrev  (checkAndEmitChange first)
  ├─ Enter       → emitEvent('enter') + checkAndEmitChange  (if Input)
  │                 buffer.handleEnter  (if Textarea)
  ├─ Backspace   → buffer.deleteChar  (or clear selection)
  ├─ Escape      → modalActions.dismiss()  if modal open
  │                floatActions.dismiss()  else if float open
  └─ printable   → history.snapshot, buffer.writeChar, emitEvent('input')
  └─ draw()

MouseHandlers handleMouseDown(event)
  │
  ├─ pixelToCell(clientX, clientY) → { x, y } cell coords
  ├─ dismissFloatIfOutside(cell) → bool  (clearFloat if outside floatRect)
  ├─ focusAtCell(x, y) → find region containing cell
  │    false → if float was dismissed draw(); return early
  ├─ state.cursor = cell
  ├─ state.isDragging = true
  ├─ selection.startMouseSelection(cell)
  ├─ textarea.focus()
  └─ draw()

handleMouseMove → extendMouseSelection if dragging
handleMouseUp   → endMouseSelection
```

---

## 12. Full render() Cycle Summary

```
Window resize / keydown / mousedown / overlay open/close
  │
  └─ draw()
       │
       ├─ applyInputOverlays()
       │    → state.cellStyles[y][x] = { bg, placeholder } per Input region
       │
       ├─ composeStatusBar(mainChars)   [if configured]
       │    → mainChars[lastRow][x] = status text chars
       │
       ├─ compositeChars() + compositeStyles()   [if overlay active]
       │    → state.displayChars[r][c]      = modal | float | main char
       │    → state.displayCellStyles[r][c] = modal | null  | main style
       │
       └─ render(ctx, state)
            → ctx.clearRect(full canvas)
            → for each cell:
                 fill bg (cellStyle.bg or inputBg default)
                 fill cursor / selection highlight
                 fillText(char)  or  fillText(placeholder, placeholderColor)
```
