import type { Metadata } from 'next';
import { Page } from '@/components/page';
import { Main } from '@/components/main';
import { Posts } from '@/components/posts';
import getPosts from '@/lib/get-posts';

export const metadata: Metadata = {
    title: 'Blog',
    description: `Stephen Matheis' blog front page.`,
};

export default async function RootPage() {
    const posts = await getPosts();

    return (
        <Page links={[{ label: 'RSS', path: '/posts/rss', newTab: true }]}>
            <Main>
                <Posts posts={posts} />
            </Main>
        </Page>
    );
}
