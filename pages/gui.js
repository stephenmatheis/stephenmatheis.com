import Window from '@/components/window';
import Head from 'next/head';
import { } from 'react';
import styles from '../styles/gui.module.scss';

export default function Gui() {
    return (
        <>
            <Head>
                <title>Stephen Matheis | GUI</title>
                <meta name="description" content="Stephen Matheis" />
            </Head>
            <div id={styles['gui']}>
                <Window />
            </div>
        </>
    )
}