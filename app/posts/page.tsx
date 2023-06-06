import { Page } from '@/components/page';
import { Main } from '@/components/main';
import { PostsList } from './components/posts-list';
import getPosts from '@/lib/get-posts';

export default async function PostsPage() {
    const posts = await getPosts();

    return (
        <Page links={[{ label: 'Home', path: '/' }]}>
            <Main columns={2}>
                <PostsList posts={posts} />
            </Main>
        </Page>
    );
}
