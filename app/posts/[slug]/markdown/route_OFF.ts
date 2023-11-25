import { getPost } from '@/lib/get-posts';
import { Post } from '@/lib/types';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
    const slug = req.nextUrl.pathname
        .replace('/posts/', '')
        .replace('/markdown', '');
    const { raw } = (await getPost(slug)) as Post;

    // console.log('Slug:', slug);
    // console.log('Next URL:', req.nextUrl);

    return new Response(raw, {
        headers: {
            'Content-Type': 'text/plain',
        },
    });
}
