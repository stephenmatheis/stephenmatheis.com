import { Page } from '@/components/page';
import { Main } from '@/components/main';
import { Memoji } from '@/components/memoji';

export default function RootPage() {
    return (
        <Page
            links={[
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
                    label: 'Login',
                    path: '/login',
                },
            ]}
        >
            <Main columns={2}>
                <Memoji />
            </Main>
        </Page>
    );
}
