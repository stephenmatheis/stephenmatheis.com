import type { Metadata } from 'next';
import { Terminal } from './terminal';

export const metadata: Metadata = {
    title: 'ssh · Stephen Matheis',
    description: 'Browse the archive from a terminal.',
};

export default function SshPage() {
    return <Terminal />;
}
