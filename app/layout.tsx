import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
    title: "Stephen Matheis",
    description: "My website.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
