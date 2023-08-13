'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './img-ctr.module.scss';

type ImageProps = {
    src: string;
    width?: number;
    height?: number;
    blurDataUrl?: string;
};

export function ImgCtr({ link, description, image }) {
    const { src, width, height, blurDataUrl }: ImageProps = image;
    const [showShadow, setShowShadow] = useState(false);

    return (
        <div
            className={[
                styles['img-ctr'],
                ...(showShadow ? [styles.shadow] : []),
            ].join(' ')}
        >
            <a href={link} target="_blank" rel="noopener">
                <Image
                    src={src}
                    alt={description}
                    width={width}
                    height={height}
                    placeholder="blur"
                    blurDataURL={blurDataUrl}
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
