import matter from 'gray-matter';
import { join } from 'path';
import fs from 'fs/promises';

const postsDirectory = join(process.cwd(), '_posts');
const posts = await fs.readdir(postsDirectory);

// FIXME: This runs on all posts.
// Filter to only run on posts that have been modified.
posts.forEach(async (file) => {
    const filePath = join(postsDirectory, file);
    const stats = await fs.stat(filePath);
    const fileMatter = matter.read(filePath);
    const { data: currentData } = fileMatter;
    const lastModified = new Date(stats.mtime).toLocaleDateString('en-US', {
        dateStyle: 'long',
        timeZone: process.env.NEXT_PUBLIC_TIME_ZONE,
    });
    const updatedData = {
        ...currentData,
        lastModified,
    };

    console.log(currentData.title);
    console.log(currentData.lastModified);
    console.log(updatedData.lastModified);

    if (currentData.lastModified === updatedData.lastModified) {
        console.log('not modified, skip');
        console.log('---');

        return;
    }

    console.log('modified');
    console.log('---');

    // return;

    fileMatter.data = updatedData;
    const updatedFileContent = matter.stringify(fileMatter);
    await fs.writeFile(filePath, updatedFileContent);
    await fs.utimes(filePath, stats.mtime, stats.mtime);
});
