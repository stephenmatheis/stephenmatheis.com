import styles from './memoji.module.scss';

export function Memoji() {
    return (
        <video
            loop
            muted
            autoPlay
            playsInline
            poster="/poster.webp"
            style={{
                width: 640 / 2,
                height: 480 / 2,
                margin: 'auto auto',
            }}
            className={styles.memoji}
        >
            {/* https://rotato.app/blog/converting-videos */}
            <source
                src="/memoji-loop-22s-hevc-safari.mp4"
                type='video/mp4; codecs="hvc1"'
            />
            <source src="/memoji-loop-22s-vp9-chrome.webm" type="video/webm" />
        </video>
    );
}
