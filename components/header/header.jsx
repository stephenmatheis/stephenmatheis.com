import { useEffect, useRef } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import Type from '@/components/type/type';
import styles from './header.module.scss';

export default function Header({ loading, setLoading, speed, type, showLinkBackground }) {
    // Modifiers
    const titleMod = 12.5;

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
        const delay = type ?
            delayAfter(firstName + lastName, speed) +
            delayAfter(frontEnd + software + engineer, speed, titleMod * 1.5) :
            2000;

        setTimeout(async () => {
            if (!overlay.current || !ctr.current) {
                return;
            }

            // Set ctr height
            const { height, width } = ctr.current.getBoundingClientRect();

            ctr.current.style.height = `${height}px`;
            ctr.current.style.width = `${width}px`;

            // Animate name and title
            const duration = speed * 7;

            await Promise.all([
                anim(fromFirstName, toFirstName, duration),
                anim(fromLastName, toLastName, duration),
                anim(fromFrontEnd, toFrontEnd, duration),
                anim(fromSoftware, toSoftware, duration),
                anim(fromEngineer, toEngineer, duration),
            ]);

            // Loading is complete after animation
            setLoading(false);
        }, delay);

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
    }, [loading, setLoading, speed, type]);

    return (
        <header className={styles['header']}>
            <Link href="/" aria-label="Stephen Matheis' personal website">
                <div className={classNames(styles['profile'], { [styles['loading']]: loading, [styles['link-background']]: showLinkBackground })}>
                    <span ref={toFirstName} className={styles['name']}>{firstName}</span>
                    <span className={styles['name']}> </span>
                    <span ref={toLastName} className={styles['name']}>{lastName}</span>
                    <span> </span>
                    <span className={styles['nowrap']}>
                        <span ref={toFrontEnd} className={styles['title']}>{frontEnd}</span>
                        <span className={styles['title']}> </span>
                        <span ref={toSoftware} className={styles['title']}>{software}</span>
                        <span className={styles['title']}> </span>
                        <span ref={toEngineer} className={styles['title']}>{engineer}</span>
                    </span>
                </div>
            </Link>
            {
                loading &&
                <div ref={overlay} className={styles['loading-overlay']}>
                    <div ref={ctr} className={styles['ctr']}>
                        {
                            type ?
                                <>
                                    {/* Name */}
                                    <Type ref={fromFirstName} content={firstName} speed={speed * 2 / 3} className={styles['name']} wrapperClass={styles['line-wrapper']} />
                                    <Type ref={fromLastName} content={lastName} speed={speed * 2 / 3} delay={delayAfter(firstName, speed)} className={styles['name']} wrapperClass={styles['line-wrapper']} />

                                    {/* Title */}
                                    <Type ref={fromFrontEnd} content={frontEnd} speed={speed * 2 / 3} delay={delayAfter(firstName + lastName, speed, titleMod)} className={styles['title']} wrapperClass={styles['line-wrapper']} />
                                    <Type ref={fromSoftware} content={software} speed={speed * 2 / 3} delay={delayAfter(firstName + lastName + frontEnd, speed, titleMod)} className={styles['title']} wrapperClass={styles['line-wrapper']} />
                                    <Type ref={fromEngineer} content={engineer} speed={speed * 2 / 3} delay={delayAfter(firstName + lastName + frontEnd + software, speed, titleMod)} className={styles['title']} wrapperClass={styles['line-wrapper']} />
                                </> :
                                <>
                                    <span ref={fromFirstName} className={styles['name']}>{firstName}</span>
                                    <span ref={fromLastName} className={styles['name']}>{lastName}</span>
                                    <span ref={fromFrontEnd} className={styles['title']}>{frontEnd}</span>
                                    <span ref={fromSoftware} className={styles['title']}>{software}</span>
                                    <span ref={fromEngineer} className={styles['title']}>{engineer}</span>
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