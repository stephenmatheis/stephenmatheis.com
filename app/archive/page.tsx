import type { Metadata } from 'next';
import { Fallback } from '@/components/fallback';
import { Page } from '@/components/page';
import { Main } from '@/components/main';
import { PostsList } from './components/posts-list';
import { Suspense } from 'react';
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
            <Main>
                <Suspense fallback={<Fallback />}>
                    <PostsList posts={posts} />
                </Suspense>
            </Main>
        </Page>
    );
}
