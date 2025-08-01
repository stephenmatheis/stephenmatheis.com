import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const routes = [''].map((route) => ({
        url: `https://stephenmatheis.com${route}`,
        lastModified: new Date().toISOString().split('T')[0],
    }));

    return routes;
}
