import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.scss';

export const iosevka = localFont({
    src: [
        {
            path: './fonts/iosevka-latin-400-normal.woff2',
            weight: '400',
            style: 'normal',
        },
        {
            path: './fonts/iosevka-latin-400-italic.woff2',
            weight: '400',
            style: 'italic',
        },
        {
            path: './fonts/iosevka-latin-700-normal.woff2',
            weight: '700',
            style: 'normal',
        },
    ],
    variable: '--font-iosevka',
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
