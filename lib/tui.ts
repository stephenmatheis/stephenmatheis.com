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
};

export type BoxNode = BoxProps & { children: BoxNode[] };

export type CellPos = {
    x: number;
    y: number;
};

export type Selected = {
    start: CellPos;
    end: CellPos;
};

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

export function compose(
    {
        x = 0,
        y = 0,
        width,
        height,
        border,
        borderStyle = 'rounded',
        title,
        titleAlignment = 'left',
        padding = 1,
        paddingX,
        paddingY,
        children,
    }: BoxNode,
    chars: string[][],
) {
    if (border) {
        const corners = {
            double: ['╔', '╗', '╚', '╝'],
            single: ['┌', '┐', '└', '┘'],
            rounded: ['╭', '╮', '╰', '╯'],
        }[borderStyle];
        const horizontalEdge = borderStyle === 'double' ? '═' : '─';
        const verticalEdge = borderStyle === 'double' ? '║' : '│';

        height = height || chars.length;
        width = width || chars[0].length;

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
    }

    for (const child of children) {
        const px = paddingX ?? padding;
        const py = paddingY ?? padding;

        compose(
            {
                ...child,
                x: x + px + (child.x ?? 0),
                y: y + py + (child.y ?? 0),
                width: child.width ?? (width || 0) - px * 2,
                height: child.height ?? (height || 0) - py * 2,
            },
            chars,
        );
    }
}

export function normalizeSelection(selection: Selected): Selected {
    const { start, end } = selection;
    const reversed = end.y < start.y || (end.y === start.y && end.x < start.x);

    return reversed ? { start: end, end: start } : selection;
}

export function isInSelection(col: number, row: number, selection: Selected): boolean {
    const { start, end } = normalizeSelection(selection);

    if (row < start.y || row > end.y) {
        return false;
    }

    if (row === start.y && col < start.x) {
        return false;
    }

    if (row === end.y && col > end.x) {
        return false;
    }

    return true;
}

export function getSelectedText(chars: string[][], selection: Selected): string {
    const { start, end } = normalizeSelection(selection);
    const lines: string[] = [];

    for (let row = start.y; row <= end.y; row++) {
        const startCol = row === start.y ? start.x : 0;
        const endCol = row === end.y ? end.x : (chars[row]?.length ?? 1) - 1;

        lines.push(
            (chars[row] || [])
                .slice(startCol, endCol + 1)
                .join('')
                .trimEnd(),
        );
    }

    return lines.join('\n');
}

export function isWordChar(char: string): boolean {
    if (!char || char.trim() === '') return false;

    const code = char.codePointAt(0) ?? 0;

    // Exclude box-drawing characters (U+2500–U+257F)
    return !(code >= 0x2500 && code <= 0x257f);
}

export function clearSelected(chars: string[][], selection: Selected): CellPos {
    const { start, end } = normalizeSelection(selection);

    for (let row = start.y; row <= end.y; row++) {
        const startCol = row === start.y ? start.x : 0;
        const endCol = row === end.y ? end.x : chars[row].length - 1;

        for (let col = startCol; col <= endCol; col++) {
            chars[row][col] = '';
        }
    }

    return start;
}
