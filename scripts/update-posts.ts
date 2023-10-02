// Modified from: https://www.adamcollier.co.uk/posts/adding-an-updated-date-to-markdown-and-mdx-posts/

import matter from 'gray-matter';
import { writeFile } from 'fs/promises';
import { success, mod, cyan } from '@/utils/log.ts';

const [, , ...mdFilePaths]: string[] = process.argv;
const today: string = Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
    timeStyle: 'long',
})
    .format(new Date())
    .replace('at ', '');

console.log(cyan(`Today's date is ${today}\n`));

if (!mdFilePaths.length) {
    console.log('No staged md or mdx files.\n');
    process.exit();
}

mdFilePaths.forEach(async (path: string): Promise<void> => {
    const file = matter.read(path);
    const { data: currentData, content } = file;
    const updatedData = {
        ...currentData,
    };

    // Update Last Modified
    if (currentData.lastModified) {
        updatedData.lastModified = today;

        console.log('Updated file:', currentData.title);
        console.log(success(), `Created on: ${today} \n`);
        console.log(success(), `Last updated: ${today} \n`);
    } else {
        updatedData.lastModified = updatedData.date;

        console.log('New file:', currentData.title);
        console.log(success(), `Created on: ${today} \n`);
    }

    const updatedFileContent = matter.stringify(content, updatedData);

    writeFile(path, updatedFileContent);
});
