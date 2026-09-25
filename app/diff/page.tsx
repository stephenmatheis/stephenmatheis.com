import type { Metadata } from 'next';
import { ImageDiff } from './image-diff';

export const metadata: Metadata = {
    title: 'diff · Stephen Matheis',
    description: 'Compare two versions the way GitHub compares images.',
};

export default function DiffPage() {
    return <ImageDiff />;
}
