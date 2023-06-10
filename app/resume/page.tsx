import { Page } from '@/components/page';
import { Content } from './components/content';
import { Main } from '@/components/main';

export default function ResumePage() {
    return (
        <Page links={[{ label: 'Donwload a copy', path: '/resume.pdf' }]}>
            <Main>
                <Content />
            </Main>
        </Page>
    );
}
