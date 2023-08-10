import type { Metadata } from 'next';
import { Page } from '@/components/page';
import { Main } from '@/components/main';
import { Posts } from './components/posts';
import getPosts from '@/lib/get-posts';

export const metadata: Metadata = {
    title: 'Posts',
    description: 'The 20 most recent posts.',
};

export default async function PostsPage() {
    const posts = await getPosts();

    return (
        <Page
            links={[
                { label: 'All posts', path: '/archive' },
                {
                    label: 'RSS',
                    path: '/rss',
                    newTab: true,
                },
                {
                    label: 'JSON',
                    path: '/json',
                    newTab: true,
                },
                {
                    label: 'Markdown',
                    path: '/posts/markdown',
                    newTab: true,
                },
            ]}
        >
            <Main columns={2}>
                <Posts posts={posts} />
            </Main>
        </Page>
    );
}
