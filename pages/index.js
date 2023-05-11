import { useEffect, useState } from 'react';
import Head from 'next/head';
import classNames from 'classnames';
import Header from '@/components/header/header';
import Main from '@/components/main/main';
import styles from '../styles/resume.module.scss';
import Footer from '@/components/footer';

export default function Home() {
    const [loading, setLoading] = useState(true);
    const [fade, setFade] = useState(false);
    const speed = 70;

    useEffect(() => {
        if (!loading) {
            document.body.classList.remove('hidden');
            setFade(true);
        }

        return () => document.body.removeAttribute('style');
    }, [loading]);

    return (
        <>
            <Head>
                <title>Stephen Matheis</title>
                <meta name="description" content="Stephen Matheis" />
            </Head>
            <div
                id={styles['resume']}
                className={classNames({ [styles['loading']]: loading })}
            >
                <Header
                    speed={speed}
                    showLinkBackground={fade}
                    loading={loading}
                    setLoading={setLoading}
                />
                <Main
                    loading={loading}
                    speed={speed}
                    fade={fade}
                />
                <Footer />
            </div>
        </>
    );
}
