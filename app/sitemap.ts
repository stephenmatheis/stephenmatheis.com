import { MetadataRoute } from 'next';
// import { getPosts } from '@/lib/get-posts';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // const posts = await getPosts();
    // const blogs = posts.map((post: any) => ({
    //     url: `https://stephenmatheis/posts/${post.slug}`,
    //     lastModified: post.lastModified
    //         ? new Date(post.lastModified).toISOString().split('T')[0]
    //         : '',
    // }));
    // const routes = ['', '/posts', '/about', '/rss', '/markdown', '/json'].map(
    //     (route) => ({
    //         url: `https://stephenmatheis.com${route}`,
    //         lastModified: new Date().toISOString().split('T')[0],
    //     })
    // );
    const routes = [''].map((route) => ({
        url: `https://stephenmatheis.com${route}`,
        lastModified: new Date().toISOString().split('T')[0],
    }));

    // return [...routes, ...blogs];
    return routes;
}
