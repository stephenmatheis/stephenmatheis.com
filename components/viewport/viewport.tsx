import { Page } from '@/components/page';
import { Content } from '@/components/content';
import { Details } from '@/components/details';
import { Readout } from '@/components/readout';
import styles from './viewport.module.scss';

export function Viewport() {
    return (
        <>
            <div className={styles.viewport}>
                <Page>
                    <Content />
                </Page>
                <div className={styles.hud}>
                    <Details />
                    <Readout />
                </div>
            </div>
        </>
    );
}
