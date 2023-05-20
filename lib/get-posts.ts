import { cache } from 'react';
import matter from 'gray-matter';
import path, { join } from 'path';
import fs from 'fs/promises';
import type { Post } from './types';

export const getPosts = cache(async (): Promise<any> => {
    const postsDirectory = join(process.cwd(), '_posts');
    const posts = await fs.readdir(postsDirectory);

    const postsWithMetadata = await Promise.all(
        posts
            .filter((file) => path.extname(file) === '.mdx')
            .map(async (file) => {
                const filePath = join(postsDirectory, file);
                const postContent = await fs.readFile(filePath, 'utf8');
                const { data, content } = matter(postContent);

                if (data.published === false) {
                    return null;
                }

                return {
                    ...data,
                    body: content,
                    slug: path.parse(file).name,
                } as Post;
            })
    );
    const sorted = postsWithMetadata.sort((a, b) =>
        a && b ? new Date(b.date).getTime() - new Date(a.date).getTime() : 0
    ) as Post[];

    return sorted;
});

export async function getPost(slug: string) {
    const posts = await getPosts();
    return posts.find((post: any) => post.slug === slug);
}

export default getPosts;
