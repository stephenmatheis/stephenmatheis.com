import classNames from 'classnames';
import Image from 'next/image';
import { LinkCtr } from '@/components/link-ctr';
import { Comment } from '@/components/comment';
import projects from '@/data/projects';
import styles from './projects.module.scss';

type Props = {
    displayImages?: boolean;
    printOnly?: boolean;
};

type ImageProps = {
    src: string;
    width?: number;
    height?: number;
};

export function Projects({ displayImages, printOnly }: Props) {
    return (
        <div
            className={classNames(styles.projects, {
                [styles['print-only']]: printOnly,
            })}
        >
            <Comment text={'Projects'} />
            <div
                className={classNames(styles['projects-wrapper'], {
                    [styles['compact']]: !displayImages,
                })}
            >
                {projects.map(({ name, link, description, image }, index) => {
                    const { src, width, height }: ImageProps = image;

                    return (
                        <div
                            key={index}
                            className={classNames(styles['project-ctr'], {
                                [styles['display-images']]: displayImages,
                            })}
                        >
                            <LinkCtr href={link} newTab>
                                {name}
                            </LinkCtr>
                            <div className={styles['description-ctr']}>
                                {displayImages && src && (
                                    <div className={styles['img-ctr']}>
                                        <a href={link} target="_blank">
                                            <Image
                                                src={src}
                                                alt={description}
                                                width={width}
                                                height={height}
                                                priority
                                            />
                                        </a>
                                    </div>
                                )}
                                <div className={styles.description}>
                                    {description}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
