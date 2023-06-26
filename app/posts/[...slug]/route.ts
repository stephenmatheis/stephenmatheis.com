import { getPost } from '@/lib/get-posts';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
    const slug = req.nextUrl.pathname
        .replace('/posts/', '')
        .replace('/raw', '');
    const { raw } = await getPost(slug);

    return new Response(raw, {
        headers: {
            'Content-Type': 'text/plain',
        },
    });
}
