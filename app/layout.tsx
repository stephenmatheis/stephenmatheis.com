import type { Metadata } from 'next';
import { IBM_Plex_Sans } from 'next/font/google';
import './globals.scss';

const imbPlexSans = IBM_Plex_Sans({
    subsets: ['latin'],
    variable: '--font-sans',
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
        <html lang="en">
            <body className={imbPlexSans.variable}>{children}</body>
        </html>
    );
}
