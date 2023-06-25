'use client';

import Image from 'next/image';
import styles from './img-ctr.module.scss';

type ImageProps = {
    src: string;
    width?: number;
    height?: number;
};

export function ImgCtr({ link, description, image }) {
    const { src, width, height }: ImageProps = image;

    return (
        <div className={styles['img-ctr']}>
            <a href={link} target="_blank">
                <Image
                    src={src}
                    alt={description}
                    width={width}
                    height={height}
                    priority
                    // onLoadingComplete={(event) => {
                    //     console.log(event);
                    // }}
                />
            </a>
        </div>
    );
}
