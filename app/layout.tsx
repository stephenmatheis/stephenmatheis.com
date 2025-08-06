import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { Analytics } from '@vercel/analytics/react';
import { CursorProvider } from '@/providers/cursor-provider';
import { Cursor } from '@/components/cursor';
import { Viewport as App } from '@/components/viewport';
import { Content } from '@/components/content';
import '@/styles/app.scss';

const mono = localFont({
    src: './fonts/DepartureMono.woff2',
    variable: '--font-mono',
});

export const metadata: Metadata = {
    title: {
        template: 'Stephen Matheis | %s',
        default: 'Stephen Matheis',
    },
    description: 'My personal site.',
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={mono.variable} suppressHydrationWarning>
                <CursorProvider>
                    <App>
                        <Content>{children}</Content>
                        <div id="markup-overlay" />
                    </App>
                    <Cursor />
                </CursorProvider>
                <Analytics debug={false} />
            </body>
        </html>
    );
}
