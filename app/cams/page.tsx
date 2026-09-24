import type { Metadata } from 'next';
import { CameraWall } from './camera-wall';

export const metadata: Metadata = {
    title: 'cams · Stephen Matheis',
    description: 'A wall of security camera feeds, one per version.',
};

export default function CamsPage() {
    return <CameraWall />;
}
