/**
 * A small fuzzy matcher, the kind behind Telescope, fzf, and ⌘P pickers.
 *
 * "Fuzzy" means the letters you type have to appear in order, but not next
 * to each other: "bab" matches "Back in Black" (B-a-ck in B-lack). Lots of
 * lines will match a short query, so each match also gets a score, and the
 * best-scoring lines sort to the top. The score rewards what people usually
 * mean:
 *
 * - Letters that run together ("back" inside "Back") beat scattered ones.
 * - Letters at the start of a word ("b" in "Black") beat ones mid-word.
 * - Matches near the start of the line beat ones near the end.
 *
 * It's greedy (it takes the first matching letter it finds each time), which
 * can miss the very best alignment, but it's simple and fine for 42 lines.
 */

export type FuzzyMatch = {
    score: number;

    /** Which characters of the line matched, for highlighting them. */
    positions: number[];
};

function isWordStart(text: string, index: number) {
    return index === 0 || /[\s/·._-]/.test(text[index - 1]);
}

/** Returns null when the query's letters don't all appear in order. */
export function fuzzyMatch(query: string, text: string): FuzzyMatch | null {
    const needle = query.toLowerCase().replace(/\s+/g, '');
    const haystack = text.toLowerCase();

    if (needle === '') {
        return { score: 0, positions: [] };
    }

    const positions: number[] = [];
    let searchFrom = 0;

    for (const letter of needle) {
        const found = haystack.indexOf(letter, searchFrom);

        if (found === -1) {
            return null;
        }

        positions.push(found);
        searchFrom = found + 1;
    }

    let score = 0;

    positions.forEach((position, index) => {
        score += 1;

        if (index > 0 && position === positions[index - 1] + 1) {
            score += 5;
        }

        if (isWordStart(text, position)) {
            score += 3;
        }
    });

    // A small penalty for how far into the line the match starts.
    score -= positions[0] * 0.1;

    return { score, positions };
}
