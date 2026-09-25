import type { Metadata } from 'next';
import { Desktop } from './desktop';

export const metadata: Metadata = {
    title: 'desktop · Stephen Matheis',
    description: 'A retro desktop with a file for every version.',
};

export default function DesktopPage() {
    return <Desktop />;
}
