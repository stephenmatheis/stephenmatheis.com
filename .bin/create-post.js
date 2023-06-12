#!/usr/bin/env node

import { exec } from 'child_process';
import { writeFile, access } from 'fs/promises';

const [name, ...rest] = process.argv.slice(2);

// Exit if no name is provided
if (!name) {
    console.log('\nMissing a name. Try this:\n');
    console.log('\tnpx post Name of post\n');
    process.exit();
}

const slug = name.toLowerCase().replaceAll(' ', '-');
const path = `./_posts/${slug}.mdx`;
const doesExist = await exists(path);

if (doesExist) {
    console.log(`\nA post titled "${name}" already exists at: \n\n\t_posts/${slug}.mdx.\n`);
    process.exit();
}

const date = new Date().toISOString();
const text = `---
title: '${formatName(name)}'
date: '${date}'
lastModified: '${date}'
author: Stephen Matheis
---


`;

await writeFile(path, text);

exec(`code ${path}:8:1 -g`);

// Functions

async function exists(path) {
    try {
        await access(path);
        return true;
    } catch {
        return false;
    }
}

function formatName(name) {
    const formatted = name.replaceAll('-', ' ');

    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}
