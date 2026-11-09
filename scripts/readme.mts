import { writeFileSync } from 'node:fs';

type Version = {
    number: number;
    name: string;
    branch: string;
};

const NON_BREAKING_SPACE = ' ';
const GAP_AFTER_VERSION = 1;
const GAP_AFTER_NAME = 4;
const REPO_URL = 'https://github.com/stephenmatheis/stephenmatheis.com';

const siteName = 'stephenmatheis.com';

const details = `
Previous versions are branches with the format ${backticks('vNN/name')} and are deployed at ${backticks('vN.stephenmatheis.com')}.
${backticks('main')} is live at stephenmatheis.com.
`;

const instructionsHeading = 'To archive the live version';
const instructionsOrderedLines = [
    `Push ${backticks('main')} to a new branch named ${backticks('vNN/name')}.`,
    `In Vercel, add ${backticks('vN.stephenmatheis.com')} as a domain for that branch.`,
    `In ${backticks('scripts/readme.mts')}, move live into the archive object array, give it a name, then increment live's number.`,
    `Run ${backticks('npm run readme')}.`,
];

const commands = ['npm run dev', 'npm run build', 'npm run readme'];

const live = {
    number: 43,
    name: 'Live',
    branch: 'main',
};

const archive = [
    {
        number: 1,
        name: 'Archive',
        branch: 'v01/archive',
    },
    {
        number: 2,
        name: 'Black and White',
        branch: 'v02/black-and-white',
    },
    {
        number: 3,
        name: 'CRT',
        branch: 'v03/crt',
    },
    {
        number: 4,
        name: 'Blog',
        branch: 'v04/blog',
    },
    {
        number: 5,
        name: 'Words',
        branch: 'v05/words',
    },
    {
        number: 6,
        name: 'Nav',
        branch: 'v06/nav',
    },
    {
        number: 7,
        name: 'Black and White',
        branch: 'v07/black-and-white',
    },
    {
        number: 8,
        name: 'Print',
        branch: 'v08/print',
    },
    {
        number: 9,
        name: 'Positions',
        branch: 'v09/positions',
    },
    {
        number: 10,
        name: 'Layout',
        branch: 'v10/layout',
    },
    {
        number: 11,
        name: 'New Print Layout',
        branch: 'v11/new-print-layout',
    },
    {
        number: 12,
        name: 'Toolbar',
        branch: 'v12/toolbar',
    },
    {
        number: 13,
        name: 'Fun',
        branch: 'v13/fun',
    },
    {
        number: 14,
        name: '8-Bit',
        branch: 'v14/8-bit',
    },
    {
        number: 15,
        name: 'Simple',
        branch: 'v15/simple',
    },
    {
        number: 16,
        name: 'Cybertruck',
        branch: 'v16/cybertruck',
    },
    {
        number: 17,
        name: 'Mono',
        branch: 'v17/mono',
    },
    {
        number: 18,
        name: 'New Home',
        branch: 'v18/new-home',
    },
    {
        number: 19,
        name: 'Fiber',
        branch: 'v19/fiber',
    },
    {
        number: 20,
        name: 'New',
        branch: 'v20/new',
    },
    {
        number: 21,
        name: 'Grid',
        branch: 'v21/grid',
    },
    {
        number: 22,
        name: 'Old Skool',
        branch: 'v22/old-skool',
    },
    {
        number: 23,
        name: 'Flex',
        branch: 'v23/flex',
    },
    {
        number: 24,
        name: 'Motion',
        branch: 'v24/motion',
    },
    {
        number: 25,
        name: 'Orientation',
        branch: 'v25/orientation',
    },
    {
        number: 26,
        name: 'Narrative Format',
        branch: 'v26/narrative-format',
    },
    {
        number: 27,
        name: 'Resume',
        branch: 'v27/resume',
    },
    {
        number: 28,
        name: 'Pages',
        branch: 'v28/pages',
    },
    {
        number: 29,
        name: 'Update',
        branch: 'v29/update',
    },
    {
        number: 30,
        name: 'Listless',
        branch: 'v30/listless',
    },
    {
        number: 31,
        name: 'Godly',
        branch: 'v31/godly',
    },
    {
        number: 32,
        name: 'Back in Black',
        branch: 'v32/back-in-black',
    },
    {
        number: 33,
        name: 'Invoice',
        branch: 'v33/invoice',
    },
    {
        number: 34,
        name: 'Overlay',
        branch: 'v34/overlay',
    },
    {
        number: 35,
        name: 'FUI',
        branch: 'v35/fui',
    },
    {
        number: 36,
        name: 'Update Next',
        branch: 'v36/update-next',
    },
    {
        number: 37,
        name: 'Vite',
        branch: 'v37/vite',
    },
    {
        number: 38,
        name: 'Archive Main',
        branch: 'v38/archive-main',
    },
    {
        number: 39,
        name: 'TUI',
        branch: 'v39/tui',
    },
    {
        number: 40,
        name: 'Archive 2',
        branch: 'v40/archive-2',
    },
    {
        number: 41,
        name: 'System',
        branch: 'v41/system',
    },
    {
        number: 42,
        name: 'ASCII',
        branch: 'v42/ascii',
    },
];

