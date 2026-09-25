import type { Metadata } from 'next';
import { Picker } from './picker';

export const metadata: Metadata = {
    title: 'telescope · Stephen Matheis',
    description: 'Fuzzy-find a version, Neovim style.',
};

export default function TelescopePage() {
    return <Picker />;
}
