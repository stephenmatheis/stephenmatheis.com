import { Page } from '@/components/page';
import { Main } from '@/components/main';
import { Posts } from './components/posts';
import getPosts from '@/lib/get-posts';

export default async function PostsPage() {
    const posts = await getPosts();

    return (
        <Page links={[{ label: 'Home', path: '/' }]}>
            <Main columns={2}>
                <Posts posts={posts} />
            </Main>
        </Page>
    );
}
