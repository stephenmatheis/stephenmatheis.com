import { getInputRef } from '@/lib/editor/tui';
import type { InputEventName, InputNode, InputRef, LayoutNode, Region } from '@/lib/editor/tui';
import type { CellPos, RegionState, CursorState, ContentState } from './types';

export type FocusState = RegionState & CursorState & Pick<ContentState, 'chars'>;

// Pure utility — reads the current value of an Input from the char grid.
// Exported separately so other modules (e.g. applyInputOverlays) can use it without
// depending on the full Focus factory.
export function readInputValue(ref: InputRef): string {
    if (!ref.chars || !ref.region) return '';

    return (ref.chars[ref.region.y] ?? [])
        .slice(ref.region.x, ref.region.x + ref.region.width)
        .join('')
        .trimEnd();
}

export function Focus({
    state,
    inputMap,
    draw,
}: {
    state: FocusState & RegionState;
    inputMap: Map<Region, InputNode>;
    draw: () => void;
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
        if (!state.activeRegion) {
            return { x: 0, y: 0 };
        }

        const r = state.activeRegion;

        const input = inputMap.get(r);

        if (input) {
            const ref = getInputRef(input);

            if (ref) {
                const value = readInputValue(ref);

                return {
                    x: Math.min(r.x + value.length, r.x + r.width - 1),
                    y: r.y,
                };
            }
        }

        let cx = r.x;
        let cy = r.y;

        for (let row = r.y + r.height - 1; row >= r.y; row--) {
            const text = (state.chars[row] ?? [])
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

        const input = inputMap.get(state.activeRegion);

        if (input) {
            const ref = getInputRef(input);

            if (ref) ref.valueOnFocus = readInputValue(ref);
        }

        state.cursor = endOfContent();
    }

    function focusAtCell(x: number, y: number): boolean {
        checkAndEmitChange();

        const index = state.regions.findIndex((r) => x >= r.x && x < r.x + r.width && y >= r.y && y < r.y + r.height);

        if (index === -1) return false;

        state.activeRegion = state.regions[index];

        const input = inputMap.get(state.activeRegion);

        if (input) {
            const ref = getInputRef(input);

            if (ref) ref.valueOnFocus = readInputValue(ref);
        }

        const char = (state.chars[y] ?? [])[x] ?? '';

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

    // ===== Input registration =====

    // Walk a layout tree and register all Input nodes into inputMap.
    // Sets ref.draw so the Input's .value setter can trigger a render from outside the event loop.
    function collectInputs(node: LayoutNode): void {
        if (node.kind === 'input') {
            const ref = getInputRef(node);

            if (ref?.region) {
                ref.draw = draw;
                inputMap.set(ref.region, node);
            }
        } else if (node.kind === 'box') {
            for (const child of node.children) {
                collectInputs(child);
            }
        }
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
    };
}
