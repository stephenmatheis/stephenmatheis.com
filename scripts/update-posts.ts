// Modified from: https://www.adamcollier.co.uk/posts/adding-an-updated-date-to-markdown-and-mdx-posts/

import matter from 'gray-matter';
import { writeFile } from 'fs/promises';

const [, , ...mdFilePaths]: string[] = process.argv;
const today: string = Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
    timeStyle: 'long',
})
    .format(new Date())
    .replace('at ', '');

if (!mdFilePaths.length) {
    console.log('No staged md or mdx files.\n');
    process.exit();
}

mdFilePaths.forEach(async (path: string): Promise<void> => {
    const file = matter.read(path);
    const { data: currentData, content } = file;
    const updatedData = {
        ...currentData,
        lastModified: currentData.lastModified ? today : currentData.date,
    };

    const updatedFileContent = matter.stringify(content, updatedData);

    writeFile(path, updatedFileContent);
});
