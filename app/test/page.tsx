import type { Metadata } from 'next';
import { Main } from '@/components/main';
import { Page } from '@/components/page';
import { Menu } from '@/components/menu';

export const metadata: Metadata = {
    title: 'Test',
    description: 'Test page.',
};

export default function ProjectsPage({}) {
    return (
        <Page
            links={[
                {
                    label: 'Home',
                    path: '',
                    newTab: true,
                },
            ]}
        >
            <Main columns={2}>
                <Menu />
            </Main>
        </Page>
    );
}
