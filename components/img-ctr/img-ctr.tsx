'use client';

import Image from 'next/image';
import styles from './img-ctr.module.scss';
import { useState } from 'react';

type ImageProps = {
    src: string;
    width?: number;
    height?: number;
};

export function ImgCtr({ link, description, image }) {
    const { src, width, height }: ImageProps = image;
    const [showShadow, setShowShadow] = useState(false);

    return (
        <div
            className={[
                styles['img-ctr'],
                ...(showShadow ? [styles.shadow] : []),
            ].join(' ')}
        >
            <a href={link} target="_blank">
                <Image
                    src={src}
                    alt={description}
                    width={width}
                    height={height}
                    priority
                    onLoadingComplete={(node) => {
                        if (node) {
                            setShowShadow(true);
                        }
                    }}
                />
            </a>
        </div>
    );
}
