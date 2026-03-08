import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { ModeProvider } from '@/providers/ModeProvider';
import { Commands } from '@/components/Commands';
import './fonts/hack/hack.css';
import './layout.scss';

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
            <body suppressHydrationWarning>
                <ModeProvider>{children}</ModeProvider>
                <Analytics debug={false} />
                <Commands />
            </body>
        </html>
    );
}
