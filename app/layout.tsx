import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.scss';

const departureMono = localFont({
    src: './fonts/DepartureMono-Regular.woff2',
    variable: '--font-departure-mono',
});

const pureprog = localFont({
    src: './fonts/pureprog-12-5x8-pixel-mono-normal.woff2',
    variable: '--font-pureprog',
});

export const metadata: Metadata = {
    title: 'Stephen Matheis',
    description: 'My site.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${departureMono.variable} ${pureprog.variable}`}>
            <body>{children}</body>
        </html>
    );
}
