import type { Metadata } from 'next';
import { Projector } from './projector';

export const metadata: Metadata = {
    title: 'slides · Stephen Matheis',
    description: 'A slide projector, clunk by clunk.',
};

export default function SlidesPage() {
    return <Projector />;
}
