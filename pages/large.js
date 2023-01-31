import Head from 'next/head';
import classNames from 'classnames';
import Type from '@/components/type';
import jobs from '../data/jobs';
import skills from '../data/skills';
import { useEffect, useRef, useState } from 'react';

export default function Home() {
    // State
    const [loading, setLoading] = useState(true);

    // Data
    const curentYear = new Date().getFullYear();
    const name = 'Stephen Matheis ';
    const title = 'Front-end Software Engineer';
    const speed = 60;

    function delayAfter(text, speed) {
        return (text.length * speed) + (speed * 2);
    }

    function Header({ type = false }) {
        const overlay = useRef();
        const ctr = useRef();
        const toName = useRef();
        const toTitle = useRef();
        const fromName = useRef();
        const fromTitle = useRef();

        useEffect(() => {
            setTimeout(async () => {
                if (!overlay.current || !ctr.current) {
                    return;
                }

                // Set ctr height
                const { height, width } = ctr.current.getBoundingClientRect();

                ctr.current.style.height = `${height}px`;
                ctr.current.style.width = `${width}px`;

                // Set starting position
                const { top, left } = overlay.current.getBoundingClientRect();

                overlay.current.style.position = 'absolute';
                overlay.current.style.top = `${top}px`;
                overlay.current.style.left = `${left}px`;

                const anims = await Promise.all([
                    anim(fromName, toName, 450),
                    anim(fromTitle, toTitle, 450)
                ]);

                setLoading(false);


            }, (delayAfter(name, speed) + delayAfter(title, speed)));

            async function anim(from, to, duration) {
                // Animate Name
                const fromName = from.current
                const { fontSize } = getComputedStyle(fromName);
                const fromNamePos = fromName.getBoundingClientRect();
                const toNamePos = to.current.getBoundingClientRect();

                fromName.style.position = 'absolute';
                fromName.style.top = `${fromNamePos.top}px`;
                fromName.style.left = `${fromNamePos.left}px`;

                const animateName = fromName.animate([
                    { top: `${fromNamePos.top}px`, left: `${fromNamePos.left}px`, fontSize: fontSize, marginBottom: '16px' },
                    { top: `${toNamePos.top}px`, left: `${toNamePos.left}px`, fontSize: '12px', marginBottom: '0px' }
                ], {
                    duration: duration || 0,
                    easing: 'ease-in-out',
                    fill: 'forwards'
                });

                // TODO: Wait for all animations to finish
                const isNameFinished = await animateName.finished;

                if (isNameFinished.playState === 'finished') {
                    // fromName.remove();

                    // resume.current.classList.remove('fixed');
                    // profile.current.removeAttribute('style');

                    // animateProfile.commitStyles();
                    // animateName.commitStyles();
                    // animateTitle.commitStyles();

                    return 'done';
                }
            }
        }, []);

        return (
            <header>
                <a href="https://www.stephenmatheis.com">
                    <div className={classNames('profile', { loading })}>
                        <span ref={toName} className='name'>Stephen Matheis</span> <span className="blue">|</span> <span ref={toTitle} className="title">Front-end Software Engineer</span>
                    </div>
                </a>
                {
                    loading &&
                    <div ref={overlay} className="overlay">
                        <div ref={ctr} className="ctr">
                            <Type ref={fromName} content={name} speed={40} className="name" />
                            <Type ref={fromTitle} content={title} speed={40} delay={delayAfter(name, speed)} className='title' />
                        </div>
                    </div>
                }
            </header>
        )
    }

    function Main({ type = false }) {
        return (
            <main>
                {/* Left */}
                <section className='left'>
                    <div id="experience">
                        <div className="comment">{'// Experience'}</div>
                        {
                            jobs.map(({ title, company, location, start, end, lines }, index) => {
                                return (
                                    <div key={index} className="job">
                                        <div className="title">
                                            {type ? <Type content={title} speed={speed / 2} /> : <span>{title}</span>}
                                            <span> </span>
                                            {type ? <Type content={`@ ${company}`} speed={speed / 2} className='company' /> : <span className="company">@ {company}</span>}
                                        </div>
                                        <div className="date">
                                            {
                                                type ?
                                                    <>
                                                        <Type content={`${start} - ${end} `} speed={speed / 2} />
                                                        <Type content={'| '} speed={speed} className='gray' />
                                                        <Type content={location} speed={speed / 2} className='gray' />
                                                        <span></span>
                                                    </> :
                                                    <>
                                                        {start} - {end} | {location}
                                                    </>
                                            }
                                        </div>
                                        <div className='lines'>
                                            {lines.map((line, index) => {
                                                return (
                                                    <span key={index} className="line">
                                                        {/* <span style={{ marginRight: '6px' }} >ᐅ</span> */}
                                                        <span style={{ marginRight: '6px' }} >❯</span>
                                                        {
                                                            type ?
                                                                <>
                                                                    <Type content={line} speed={10} />
                                                                </> :
                                                                <>
                                                                    <span dangerouslySetInnerHTML={{ __html: line }} />
                                                                </>
                                                        }
                                                    </span>
                                                )
                                            })}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </section>
                {/* Right */}
                <section className="right">
                    <div id="skills">
                        <div className="comment">{'// Skills'}</div>
                        {
                            skills.map(({ name, started }, index) => {
                                const years = (curentYear - started || 1);

                                return (
                                    <div key={index} className="skill">
                                        <span className="name">
                                            {type ? <Type content={name} speed={speed} /> : name}
                                        </span>
                                        <span className="years">
                                            {
                                                type ?
                                                    <Type content={`${years} ${parseInt(years) === 1 ? 'year' : 'years'}`} speed={speed} /> :
                                                    <>
                                                        {years} {parseInt(years) === 1 ? 'year' : 'years'}
                                                    </>
                                            }
                                        </span>
                                    </div>
                                )
                            })
                        }
                    </div>
                    {/* Education */}
                    <div id="education">
                        <div className="comment">{'// Education'}</div>
                        <div className="college">
                            <a href="https://www.georgiasouthern.edu/campuses/armstrong-campus/" target="_blank" rel="noreferrer">
                                <Type content="Armstrong Atlantic State University" speed={speed / 2} />
                            </a>
                        </div>
                        <div className="major">
                            {
                                type ?
                                    <>
                                        <Type content="2006 - 2007 " speed={speed} className="blue" />
                                        <Type content={'| '} speed={speed} className="light" />
                                        <Type content="Computer Science" speed={speed} className="light" />
                                        <span></span>
                                    </>
                                    :
                                    <>
                                        <span>2006 - 2007</span>
                                        <span> | Computer Science</span>
                                    </>
                            }
                        </div>
                    </div>
                    {/* Contact */}
                    <div id="contact">
                        <div className="comment">{'// Contact'}</div>
                        <div className="info">
                            <div>
                                <a href="tel:9124922522">
                                    <Type content="📱 (912) 492-2522" speed={40} startAtChar={2} />
                                </a>
                            </div>
                            <div>
                                <a href="mailto:stephen.a.matheis@gmail.com">
                                    <Type content="📧 stephen.a.matheis@gmail.com" speed={30} startAtChar={2} />
                                </a>
                            </div>
                            <div>
                                <a href="https://github.com/stephenmatheis" target="_blank" rel="noreferrer" title='GitHub'>
                                    <Type content="👩‍💻 github.com/stephenmatheis" speed={30} startAtChar={5} />
                                </a>
                            </div>
                            <div>
                                <a href="https://www.linkedin.com/in/stephenmatheis/" target="_blank" rel="noreferrer" title='LinkedIn'>
                                    <Type content="💼 linkedin.com/in/stephenmatheis" speed={30} startAtChar={2} />
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        )
    }

    return (
        <>
            <Head>
                <title>Stephen Matheis</title>
                <meta name="description" content="Stephen Matheis Resume" />
            </Head>
            {/* <Paralax /> */}
            <div id="resume">
                <Header type={true} />
                {!loading && <Main type={true} />}
            </div>
        </>
    )
}
