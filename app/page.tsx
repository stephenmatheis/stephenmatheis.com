import { Viewport } from '@/components/viewport';
import { Content } from '@/components/content';
import styles from './page.module.scss';

export default function RootPage() {
    return (
        <Viewport>
            <Content>
                <div className={styles.root}>
                    <p>hi</p>
                    <p>line 2</p>
                </div>
            </Content>
        </Viewport>
    );
}
