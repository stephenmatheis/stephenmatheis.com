import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { Analytics } from '@vercel/analytics/react';
import './layout.scss';

const sans = localFont({
    src: './fonts/sans.woff2',
    variable: '--font-sans',
});

const mono = localFont({
    src: './fonts/DepartureMono.woff2',
    variable: '--font-mono',
});

const pixel = localFont({
    src: './fonts/AsepriteFont.woff2',
    variable: '--font-pixel',
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
            <body className={`${mono.variable} ${pixel.variable} ${sans.variable}`} suppressHydrationWarning>
                {children}
                <Analytics debug={false} />
            </body>
        </html>
    );
}
