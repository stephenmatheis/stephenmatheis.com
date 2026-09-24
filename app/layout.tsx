import type { Metadata } from 'next';
import { Switcher } from './switcher';
import './globals.css';

export const metadata: Metadata = {
    title: 'Stephen Matheis',
    description: 'Every version of my website, still running.',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
    return (
        <html lang="en">
            <body>
                {children}
                <Switcher />
            </body>
        </html>
    );
}
