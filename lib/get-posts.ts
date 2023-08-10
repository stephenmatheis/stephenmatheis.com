import { cache } from 'react';
import matter from 'gray-matter';
import path, { join } from 'path';
import { readFile, readdir } from 'fs/promises';
import type { Post } from './types';

function getFirstTwoSentences(str: string): string {
    const sentences = str.match(/(.*?[.!?])\s+/g)?.join(' ');

    return sentences ? sentences.slice(0, 80 * 3) + '' : '';
}

export const getPosts = cache(async (): Promise<Post[]> => {
    const postsDirectory = join(process.cwd(), '_posts');
    const posts = await readdir(postsDirectory);

    const postsWithMetadata = await Promise.all(
        posts
            .filter((file) => path.extname(file) === '.mdx')
            .map(async (file) => {
                const filePath = join(postsDirectory, file);
                const postContent = await readFile(filePath, 'utf8');
                const { data, content } = matter(postContent);
                const { date } = data;

                return {
                    ...data,
                    ...(data.tags ? { tags: data.tags.sort() } : {}),
                    created: date,
                    excerpt: getFirstTwoSentences(content),
                    body: content,
                    slug: path.parse(file).name,
                    raw: postContent,
                } as Post;
            })
    );
    const sorted = postsWithMetadata
        .filter(({ status }) => status !== 'draft')
        .sort((a, b) =>
            a && b
                ? new Date(b.created).getTime() - new Date(a.created).getTime()
                : 0
        ) as Post[];

    return sorted;
});

export async function getPost(slug: string): Promise<Post | undefined> {
    const posts = await getPosts();

    return posts.find((post: any) => post.slug === slug);
}

export default getPosts;
