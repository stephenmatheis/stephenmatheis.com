import type { Metadata } from 'next';
import { Photomosaic } from './photomosaic';

export const metadata: Metadata = {
    title: 'mosaic · Stephen Matheis',
    description: 'One version rebuilt out of tiny tiles of all the others.',
};

export default function MosaicPage() {
    return <Photomosaic />;
}
