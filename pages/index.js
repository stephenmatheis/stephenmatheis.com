import Head from 'next/head';
import classNames from 'classnames';
// import Type from '@/components/type';
import Type from '@/components/type2';
import jobs from '../data/jobs';
import skills from '../data/skills';
import { useEffect, useRef, useState } from 'react';


// Data
const curentYear = new Date().getFullYear();
const name = 'Stephen Matheis ';
const title = 'Front-end Software Engineer';
const speed = 60;

function delayAfter(text, speed) {
    return (text.length * speed) + (speed * 2);
}

function Header({ loading, setLoading }) {
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

            // Animate name and title
            const duration = 300;
            const anims = await Promise.all([
                anim(fromName, toName, duration),
                anim(fromTitle, toTitle, duration)
            ]);

            // Load complete after animation
            setLoading(false);
        }, (delayAfter(name, speed) + delayAfter(title, speed)));

        async function anim(from, to, duration) {
            // Animate Name
            const fromName = from.current
            const { fontSize, marginBottom, color: fromColor, lineHeight } = getComputedStyle(fromName);
            const { color: toColor } = getComputedStyle(to.current);
            const fromNamePos = fromName.getBoundingClientRect();
            const toNamePos = to.current.getBoundingClientRect();

            fromName.style.position = 'absolute';
            fromName.style.top = `${fromNamePos.top}px`;
            fromName.style.left = `${fromNamePos.left}px`;

            const animateName = fromName.animate([
                {
                    color: fromColor, top: `${fromNamePos.top}px`,
                    left: `${fromNamePos.left}px`,
                    fontSize,
                    marginBottom,
                    lineHeight
                },
                {
                    color: toColor,
                    top: `${toNamePos.top}px`,
                    left: `${toNamePos.left}px`,
                    fontSize: '12px',
                    marginBottom: '0px',
                    lineHeight: '14px'
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
    }, [setLoading]);

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
                        <Type ref={fromName} content={name} speed={speed * 2/3} className="name" wrapperClass={'line-wrapper'} />
                        <Type ref={fromTitle} content={title} speed={speed * 2/3} delay={delayAfter(name, speed)} className='title' wrapperClass={'line-wrapper'} />
                    </div>
                </div>
            }
        </header>
    );
}

function Main({ type }) {
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
                                <Type content="📱 (912) 492-2522" speed={speed * 2 / 3} startAtChar={2} />
                            </a>
                        </div>
                        <div>
                            <a href="mailto:stephen.a.matheis@gmail.com">
                                <Type content="📧 stephen.a.matheis@gmail.com" speed={speed / 2} startAtChar={2} />
                            </a>
                        </div>
                        <div>
                            <a href="https://github.com/stephenmatheis" target="_blank" rel="noreferrer" title='GitHub'>
                                <Type content="👩‍💻 github.com/stephenmatheis" speed={speed / 2} startAtChar={5} />
                            </a>
                        </div>
                        <div>
                            <a href="https://www.linkedin.com/in/stephenmatheis/" target="_blank" rel="noreferrer" title='LinkedIn'>
                                <Type content="💼 linkedin.com/in/stephenmatheis" speed={speed / 2} startAtChar={2} />
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default function Home() {
    // State
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (loading) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.removeAttribute('style');
        }

        return () => document.body.removeAttribute('style');
    }, [loading]);

    return (
        <>
            <Head>
                <title>Stephen Matheis</title>
                <meta name="description" content="Stephen Matheis" />
            </Head>
            {/* <Paralax /> */}
            <div id="resume" className={classNames({ loading })}>
                <Header loading={loading} setLoading={setLoading} />
                {!loading && <Main type={true} />}
            </div>
        </>
    )
}