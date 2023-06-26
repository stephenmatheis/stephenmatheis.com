// Modified from: https://www.adamcollier.co.uk/posts/adding-an-updated-date-to-markdown-and-mdx-posts/

import matter from 'gray-matter';
import { writeFile } from 'fs/promises';
import { success, mod, cyan } from '@/utils/log.ts';

const [, , ...mdFilePaths]: string[] = process.argv;
const today: string = new Date().toLocaleDateString('en-US', {
    dateStyle: 'long',
    timeZone: process.env.NEXT_PUBLIC_TIME_ZONE,
});

console.log(cyan(`Today's date is ${today}\n`));

if (!mdFilePaths.length) {
    console.log('No staged md or mdx files.\n');
    process.exit();
}

mdFilePaths.forEach(async (path: string): Promise<void> => {
    const file = matter.read(path);
    const { data: currentData } = file;
    const updatedData = {
        ...currentData,
        lastModified: today,
    };

    console.log('Title:', currentData.title);
    console.log('Last Upated:', currentData.lastModified);

    if (currentData.lastModified === updatedData.lastModified) {
        console.log(success(), 'Up to date\n');
        return;
    }

    console.log(mod(), 'Modified\n');

    file.data = updatedData;

    const updatedFileContent = matter.stringify(file, {});

    writeFile(path, updatedFileContent);
});
