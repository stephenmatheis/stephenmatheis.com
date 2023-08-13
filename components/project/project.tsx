import { LinkCtr } from '@/components/link-ctr';
import { ImgCtr } from '@/components/img-ctr';
import { Indicator } from '@/components/indicator';
import styles from './project.module.scss';

type ImageProps = {
    src: string;
    width?: number;
    height?: number;
};

export function Project({ name, link, description, image, displayImages }) {
    const { src }: ImageProps = image;

    return (
        <div key={name} className={styles['project-ctr']}>
            <Indicator label={name} />
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