const readmeUrl = new URL('../README.md', import.meta.url);
const newestFirst = [...archive].sort((a, b) => b.number - a.number);
const everyVersion = [live, ...newestFirst];
const versionColumnWidth = Math.max(...everyVersion.map((version) => `v${version.number}`.length));
const nameColumnWidth = Math.max(...everyVersion.map((version) => version.name.length));

function backticks(text: string) {
    return `&grave;${text}&grave;`;
}

function padding(textLength: number, columnWidth: number, gap: number) {
    return NON_BREAKING_SPACE.repeat(columnWidth - textLength + gap);
}

function line(version: Version, siteUrl: string) {
    const label = `v${version.number}`;
    const versionLink = `[${label}](${siteUrl})`;
    const nameLink = `[${version.name}](${siteUrl})`;
    const codeLink = `[[code](${REPO_URL}/tree/${version.branch})]`;

    return `${versionLink}${padding(label.length, versionColumnWidth, GAP_AFTER_VERSION)}${nameLink}${padding(version.name.length, nameColumnWidth, GAP_AFTER_NAME)}${codeLink}`;
}

const siteNameBlock = `<samp>${siteName}</samp>`;
const liveBlock = `<samp>${line(live, 'https://stephenmatheis.com')}</samp>`;
const archiveLines = newestFirst.map((version) => line(version, `https://v${version.number}.stephenmatheis.com`));
const archiveBlock = `<samp>${archiveLines.join('\\\n')}</samp>`;
const detailsBlock = `<samp>${details.trim().split('\n').join('\\\n')}</samp>`;
const instructionsHeadingBlock = `${instructionsHeading}:\\\n`;
const instructionsOrderedLinesBlock = `${instructionsOrderedLines.map((step, index) => `${index + 1}\\. ${step}`).join('\\\n')}`;
const instructionsBlock = `<samp>${instructionsHeadingBlock}${instructionsOrderedLinesBlock}</samp>`;
const commandsBlock = `<samp>&grave;&grave;&grave;sh\\\n${commands.map((command) => `${NON_BREAKING_SPACE.repeat(4)}${command}`).join('\\\n')}\\\n&grave;&grave;&grave;</samp>`;
const updatedReadme = /*md*/ `
<!-- generated by scripts/readme.mts -->
<!-- markdownlint-disable-file MD013 MD033 MD041 -->

${siteNameBlock}

${liveBlock}

${detailsBlock}

${archiveBlock}

${instructionsBlock}

${commandsBlock}
`;

writeFileSync(readmeUrl, updatedReadme.trim() + '\n');

console.log(`Wrote ${everyVersion.length} versions to README.md`);
