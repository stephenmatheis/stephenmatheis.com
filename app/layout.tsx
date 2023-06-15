import type { Metadata } from 'next';
import { Libre_Baskerville } from 'next/font/google';
import '@/styles/globals.scss';

const serif = Libre_Baskerville({
    subsets: ['latin'],
    variable: '--font-serif',
    display: 'swap',
    weight: '400',
});

export const metadata: Metadata = {
    title: {
        template: 'Stephen Matheis | %s',
        default: 'Stephen Matheis',
    },
    description: 'My blog, portfolio, and resume.',
    viewport: 'width=device-width, initial-scale=1,  viewport-fit=cover',
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#ffffff' },
        { media: '(prefers-color-scheme: dark)', color: '#221d29' },
    ],
    icons: {
        shortcut: '/favicons/favicon.ico',
        icon: '/favicons/icon.png',
        apple: '/favicons/apple-icon.png',
    },
    manifest: '/manifest.json',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={serif.variable} suppressHydrationWarning>
            <body suppressHydrationWarning>
                {/* eslint-disable-next-line @next/next/no-sync-scripts */}
                <script src="/set-theme.js" />
                {children}
            </body>
        </html>
    );
}
