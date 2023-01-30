import Head from 'next/head';
import Paralax from '@/components/paralax/paralax';
import Type from '@/components/type';
import jobs from '../data/jobs';
import skills from '../data/skills';

export default function Home() {
    const curentYear = new Date().getFullYear();
    const name = 'Stephen Matheis ';
    const title = 'Front-end Software Engineer';
    const speed = 60;

    function Header({ type = false }) {
        return (
            <header>
                <a href="https://www.stephenmatheis.com">
                    <div className="name">
                        {
                            type ?
                                <>
                                    <Type content={name} speed={40} />

                                    <Type content={'| '} speed={speed} className='blue spacer' />
                                    {/* <Type content={'| '} speed={speed} delay={(name.length * speed) + (80)} className='blue' /> */}

                                    <Type content={title} speed={40} className='orange' wrapperClass='nowrap' />
                                    {/* <Type content={title} speed={speed} delay={((name.length + 3) * speed) + 160} className='orange' /> */}
                                </> :
                                <>
                                    Stephen Matheis <span className="blue">|</span> <span className="orange">Front-end Software Engineer</span>
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
                                            {type ? <Type content={`@ ${company}`} speed={speed / 2} className='company' wrapperClass='nowrap' /> : <span className="company">@ {company}</span>}
                                        </div>
                                        <div className="date">
                                            {
                                                type ?
                                                    <>
                                                        <Type content={`${start} - ${end} `} speed={speed / 2} />
                                                        <Type content={'| '} speed={speed} className='gray' wrapperClass='nowrap' />
                                                        <Type content={location} speed={speed / 2} className='gray' wrapperClass='nowrap' />
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
                <Main type={true} />
            </div>
        </>
    )
}
