import { cookies } from 'next/headers';
import type { Metadata } from 'next';
import { Main } from '@/components/main';
import { Page } from '@/components/page';
import { LinkCtr } from '@/components/link-ctr';
import { Comment } from '@/components/comment';
import { Buttons } from './components/buttons';
import { Auth } from './components/auth';

export const metadata: Metadata = {
    title: 'Login',
    description: 'Log in to GitHub.',
};

export default function ProjectsPage({}) {
    const cookieStore = cookies();
    const name = cookieStore.get('name') as { name: string; value: string };

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
                <Comment text="Login" />
                <LinkCtr
                    href={`https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}`}
                >
                    Login with GitHub
                </LinkCtr>
                {name && <Buttons />}
            </Main>
            <Auth />
        </Page>
    );
}
