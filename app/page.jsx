'use client';

import { useEffect, useState } from 'react';
import classNames from 'classnames';
import Header from '@/components/header/header';
import Main from '@/components/main/main';
import Footer from '@/components/footer';
import styles from './resume.module.scss';

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
            <Main loading={loading} speed={speed} fade={fade} />
            <Footer />
        </div>
    );
}
