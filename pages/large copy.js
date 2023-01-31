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

    // Refs
    const resume = useRef();

    function delayAfter(text, speed) {
        return (text.length * speed) + (speed * 2);
    }

    function Header({ type = false }) {
        const profile = useRef();

        useEffect(() => {
            setTimeout(async () => {
                console.log('animate');

                if (profile.current) {
                    const { top, left } = profile.current.getBoundingClientRect();
                    const windowStyles = getComputedStyle(document.querySelector('html'));

                    console.log(windowStyles.marginLeft);

                    // Set starting position
                    profile.current.style.position = 'absolute';
                    profile.current.style.top = `${top}px`;
                    profile.current.style.left = `${left}px`;

                    // Animate move profile to top left corner
                    const toLeft = parseInt(windowStyles.paddingLeft.replace('px', '')) + parseInt(windowStyles.marginLeft.replace('px', '')) + 'px';
                    const animateProfile = profile.current.animate([
                        { top: `${top}px`, left: `${left}px` },
                        { top: windowStyles.paddingTop, left: toLeft }
                    ], {
                        duration: 300,
                        easing: 'ease-in-out',
                        fill: 'forwards'
                    });

                    // Animate name font size from 64px to 12px, remove bottom margin
                    const animateName = profile.current.querySelector('.name').animate([
                        { fontSize: '64px', marginBottom: '16px' },
                        { fontSize: '12px', marginBottom: '0px' }
                    ], {
                        duration: 300,
                        easing: 'ease-in-out',
                        fill: 'forwards'
                    });

                    // Animate title font size from 32px to 12px
                    const animateTitle = profile.current.querySelector('.title').animate([
                        { fontSize: '32px' },
                        { fontSize: '12px' }
                    ], {
                        duration: 300,
                        easing: 'ease-in-out',
                        fill: 'forwards'
                    });

                    // TODO: Wait for all animations to finish
                    const isFinished = await animateProfile.finished;

                    if (isFinished.playState === 'finished') {

                        // reset ctr styles
                        resume.current.classList.remove('fixed');
                        profile.current.removeAttribute('style');

                        // setLoading(false);

                        animateProfile.commitStyles();
                        animateName.commitStyles();
                        animateTitle.commitStyles();
                    }
                }

            }, (delayAfter(name, speed) + delayAfter(title, speed)));
        }, []);

        return (
            <header>
                <a href="https://www.stephenmatheis.com">
                    <div ref={profile} className="profile">
                        {
                            <>
                                <div>
                                    <Type content={name} speed={40} className="name" />
                                </div>
                                <div>
                                    <Type content={title} speed={40} delay={delayAfter(name, speed)} className='title' />
                                </div>
                                <span className={classNames({ loading })}>
                                    Stephen Matheis <span className="blue">|</span> <span className="orange">Front-end Software Engineer</span>
                                </span>
                                {/* {
                                    loading ?
                                        <>
                                            <div>
                                                <Type content={name} speed={40} className="name" />
                                            </div>
                                            <div>
                                                <Type content={title} speed={40} delay={delayAfter(name, speed)} className='title' />
                                            </div>
                                        </>
                                        :
                                        <>
                                            Stephen Matheis <span className="blue">|</span> <span className="orange">Front-end Software Engineer</span>
                                        </>
                                } */}
                            </>
                        }
                    </div>
                </a>
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
                                        <span className="profile">
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
            <div id="resume" ref={resume} className="fixed">
                <Header type={true} />
                {/* <Main type={true} /> */}
            </div>
        </>
    )
}
