import { Page } from '@/components/page';
import { Main } from '@/components/main';
import { Memoji } from '@/components/memoji';

export default function RootPage() {
    return (
        <Page
            links={[
                {
                    label: 'Settings',
                    path: '/settings',
                },
            ]}
        >
            <Main columns={2}>
                {/* <Memoji /> */}
            </Main>
        </Page>
    );
}
