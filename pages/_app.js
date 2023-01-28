import Head from 'next/head'

import { Space_Mono } from '@next/font/google'

import '@/styles/globals.scss'
import '@/styles/resume.scss'

const spaceMono = Space_Mono({
    weight: ['400', '700'],
    subsets: ['latin'],
});

export default function App({ Component, pageProps }) {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />

            </Head>
            {/* <main className={spaceMono.className}> */}
            <Component {...pageProps} />
            {/* </main> */}
        </>
    )
}