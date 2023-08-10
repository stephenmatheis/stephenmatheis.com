import type { Metadata } from 'next';
import { Main } from '@/components/main';
import { Page } from '@/components/page';
import { Menu } from '@/components/menu';
import { Box } from '@/components/box';

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
                {/* <Menu
                    buttons={[
                        {
                            label: 'Hi',
                            action() {
                                alert('Hi!');
                            },
                        },
                    ]}
                /> */}
                <Box>
                    <div
                        style={{
                            display: 'grid',
                            placeContent: 'center',
                            height: '300px',
                            color: 'var(--primary)'
                        }}
                    >
                        Box
                    </div>
                </Box>
            </Main>
        </Page>
    );
}
