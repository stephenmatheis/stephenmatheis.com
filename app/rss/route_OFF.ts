import { generateFeed } from '@/lib/generate-feed';

export async function GET() {
    const feed = await generateFeed('rss');
    const rss = feed.rss2();

    return new Response(rss, {
        headers: {
            'Content-Type': 'text/xml',
        },
    });
}
