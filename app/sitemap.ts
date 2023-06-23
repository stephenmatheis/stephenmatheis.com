import { getPosts } from '@/lib/get-posts';

export default async function sitemap() {
    const posts = await getPosts();
    const blogs = posts.map((post: any) => ({
        url: `https://stephenmatheis/posts/${post.slug}`,
        lastModified: new Date(post.lastModified).toISOString().split('T')[0],
    }));
    const routes = ['', '/posts'].map((route) => ({
        url: `https://stephenmatheis.com${route}`,
        lastModified: new Date().toISOString().split('T')[0],
    }));

    return [...routes, ...blogs];
}
