import fs from 'node:fs';
import path from 'node:path';

export function raw(file: string) {
    return fs.readFileSync(path.join(process.cwd(), file), 'utf8');
}
