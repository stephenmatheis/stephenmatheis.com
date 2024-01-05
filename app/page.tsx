import type { Metadata } from 'next';
import { Page } from '@/components/page';
import { Hero } from '@/components/hero';

export const metadata: Metadata = {
    title: 'Stephen Matheis',
    description: `The personal website and blog of Stephen Matheis. Copyright (C) ${new Date().getFullYear()} Stephen Matheis.`,
};

export default function RootPage() {
    return (
        <Page
            links={[
                {
                    label: 'GitHub',
                    path: 'https://github.com/stephenmatheis',
                    newTab: true,
                },
            ]}
        >
            <Hero />
        </Page>
    );
}
