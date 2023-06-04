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

// Check if post with the same name already exists
const path = `./_posts/${name.toLocaleLowerCase().replace(' ', '-')}.mdx`;
const doesExist = await exists(path);

if (doesExist) {
    console.log(`\nA post with name "${name}" already exists.\n`);
    process.exit();
}

async function exists(path) {
    try {
        await access(path);
        return true;
    } catch {
        return false;
    }
}

const date = new Date().toISOString();
const text = `---
title: '${name}'
date: '${date}'
lastModified: '${date}'
author: Stephen Matheis
---


`;

await writeFile(path, text);

exec(`code ${path}:8:1 -g`);
