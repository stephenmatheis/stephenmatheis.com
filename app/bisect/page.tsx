import type { Metadata } from 'next';
import { Bisect } from './bisect';

export const metadata: Metadata = {
    title: 'bisect · Stephen Matheis',
    description: 'git bisect your way to where it all went wrong.',
};

export default function BisectPage() {
    return <Bisect />;
}
