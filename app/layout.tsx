import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { IBM_Plex_Sans } from 'next/font/google';
import './globals.scss';

// Base font. Timeless, web-safe via self-hosting, and small-size legible —
// DepartureMono looks great but is hard to read below ~14px.
const ibmPlexSans = IBM_Plex_Sans({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700'],
    variable: '--font-ibm-plex-sans',
});

// Kept loaded but not the default — reserved for large labels where its
// character can carry without hurting legibility.
const departureMono = localFont({
    src: './fonts/DepartureMono-Regular.woff2',
    variable: '--font-departure-mono',
});

const pureprog = localFont({
    src: './fonts/pureprog.woff2',
    variable: '--font-pureprog',
});

export const metadata: Metadata = {
    title: 'Stephen Matheis',
    description: 'My site.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${ibmPlexSans.variable} ${departureMono.variable} ${pureprog.variable}`}>
            <body>{children}</body>
        </html>
    );
}
