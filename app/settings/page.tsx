import type { Metadata } from 'next';
import { Page } from '@/components/page';
import { Main } from '@/components/main';
import { Controls } from './controls';

export const metadata: Metadata = {
    title: 'Resume',
    description: 'My resume and contact information.',
};

export default function SettingsPage() {
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
                <Controls />
            </Main>
        </Page>
    );
}
