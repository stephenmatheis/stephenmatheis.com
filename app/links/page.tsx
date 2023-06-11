import { Page } from '@/components/page';
import { Main } from '@/components/main';
import { Posts } from './components/posts';
import getPosts from '@/lib/get-posts';
import styles from './page.module.scss';

export default async function LinksPage() {
    const posts = await getPosts();

    return (
        <Page links={[{ label: 'Home', path: '/' }]}>
            <Main columns={2} right={{ className: styles.gap }}>
                <Posts posts={posts} />
            </Main>
        </Page>
    );
}
