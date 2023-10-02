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
    const { data, content } = file;
    const { lastModified, date, status } = data;
    const updatedData = {
        ...data,
        lastModified: status === 'draft' ? '' : !lastModified ? date : today,
    };

    // if (status === 'draft') {
    //     updatedData.lastModified = '';
    // } else if (status === 'published') {
    //     if (!lastModified) {
    //         updatedData.lastModified = date;
    //     } else {
    //         updatedData.lastModified = today;
    //     }
    // }

    const updatedFileContent = matter.stringify(content, updatedData);

    writeFile(path, updatedFileContent);
});
