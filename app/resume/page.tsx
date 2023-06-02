import { Page } from '@/components/page';
import { Main } from './components/main';

export default function ResumePage() {
    return (
        <Page links={[{ label: 'Donwload a copy', path: '/resume.pdf' }]}>
            <Main />
        </Page>
    );
}
