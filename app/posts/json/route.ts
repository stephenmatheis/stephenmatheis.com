import { generateFeed } from '@/lib/generate-feed';

export async function GET() {
    const feed = await generateFeed('json');
    const rss = feed.json1();

    return new Response(rss, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
