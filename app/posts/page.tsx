import type { Metadata } from 'next';
import { Page } from '@/components/page';
import { Main } from '@/components/main';
import { PostsList } from '@/components/posts-list';
import getPosts from '@/lib/get-posts';

export const metadata: Metadata = {
    title: 'Posts',
    description: 'All blog posts.',
};

export default async function PostsPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const posts = await getPosts();

    return (
        <Page
            links={[
                { label: 'RSS', path: '/posts/rss', newTab: true },
                { label: 'JSON', path: '/posts/json', newTab: true },
                { label: 'Markdown', path: '/posts/markdown', newTab: true },
            ]}
        >
            <Main>
                <PostsList
                    posts={posts}
                    tags={
                        searchParams.tags
                            ? (searchParams.tags as string).split(',')
                            : []
                    }
                />
            </Main>
        </Page>
    );
}
