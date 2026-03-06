import { Viewer } from '@/components/Viewer';
import styles from './page.module.scss';

const items = [
    {
        name: 'Doc 1',
        href: '/docs/doc1',
        content: <div className={styles.editor}>Doc 1 content.</div>,
    },
];

export default function Page() {
    return <Viewer title="Docs" items={items} />;
}
