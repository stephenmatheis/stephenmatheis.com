import classNames from 'classnames';
import styles from './page.module.scss';

function Parallelogram({ className = '' }: { className?: string }) {
    return (
        <div className={classNames(styles.parallelogram, styles[className])}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                viewBox="0 0 50 100"
                preserveAspectRatio="none"
            >
                <polygon points="25,0 50,0 25,100 0,100" />
            </svg>
        </div>
    );
}

function HorizontalLine({ className = '' }: { className?: string }) {
    return (
        <div className={classNames(styles.horizontal, styles[className])}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                viewBox="0 0 50 100"
                preserveAspectRatio="none"
            >
                <line
                    x1="0"
                    y1="50"
                    x2="50"
                    y2="50"
                    stroke="black"
                    strokeWidth="50"
                />
            </svg>
        </div>
    );
}

function VerticalLine({ className = '' }: { className?: string }) {
    return (
        <div className={classNames(styles.vertical, styles[className])}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                viewBox="0 0 50 100"
                preserveAspectRatio="none"
            >
                <line
                    x1="25"
                    y1="0"
                    x2="25"
                    y2="100"
                    stroke="black"
                    strokeWidth="50"
                />
            </svg>
        </div>
    );
}

export default function RootPage() {
    return (
        <div className={styles.home}>
            <div className={styles.background}>
                {/* Top left */}
                <HorizontalLine className="top" />

                {/* Left */}
                <VerticalLine className="left" />

                {/* Right */}
                <VerticalLine className="right" />

                {/* Top Right */}
                <div className={styles.sigil}>
                    <Parallelogram />
                    <Parallelogram />
                    <Parallelogram />
                    <Parallelogram />
                    <Parallelogram />
                </div>
            </div>
        </div>
    );
}
