import type { Metadata } from 'next';
import { Page } from '@/components/page';
import { Content } from '@/components/content';
import { Main } from '@/components/main';

export const metadata: Metadata = {
    title: 'Stephen Matheis',
    description: `The personal website and blog of Stephen Matheis. Copyright (C) ${new Date().getFullYear()} Stephen Matheis.`,
};

export default function ResumePage() {
    return (
        <Page>
            <Main>
                <Content />
            </Main>
        </Page>
    );
}
