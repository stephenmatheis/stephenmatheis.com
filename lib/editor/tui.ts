import { log } from '@/lib/utils';

export type BorderStyle = 'rounded' | 'single' | 'double';

export type BoxProps = {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    border?: boolean;
    borderStyle?: BorderStyle;
    title?: string;
    titleAlignment?: 'left' | 'center' | 'right';
    padding?: number;
    paddingX?: number;
    paddingY?: number;
    flexDirection?: 'row' | 'column';
    flex?: number;
};

export type TextProps = {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    align?: 'left' | 'center' | 'right';
    content?: string | (() => string);
    flex?: number;
};

type DynamicText = {
    getter: () => string;
    write: (content: string) => void;
};

export type TextareaProps = {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    flex?: number;
    border?: boolean;
    borderStyle?: BorderStyle;
    title?: string;
    titleAlignment?: 'left' | 'center' | 'right';
    padding?: number;
    paddingX?: number;
    paddingY?: number;
};

export type InputEventName = 'input' | 'change' | 'enter';

export type InputProps = {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    flex?: number;
    placeholder?: string;
    // CSS color string, or false to suppress the default input background fill.
    background?: string | false;
    border?: boolean;
    borderStyle?: BorderStyle;
};

// Internal state bag for each Input instance. Lives outside the node so it
// isn't copied by the object spreads the flex loop uses to assign positions.
export type InputRef = {
    chars: string[][] | null;
    region: Region | null;
    valueOnFocus: string;
    draw: (() => void) | null;
    handlers: Partial<Record<InputEventName, (value: string) => void>>;
};

// InputNode is the plain data shape that goes into LayoutNode / Box children.
// No methods — clean for spreads and type narrowing.
export type InputNode = InputProps & { kind: 'input' };

// InputHandle is what Input() returns to the caller. It extends InputNode so
// it's assignable to LayoutNode, but also carries the interactive API.
export type InputHandle = InputNode & {
    on(event: InputEventName, cb: (value: string) => void): InputHandle;
    value: string;
};

export type BoxNode = BoxProps & { kind: 'box'; children: LayoutNode[] };
export type TextNode = TextProps & { kind: 'text' };
export type TextareaNode = TextareaProps & { kind: 'textarea' };
export type LayoutNode = BoxNode | TextNode | TextareaNode | InputNode;

export type Region = { x: number; y: number; width: number; height: number };

// Enumerable Symbol key — survives `{ ...node }` spreads so the registry
// lookup works on positional copies created by the flex layout loop.
const INPUT_ID = Symbol('tui.input');

const inputRegistry = new Map<number, InputRef>();
let nextInputId = 0;

export function getInputRef(node: InputNode): InputRef | undefined {
    const id = (node as InputNode & { [INPUT_ID]?: number })[INPUT_ID];

    return id != null ? inputRegistry.get(id) : undefined;
}

export function disposeInput(node: InputNode): void {
    const id = (node as InputNode & { [INPUT_ID]?: number })[INPUT_ID];

    if (id != null) inputRegistry.delete(id);
}

export function Box(props: BoxProps, ...children: LayoutNode[]): BoxNode {
    return {
        kind: 'box',
        border: true,
        borderStyle: 'rounded',
        x: 0,
        y: 0,
        ...props,
        children,
    };
}

export function Text(props: TextProps): TextNode {
    return { kind: 'text', align: 'left', content: '', ...props };
}

// FIXME: Shouldn't be able to move cursor down if there is no new line.
// FIXME: If border is false, don't highlight on focus region
export function Textarea(props: TextareaProps): TextareaNode {
    return { kind: 'textarea', border: true, borderStyle: 'rounded', ...props };
}

