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

export type StatusBar = {
    left?: string;
    center?: string;
    right?: string;
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

// ===== EditorState slices =====
// Each slice documents the fields a specific module owns and is responsible for.

export type GeometryState = {
    cellWidth: number;
    cellHeight: number;
    fontStr: string;
    cols: number;
    rows: number;
};

export type ContentState = {
    chars: string[][];
    displayChars: string[][];
    cellStyles: Array<Array<CellStyle | null>>;
    displayCellStyles: Array<Array<CellStyle | null>>;
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

// Full editor state — the intersection of all owned slices.
export type EditorState = GeometryState & ContentState & CursorState & SelectionState & RegionState & HistoryState;
