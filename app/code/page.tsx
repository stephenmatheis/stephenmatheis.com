import { Viewer } from '@/components/Viewer';
import styles from './page.module.scss';

const items = [
    {
        name: 'Code 1',
        href: '/code/code1',
        content: <div className={styles.editor}>Code 1 content.</div>,
    },
];

export default function Page() {
    return <Viewer title="Code" items={items} />;
}
