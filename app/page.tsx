import { Page } from '@/components/page';
import { Console } from '@/components/console';

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
            <Console />
        </Page>
    );
}
