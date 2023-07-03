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
                { label: 'Markdown', path: '/posts/markdown', newTab: true },
                { label: 'All posts', path: '/archive' },
            ]}
        >
            <Main columns={2}>
                <Posts posts={posts} />
            </Main>
        </Page>
    );
}
