import type { Metadata } from 'next';
import { Roulette } from './roulette';

export const metadata: Metadata = {
    title: 'roulette · Stephen Matheis',
    description: 'Spin for a random version.',
};

export default function RoulettePage() {
    return <Roulette />;
}
