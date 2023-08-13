import { LinkCtr } from '@/components/link-ctr';
import styles from './sidebar.module.scss';

export function Sidebar() {
    // TODO: Add translating arrow to selected route,
    // same as home page

    // TODO: Should this always be stacked vertically,
    // like the home page? Or would that take up too much
    // vertical real estate on mobile?
    // Becuase otheriwse the shift to a horizontal nav
    // is a bit jarring.
    return (
        <nav className={styles.sidebar}>
            <LinkCtr href="/posts">Posts</LinkCtr>
            <LinkCtr href="/archive">Archive</LinkCtr>
            <LinkCtr href="/projects">Projects</LinkCtr>
            <LinkCtr href="/about">About</LinkCtr>
        </nav>
    );
}
