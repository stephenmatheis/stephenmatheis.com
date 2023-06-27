#!/usr/bin/env tsx
/// <reference lib="esnext" />

import { exec } from 'child_process';
import { writeFile, access } from 'fs/promises';

const [name, ...rest]: string[] = process.argv.slice(2);

// Exit if no name is provided
if (!name) {
    console.log('\nMissing a name. Try this:\n');
    console.log('\tnpx post Name of post\n');
    process.exit();
}

// FIXME: Replace characters or encode URI
const slug: string = name
    .toLowerCase()
    .replaceAll(' ', '-')
    .replaceAll(',', '')
    .replaceAll('.', '_');
const path: string = `./_posts/${slug}.mdx`;
const doesExist: boolean = await exists(path);

if (doesExist) {
    console.log(
        `\nA post titled "${name}" already exists at: \n\n\t_posts/${slug}.mdx.\n`
    );
    process.exit();
}

const date: string = new Date().toLocaleDateString('en-US', {
    dateStyle: 'long',
    timeZone: process.env.NEXT_PUBLIC_TIME_ZONE,
});
const text = `---
title: ${formatName(name)}
date: ${date}
lastModified: ${date}
author: Stephen Matheis
---


`;

await writeFile(path, text);

exec(`code ${path}:8:1 -g`);

// Functions

async function exists(path: string): Promise<boolean> {
    try {
        await access(path);
        return true;
    } catch {
        return false;
    }
}

function formatName(name: string): string {
    const formatted = name.replaceAll('-', ' ');

    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}
