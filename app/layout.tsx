import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.scss';

export const iosevka = localFont({
    src: [
        {
            path: './fonts/pico-8-mono.otf.woff2/pico-8-mono.otf.woff2',
            weight: '400',
            style: 'normal',
        },
    ],
    variable: '--font-pico-8',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'Stephen Matheis',
    description: 'My website.',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
    return (
        <html lang="en" className={iosevka.variable}>
            <body>{children}</body>
        </html>
    );
}
