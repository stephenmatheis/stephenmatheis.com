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
    interactive?: boolean;
};

export type TextProps = {
    x?: number;
    y?: number;
    width?: number;
    align?: 'left' | 'center' | 'right';
    content?: string;
};

export type TextNode = TextProps & { kind: 'text' };

export type BoxNode = BoxProps & { kind: 'box'; children: LayoutNode[] };

export type LayoutNode = BoxNode | TextNode;

export type Region = { x: number; y: number; width: number; height: number };

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
    return { kind: 'text', x: 0, y: 0, align: 'left', content: '', ...props };
}

function composeTextNode(
    x: number,
    y: number,
    clearWidth: number,
    align: 'left' | 'center' | 'right',
    content: string,
    chars: string[][],
) {
    if (y < 0 || y >= chars.length) return;

    for (let i = 0; i < clearWidth && x + i < chars[0].length; i++) {
        chars[y][x + i] = '';
    }

    const writeX = {
        left: x + Math.floor((clearWidth - content.length) / 2),
        center: x,
        right: x + clearWidth - content.length,
    }[align];

    for (let i = 0; i < content.length; i++) {
        const col = writeX + i;

        if (col >= 0 && col < chars[0].length) {
            chars[y][col] = content[i];
        }
    }
}

function composeNode(node: LayoutNode, chars: string[][], regions: Region[]) {
    if (node.kind === 'text') {
        const x = node.x ?? 0;
        const y = node.y ?? 0;

        composeTextNode(x, y, node.width ?? chars[0].length - x, node.align ?? 'left', node.content ?? '', chars);

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
        interactive,
        children,
    } = node;

    let { width, height } = node;

    height = height || chars.length;
    width = width || chars[0].length;

    if (border) {
        const corners = {
            double: ['╔', '╗', '╚', '╝'],
            single: ['┌', '┐', '└', '┘'],
            rounded: ['╭', '╮', '╰', '╯'],
        }[borderStyle];
        const horizontalEdge = borderStyle === 'double' ? '═' : '─';
        const verticalEdge = borderStyle === 'double' ? '║' : '│';

        chars[y][x] = corners[0];
        chars[y][x + width - 1] = corners[1];
        chars[y + height - 1][x] = corners[2];
        chars[y + height - 1][x + width - 1] = corners[3];

        for (let cx = x + 1; cx < x + width - 1; cx++) {
            chars[y][cx] = horizontalEdge;
            chars[y + height - 1][cx] = horizontalEdge;
        }

        for (let cy = y + 1; cy < y + height - 1; cy++) {
            chars[cy][x] = verticalEdge;
            chars[cy][x + width - 1] = verticalEdge;
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

        if (interactive) {
            regions.push({ x: x + 1, y: y + 1, width: width - 2, height: height - 2 });
        }
    }

    const px = paddingX ?? padding;
    const py = paddingY ?? padding;
    const innerWidth = width - px * 2;
    const innerHeight = height - py * 2;

    for (const child of children) {
        const childX = x + px + (child.x ?? 0);
        const childY = y + py + (child.y ?? 0);

        if (child.kind === 'text') {
            composeTextNode(
                childX,
                childY,
                child.width ?? innerWidth,
                child.align ?? 'left',
                child.content ?? '',
                chars,
            );
        } else {
            composeNode(
                {
                    ...child,
                    x: childX,
                    y: childY,
                    width: child.width ?? innerWidth,
                    height: child.height ?? innerHeight,
                },
                chars,
                regions,
            );
        }
    }
}

export function compose(node: LayoutNode, chars: string[][]): Region[] {
    const regions: Region[] = [];

    composeNode(node, chars, regions);

    return regions;
}
