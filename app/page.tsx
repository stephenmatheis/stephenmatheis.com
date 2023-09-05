import type { Metadata } from 'next';
import { Page } from '@/components/page';
import { Main } from '@/components/main';
import { Posts } from '@/components/posts';
import getPosts from '@/lib/get-posts';

export const metadata: Metadata = {
    title: 'Posts',
    description: 'The 20 most recent posts.',
};

export default async function RootPage() {
    const posts = await getPosts();

    return (
        <Page
            links={[
                { label: 'More posts', path: '/posts' },
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
