import type { Metadata } from 'next';
import { ProcessViewer } from './process-viewer';

export const metadata: Metadata = {
    title: 'htop · Stephen Matheis',
    description: 'Every version as a running process.',
};

export default function HtopPage() {
    return <ProcessViewer />;
}
