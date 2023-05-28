import Image from 'next/image';
import LinkCtr from '@/components/link-ctr';
import Comment from '../comment';
import projects from '@/data/projects';
import styles from './projects.module.scss';

export default function Projects({}) {
    return (
        <div className={styles['projects']}>
            <Comment text={'Projects'} />
            {projects.map(({ name, link, description, image }, index) => {
                return (
                    <div key={index} className={styles['project-ctr']}>
                        <LinkCtr text={name} href={link} />
                        {/* {image && (
                            <div className={styles.img}>
                                <Image
                                    src={image}
                                    alt="Command Palette"
                                    width={1444}
                                    height={908}
                                />
                            </div>
                        )} */}
                        <div className={styles.description}>{description}</div>
                    </div>
                );
            })}
        </div>
    );
}
