import { LinkCtr } from '@/components/link-ctr';
import styles from './sidebar.module.scss';

export function Sidebar({}) {
    return (
        <nav className={styles.sidebar}>
            <LinkCtr href="/posts">Posts</LinkCtr>
            <LinkCtr href="/archive">Archive</LinkCtr>
            <LinkCtr href="/projects">Projects</LinkCtr>
            <LinkCtr href="/about">About</LinkCtr>
            <LinkCtr href="/settings">Settings</LinkCtr>
        </nav>
    );
}
