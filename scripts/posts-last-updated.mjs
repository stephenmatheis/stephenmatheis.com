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
    const lastModified = new Date(stats.mtime);
    const updatedData = {
        ...currentData,
        lastModified: lastModified.toISOString(),
    };

    fileMatter.data = updatedData;
    const updatedFileContent = matter.stringify(fileMatter);
    fs.writeFile(filePath, updatedFileContent);
    fs.utimes(filePath, lastModified, lastModified);
});
