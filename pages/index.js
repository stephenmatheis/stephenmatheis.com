import { useEffect, useState } from 'react';
import Head from 'next/head';
import classNames from 'classnames';
import Header from '@/components/header/header';
import Main from '@/components/main/main';
import styles from '../styles/resume.module.scss';

export default function Home() {
    const [loading, setLoading] = useState(true);
    const [showLinkBackground, setShowLinkBackground] = useState(false);
    const speed = 70;

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
            <div id={styles['resume']} className={classNames({ [styles['loading']]: loading })}>
                <Header
                    speed={speed}
                    showLinkBackground={showLinkBackground}
                    loading={loading}
                    setLoading={setLoading}
                />
                {
                    !loading &&
                    <Main
                        speed={speed}
                        type={true}
                        showLinkBackground={showLinkBackground}
                        setShowLinkBackground={setShowLinkBackground}
                    />
                }
            </div>
        </>
    )
}