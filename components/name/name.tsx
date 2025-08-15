import { usePage } from '@/providers/page-provider';
import { Section } from '@/components/section';
import styles from './name.module.scss';

export function Name() {
    const { page, direction, canUpdate } = usePage();

    return (
        <Section
            className={styles.name}
            data-page={page}
            data-can-update={canUpdate}
            data-direction={direction === null ? 'null' : direction}
        >
            <div className={styles.row}>
                <span className={styles.primary}>Stephen Matheis</span>
                <span className={styles.muted}>Software Engineer</span>
            </div>
        </Section>
    );
}
