import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import { Analytics } from '@vercel/analytics/react';
import { CursorProvider } from '@/providers/cursor-provider';
import { Cursor } from '@/components/cursor';
import './layout.scss';

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
});

const commit_mono = localFont({
    src: './fonts/CommitMonoV143-VF.woff2',
    variable: '--font-commit-mono',
});

const departure_mono = localFont({
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
            <body
                className={`${departure_mono.variable} ${pixel.variable} ${inter.variable} ${commit_mono.variable}`}
                suppressHydrationWarning
            >
                <CursorProvider>
                    {children}
                    <Cursor />
                </CursorProvider>
                <Analytics debug={false} />
            </body>
        </html>
    );
}
