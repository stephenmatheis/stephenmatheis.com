import Page from '@/components/page';
import Main from './components/main';

export default async function PostsPage() {
    return (
        <Page links={[{ label: 'Home', path: '/' }]}>
            {/* @ts-expect-error Async Server Component */}
            <Main />
        </Page>
    );
}
