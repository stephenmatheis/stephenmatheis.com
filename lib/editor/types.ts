import type { Region } from '@/lib/editor/tui';

// ===== Public types =====

export type CellStyle = {
    bg?: string | null;
    placeholder?: string;
};

export type CellPos = {
    x: number;
    y: number;
};

export type Selected = {
    start: CellPos;
    end: CellPos;
    rect?: boolean;
    bounds?: { x: number; width: number };
};

export type FloatAnchor =
    | { type: 'absolute'; x: number; y: number }
    | { type: 'cell'; cell: CellPos; side: 'below' | 'above' | 'right' | 'left' }
    | {
          type: 'corner';
          corner: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
          offsetX?: number;
          offsetY?: number;
      };

// ===== Internal types =====

export type Snapshot = {
    chars: string[][];
    cursor: CellPos;
};

// ===== Layer =====
// A Layer bundles the two grids that always travel together.
// Grouping them makes the write target explicit: readers see `state.activeLayer.chars`
// and know immediately which buffer is receiving keystrokes.

export type Layer = {
    chars: string[][];
    cellStyles: Array<Array<CellStyle | null>>;
};

// ===== EditorState slices =====
// Each slice documents the fields a specific module owns and is responsible for.

export type GeometryState = {
    cellWidth: number;
    cellHeight: number;
    fontStr: string;
    cols: number;
    rows: number;
};

// LayerContent replaces the old flat ContentState fields (chars, displayChars,
// cellStyles, displayCellStyles). Named layers make the write-target redirect
// that used to happen silently in layers.ts visible in the state itself.
export type LayerContent = {
    mainLayer: Layer;

    // Non-null while a modal is open. Becomes activeLayer during that period.
    modalLayer: Layer | null;

    // Non-null while a float overlay is visible. Does not take over activeLayer —
    // floats are read-only overlays composed into displayLayer.
    floatLayer: Layer | null;

    // The active write target. Equals mainLayer in normal operation;
    // equals modalLayer while a modal is open.
    // All writes (buffer, cursor, history) go through activeLayer.chars.
    activeLayer: Layer;

    // The composited output the renderer reads.
    // Aliases mainLayer when no overlays are active (no allocation needed).
    // Points at a separate merged Layer when a modal or float is visible.
    displayLayer: Layer;
};

export type CursorState = {
    cursor: CellPos;
    cursorVisible: boolean;
};

// Three separate selection-state fields serve distinct lifecycles:
//   selected        — the rendered highlight; set by both keyboard and mouse paths, null when nothing is selected.
//   selectionAnchor — mouse-only; set on mousedown, cleared on mouseup.
//   keyboardAnchor  — keyboard-only; set on the first Shift+arrow, cleared by any non-extending move or Tab.
export type SelectionState = {
    selected: Selected | null;
    isDragging: boolean;
    selectionAnchor: CellPos | null;
    keyboardAnchor: CellPos | null;
};

export type RegionState = {
    regions: Region[];
    activeRegion: Region | null;
};

export type HistoryState = {
    undoStack: Snapshot[];
    redoStack: Snapshot[];
};

export type DisplayState = {
    showGrid: boolean;
};

// Theme
export type ThemeColors = {
    background: string;
    foreground: string;
    inputBg: string;
    placeholderColor: string;
    gridLine: string;
    activeRegionBorderColor: string;
};

// Full editor state — the intersection of all owned slices.
export type EditorState = GeometryState &
    LayerContent &
    CursorState &
    SelectionState &
    RegionState &
    HistoryState &
    DisplayState;
