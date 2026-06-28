import { getInputRef, getTextareaRef } from '@/lib/editor/tui';
import type { InputEventName, InputNode, InputRef, LayoutNode, Region, TextareaNode } from '@/lib/editor/tui';
import type { CellPos, LayerContent, RegionState, CursorState } from './types';

export type FocusState = RegionState & CursorState & Pick<LayerContent, 'activeLayer'>;

// Logical cursor position within a scrollable buffer.
// For Input: single offset (position in the flat char array).
// For Textarea: row + col within the wrapped virtual grid.
export type LogicalCursorPos =
    | { kind: 'input'; offset: number }
    | { kind: 'textarea'; row: number; col: number }
    | { kind: 'free' };

// Pure utility — reads the current value of an Input from its buffer.
// Exported separately so other modules (e.g. applyInputOverlays) can use it without
// depending on the full Focus factory.
export function readInputValue(ref: InputRef): string {
    return ref.buffer.join('');
}

export function Focus({
    state,
    inputMap,
    textareaMap,
    requestRender,
}: {
    state: FocusState & RegionState;
    inputMap: Map<Region, InputNode>;
    textareaMap: Map<Region, TextareaNode>;
    requestRender: () => void;
}) {
    function getActiveInput(): InputNode | null {
        return state.activeRegion ? (inputMap.get(state.activeRegion) ?? null) : null;
    }

    // ===== Input event emission =====

    function emitInputEvent(event: InputEventName): void {
        const input = getActiveInput();

        if (!input) return;

        const ref = getInputRef(input);

        if (!ref) return;

        ref.handlers[event]?.(readInputValue(ref));
    }

    function checkAndEmitChange(): void {
        const input = getActiveInput();

        if (!input) return;

        const ref = getInputRef(input);

        if (!ref) return;

        const current = readInputValue(ref);

        if (current !== ref.valueOnFocus) {
            ref.handlers.change?.(current);
            ref.valueOnFocus = current;
        }
    }

    // ===== Focus navigation =====

    function endOfContent(): CellPos {
        if (!state.activeRegion) return { x: 0, y: 0 };

        const r = state.activeRegion;

        // Input: cursor is at r.x + min(buffer.length - scrollOffset, width - 1)
        const inputNode = inputMap.get(r);

        if (inputNode) {
            const ref = getInputRef(inputNode);

            if (ref) {
                const physicalOffset = ref.buffer.length - ref.scrollOffset;

                return {
                    x: r.x + Math.max(0, Math.min(physicalOffset, r.width - 1)),
                    y: r.y,
                };
            }
        }

        // Textarea: cursor is one past the last char, accounting for line wrapping and scroll
        const textareaNode = textareaMap.get(r);

        if (textareaNode) {
            const ref = getTextareaRef(textareaNode);

            if (ref) {
                const n = ref.buffer.length;
                const logicalRow = Math.floor(n / r.width);
                const logicalCol = n % r.width;
                const physicalRow = logicalRow - ref.scrollOffset;

                return {
                    x: r.x + Math.min(logicalCol, r.width - 1),
                    y: r.y + Math.max(0, Math.min(physicalRow, r.height - 1)),
                };
            }
        }

        // Free area (plain char grid): scan from bottom-right for last non-empty cell
        let cx = r.x;
        let cy = r.y;

        for (let row = r.y + r.height - 1; row >= r.y; row--) {
            const text = (state.activeLayer.chars[row] ?? [])
                .slice(r.x, r.x + r.width)
                .join('')
                .trimEnd();

            if (text.length > 0) {
                cx = Math.min(r.x + text.length, r.x + r.width - 1);
                cy = row;
                break;
            }
        }

        return { x: cx, y: cy };
    }

    function focusRegion(index: number): void {
        if (state.regions.length === 0) return;

        const i = ((index % state.regions.length) + state.regions.length) % state.regions.length;

        state.activeRegion = state.regions[i];
        const r = state.activeRegion;

        const inputNode = inputMap.get(r);

        if (inputNode) {
            const ref = getInputRef(inputNode);

            if (ref) ref.valueOnFocus = readInputValue(ref);
        }

        // For textareas, scroll so end of content is visible before placing cursor
        const textareaNode = textareaMap.get(r);

        if (textareaNode) {
            const ref = getTextareaRef(textareaNode);

            if (ref) {
                const totalLogicalRows = ref.buffer.length === 0 ? 0 : Math.ceil(ref.buffer.length / r.width);
                const maxScroll = Math.max(0, totalLogicalRows - r.height);

                ref.scrollOffset = Math.min(ref.scrollOffset, maxScroll);
            }
        }

        state.cursor = endOfContent();
    }

    function focusAtCell(x: number, y: number): boolean {
        checkAndEmitChange();

        const index = state.regions.findIndex((r) => x >= r.x && x < r.x + r.width && y >= r.y && y < r.y + r.height);

        if (index === -1) return false;

        state.activeRegion = state.regions[index];

        const inputNode = inputMap.get(state.activeRegion);

        if (inputNode) {
            const ref = getInputRef(inputNode);

            if (ref) ref.valueOnFocus = readInputValue(ref);
        }

        // For buffered regions the chars grid is the display, so clicking an empty cell
        // means clicking past the content — snap to endOfContent.
        const char = (state.activeLayer.chars[y] ?? [])[x] ?? '';

        state.cursor = char !== '' ? { x, y } : endOfContent();

        return true;
    }

    function focusNext(): void {
        checkAndEmitChange();

        const i = state.activeRegion ? state.regions.indexOf(state.activeRegion) : -1;

        focusRegion(i + 1);
    }

    function focusPrev(): void {
        checkAndEmitChange();

        const i = state.activeRegion ? state.regions.indexOf(state.activeRegion) : 0;

        focusRegion(i - 1);
    }

    // ===== Registration =====

    // Walk a layout tree and register all Input nodes into inputMap.
    // Sets ref.requestRender so the Input's .value setter can trigger a render from outside the event loop.
    function collectInputs(node: LayoutNode): void {
        if (node.kind === 'input') {
            const ref = getInputRef(node);

            if (ref?.region) {
                ref.requestRender = requestRender;
                inputMap.set(ref.region, node);
            }
        } else if (node.kind === 'box') {
            for (const child of node.children) {
                collectInputs(child);
            }
        }
    }

    // Walk a layout tree and register all Textarea nodes into textareaMap.
    function collectTextareas(node: LayoutNode): void {
        if (node.kind === 'textarea') {
            const ref = getTextareaRef(node);

            if (ref?.region) {
                ref.requestRender = requestRender;
                textareaMap.set(ref.region, node);
            }
        } else if (node.kind === 'box') {
            for (const child of node.children) {
                collectTextareas(child);
            }
        }
    }

    // ===== Cursor save/restore for resize =====

    // Capture logical cursor position (buffer offset) before the grid is reallocated on resize.
    function saveCursorLogical(): LogicalCursorPos {
        const r = state.activeRegion;

        if (!r) return { kind: 'free' };

        const inputNode = inputMap.get(r);

        if (inputNode) {
            const ref = getInputRef(inputNode);

            if (ref) {
                return { kind: 'input', offset: state.cursor.x - r.x + ref.scrollOffset };
            }
        }

        const textareaNode = textareaMap.get(r);

        if (textareaNode) {
            const ref = getTextareaRef(textareaNode);

            if (ref) {
                return {
                    kind: 'textarea',
                    row: state.cursor.y - r.y + ref.scrollOffset,
                    col: state.cursor.x - r.x,
                };
            }
        }

        return { kind: 'free' };
    }

    // Restore cursor to the same logical buffer position after the grid is reallocated on resize.
    function restoreCursorLogical(savedRegionIndex: number, logical: LogicalCursorPos): void {
        if (state.regions.length === 0) return;

        const i = Math.min(Math.max(0, savedRegionIndex), state.regions.length - 1);

        state.activeRegion = state.regions[i];
        const r = state.activeRegion;

        if (logical.kind === 'input') {
            const inputNode = inputMap.get(r);

            if (inputNode) {
                const ref = getInputRef(inputNode);

                if (ref) {
                    const maxScroll = Math.max(0, ref.buffer.length - r.width + 1);

                    ref.scrollOffset = Math.min(logical.offset, maxScroll);

                    const physicalX = logical.offset - ref.scrollOffset;

                    state.cursor = {
                        x: r.x + Math.max(0, Math.min(physicalX, r.width - 1)),
                        y: r.y,
                    };
                    state.cursorVisible = true;

                    return;
                }
            }
        }

        if (logical.kind === 'textarea') {
            const textareaNode = textareaMap.get(r);

            if (textareaNode) {
                const ref = getTextareaRef(textareaNode);

                if (ref) {
                    const totalLogicalRows = ref.buffer.length === 0 ? 0 : Math.ceil(ref.buffer.length / r.width);
                    const maxScroll = Math.max(0, totalLogicalRows - r.height);

                    ref.scrollOffset = Math.min(logical.row, maxScroll);

                    const physicalRow = logical.row - ref.scrollOffset;

                    state.cursor = {
                        x: r.x + Math.min(logical.col, r.width - 1),
                        y: r.y + Math.max(0, Math.min(physicalRow, r.height - 1)),
                    };
                    state.cursorVisible = true;

                    return;
                }
            }
        }

        // Fallback: snap to start of region
        state.cursor = { x: r.x, y: r.y };
        state.cursorVisible = true;
    }

    return {
        readInputValue,
        getActiveInput,
        emitInputEvent,
        checkAndEmitChange,
        endOfContent,
        focusRegion,
        focusAtCell,
        focusNext,
        focusPrev,
        collectInputs,
        collectTextareas,
        saveCursorLogical,
        restoreCursorLogical,
    };
}
