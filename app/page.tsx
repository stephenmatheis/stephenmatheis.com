import { Page } from '@/components/page';
import { Main } from '@/components/main';

export default function RootPage() {
    return (
        <Page
            noHeader
            noFooter
            links={[
                {
                    label: 'Settings',
                    path: '/settings',
                },
            ]}
        >
            <Main />
        </Page>
    );
}
