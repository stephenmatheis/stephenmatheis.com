import type { Metadata } from 'next';
import { DigitalRain } from './digital-rain';

export const metadata: Metadata = {
    title: 'matrix · Stephen Matheis',
    description: 'Catch a version in the digital rain.',
};

export default function MatrixPage() {
    return <DigitalRain />;
}
