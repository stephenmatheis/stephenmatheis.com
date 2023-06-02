import { Page } from '@/components/page';
import { Main } from './components/main';

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
            <Main />
        </Page>
    );
}
