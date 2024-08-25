import styles from './footer.module.scss';

export function Footer() {
    return (
        <footer className={styles.footer}>
            <a href="/resume.pdf" aria-label="My resume" target="_blank">
                <svg
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                >
                    <path
                        fillRule="evenodd"
                        d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"
                    />
                </svg>
                <span className={styles.desktop}>Download Resume</span>
            </a>
        </footer>
    );
}
