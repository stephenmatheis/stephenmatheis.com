import { Page } from '@/components/page';
import { Main } from '@/components/main';

export default function RootPage() {
    return (
        <Page
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
