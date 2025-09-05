import type { Metadata, Viewport } from 'next';
import Local from 'next/font/local';
import { Instrument_Serif, Instrument_Sans, Libre_Caslon_Display, Libre_Caslon_Text } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { CursorProvider } from '@/providers/cursor-provider';
import { Cursor } from '@/components/cursor';
import { Viewport as App } from '@/components/viewport';
import { Content } from '@/components/content';
import './layout.scss';

// const caslon = Local({
//     src: './fonts/LibreCaslonCondensed[wght].woff2',
//     display: 'swap',
//     variable: '--font-caslon',
// });

const caslon = Libre_Caslon_Text({
    subsets: ['latin'],
    display: 'swap',
    weight: ['400', '700'],
    variable: '--font-caslon',
});

const serif = Instrument_Serif({
    subsets: ['latin'],
    display: 'swap',
    weight: ['400'],
    variable: '--font-serif',
});

const sans = Instrument_Sans({
    subsets: ['latin'],
    display: 'swap',
    // weight: ['400'],
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
            <body className={`${serif.variable} ${sans.variable} ${caslon.variable}`} suppressHydrationWarning>
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
