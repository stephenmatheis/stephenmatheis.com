import type { Metadata } from 'next';
import { SubwayMap } from './subway-map';

export const metadata: Metadata = {
    title: 'subway · Stephen Matheis',
    description: 'The history as a subway map, one line per framework.',
};

export default function SubwayPage() {
    return <SubwayMap />;
}
