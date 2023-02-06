import { useEffect, useState } from 'react';
import Head from 'next/head';
import classNames from 'classnames';
import Header from '@/components/header/header';
import Main from '@/components/main/main';

export default function Home() {
    const [loading, setLoading] = useState(true);
    const speed = 60;

    useEffect(() => {
        if (loading) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.removeAttribute('style');
        }

        return () => document.body.removeAttribute('style');
    }, [loading]);

    return (
        <>
            <Head>
                <title>Stephen Matheis</title>
                <meta name="description" content="Stephen Matheis" />
            </Head>
            <div id="resume" className={classNames({ loading })}>
                <Header speed={speed} loading={loading} setLoading={setLoading} />
                {!loading && <Main speed={speed} type={true} />}
            </div>
        </>
    )
}