export function Input(props: InputProps): InputHandle {
    const id = nextInputId++;
    const ref: InputRef = {
        chars: null,
        region: null,
        valueOnFocus: '',
        draw: null,
        handlers: {},
    };

    inputRegistry.set(id, ref);

    // Plain data node — matches InputNode type, spreads cleanly.
    const node = { kind: 'input' as const, ...props } as InputNode & { [INPUT_ID]: number };

    // Assign as enumerable so the symbol key copies with `{ ...node }`.
    node[INPUT_ID] = id;

    // `.on()` and `.value` are non-enumerable so they don't pollute spreads.
    Object.defineProperty(node, 'on', {
        value(event: InputEventName, cb: (value: string) => void): InputHandle {
            ref.handlers[event] = cb;

            return node as unknown as InputHandle;
        },
        enumerable: false,
        writable: false,
        configurable: true,
    });

    Object.defineProperty(node, 'value', {
        get(): string {
            if (!ref.chars || !ref.region) return '';

            return (ref.chars[ref.region.y] ?? [])
                .slice(ref.region.x, ref.region.x + ref.region.width)
                .join('')
                .trimEnd();
        },
        set(v: string) {
            if (!ref.chars || !ref.region) return;

            const { chars, region } = ref;

            for (let i = region.x; i < region.x + region.width; i++) {
                chars[region.y][i] = '';
            }

            for (let i = 0; i < v.length && i < region.width; i++) {
                chars[region.y][region.x + i] = v[i];
            }

            ref.draw?.();
        },
        enumerable: false,
        configurable: true,
    });

    return node as unknown as InputHandle;
}

function drawBorder(
    x: number,
    y: number,
    width: number,
    height: number,
    borderStyle: BorderStyle,
    title: string | undefined,
    titleAlignment: 'left' | 'center' | 'right',
    chars: string[][],
) {
    const corners = {
        double: ['╔', '╗', '╚', '╝'],
        single: ['┌', '┐', '└', '┘'],
        rounded: ['╭', '╮', '╰', '╯'],
    }[borderStyle];
    const hEdge = borderStyle === 'double' ? '═' : '─';
    const vEdge = borderStyle === 'double' ? '║' : '│';

    chars[y][x] = corners[0];
    chars[y][x + width - 1] = corners[1];
    chars[y + height - 1][x] = corners[2];
    chars[y + height - 1][x + width - 1] = corners[3];

    for (let cx = x + 1; cx < x + width - 1; cx++) {
        chars[y][cx] = hEdge;
        chars[y + height - 1][cx] = hEdge;
    }

    for (let cy = y + 1; cy < y + height - 1; cy++) {
        chars[cy][x] = vEdge;
        chars[cy][x + width - 1] = vEdge;
    }

    if (title) {
        const paddedTitle = ` ${title} `;
        const startX = {
            left: x + 2,
            center: x + Math.floor((width - paddedTitle.length) / 2),
            right: x + width - 2 - paddedTitle.length,
        }[titleAlignment];

        for (let i = 0; i < paddedTitle.length; i++) {
            chars[y][startX + i] = paddedTitle[i];
        }
    }
}

function writeText(
    x: number,
    y: number,
    width: number,
    align: 'left' | 'center' | 'right',
    content: string,
    chars: string[][],
) {
    if (y < 0 || y >= chars.length || !content) return;

    const writeX =
        align === 'right'
            ? x + width - content.length
            : align === 'center'
              ? x + Math.floor((width - content.length) / 2)
              : x;

    for (let i = 0; i < content.length; i++) {
        const col = writeX + i;

        if (col >= x && col < x + width && col >= 0 && col < chars[0].length) {
            chars[y][col] = content[i];
        }
    }
}

