import type { Metadata } from 'next';
import { Main } from '@/components/main';
import { Page } from '@/components/page';
import { Projects } from '@/components/projects';

export const metadata: Metadata = {
    title: 'Projects',
    description:
        'List of links to my projects. Each entry includes an example image and a description.',
};

export default function ProjectsPage({}) {
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
            <Main columns={2}>
                <Projects displayImages={true} />
            </Main>
        </Page>
    );
}
