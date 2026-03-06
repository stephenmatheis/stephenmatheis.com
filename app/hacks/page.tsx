import { Viewer } from '@/components/Viewer';
import styles from './page.module.scss';

const items = [
    {
        name: 'Hack 1',
        href: '/hacks/1',
        content: <div className={styles.editor}>Hack 1 content.</div>,
    },
    {
        name: 'Hack 2',
        href: '/hacks/2',
        content: <div className={styles.editor}>Hack 2 content.</div>,
    },
    {
        name: 'Hack 1',
        href: '/hacks/3',
        content: <div className={styles.editor}>Hack 3 content.</div>,
    },
];

export default function Page() {
    return <Viewer title="Hacks" items={items} />;
}
