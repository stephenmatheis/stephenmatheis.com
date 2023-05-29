import Page from '@/components/page';
import PostsList from './components/posts-list';
import getPosts from '@/lib/get-posts';
import Comment from '@/components/comment';

export default async function PostsPage() {
    const posts = await getPosts();

    return (
        <Page links={[{ label: 'Home', path: '/' }]}>
            <main>
                <Comment text="Posts" />
                <PostsList posts={posts} />
            </main>
        </Page>
    );
}
