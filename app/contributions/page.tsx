import type { Metadata } from 'next';
import { ContributionGraph } from './contribution-graph';

export const metadata: Metadata = {
    title: 'contributions · Stephen Matheis',
    description: 'Every day of work, as a contribution graph.',
};

export default function ContributionsPage() {
    return <ContributionGraph />;
}
