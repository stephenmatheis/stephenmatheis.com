import { TwoZeroThreeFive } from '@/components/two-zero-three-five';
import styles from './header.module.scss';

export function Header() {
    return (
        <header className={styles.header}>
            <span>{'///////////////////////////'}</span>
            <TwoZeroThreeFive />
            <span>{'///////////////////////////'}</span>
        </header>
    );
}
