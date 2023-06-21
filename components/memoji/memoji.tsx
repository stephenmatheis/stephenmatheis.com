import styles from './memoji.module.scss';

export function Memoji({}: {}) {
    return (
        <video
            loop
            muted
            autoPlay
            playsInline
            poster="/poster.png"
            style={{
                width: 640 / 2,
                height: 480 / 2,
                margin: 'auto auto',
            }}
            className={styles.memoji}
            src="/memoji-loop-22s.mov"
        />
    );
}
