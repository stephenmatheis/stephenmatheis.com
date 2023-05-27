import type { Metadata } from 'next';
import '@/styles/globals.scss';

export const metadata: Metadata = {
    title: 'Stephen Matheis | Resume',
    description: "Stephen Matheis' resume.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="hidden" suppressHydrationWarning>
                {children}
            </body>
        </html>
    );
}
