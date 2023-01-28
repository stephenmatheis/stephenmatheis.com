import Head from 'next/head';
import jobs from '../data/jobs';
import skills from '../data/skills';

export default function Home() {
    const curentYear = new Date().getFullYear();

    return (
        <>
            <Head>
                <title>Stephen Matheis - Resume</title>
                <meta name="description" content="Stephen Matheis' resume" />
            </Head>
            <div id='resume'>
                {/* Header */}
                <header>
                    <div className='profile'>
                        <a href="https://www.stephenmatheis.com">
                            <h1 className="name">Stephen Matheis</h1>
                            <h2 className="name">Front-end Software Engineer</h2>
                        </a>
                    </div>
                    <div className="links">
                        <a href="tel:9124922522">
                            (912) 492-2522
                        </a>
                        <a href="mailto:stephen.a.matheis@gmail.com">
                            stephen.a.matheis@gmail.com
                        </a>
                        <a href="https://github.com/stephenmatheis" target="_blank" rel="noreferrer" title='GitHub'>
                            github.com/stephenmatheis
                        </a>
                        <a href="https://www.linkedin.com/in/stephenmatheis/" target="_blank" rel="noreferrer" title='LinkedIn'>
                            linkedin.com/in/stephenmatheis
                        </a>
                    </div>
                </header>
                {/* Main */}
                <main>
                    {/* Left */}
                    <section className='left'>
                        <div id="experience">
                            <h2>Experience</h2>
                            {
                                jobs.map(({ title, company, location, start, end, lines }, index) => {
                                    return (
                                        <div key={index} className="job">
                                            <div className="job-heading title">
                                                <span style={{ fontWeight: '800' }}>{title}</span> @ {company}
                                            </div>
                                            <div className="job-heading date">
                                                {start} - {end} | {location}
                                            </div>
                                            <div className='lines'>
                                                {lines.map((line, index) => {
                                                    return (
                                                        <span key={index} className="line">
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                                                <path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z" />
                                                            </svg>
                                                            <span dangerouslySetInnerHTML={{ __html: line }} />
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
                    <section className='right'>
                        <div id="skills">
                            <h2>Skills</h2>
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
                            <h2>Education</h2>
                            <div className="education college">
                                <a href="https://www.georgiasouthern.edu/campuses/armstrong-campus/" target="_blank" rel="noreferrer">
                                    Armstrong Atlantic
                                    State University
                                </a>
                            </div>
                            <div className="education major">Computer Science</div>
                            <div className="education date">2006 - 2007</div>
                        </div>
                    </section>
                </main>
            </div>
        </>
    )
}
