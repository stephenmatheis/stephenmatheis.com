import { Page } from '@/components/page';
import { Main } from '@/components/main';
import { Memoji } from '@/components/memoji';

export default function RootPage() {
    return (
        <Page
            links={[
                {
                    label: 'GitHub',
                    path: 'https://github.com/stephenmatheis',
                    external: true,
                },
            ]}
        >
            <Main columns={2}>
                <Memoji />
            </Main>
        </Page>
    );
}
