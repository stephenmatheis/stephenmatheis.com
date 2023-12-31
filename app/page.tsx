import type { Metadata } from 'next';
import { Page } from '@/components/page';
import { Main } from '@/components/main';
import { Hero } from '@/components/hero';

export const metadata: Metadata = {
    title: 'Stephen Matheis',
    description: `The personal website and blog of Stephen Matheis. Copyright (C) ${new Date().getFullYear()} Stephen Matheis.`,
};

export default function RootPage() {
    return (
        <Page
            anchors={[{ label: 'RSS', path: '/rss', newTab: true }]}
            links={
                [
                    // {
                    //     label: '',
                    //     path: '',
                    // },
                ]
            }
            noFooter
        >
            <Main>
                <Hero />
            </Main>
        </Page>
    );
}
