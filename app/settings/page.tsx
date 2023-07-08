import { cookies } from 'next/headers';
import type { Metadata } from 'next';
import { Page } from '@/components/page';
import { Main } from '@/components/main';
import { Controls } from './components/controls';
import { Auth } from '@/components/auth';

export const metadata: Metadata = {
    title: 'Settings',
    description: "Change the site's look and feel.",
};

export default function SettingsPage() {
    const cookieStore = cookies();
    const name = cookieStore.get('name') as { name: string; value: string };

    return (
        <Page
            links={
                !name
                    ? [
                          {
                              label: 'Login',
                              path: `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}`,
                          },
                      ]
                    : []
            }
        >
            <Main columns={2}>
                <Controls />
            </Main>
            <Auth />
        </Page>
    );
}
