import { Viewer } from '@/components/Viewer';
import styles from './page.module.scss';

const items = [
    {
        name: 'Hack 1',
        href: '/hacks/hack1',
        content: <div className={styles.editor}>Hack 1 content.</div>,
    },
];

export default function Page() {
    return <Viewer title="Hacks" items={items} />;
}
