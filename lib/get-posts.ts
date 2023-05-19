import matter from 'gray-matter';
import path, { join } from 'path';
import fs from 'fs/promises';
import { cache } from 'react';

export const getPosts = cache(async (): Promise<any> => {
    const postsDirectory = join(process.cwd(), '_posts');
    const posts = await fs.readdir(postsDirectory);

    return Promise.all(
        posts
            .filter((file) => path.extname(file) === '.mdx')
            .map(async (file) => {
                const filePath = join(postsDirectory, file);
                const postContent = await fs.readFile(filePath, 'utf8');
                const { data, content } = matter(postContent);

                if (data.published === false) {
                    return null;
                }

                return { ...data, body: content, slug: path.parse(file).name };
            })
    );
});

export async function getPost(slug: string) {
    const posts = await getPosts();
    return posts.find((post: { slug: string }) => post.slug === slug);
}

export default getPosts;
