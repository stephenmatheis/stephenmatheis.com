import { generateFeed } from '@/lib/generate-feed';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
    const slug = req.nextUrl.pathname
        .replace('/posts/', '')
        .replace('/json', '');
    const feed = await generateFeed('json');
    const post = feed.items.find(
        ({ id }) => id === `https://stephenmatheis.com/posts/${slug}`
    );

    return new Response(JSON.stringify(post, null, 4), {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
