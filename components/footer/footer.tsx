import styles from './footer.module.scss';

type FooterProps = {};

export function Footer({}: FooterProps) {
    return (
        <div className={styles.footer}>
            <div>─────────────────────────────────────────────────────────</div>
            <div>Footer</div>
        </div>
    );
}
