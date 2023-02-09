import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import Type from '@/components/type/type';
import styles from './header.module.scss';

export default function Header({ loading, setLoading, speed }) {
    // State
    const [isBlinking, setIsBlinking] = useState(true);

    // Modifiers
    const titleMod = 0;

    // Name and Title
    const firstName = 'Stephen';
    const lastName = 'Matheis';
    const frontEnd = 'Front-end';
    const software = 'Software';
    const engineer = 'Engineer';

    // Container refs
    const overlay = useRef();
    const ctr = useRef();

    // From refs
    const fromFirstName = useRef();
    const fromLastName = useRef();
    const fromFrontEnd = useRef();
    const fromSoftware = useRef();
    const fromEngineer = useRef();

    // To refs
    const toFirstName = useRef();
    const toLastName = useRef();
    const toFrontEnd = useRef();
    const toSoftware = useRef();
    const toEngineer = useRef();

    useEffect(() => {
        setTimeout(() => {
            setIsBlinking(false);
        }, 1000 * 2);
    }, [isBlinking]);

    useEffect(() => {
        if (isBlinking) {
            return;
        }

        setTimeout(async () => {
            if (!overlay.current || !ctr.current) {
                return;
            }

            // Set ctr height
            const { height, width } = ctr.current.getBoundingClientRect();

            ctr.current.style.height = `${height}px`;
            ctr.current.style.width = `${width}px`;

            // Animate name and title
            const duration = speed * 5;

            await Promise.all([
                anim(fromFirstName, toFirstName, duration),
                anim(fromLastName, toLastName, duration),
                anim(fromFrontEnd, toFrontEnd, duration),
                anim(fromSoftware, toSoftware, duration),
                anim(fromEngineer, toEngineer, duration),
            ]);

            // Loading is complete after animation
            setLoading(false);
        }, (delayAfter(firstName + lastName, speed) + delayAfter(frontEnd + software + engineer, speed)));

        async function anim(from, to, duration) {
            const fromName = from.current
            const { color: fromColor, fontSize, height, marginBottom } = getComputedStyle(fromName);
            const { color: toColor } = getComputedStyle(to.current);
            const fromNamePos = fromName.getBoundingClientRect();
            const toNamePos = to.current.getBoundingClientRect();

            fromName.style.height = `${height}px`;
            fromName.style.position = 'absolute';
            fromName.style.top = `${fromNamePos.top}px`;
            fromName.style.left = `${fromNamePos.left}px`;

            const animateName = fromName.animate([
                {
                    color: fromColor, top: `${fromNamePos.top}px`,
                    left: `${fromNamePos.left}px`,
                    fontSize,
                    marginBottom,
                },
                {
                    color: toColor,
                    top: `${toNamePos.top}px`,
                    left: `${toNamePos.left}px`,
                    fontSize: '12px',
                    marginBottom: '0px',
                }
            ], {
                duration: duration || 0,
                easing: 'ease-in-out',
                fill: 'forwards'
            });

            const isNameFinished = await animateName.finished;

            if (isNameFinished.playState === 'finished') {
                return 'done';
            }
        }
    }, [isBlinking, loading, setLoading, speed]);

    return (
        <header className={styles['header']}>
            <Link href="/" aria-label="Stephen Matheis' personal website">
                <div className={classNames(styles['profile'], { [styles['loading']]: loading })}>
                    <span ref={toFirstName} className={styles['name']}>Stephen</span>
                    <span className='space'> </span>
                    <span ref={toLastName} className={styles['name']}>Matheis</span>
                    <span className='space'> </span>
                    <span className={styles['nowrap']}>
                        <span ref={toFrontEnd} className={styles['title']}>Front-end</span>
                        <span className='space'> </span>
                        <span ref={toSoftware} className={styles['title']}>Software</span>
                        <span className='space'> </span>
                        <span ref={toEngineer} className={styles['title']}>Engineer</span>
                    </span>
                </div>
            </Link>
            {
                loading &&
                <div ref={overlay} className={styles['loading-overlay']}>
                    <div ref={ctr} className={styles['ctr']}>
                        {
                            isBlinking ?
                                <>
                                    <span className={classNames(styles['name'], styles['blink'])}>
                                        {/* █ */}
                                        |
                                        <span className={styles['hidden']}>
                                            {firstName.substring(1)}
                                        </span>
                                    </span>
                                    <span className={classNames(styles['hidden'], styles['name'])}>{lastName}</span>
                                    <span className={classNames(styles['hidden'], styles['title'])}>{frontEnd}</span>
                                    <span className={classNames(styles['hidden'], styles['title'])}>{software}</span>
                                    <span className={classNames(styles['hidden'], styles['title'])}>{engineer}</span>
                                </> :
                                <>
                                    {/* Name */}
                                    <Type ref={fromFirstName} content={firstName} speed={speed * 2 / 3} className={styles['name']} wrapperClass={styles['line-wrapper']} />
                                    <Type ref={fromLastName} content={lastName} speed={speed * 2 / 3} delay={delayAfter(firstName, speed)} className={styles['name']} wrapperClass={styles['line-wrapper']} />

                                    {/* Title */}
                                    <Type ref={fromFrontEnd} content={frontEnd} speed={speed * 2 / 3} delay={delayAfter(firstName + lastName, speed, titleMod)} className={styles['title']} wrapperClass={styles['line-wrapper']} />
                                    <Type ref={fromSoftware} content={software} speed={speed * 2 / 3} delay={delayAfter(firstName + lastName + frontEnd, speed, titleMod)} className={styles['title']} wrapperClass={styles['line-wrapper']} />
                                    <Type ref={fromEngineer} content={engineer} speed={speed * 2 / 3} delay={delayAfter(firstName + lastName + frontEnd + software, speed, titleMod)} className={styles['title']} wrapperClass={styles['line-wrapper']} />
                                </>
                        }
                    </div>
                </div>
            }
        </header>
    );
}

function delayAfter(text, speed, modifier = 0) {
    return ((text.length + modifier) * speed) + (speed * 2);
}