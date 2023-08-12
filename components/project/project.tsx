import { useEffect, useRef } from 'react';
import { usePrompts } from '@/contexts/prompts';
import { LinkCtr } from '@/components/link-ctr';
import { ImgCtr } from '@/components/img-ctr';
import styles from './project.module.scss';

type ImageProps = {
    src: string;
    width?: number;
    height?: number;
};

export function Project({ name, link, description, image, displayImages }) {
    const { src }: ImageProps = image;
    const ref = useRef<HTMLDivElement>(null);
    const { prompts, selected } = usePrompts();
    const promptIndex = prompts.map(({ path }) => path).indexOf(link);

    useEffect(() => {
        if (selected === promptIndex) {
            ref.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [promptIndex, selected]);

    return (
        <div key={name} className={styles['project-ctr']} ref={ref}>
            <div
                className={[
                    ...(selected === promptIndex ? [styles.selected] : []),
                    styles.indicator,
                ].join(' ')}
            >
                <svg
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                >
                    <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                </svg>
            </div>
            <LinkCtr href={link} newTab>
                {name}
            </LinkCtr>
            <div className={styles['description-ctr']}>
                {displayImages && src && (
                    <ImgCtr
                        link={link}
                        description={description}
                        image={image}
                    />
                )}
                <div className={styles.description}>{description}</div>
            </div>
        </div>
    );
}