function composeNode(node: LayoutNode, chars: string[][], regions: Region[], dynamicTexts?: DynamicText[]) {
    if (node.kind === 'text') {
        const x = node.x ?? 0;
        const y = node.y ?? 0;
        const width = node.width ?? chars[0].length - x;
        const align = node.align ?? 'left';
        const { content } = node;

        if (typeof content === 'function') {
            dynamicTexts?.push({
                getter: content,
                write(text: string) {
                    for (let col = x; col < x + width; col++) {
                        if (chars[y]) chars[y][col] = '';
                    }

                    writeText(x, y, width, align, text, chars);
                },
            });

            writeText(x, y, width, align, content(), chars);
        } else {
            writeText(x, y, width, align, content ?? '', chars);
        }

        return;
    }

    if (node.kind === 'textarea') {
        const x = node.x ?? 0;
        const y = node.y ?? 0;
        const width = node.width ?? chars[0].length - x;
        const height = node.height ?? chars.length - y;
        const border = node.border ?? true;
        const px = node.paddingX ?? node.padding ?? 0;
        const py = node.paddingY ?? node.padding ?? 0;

        if (border) {
            drawBorder(
                x,
                y,
                width,
                height,
                node.borderStyle ?? 'rounded',
                node.title,
                node.titleAlignment ?? 'left',
                chars,
            );
        }

        const innerX = x + (border ? 1 : 0) + px;
        const innerY = y + (border ? 1 : 0) + py;
        const innerW = width - (border ? 2 : 0) - px * 2;
        const innerH = height - (border ? 2 : 0) - py * 2;

        regions.push({ x: innerX, y: innerY, width: innerW, height: innerH });

        return;
    }

    if (node.kind === 'input') {
        const x = node.x ?? 0;
        const y = node.y ?? 0;
        const width = node.width ?? chars[0].length - x;
        const height = node.height ?? (node.border ? 3 : 1);

        if (node.border) {
            drawBorder(x, y, width, height, node.borderStyle ?? 'rounded', undefined, 'left', chars);
        }

        // The interactive region is inset by 1 on all sides when bordered.
        const regionX = node.border ? x + 1 : x;
        const regionY = node.border ? y + 1 : y;
        const regionW = node.border ? width - 2 : width;
        const regionH = node.border ? height - 2 : height;
        const region: Region = { x: regionX, y: regionY, width: regionW, height: regionH };

        regions.push(region);

        const ref = getInputRef(node);

        if (ref) {
            ref.chars = chars;
            ref.region = region;
        }

        return;
    }

    const {
        x = 0,
        y = 0,
        border,
        borderStyle = 'rounded',
        title,
        titleAlignment = 'left',
        padding = 1,
        paddingX,
        paddingY,
        flexDirection,
        children,
    } = node;

    let { width, height } = node;

    height = height || chars.length;
    width = width || chars[0].length;

    if (border) {
        drawBorder(x, y, width, height, borderStyle, title, titleAlignment, chars);
    }

    const px = paddingX ?? padding;
    const py = paddingY ?? padding;
    const innerX = x + px;
    const innerY = y + py;
    const innerWidth = width - px * 2;
    const innerHeight = height - py * 2;

    if (flexDirection) {
        const isRow = flexDirection === 'row';
        const axis = isRow ? innerWidth : innerHeight;

        const fixedTotal = children.reduce((sum, child) => {
            if (child.flex != null) return sum;

            if (isRow) return sum + (child.width ?? 0);

            const defaultH = child.kind === 'text' ? 1 : child.kind === 'input' ? (child.border ? 3 : 1) : 0;

            return sum + (child.height ?? defaultH);
        }, 0);

        const flexTotal = children.reduce((sum, child) => sum + (child.flex ?? 0), 0);
        const lastFlexIndex = children.findLastIndex((child) => child.flex != null);
        const remaining = axis - fixedTotal;

        let cursor = 0;
        let flexUsed = 0;

        for (let i = 0; i < children.length; i++) {
            const child = children[i];

            let childAxisSize: number;

            if (child.flex != null && flexTotal > 0) {
                childAxisSize =
                    i === lastFlexIndex ? remaining - flexUsed : Math.floor((child.flex / flexTotal) * remaining);
                flexUsed += childAxisSize;
            } else if (isRow) {
                childAxisSize = child.width ?? 0;
            } else {
                const defaultH = child.kind === 'text' ? 1 : child.kind === 'input' ? (child.border ? 3 : 1) : 0;

                childAxisSize = child.height ?? defaultH;
            }

            log('recurse > composeNode()');
            composeNode(
                {
                    ...child,
                    x: innerX + (isRow ? cursor : (child.x ?? 0)),
                    y: innerY + (isRow ? (child.y ?? 0) : cursor),
                    width: isRow ? childAxisSize : (child.width ?? innerWidth),
                    height: isRow ? (child.height ?? innerHeight) : childAxisSize,
                } as LayoutNode,
                chars,
                regions,
                dynamicTexts,
            );

            cursor += childAxisSize;
        }
    } else {
        for (const child of children) {
            log('recurse > composeNode()');
            composeNode(
                {
                    ...child,
                    x: innerX + (child.x ?? 0),
                    y: innerY + (child.y ?? 0),
                    width: child.width ?? innerWidth,
                    height:
                        child.height ??
                        (child.kind === 'text' ? 1 : child.kind === 'input' ? (child.border ? 3 : 1) : innerHeight),
                } as LayoutNode,
                chars,
                regions,
                dynamicTexts,
            );
        }
    }
}

export function compose(node: LayoutNode, chars: string[][]): [Region[], (() => void) | null] {
    const regions: Region[] = [];
    const dynamicTexts: DynamicText[] = [];

    log('compose() > composeNode()');
    composeNode(node, chars, regions, dynamicTexts);

    const redraw = dynamicTexts.length > 0
        ? () => { for (const { getter, write } of dynamicTexts) write(getter()); }
        : null;

    return [regions, redraw];
}
