// FIXME: Don't run if just a post was added or updated.

// Create Posts

import { writeFile, readFile } from 'fs/promises';

const path: string = `./public/set-theme.js`;
const setTheme: string = await readFile(path, 'utf8');
const lines: string[] = setTheme.split('\n');
const [major, minor, patch] = lines[1]
    .split(' = ')[1]
    .trim()
    .replaceAll("'", '')
    .replace(';', '')
    .split('.')
    .map((x) => parseInt(x));

console.log(major, minor, patch);

lines.splice(1, 1, `const version = '${major}.${minor}.${patch + 1}';`);

console.log(lines);

await writeFile(path, lines.join('\n'));
