import styles from './content.module.scss';

export function Content({ children }: { children: React.ReactNode }) {
    return (
        <main className={styles.content}>
            {children}

            {/* Characters */}
            <div
                className="no-print"
                style={{
                    position: 'absolute',
                    top: '-2rem',
                    width: '100%',
                    pointerEvents: 'none',
                }}
            >
                {Array.from({ length: 90 }).map((_, i) => {
                    return (
                        <span
                            key={i}
                            style={{
                                pointerEvents: 'all',
                                color: '#888888',
                            }}
                        >
                            {i === 89 ? 9 : i % 10 === 0 ? i / 10 : '-'}
                        </span>
                    );
                })}
            </div>

            {/* Lines */}
            <div
                className="no-print"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    pointerEvents: 'none',
                    zIndex: 0,
                }}
            >
                {Array.from({ length: 44 }).map((_, i) => {
                    return (
                        <div
                            key={i}
                            style={{
                                height: 22,
                                background: i % 2 ? '#00000050' : 'transparent',
                            }}
                        >
                            <span
                                style={{
                                    display: 'inline-block',
                                    transform: 'translateX(-32px)',
                                    pointerEvents: 'all',
                                    color: '#888888',
                                }}
                            >
                                {i + 1}
                            </span>
                        </div>
                    );
                })}
            </div>
        </main>
    );
}
