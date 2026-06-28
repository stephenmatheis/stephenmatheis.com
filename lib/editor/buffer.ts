import { getInputRef, getTextareaRef } from '@/lib/editor/tui';
import type { InputNode, Region, TextareaNode } from '@/lib/editor/tui';
import type { LayerContent, CursorState, GeometryState, RegionState } from './types';
import type { Cursor } from './cursor';

export type BufferProps = {
    state: Pick<LayerContent, 'activeLayer'> & CursorState & GeometryState & RegionState;
    cursor: ReturnType<typeof Cursor>;
    inputMap: Map<Region, InputNode>;
    textareaMap: Map<Region, TextareaNode>;
};

export function Buffer({ state, cursor, inputMap, textareaMap }: BufferProps) {
    function writeChar(char: string) {
        const r = state.activeRegion;

        // ===== Input: append to flat buffer, scroll right if at edge =====
        if (r) {
            const inputNode = inputMap.get(r);

            if (inputNode) {
                const ref = getInputRef(inputNode);

                if (ref) {
                    const logicalPos = state.cursor.x - r.x + ref.scrollOffset;

                    ref.buffer.splice(logicalPos, 0, char);

                    // Advance cursor — moveCursor handles scrollOffset when at right edge
                    cursor.moveCursor(1, 0);

                    return;
                }
            }

            // ===== Textarea: append to flat buffer, wrap + scroll if at edge =====
            const textareaNode = textareaMap.get(r);

            if (textareaNode) {
                const ref = getTextareaRef(textareaNode);

                if (ref) {
                    const logicalRow = state.cursor.y - r.y + ref.scrollOffset;
                    const logicalCol = state.cursor.x - r.x;
                    const logicalPos = logicalRow * r.width + logicalCol;

                    ref.buffer.splice(logicalPos, 0, char);

                    // moveCursor handles wrapping and vertical scrolling for textarea regions
                    cursor.moveCursor(1, 0);

                    return;
                }
            }
        }

        // ===== Plain free area: write directly to chars grid =====
        if (state.cursor.y < state.rows && state.cursor.x < state.cols) {
            const maxX = r ? r.x + r.width - 1 : state.cols - 1;
            const minX = r ? r.x : 0;
            const maxY = r ? r.y + r.height - 1 : state.rows - 1;

            if (state.cursor.x === maxX) {
                if (state.cursor.y < maxY) {
                    cursor.moveCursor(minX - state.cursor.x, 1);
                    state.activeLayer.chars[state.cursor.y][state.cursor.x] = char;
                    cursor.moveCursor(1, 0);
                }

                return;
            }

            state.activeLayer.chars[state.cursor.y][state.cursor.x] = char;

            cursor.moveCursor(1, 0);
        }
    }

    function deleteChar() {
        const r = state.activeRegion;

        // ===== Input: remove from buffer, scroll left if at left edge =====
        if (r) {
            const inputNode = inputMap.get(r);

            if (inputNode) {
                const ref = getInputRef(inputNode);

                if (ref) {
                    const logicalPos = state.cursor.x - r.x + ref.scrollOffset;

                    if (logicalPos > 0) {
                        ref.buffer.splice(logicalPos - 1, 1);

                        // moveCursor handles scrollOffset when at left edge
                        cursor.moveCursor(-1, 0);
                    }

                    return;
                }
            }

            // ===== Textarea: remove from buffer, wrap up if at left edge =====
            const textareaNode = textareaMap.get(r);

            if (textareaNode) {
                const ref = getTextareaRef(textareaNode);

                if (ref) {
                    const logicalRow = state.cursor.y - r.y + ref.scrollOffset;
                    const logicalCol = state.cursor.x - r.x;
                    const logicalPos = logicalRow * r.width + logicalCol;

                    if (logicalPos > 0) {
                        ref.buffer.splice(logicalPos - 1, 1);

                        // moveCursor handles wrap-back and vertical scroll
                        cursor.moveCursor(-1, 0);
                    }

                    return;
                }
            }
        }

        // ===== Plain free area: delete from chars grid =====
        const minX = r ? r.x : 0;

        if (state.cursor.x > minX) {
            cursor.moveCursor(-1, 0);

            state.activeLayer.chars[state.cursor.y][state.cursor.x] = '';
        }
    }

    function handleEnter() {
        const minX = state.activeRegion ? state.activeRegion.x : 0;

        cursor.moveCursor(-(state.cursor.x - minX), 1);
    }

    return {
        writeChar,
        deleteChar,
        handleEnter,
    };
}
