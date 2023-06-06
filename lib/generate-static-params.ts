import getPosts from '@/lib/get-posts';

export async function generateStaticParams() {
    const posts = await getPosts();

    return posts.map(({ slug }: { slug: string }) => ({ slug }));
}
