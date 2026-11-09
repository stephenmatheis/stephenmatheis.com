import localFont from 'next/font/local';
import type { Metadata } from 'next';

import './globals.scss';

export const metadata: Metadata = {
    title: 'Stephen Matheis',
    description: 'My website.',
};

const mono = localFont({
    src: './fonts/CommitMono VariableFont.woff2',
    variable: '--font-commit-mono',
});

export default function RootLayout({ children }: LayoutProps<'/'>) {
    return (
        <html lang="en">
            <body className={mono.variable}>{children}</body>
        </html>
    );
}
