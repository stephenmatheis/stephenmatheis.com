import getPosts from '@/lib/get-posts';
import { Metadata } from 'next/types';

export async function generateMetadata({
    params,
}: {
    params: {
        slug: string;
    };
}): Promise<Metadata> {
    const post = (await getPosts()).find((p) => p?.slug === params.slug);

    return {
        title: `Posts | ${post?.title}`,
        description: post?.description,
    };
}
