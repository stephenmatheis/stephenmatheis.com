import { Heading } from '@/components/heading';
import styles from './about.module.scss';

export function About() {
    return (
        <div className={styles.about}>
            <Heading>About</Heading>
            <p>I design and build websites and applications.</p>
        </div>
    );
}
