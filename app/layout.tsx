import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import { Analytics } from '@vercel/analytics/react';
import './layout.scss';

const mona = localFont({
    src: './fonts/MonaspaceNeonVar.woff2',
    display: 'swap',
    variable: '--font-mona',
});

const sans = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-sans',
});

export const metadata: Metadata = {
    title: {
        template: 'Stephen Matheis | %s',
        default: 'Stephen Matheis',
    },
    description: 'My personal site.',
    openGraph: {
        title: 'Stephen Matheis',
        description: '[next (dot) gov] https://nextdotgov.com',
        url: 'https://stephenmatheis.com',
        siteName: 'Stephen Matheis',
        images: [
            {
                url: 'https://stephenmatheis.com/og.png',
                width: 1200,
                height: 630,
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${sans.variable} ${mona.variable}`} suppressHydrationWarning>
                {children}
                <Analytics debug={false} />
            </body>
        </html>
    );
}
