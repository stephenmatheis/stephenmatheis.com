import { Links } from '@/components/links';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Stephen Matheis',
    description: `The personal website of Stephen Matheis.`,
};

export default function RootPage() {
    return (
        <>
            <Links />
        </>
    );
}
