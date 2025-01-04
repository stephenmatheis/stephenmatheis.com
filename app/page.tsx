import { CSSProperties } from 'react';
import classNames from 'classnames';
import styles from './page.module.scss';

export default function RootPage() {
    return (
        <div className={styles.home}>
            <h1>Stephen Matheis</h1>
            {/* Meteors */}
            {/* {Array.from({ length: 5 }).map((_, i) => {
                return (
                    <div
                        key={i}
                        className={styles.meteor}
                        style={
                            {
                                '--start-top': `${Math.random() * 100}vh`,
                                '--start-left': `${Math.random() * 100}vw`,
                                top: `var(--start-top)`,
                                left: `var(--start-left)`,
                            } as CSSProperties
                        }
                    />
                );
            })} */}
            {/* Foreground */}
            {Array.from({ length: 100 }).map((_, i) => {
                return (
                    <div
                        key={i}
                        className={styles.star}
                        style={
                            {
                                '--start-top': `${Math.random() * 100}vh`,
                                '--start-left': `${Math.random() * 100}vw`,
                                top: `var(--start-top)`,
                                left: `var(--start-left)`,
                            } as CSSProperties
                        }
                    />
                );
            })}
            {/* Middle ground */}
            {Array.from({ length: 50 }).map((_, i) => {
                return (
                    <div
                        key={i}
                        className={classNames(styles.star, styles.gray)}
                        style={
                            {
                                '--start-top': `${Math.random() * 100}vh`,
                                '--start-left': `${Math.random() * 100}vw`,
                                top: `var(--start-top)`,
                                left: `var(--start-left)`,
                            } as CSSProperties
                        }
                    />
                );
            })}
            {/* Background ground */}
            {Array.from({ length: 25 }).map((_, i) => {
                return (
                    <div
                        key={i}
                        className={classNames(styles.star, styles.dark)}
                        style={
                            {
                                '--start-top': `${Math.random() * 100}vh`,
                                '--start-left': `${Math.random() * 100}vw`,
                                top: `var(--start-top)`,
                                left: `var(--start-left)`,
                            } as CSSProperties
                        }
                    />
                );
            })}
        </div>
    );
}
