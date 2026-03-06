import { Viewer } from '@/components/Viewer';
import styles from './page.module.scss';

const tools = [
    {
        name: 'Color Palettes',
        href: '/tools/color-palettes',
        content: <div className={styles.editor}>Tool 1 content.</div>,
    },
    {
        name: 'Tool 2',
        href: '/tools/2',
        content: <div className={styles.editor}>Tool 2 content.</div>,
    },
    {
        name: 'Tool 3',
        href: '/tools/3',
        content: <div className={styles.editor}>Tool 3 content.</div>,
    },
];

export default function Page() {
    return <Viewer title="Tools" items={tools} />;
}
