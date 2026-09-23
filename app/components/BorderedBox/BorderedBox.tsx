import styles from './BorderedBox.module.scss';

const MAX_LINE_LENGTH = 60;
const PADDING = 2;
const GAP = MAX_LINE_LENGTH - PADDING * 2;

// Greedy word-wrap: pack words onto a line until the next word would
// push it past `maxWidth`, then start a new line with that word. A word
// longer than `maxWidth` all by itself can never fit no matter what's
// already on the line, so that case is checked first, ahead of the
// normal fits/doesn't-fit check, and handled by hard-splitting the word
// into `maxWidth`-sized chunks instead of trying to place it whole.
function wrap(text: string, maxWidth: number) {
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';

    for (const word of words) {
        if (word.length > maxWidth) {
            // Flush whatever's already accumulated as its own line first —
            // otherwise the word's chunks would get glued onto the end of
            // currentLine instead of starting clean.
            if (currentLine) {
                lines.push(currentLine);
                currentLine = '';
            }

            for (let i = 0; i < word.length; i += maxWidth) {
                lines.push(word.slice(i, i + maxWidth));
            }
        } else if ((currentLine + (currentLine ? ' ' : '') + word).length <= maxWidth) {
            currentLine += (currentLine ? ' ' : '') + word;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }
    }

    if (currentLine) {
        lines.push(currentLine);
    }

    return lines.join('\n');
}

export function BorderedBox({ text }: { text: string }) {
    const lines = wrap(text, GAP).split('\n');
    const rule = '─'.repeat(GAP + 2);
    const top = '╭' + rule + '╮';
    const bottom = '╰' + rule + '╯';

    // wrap() guarantees every line is at most GAP characters, so the
    // padding amount here can never go negative the way it could back
    // when the raw, unwrapped text was measured directly.
    const body = lines
        .map((line) => '│ ' + line + ' '.repeat(GAP - line.length) + ' │')
        .join('\n');

    return (
        <div className={styles.box}>
            {top}
            {'\n'}
            {body}
            {'\n'}
            {bottom}
        </div>
    );
}
