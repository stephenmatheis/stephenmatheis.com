import type { Metadata } from 'next';
import { VendingMachine } from './vending-machine';

export const metadata: Metadata = {
    title: 'vending · Stephen Matheis',
    description: 'Punch in a code and a version drops out.',
};

export default function VendingPage() {
    return <VendingMachine />;
}
