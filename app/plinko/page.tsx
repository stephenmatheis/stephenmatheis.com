import type { Metadata } from 'next';
import { PlinkoBoard } from './plinko-board';

export const metadata: Metadata = {
    title: 'plinko · Stephen Matheis',
    description: 'Drop a ball and see where it lands.',
};

export default function PlinkoPage() {
    return <PlinkoBoard />;
}
