import type { Metadata } from 'next';
import { Inter, IBM_Plex_Mono } from 'next/font/google';
import './globals.scss';

const inter = Inter({
    variable: '--font-inter',
    subsets: ['latin'],
});

const ibmPlexMono = IBM_Plex_Mono({
    variable: '--font-ibm-plex-mono',
    weight: ['400', '500', '600', '700'],
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
        <html lang="en" className={`${inter.variable} ${ibmPlexMono.variable}`}>
            <body>{children}</body>
        </html>
    );
}
