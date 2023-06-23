import matter from 'gray-matter';
import { join } from 'path';
import fs from 'fs/promises';

const postsDirectory = join(process.cwd(), '_posts');
const posts = await fs.readdir(postsDirectory);

posts.forEach(async (file) => {
    const filePath = join(postsDirectory, file);
    const stats = await fs.stat(filePath);
    const fileMatter = matter.read(filePath);
    const { data: currentData } = fileMatter;
    const updatedData = {
        ...currentData,
        lastModified: new Date(stats.mtime).toISOString(),
    };

    console.log(new Date(stats.mtime).toISOString());

    fileMatter.data = updatedData;
    const updatedFileContent = matter.stringify(fileMatter);
    fs.writeFile(filePath, updatedFileContent);
});
