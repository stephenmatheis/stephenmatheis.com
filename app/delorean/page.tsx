import type { Metadata } from 'next';
import { TimeCircuits } from './time-circuits';

export const metadata: Metadata = {
    title: 'delorean · Stephen Matheis',
    description: 'Set the time circuits and hit 88 mph.',
};

export default function DeloreanPage() {
    return <TimeCircuits />;
}
