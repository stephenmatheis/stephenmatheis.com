'use client';

import { useEffect, useState } from 'react';
import styles from './memoji.module.scss';

export function Memoji({}: {}) {
    const [canPlay, setCanPlay] = useState(false);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        setInterval(() => {
            setSeconds((prev) => prev + 1);
        }, 1000);
    }, []);

    return (
        <>
            {!canPlay && (
                <div style={{ textAlign: 'center' }}>Loading {seconds}...</div>
            )}
            <video
                onCanPlay={(event) => {
                    console.log('onCanPlay', event);
                    setCanPlay(true);
                }}
                onCanPlayThrough={(event) => {
                    console.log('onCanPlayThrough', event);
                }}
                onLoadedMetadata={(event) => {
                    console.log('onLoadedMetadata', event);
                }}
                onLoadStart={(event) => {
                    console.log('onLoadStart', event);
                }}
                onPlay={(event) => {
                    console.log('onPlay', event);
                }}
                autoPlay
                playsInline
                loop
                muted
                preload="auto"
                style={{
                    width: 640 / 2,
                    height: 480 / 2,
                    margin: 'auto auto',
                }}
                className={styles.memoji}
                src="/memoji-loop-22s.mov"
            />
        </>
    );
}
