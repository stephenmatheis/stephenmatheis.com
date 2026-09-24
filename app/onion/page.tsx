import type { Metadata } from 'next';
import { OnionSkin } from './onion-skin';

export const metadata: Metadata = {
    title: 'onion · Stephen Matheis',
    description: 'Every version stacked on top of each other.',
};

export default function OnionPage() {
    return <OnionSkin />;
}
