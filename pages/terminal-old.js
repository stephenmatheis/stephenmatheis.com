import Head from 'next/head';
import { useEffect, useState } from 'react';
import jobs from '../data/jobs';
import skills from '../data/skills';

export default function Home() {
    const curentYear = new Date().getFullYear();
    const [displayedContent, setDisplayedContent] = useState('');
    const [index, setIndex] = useState(0);

    function Main() {
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
                                            <span>{title}</span> <span className="company">@ {company}</span>
                                        </div>
                                        <div className="date">
                                            {start} - {end} | {location}
                                        </div>
                                        <div className='lines'>
                                            {lines.map((line, index) => {
                                                return (
                                                    <span key={index} className="line">
                                                        ᐅ <span style={{ marginLeft: '6px' }} dangerouslySetInnerHTML={{ __html: line }} />
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
                                        <span className="name">{name}</span>
                                        <span className="years">{years} {parseInt(years) === 1 ? 'year' : 'years'}</span>
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
                                Armstrong Atlantic State University
                            </a>
                        </div>
                        <div className="major">2006 - 2007 | Computer Science</div>
                    </div>
                    {/* Contact */}
                    <div id="contact">
                        <div className="comment">{'// Contact'}</div>
                        <div className="info">
                            <div>
                                <a href="tel:9124922522">
                                    📱 (912) 492-2522
                                </a>
                            </div>
                            <div>
                                <a href="mailto:stephen.a.matheis@gmail.com">
                                    ✉️ stephen.a.matheis@gmail.com
                                </a>
                            </div>
                            <div>
                                <a href="https://github.com/stephenmatheis" target="_blank" rel="noreferrer" title='GitHub'>
                                    🧑‍💻 github.com/stephenmatheis
                                </a>
                            </div>
                            <div>
                                <a href="https://www.linkedin.com/in/stephenmatheis/" target="_blank" rel="noreferrer" title='LinkedIn'>
                                    💼 linkedin.com/in/stephenmatheis
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        )
    }

    const content = 'Stephen Matheis';
    const speed = 100;

    useEffect(() => {
        const type = setInterval(() => {
            setIndex((index) => {
                // console.log(content.slice(0, index));

                if (index >= content.length - 1) {
                    clearInterval(type);

                    return index;
                }

                return index + 1;
            });
        }, speed);
    }, []);

    useEffect(() => {
        setDisplayedContent(displayedContent => displayedContent + content[index])
    }, [index]);

    return (
        <>
            <Head>
                <title>Stephen Matheis - Resume</title>
                <meta name="description" content="Stephen Matheis' resume" />
            </Head>
            {/* <Paralax /> */}
            <div id='resume'>
                {/* Header */}
                <header>
                    <a href="https://www.stephenmatheis.com">
                        <div className="name">
                            {displayedContent}
                            {/* Stephen Matheis <span className="blue">|</span> <span className="orange">Front-end Software Engineer</span> */}
                        </div>
                    </a>
                </header>
                {/* Main */}
                {/* <Main /> */}
            </div>
        </>
    )
}
