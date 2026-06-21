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
    interactive?: boolean;
};

export type BoxNode = BoxProps & { children: BoxNode[] };

export type Region = { x: number; y: number; width: number; height: number };

export function Box(props: BoxProps, ...children: BoxNode[]): BoxNode {
    return {
        border: true,
        borderStyle: 'rounded',
        x: 0,
        y: 0,
        ...props,
        children,
    };
}

function composeNode(node: BoxNode, chars: string[][], regions: Region[]) {
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
        log('recurse > composeNode()');
        composeNode(
            {
                ...child,
                x: x + px + (child.x ?? 0),
                y: y + py + (child.y ?? 0),
                width: child.width ?? innerWidth,
                height: child.height ?? innerHeight,
            },
            chars,
            regions,
        );
    }
}

export function compose(node: BoxNode, chars: string[][]): Region[] {
    const regions: Region[] = [];

    log('compose() > composeNode()');
    composeNode(node, chars, regions);

    return regions;
}
