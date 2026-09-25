import type { Metadata } from 'next';
import { RotaryPhone } from './rotary-phone';

export const metadata: Metadata = {
    title: 'phone · Stephen Matheis',
    description: 'Dial a version on a rotary phone.',
};

export default function PhonePage() {
    return <RotaryPhone />;
}
