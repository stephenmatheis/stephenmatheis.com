import { Viewer } from '@/components/Viewer';
import styles from './page.module.scss';

const items = [
    {
        name: 'Doc 1',
        href: '/docs/doc1',
        content: <div className={styles.editor}>Doc 1 content.</div>,
    },
    {
        name: 'Doc 2',
        href: '/docs/2',
        content: <div className={styles.editor}>Doc 2 content.</div>,
    },
    {
        name: 'Doc 3',
        href: '/docs/3',
        content: <div className={styles.editor}>Doc 3 content.</div>,
    },
];

export default function Page() {
    return <Viewer title="Docs" items={items} />;
}
