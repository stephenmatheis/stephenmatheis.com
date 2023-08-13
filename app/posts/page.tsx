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

    // TODO: Move RSS link to top near title
    return (
        <Page
            noHeader
            links={[
                { label: 'More posts', path: '/archive' },
            ]}
        >
            <Main>
                <Posts posts={posts} />
            </Main>
        </Page>
    );
}
