import type { Metadata } from 'next';
import { Page } from '@/components/page';
import { Content } from '@/components/content';
import { Main } from '@/components/main';

export const metadata: Metadata = {
    title: 'About',
    description: `My about page.`,
};

export default function AboutPage() {
    return (
        <Page
            anchors={[
                { label: 'Projects', path: '/about/#projects' },
                { label: 'Contact', path: '/about/#contact' },
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
