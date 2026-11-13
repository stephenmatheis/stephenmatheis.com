import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';

import { marked } from 'marked';
import { parse } from 'yaml';

export type Entry = {
    slug: string;
    title: string;
    type: string;
    topic: string;
    added: string;
    updated?: string;
    tags: string[];
    html: string;
};

const directory = path.join(process.cwd(), 'library');
const frontmatterPattern = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;

function readEntry(file: string): Entry {
    const source = readFileSync(path.join(directory, file), 'utf8');
    const match = source.match(frontmatterPattern);

    if (!match) {
        throw new Error(`library/${file} has no frontmatter`);
    }

    const [, frontmatter, body] = match;
    const data = parse(frontmatter);

    if (!data.topic) {
        throw new Error(`library/${file} has no topic`);
    }

    return {
        slug: file.replace(/\.mdx?$/, ''),
        title: data.title,
        type: data.type,
        topic: data.topic,
        added: String(data.added),
        updated: data.updated ? String(data.updated) : undefined,
        tags: data.tags ?? [],
        html: marked.parse(body, { async: false }),
    };
}

export function getEntries() {
    return readdirSync(directory)
        .filter((file) => file.endsWith('.md'))
        .map(readEntry)
        .sort((a, b) => a.title.localeCompare(b.title));
}

export function getEntry(slug: string) {
    return getEntries().find((entry) => entry.slug === slug);
}

export function getTopics() {
    const topics = new Map<string, Entry[]>();

    const newestFirst = getEntries().sort((a, b) => b.added.localeCompare(a.added) || a.title.localeCompare(b.title));

    for (const entry of newestFirst) {
        topics.set(entry.topic, [...(topics.get(entry.topic) ?? []), entry]);
    }

    return [...topics].sort(([a], [b]) => a.localeCompare(b));
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const isoDatePattern = /^(\d{4})-(\d{2})-(\d{2})$/;

export function isDate(value: string) {
    return isoDatePattern.test(value);
}

export function formatDate(value: string) {
    const match = value.match(isoDatePattern);

    if (!match) {
        return value;
    }

    const [, year, month, day] = match;

    return `${day} ${MONTHS[Number(month) - 1]} ${year}`;
}
