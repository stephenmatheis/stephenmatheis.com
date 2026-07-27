import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';
import './globals.scss';

const ibmPlexSans = IBM_Plex_Sans({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700'],
    variable: '--font-ibm-plex-sans',
});

const ibmPlexMono = IBM_Plex_Mono({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700'],
    variable: '--font-ibm-plex-mono',
});

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
        <html
            lang="en"
            className={`${ibmPlexSans.variable} ${ibmPlexMono.variable} ${departureMono.variable} ${pureprog.variable}`}
        >
            <body>{children}</body>
        </html>
    );
}
