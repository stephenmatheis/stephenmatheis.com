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
            links={[
                { label: 'Posts', path: '/posts' },
                { label: 'RSS', path: '/rss', newTab: true },
                { label: 'About', path: '/about' },
            ]}
        >
            <Main>
                <Posts posts={posts} />
            </Main>
        </Page>
    );
}
