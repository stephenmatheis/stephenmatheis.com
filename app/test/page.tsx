import type { Metadata } from 'next';
import { Page } from '@/components/page';
import { Main } from '@/components/main';
import { Tabs, Tab } from './components/tabs';

export const metadata: Metadata = {
    title: 'Settings',
    description: "Change the site's look and feel.",
};

export default function DrawingsPage() {
    return (
        <Page
            links={[
                {
                    label: 'Home',
                    path: '/',
                },
            ]}
        >
            <Main columns={2}>
                <Tabs>
                    <Tab title="select-grid.tsx">
                        <div>TSX</div>
                    </Tab>
                    <Tab title="select-grid.module.scss">
                        <div>SCSS</div>
                    </Tab>
                </Tabs>
            </Main>
        </Page>
    );
}
