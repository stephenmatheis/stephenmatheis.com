import type { Metadata } from 'next';
import { Page } from '@/components/page';
import { Main } from '@/components/main';
import { PostsList } from '@/components/posts-list';
import getPosts from '@/lib/get-posts';

export const metadata: Metadata = {
    title: 'Archive',
    description: 'All posts.',
};

export default async function PostsPage() {
    const posts = await getPosts();

    return (
        <Page
            links={[
                { label: 'Home', path: '/' },
                { label: 'RSS', path: '/rss', newTab: true },
                { label: 'JSON', path: '/json', newTab: true },
                { label: 'Markdown', path: '/markdown', newTab: true },
                { label: 'About', path: '/about' },
            ]}
        >
            <Main>
                <PostsList posts={posts} />
            </Main>
        </Page>
    );
}
