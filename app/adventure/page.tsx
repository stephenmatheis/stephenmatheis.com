import type { Metadata } from 'next';
import { TextAdventure } from './text-adventure';

export const metadata: Metadata = {
    title: 'adventure · Stephen Matheis',
    description: 'A text adventure where the rooms are years.',
};

export default function AdventurePage() {
    return <TextAdventure />;
}
