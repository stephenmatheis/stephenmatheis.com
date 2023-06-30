import { cache } from 'react';
import matter from 'gray-matter';
import path, { join } from 'path';
import { readFile, readdir, stat } from 'fs/promises';
import type { Post } from './types';

function getFirstTwoSentences(str: string): string {
    const sentences = str.match(/(.*?[.!?])\s+/g)?.join(' ');

    return sentences ? sentences.slice(0, 80 * 3) + '' : '';
}

export const getPosts = cache(async (): Promise<any> => {
    const postsDirectory = join(process.cwd(), '_posts');
    const posts = await readdir(postsDirectory);

    const postsWithMetadata = await Promise.all(
        posts
            .filter((file) => path.extname(file) === '.mdx')
            .map(async (file) => {
                const filePath = join(postsDirectory, file);
                const postContent = await readFile(filePath, 'utf8');
                const { birthtime } = await stat(filePath);
                const { data, content } = matter(postContent);

                return {
                    ...data,
                    ...(data.tags ? { tags: data.tags.sort() } : {}),
                    created: birthtime,
                    excerpt: getFirstTwoSentences(content),
                    body: content,
                    slug: path.parse(file).name,
                    raw: postContent,
                } as Post;
            })
    );
    const sorted = postsWithMetadata.sort((a, b) =>
        a && b
            ? new Date(b.created).getTime() - new Date(a.created).getTime()
            : 0
    ) as Post[];

    return sorted;
});

export async function getPost(slug: string) {
    const posts = await getPosts();
    return posts.find((post: any) => post.slug === slug);
}

export default getPosts;
