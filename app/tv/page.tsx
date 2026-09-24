import type { Metadata } from 'next';
import { Television } from './television';

export const metadata: Metadata = {
    title: 'tv · Stephen Matheis',
    description: 'Flip through the versions like TV channels.',
};

export default function TvPage() {
    return <Television />;
}
