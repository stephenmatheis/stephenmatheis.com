import localFont from 'next/font/local';
import type { Metadata } from 'next';
import './globals.scss';

export const metadata: Metadata = {
    title: 'Stephen Matheis',
    description: 'My website.',
};

const departureMono = localFont({
    src: './fonts/DepartureMono-Regular.woff2',
    variable: '--font-departure-mono',
});

export default function RootLayout({ children }: LayoutProps<'/'>) {
    return (
        <html lang="en">
            <body className={departureMono.variable}>{children}</body>
        </html>
    );
}
