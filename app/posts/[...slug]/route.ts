import { getPost } from '@/lib/get-posts';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
    const slug = req.nextUrl.pathname
        .replace('/posts/', '')
        .replace('/raw', '');
    // const { raw } = await getPost(slug);

    console.log(slug, req.nextUrl);

    return new Response('test', {
        headers: {
            'Content-Type': 'text/plain',
        },
    });
}
