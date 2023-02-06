import { useEffect, useRef } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import Type from '@/components/type/type';

function delayAfter(text, speed) {
    return (text.length * speed) + (speed * 2);
}

export default function Header({ loading, setLoading, speed }) {
    const overlay = useRef();
    const ctr = useRef();

    const firstName = 'Stephen';
    const lastName = 'Matheis';
    const frontEnd = 'Front-end';
    const software = 'Software';
    const engineer = 'Engineer';

    const fromFirstName = useRef();
    const fromLastName = useRef();
    const fromFrontEnd = useRef();
    const fromSoftware = useRef();
    const fromEngineer = useRef();

    const toFirstName = useRef();
    const toLastName = useRef();
    const toFrontEnd = useRef();
    const toSoftware = useRef();
    const toEngineer = useRef();

    useEffect(() => {
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
    }, [loading, setLoading, speed]);

    return (
        <header>
            <Link href="/" aria-label="Stephen Matheis' personal website">
                <div className={classNames('profile', { loading })}>
                    <span ref={toFirstName} className='name'>Stephen</span>
                    <span className='space'> </span>
                    <span ref={toLastName} className='name'>Matheis</span>
                    <span className='space'> </span>
                    <span ref={toFrontEnd} className="title">Front-end</span>
                    <span className='space'> </span>
                    <span ref={toSoftware} className="title">Software</span>
                    <span className='space'> </span>
                    <span ref={toEngineer} className="title">Engineer</span>
                </div>
            </Link>
            {
                loading &&
                <div ref={overlay} className="overlay">
                    <div ref={ctr} className="ctr">
                        {/* Name */}
                        <Type ref={fromFirstName} content={firstName} speed={speed * 2 / 3} className="name" wrapperClass={'line-wrapper'} />
                        <Type ref={fromLastName} content={lastName} speed={speed * 2 / 3} delay={delayAfter(firstName, speed)} className="name" wrapperClass={'line-wrapper'} />

                        {/* Title */}
                        <Type ref={fromFrontEnd} content={frontEnd} speed={speed * 2 / 3} delay={delayAfter(firstName + lastName, speed)} className='title' wrapperClass="line-wrapper" />
                        <Type ref={fromSoftware} content={software} speed={speed * 2 / 3} delay={delayAfter(firstName + lastName + frontEnd, speed)} className='title' wrapperClass="line-wrapper" />
                        <Type ref={fromEngineer} content={engineer} speed={speed * 2 / 3} delay={delayAfter(firstName + lastName + frontEnd + software, speed)} className='title' wrapperClass="line-wrapper" />
                    </div>
                </div>
            }
        </header>
    );
}