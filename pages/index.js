import { useEffect, useState } from 'react';
import Head from 'next/head';
// import { Space_Mono } from 'next/font/google';
import classNames from 'classnames';
import Header from '@/components/header/header';
import Main from '@/components/main/main';
import styles from '../styles/resume.module.scss';

// const font = Space_Mono({ subsets: ['latin'] })

export default function Home() {
    const [loading, setLoading] = useState(true);
    const [showLinkBackground, setShowLinkBackground] = useState(false);
    const speed = 70;
    const shouldType = false;

    useEffect(() => {
        if (!loading) {
            document.body.classList.remove('hidden');
            setShowLinkBackground(true);
        }

        return () => document.body.removeAttribute('style');
    }, [loading]);

    return (
        <>
            <Head>
                <title>Stephen Matheis</title>
                <meta name="description" content="Stephen Matheis" />
            </Head>
            <div id={styles['resume']} className={classNames({ [styles['loading']]: loading })}>
                <Header
                    type={shouldType}
                    speed={speed}
                    showLinkBackground={showLinkBackground}
                    loading={loading}
                    setLoading={setLoading}
                />
                <Main
                    loading={loading}
                    type={shouldType}
                    speed={speed}
                    showLinkBackground={showLinkBackground}
                />
            </div>
        </>
    )
}