import { Viewer } from '@/components/Viewer';
import styles from './page.module.scss';

const items = [
    {
        name: 'Code 1',
        href: '/code/1',
        content: <div className={styles.editor}>Code 1 content.</div>,
    },
    {
        name: 'Code 2',
        href: '/code/2',
        content: <div className={styles.editor}>Code 2 content.</div>,
    },
    {
        name: 'Code 3',
        href: '/code/3',
        content: <div className={styles.editor}>Code 3 content.</div>,
    },
];

export default function Page() {
    return <Viewer title="Code" items={items} />;
}
