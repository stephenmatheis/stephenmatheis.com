import type { Metadata } from 'next';
import { Main } from '@/components/main';
import { Page } from '@/components/page';
import { LinkCtr } from '@/components/link-ctr';
import { Comment } from '@/components/comment';

export const metadata: Metadata = {
    title: 'Login',
    description: 'Log in to GitHub.',
};

export default function ProjectsPage({}) {
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
                {/* FIXME: Use ENV var */}
                <LinkCtr href="https://github.com/login/oauth/authorize?client_id=Iv1.ab22fc239c6dcf88&redirect_uri=http://localhost:3000/login">
                    Login with GitHub
                </LinkCtr>
            </Main>
        </Page>
    );
}
