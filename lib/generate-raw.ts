import getPosts from './get-posts';

export async function generateRaw() {
    const posts = await getPosts();
    const raw = posts.map(({ raw }: { raw: string }) => {
        return raw;
    });

    return raw.join('\n\n');
}
