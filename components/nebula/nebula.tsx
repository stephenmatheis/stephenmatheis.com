import styles from './nebula.module.scss';

export function Nebula() {
    return (
        <div className={styles.nebula}>
            {Array.from({ length: 3 }).map((_, i) => {
                const x = Math.random() * 100; // Random position
                const y = Math.random() * 100;
                const size = 30 + Math.random() * 50; // Random size
                const color = `rgba(${Math.random() * 255}, ${
                    Math.random() * 255
                }, ${Math.random() * 255}, 0.2)`;

                return (
                    <div
                        key={i}
                        className={styles.cloud}
                        style={{
                            top: `${y}%`,
                            left: `${x}%`,
                            width: `${size}vw`,
                            height: `${size}vw`,
                            background: `radial-gradient(circle, ${color}, transparent)`,
                        }}
                    />
                );
            })}
        </div>
    );
}
