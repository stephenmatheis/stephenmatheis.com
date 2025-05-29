import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from 'next-themes';
import '@/styles/app.scss';

const mono = localFont({
    src: './fonts/DepartureMono.woff',
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
                <ThemeProvider>{children}</ThemeProvider>
                <Analytics debug={false} />
            </body>
        </html>
    );
}
