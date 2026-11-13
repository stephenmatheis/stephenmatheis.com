import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/app/components/Header';

export const metadata: Metadata = {
    title: 'Test · Stephen Matheis',
};

export default function Test() {
    return (
        <>
            <Header />
            <main>
                <Link href="/">Return home</Link>
            </main>
        </>
    );
}
