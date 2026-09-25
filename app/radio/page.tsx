import type { Metadata } from 'next';
import { Radio } from './radio';

export const metadata: Metadata = {
    title: 'radio · Stephen Matheis',
    description: 'Tune the dial until a version comes in.',
};

export default function RadioPage() {
    return <Radio />;
}
