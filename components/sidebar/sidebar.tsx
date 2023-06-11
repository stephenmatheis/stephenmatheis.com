import { LinkCtr } from '@/components/link-ctr';
import styles from './sidebar.module.scss';

export function Sidebar({}) {
    return (
        <nav className={styles.sidebar}>
            <LinkCtr href="/links">Links</LinkCtr>
            <LinkCtr href="/posts">Posts</LinkCtr>
            <LinkCtr href="/projects">Projects</LinkCtr>
            <LinkCtr href="/resume">About</LinkCtr>
        </nav>
    );
}
