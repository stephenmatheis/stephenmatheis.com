import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.scss';

const departureMono = localFont({
    src: './fonts/DepartureMono-Regular.woff2',
    variable: '--font-departure-mono',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'Stephen Matheis',
    description: 'My website.',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
    return (
        <html lang="en" className={departureMono.variable}>
            <body>{children}</body>
        </html>
    );
}
