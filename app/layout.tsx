import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/react';
import localFont from 'next/font/local';
import '@/styles/app.scss';

const departureMono = localFont({
    src: './fonts/DepartureMono.woff',
    variable: '--font-departure-mono',
});

export const metadata: Metadata = {
    title: {
        template: 'Stephen Matheis | %s',
        default: 'Stephen Matheis',
    },
    description: 'My blog, portfolio, and resume.',
    icons: {
        shortcut: '/favicon.ico',
        icon: '/favicons/icon.png',
        apple: '/favicons/apple-icon.png',
    },
    manifest: '/manifest.json',
    openGraph: {
        title: 'Stephen Matheis',
        description: 'Bio',
        url: 'https://stephenmatheis.com',
        siteName: 'Stephen Matheis',
        images: [
            {
                url: 'https://stephenmatheis.com/images/og.png',
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

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={departureMono.variable} suppressHydrationWarning>
                {children}
                <Analytics />
            </body>
        </html>
    );
}
