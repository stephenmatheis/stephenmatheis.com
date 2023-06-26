import type { Metadata } from 'next';
import { Page } from '@/components/page';
import { Content } from './components/content';
import { Main } from '@/components/main';

export const metadata: Metadata = {
    title: 'Resume',
    description: 'My resume and contact information.',
};

export default function ResumePage() {
    return (
        <Page
            links={[
                {
                    label: 'Donwload a copy',
                    path: '/resume.pdf',
                    newTab: true,
                },
            ]}
        >
            <Main>
                <Content />
            </Main>
        </Page>
    );
}
