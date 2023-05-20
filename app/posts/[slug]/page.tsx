import getPosts, { getPost } from '@/lib/get-posts';
import Body from './components/body';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    const posts = await getPosts();
    // The params to pre-render the page with.
    // Without this, the page will be rendered at runtime
    return posts.map((post: { slug: string }) => ({
        params: { slug: post.slug },
    }));
}

export default async function Page({
    params,
}: {
    params: {
        slug: string;
    };
}) {
    const post = await getPost(params.slug);

    if (!post) return notFound();

    return <Body>{post?.body}</Body>;
}
