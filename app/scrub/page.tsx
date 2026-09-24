import type { Metadata } from 'next';
import { Scrubber } from './scrubber';

export const metadata: Metadata = {
    title: 'scrub · Stephen Matheis',
    description: 'Drag through time and watch the site change.',
};

export default function ScrubPage() {
    return <Scrubber />;
}
