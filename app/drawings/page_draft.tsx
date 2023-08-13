import type { Metadata } from 'next';
import Image from 'next/image';
import { Page } from '@/components/page';
import { Main } from '@/components/main';
import { Comment } from '@/components/comment';
import drawings from '@/data/drawings';
import styles from './drawings.module.scss';

export const metadata: Metadata = {
    title: 'Settings',
    description: "Change the site's look and feel.",
};

export default function DrawingsPage() {
    return (
        <Page
            links={[
                {
                    label: 'Home',
                    path: '/',
                },
            ]}
        >
            <Main>
                <Comment text="Drawings" />
                <div className={styles.drawings}>
                    {drawings.map(({ name, image, description }) => {
                        const { src, width, height } = image;

                        return (
                            <>
                                <div className={styles.name}>{name}</div>
                                <div className={styles.drawing}>
                                    <Image
                                        src={src}
                                        alt={description}
                                        width={width}
                                        height={height}
                                        priority
                                        // onLoadingComplete={(node) => {
                                        //     if (node) {
                                        //         setShowShadow(true);
                                        //     }
                                        // }}
                                    />
                                </div>
                            </>
                        );
                    })}
                </div>
            </Main>
        </Page>
    );
}
