import type { Metadata } from 'next';
import { Page } from '@/components/page';
import { Main } from '@/components/main';
import { Controls } from './components/controls';

export const metadata: Metadata = {
    title: 'Settings',
    description: "Change the site's look and feel.",
};

export default function SettingsPage() {
    return (
        <Page
            links={[
                {
                    label: 'Home',
                    path: '',
                },
            ]}
        >
            <Main columns={2}>
                <Controls />
            </Main>
        </Page>
    );
}
