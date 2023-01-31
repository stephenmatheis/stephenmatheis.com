import Head from 'next/head'

import '@/styles/globals.scss'
import '@/styles/resume.scss'
import '@/styles/loading.scss'

export default function App({ Component, pageProps }) {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />

            </Head>
            <Component {...pageProps} />
        </>
    )
}