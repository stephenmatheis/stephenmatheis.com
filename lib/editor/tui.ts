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
    flexDirection?: 'row' | 'column';
    flex?: number;
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
        flexDirection,
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
    const innerX = x + px;
    const innerY = y + py;
    const innerWidth = width - px * 2;
    const innerHeight = height - py * 2;

    if (flexDirection) {
        const isRow = flexDirection === 'row';
        const axis = isRow ? innerWidth : innerHeight;
        const flexTotal = children.reduce((sum, child) => sum + (child.flex ?? 0), 0);
        const fixedTotal = children.reduce((sum, child) => {
            if (child.flex != null) {
                return sum;
            }

            return sum + (isRow ? (child.width ?? 0) : (child.height ?? 0));
        }, 0);
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
            } else {
                childAxisSize = isRow ? (child.width ?? 0) : (child.height ?? 0);
            }

            log('recurse > composeNode()');
            composeNode(
                {
                    ...child,
                    x: innerX + (isRow ? cursor : (child.x ?? 0)),
                    y: innerY + (isRow ? (child.y ?? 0) : cursor),
                    width: isRow ? childAxisSize : (child.width ?? innerWidth),
                    height: isRow ? (child.height ?? innerHeight) : childAxisSize,
                },
                chars,
                regions,
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
                    height: child.height ?? innerHeight,
                },
                chars,
                regions,
            );
        }
    }
}

export function compose(node: BoxNode, chars: string[][]): Region[] {
    const regions: Region[] = [];

    log('compose() > composeNode()');
    composeNode(node, chars, regions);

    return regions;
}
