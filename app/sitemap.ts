import { MetadataRoute } from 'next';
import { getPosts } from '@/lib/get-posts';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const posts = await getPosts();
    const blogs = posts.flatMap((post: any) => [
        {
            url: `https://stephenmatheis/posts/${post.slug}`,
            lastModified: post.lastModified
                ? new Date(post.lastModified).toISOString().split('T')[0]
                : '',
        },
        {
            url: `https://stephenmatheis/posts/${post.slug}/json`,
            lastModified: post.lastModified
                ? new Date(post.lastModified).toISOString().split('T')[0]
                : '',
        },
        {
            url: `https://stephenmatheis/posts/${post.slug}/markdown`,
            lastModified: post.lastModified
                ? new Date(post.lastModified).toISOString().split('T')[0]
                : '',
        },
    ]);
    const routes = [
        '',
        '/about',
        '/blog',
        '/posts',
        '/posts/rss',
        '/posts/markdown',
        '/posts/json',
    ].map((route) => ({
        url: `https://stephenmatheis.com${route}`,
        lastModified: new Date().toISOString().split('T')[0],
    }));

    return [...routes, ...blogs];
}
