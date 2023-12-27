import type { Metadata } from 'next';
import { Page } from '@/components/page';
import { Content } from '@/components/content';
import { Main } from '@/components/main';

export const metadata: Metadata = {
    title: 'Resume',
    description: `Stephen Matheis' Resume.`,
};

export default function ResumePage() {
    return (
        <Page
            anchors={[
                { label: 'Projects', path: '/#projects' },
                { label: 'Contact', path: '/#contact' },
                {
                    label: 'Resume',
                    path: '/resume.pdf',
                    newTab: true,
                },
            ]}
            links={[
                {
                    label: 'Resume',
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
