import Header from '@/components/header/header';
import Head from 'next/head';
import Link from "next/link";

export default function Home() {
    return (
        <>
            <Head>
                <title>Stephen Matheis | About</title>
                <meta name="description" content="Stephen Matheis' website, blog, portfolio, and resume." />
            </Head>
            <Header />
            {/* <h1>About</h1>
            <Link href="/">Index</Link> */}
        </>
    )
}
