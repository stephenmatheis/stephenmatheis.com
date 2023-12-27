import type { Metadata } from 'next';
import { Page } from '@/components/page';
import { Main } from '@/components/main';
import { Posts } from '@/components/posts';
import getPosts from '@/lib/get-posts';

export const metadata: Metadata = {
    title: 'Stephen Matheis',
    description: `The personal website and blog of Stephen Matheis. Copyright (C) ${new Date().getFullYear()} Stephen Matheis.`,
};

export default async function RootPage() {
    const posts = await getPosts();

    return (
        <Page
            anchors={[{ label: 'RSS', path: '/rss', newTab: true }]}
            links={[{ label: 'RSS', path: '/rss', newTab: true }]}
        >
            <Main>
                <Posts posts={posts} />
            </Main>
        </Page>
    );
}
