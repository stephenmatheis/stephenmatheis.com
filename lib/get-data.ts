import getPosts from '@/lib/get-posts';

export async function getData({ slug }: { slug: string }): Promise<any> {
    const posts = await getPosts();
    const postIndex = posts.findIndex((p) => p?.slug === slug);
    const post = posts[postIndex];

    if (!post) {
        return undefined;
    }

    const { ...rest } = post;

    return {
        previous: posts[postIndex + 1] || null,
        next: posts[postIndex - 1] || null,
        id: postIndex,
        ...rest,
    };
}
