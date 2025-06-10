'use client';

import * as motion from 'motion/react-client';
import styles from './page.module.scss';

// const audioCtx = new AudioContext();

// function playTilePlunk(frequency = 300 + Math.random() * 80) {
//     const osc = audioCtx.createOscillator();
//     const gain = audioCtx.createGain();

//     osc.connect(gain);
//     gain.connect(audioCtx.destination);

//     // osc.type = 'triangle';
//     osc.type = 'sine';
//     osc.frequency.value = frequency;

//     const now = audioCtx.currentTime;

//     gain.gain.setValueAtTime(0.2, now);
//     gain.gain.exponentialRampToValueAtTime(0.001, now + 0.125);

//     // gain.gain.setValueAtTime(0, now);
//     // gain.gain.linearRampToValueAtTime(0.15, now + 0.05);
//     // gain.gain.linearRampToValueAtTime(0.001, now + 0.4);

//     osc.start(now);
//     osc.stop(now + 0.1);
// }

function Letter({ letter, x, y, r, fontSize, zIndex, i }) {
    return (
        <motion.span
            style={{
                fontSize,
                zIndex,
            }}
            initial={{ translateX: x, translateY: -20, rotate: 0, opacity: 0 }}
            animate={{
                opacity: 1,
                translateX: x,
                translateY: y,
                rotate: r,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 15, delay: i * 0.1 }}
            // onAnimationStart={() => {
            //     setTimeout(() => {
            //         playTilePlunk();
            //     }, (i + 1.6) * 100);
            // }}
        >
            {letter}
        </motion.span>
    );
}

export default function FunPage() {
    return (
        <div className={styles.page}>
            <header>
                <div className={styles.spacer} />
                <h1>
                    {[
                        { letter: 'a', x: 46, y: 10, r: -12, fontSize: '70px', zIndex: 0 },
                        { letter: 'c', x: 32, y: 3, r: -10, fontSize: '44px', zIndex: 1 },
                        { letter: 't', x: 24, y: 4, r: -8, fontSize: '60px', zIndex: 0 },
                        { letter: 'u', x: 16, y: -8, r: -4, fontSize: '50px', zIndex: 1 },
                        { letter: 'a', x: 12, y: 2, r: 4, fontSize: '55px', zIndex: 0 },
                        { letter: 'l', x: 8, y: 1, r: 9, fontSize: '44px', zIndex: 1 },
                    ].map(({ letter, x, y, r, fontSize, zIndex }, i) => (
                        <Letter key={i} letter={letter} x={x} y={y} r={r} fontSize={fontSize} zIndex={zIndex} i={i} />
                    ))}
                    {[
                        { letter: 'p', x: 46, y: 10, r: -12, fontSize: '70px', zIndex: 0 },
                        { letter: 'o', x: 32, y: 3, r: -10, fontSize: '44px', zIndex: 1 },
                        { letter: 't', x: 24, y: 4, r: -8, fontSize: '60px', zIndex: 0 },
                        { letter: 'a', x: 16, y: -8, r: -4, fontSize: '50px', zIndex: 1 },
                        { letter: 't', x: 12, y: 2, r: 4, fontSize: '55px', zIndex: 0 },
                        { letter: 'o', x: 8, y: 1, r: 9, fontSize: '44px', zIndex: 1 },
                    ].map(({ letter, x, y, r, fontSize, zIndex }, i) => (
                        <Letter key={i} letter={letter} x={x} y={y} r={r} fontSize={fontSize} zIndex={zIndex} i={i} />
                    ))}
                </h1>
                <div className={styles.spacer} />
            </header>
            <div className={styles.flex}>
                <aside className={styles.sidebar}>
                    <nav className={styles.nav}>
                        <h2>navigation</h2>
                        <ul>
                            <li>
                                <a href="">home</a>
                            </li>
                            <li>
                                <a href="">about me</a>
                            </li>
                            <li>
                                <a href="">blog</a>
                            </li>
                            <li>
                                <a href="">collections</a>
                            </li>
                            <li>
                                <a href="">guestbook</a>
                            </li>
                            <li>
                                <a href="">resources</a>
                            </li>
                            <li>
                                <a href="">sacred</a>
                            </li>
                            <li>
                                <a href="">obsessed</a>
                            </li>
                        </ul>
                    </nav>
                    <section>
                        <h2>status</h2>
                    </section>
                    <section>
                        <h2>my time</h2>
                    </section>
                    <section>
                        <h2>changelog</h2>
                    </section>
                </aside>
                <main className={styles.content}>
                    <section>
                        <h2>welcome spuds!</h2>
                    </section>
                    <section>
                        <h2>about this tuber</h2>
                    </section>
                    <section>
                        <h2>sites i like </h2>
                    </section>
                </main>
                <aside className={styles.sidebar}>
                    <section>
                        <h2>style</h2>
                    </section>
                    <section>
                        <h2>buttons</h2>
                    </section>
                    <section>
                        <h2>links</h2>
                    </section>
                    <section className={styles.chat}>
                        <h2>chat</h2>
                        <div className={styles.message}>hello world</div>
                        <div className={styles.message}>hello world</div>
                        <div className={styles.message}>hello world</div>
                        <div className={styles.message}>hello world</div>
                        <div className={styles.message}>hello world</div>
                    </section>
                </aside>
            </div>
            <footer>
                <p>site counter 0000</p>
                <p>
                    (C) {new Date().getFullYear()} steph, all rights reserved {'<3'}
                </p>
            </footer>
        </div>
    );
}
