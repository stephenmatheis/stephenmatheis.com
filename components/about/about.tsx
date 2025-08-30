import { Heading } from '@/components/heading';
import styles from './about.module.scss';

export function About() {
    return (
        <div className={styles.about}>
            <Heading>01 About</Heading>
            For 14 years I have built accessible websites, services, and applications for the Department of Defense, the
            Defense Health Agency, the National Weather Service, and Apple.
        </div>
    );
}
