import type { Metadata } from 'next';
import '@/styles/globals.scss';

export const metadata: Metadata = {
    title: 'Stephen Matheis',
    description: "Stephen Matheis' portfolio, resume, and blog.",
    viewport: 'width=device-width, initial-scale=1,  viewport-fit=cover',
    manifest: '/manifest.json',
    themeColor: '#221d29',
    icons: {
        shortcut: '/favicons/favicon.ico',
        icon: '/favicons/icon.png',
        apple: '/favicons/apple-icon.png',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body suppressHydrationWarning>{children}</body>
        </html>
    );
}
