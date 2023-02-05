import Type2 from '@/components/Type2';
import Head from 'next/head';
import { } from 'react';

// Data
const speed = 1500;

export default function Home() {
    return (
        <>
            <Head>
                <title>Stephen Matheis | Type</title>
                <meta name="description" content="Stephen Matheis" />
            </Head>
            <div style={{ fontSize: '6em' }}>
                <Type2 content="Lorem ipsum dolor sit amet" speed={speed} cursor startAtChar={3} />
            </div>
        </>
    )
}