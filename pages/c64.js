import Head from 'next/head';
import { } from 'react';
import { VT323 } from '@next/font/google';

const font = VT323({
    weight: '400',
    subsets: ['latin'],
});

export default function Gui() {
    return (
        <>
            <Head>
                <title>Stephen Matheis | GUI</title>
                <meta name="description" content="Stephen Matheis" />
            </Head>
            <div className={font.className}>
                <h1>Test</h1>
            </div>
        </>
    )
}