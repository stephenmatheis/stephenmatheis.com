import Header from '@/components/header/header';
import Page from '@/components/page';
import Head from 'next/head';
import Link from "next/link";

export default function Home() {
    return (
        <>
            <Head>
                <title>Stephen Matheis</title>
                <meta name="description" content="Stephen Matheis' website, blog, portfolio, and resume." />
            </Head>
            <Page>
                <Header />
                {/* <h1>Index</h1>
                <Link href="/about">About</Link> */}
            </Page>
        </>
    )
}