import type { Metadata } from 'next';
import { Piano } from './piano';

export const metadata: Metadata = {
    title: 'piano · Stephen Matheis',
    description: 'Forty-two keys, one version each.',
};

export default function PianoPage() {
    return <Piano />;
}
