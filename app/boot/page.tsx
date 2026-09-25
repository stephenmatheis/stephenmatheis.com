import type { Metadata } from 'next';
import { BootMenu } from './boot-menu';

export const metadata: Metadata = {
    title: 'boot · Stephen Matheis',
    description: 'Pick a version to boot from the GRUB menu.',
};

export default function BootPage() {
    return <BootMenu />;
}
