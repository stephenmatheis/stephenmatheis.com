import { Page } from '@/components/page';
import { Content } from './components/content';
import { Main } from '@/components/main';

export default function ResumePage() {
    return (
        <Page
            links={[
                {
                    label: 'Donwload a copy',
                    path: '/resume.pdf',
                    external: true,
                },
            ]}
        >
            <Main>
                <Content />
            </Main>
        </Page>
    );
}
