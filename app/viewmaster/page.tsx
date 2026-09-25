import type { Metadata } from 'next';
import { StereoViewer } from './stereo-viewer';

export const metadata: Metadata = {
    title: 'viewmaster · Stephen Matheis',
    description: 'Six View-Master reels, seven versions each.',
};

export default function ViewmasterPage() {
    return <StereoViewer />;
}
