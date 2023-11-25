import type { Metadata } from 'next';
import { Page } from '@/components/page';
import { Content } from '@/components/content';
import { Main } from '@/components/main';

export const metadata: Metadata = {
    title: 'About',
    description: 'My resume and contact information.',
};

export default function ResumePage() {
    return (
        <Page
            links={[
                {
                    label: 'Download a copy',
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
