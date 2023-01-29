import Type from '@/components/type';
import Head from 'next/head';
import jobs from '../data/jobs';
import skills from '../data/skills';

export default function Home() {
    const curentYear = new Date().getFullYear();

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

    const name = 'Stephen Matheis ';
    const title = 'Front-end Software Engineer';

    return (
        <>
            <Head>
                <title>Stephen Matheis</title>
                <meta name="description" content="Stephen Matheis Resume" />
            </Head>
            {/* <Paralax /> */}
            <div id="resume">
                {/* Header */}
                <header>
                    <a href="https://www.stephenmatheis.com">
                        <div className="name">
                            <Type content={name} speed={80} />
                            <Type content={'| '} speed={80} delay={(name.length * 80) + 160} className='blue' />
                            <Type content={title} speed={80} delay={((name.length + 3) * 80) + 160} className='orange' />
                        </div>
                    </a>
                </header>
                {/* Main */}
                <Main />
            </div>
        </>
    )
}
