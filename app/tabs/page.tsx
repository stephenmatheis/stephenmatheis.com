import type { Metadata } from 'next';
import { Browser } from './browser';

export const metadata: Metadata = {
    title: 'tabs · Stephen Matheis',
    description: 'A browser with 42 tabs open, all of them this site.',
};

export default function TabsPage() {
    return <Browser />;
}
