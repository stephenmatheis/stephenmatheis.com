import { readFileSync, writeFileSync } from 'node:fs';

const readmeUrl = new URL('../README.md', import.meta.url);
const NON_BREAKING_SPACE = ' ';
const GAP_AFTER_VERSION = 1;
const GAP_AFTER_TITLE = 2;
const readme = readFileSync(readmeUrl, 'utf8');
const sampPattern = /<samp>([\s\S]*?)<\/samp>/;
const sampMatch = readme.match(sampPattern);

if (!sampMatch) {
    throw new Error('Could not find a <samp>…</samp> block in README.md');
}

const [, listText] = sampMatch;
const entryPattern = /^\[(v\d+)\]\(([^)]+)\)\s+\[([^\]]+)\]\(([^)]+)\)\s+\[\[code\]\(([^)]+)\)\]\\?$/;
const entries = listText
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => {
        const entryMatch = line.match(entryPattern);

        if (!entryMatch) {
            throw new Error(`Could not parse this README line:\n\n    ${line}\n`);
        }

        const [, version, versionUrl, title, titleUrl, codeUrl] = entryMatch;

        return {
            version,
            versionUrl,
            title,
            titleUrl,
            codeUrl,
        };
    });

const versionColumnWidth = Math.max(...entries.map((entry) => entry.version.length));
const titleColumnWidth = Math.max(...entries.map((entry) => entry.title.length));

function padding(textLength: number, columnWidth: number, gap: number) {
    return NON_BREAKING_SPACE.repeat(columnWidth - textLength + gap);
}

const alignedLines = entries.map((entry) => {
    const versionLink = `[${entry.version}](${entry.versionUrl})`;
    const titleLink = `[${entry.title}](${entry.titleUrl})`;
    const codeLink = `[[code](${entry.codeUrl})]`;

    return `${versionLink}${padding(entry.version.length, versionColumnWidth, GAP_AFTER_VERSION)}${titleLink}${padding(entry.title.length, titleColumnWidth, GAP_AFTER_TITLE)}${codeLink}`;
});

const alignedList = alignedLines.join('\\\n');
const alignedReadme = readme.replace(sampPattern, () => `<samp>${alignedList}</samp>`);

writeFileSync(readmeUrl, alignedReadme);

console.log(`Aligned ${entries.length} entries in README.md`);
