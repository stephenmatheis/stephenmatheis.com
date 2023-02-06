import Link from 'next/link';
import Type from '@/components/type/type';
import jobs from '@/data/jobs';
import skills from '@/data/skills';
import styles from './main.module.scss';

export default function Main({ type, speed }) {
    const curentYear = new Date().getFullYear();

    return (
        <main className={styles['main']}>
            {/* Left */}
            <section className={styles['left']}>
                <div id={styles['experience']}>
                    <div className={styles['comment']}>{'// Experience'}</div>
                    {
                        jobs.map(({ title, company, location, start, end, lines }, index) => {
                            return (
                                <div key={index} className={styles['job']}>
                                    <div className={styles['title']}>
                                        {type ? <Type content={title} speed={speed / 2} /> : <span>{title}</span>}
                                        <span> </span>
                                        {type ? <Type content={`@ ${company}`} speed={speed / 2} className={styles['company']} /> : <span className={styles['company']}>@ {company}</span>}
                                    </div>
                                    <div className="date">
                                        {
                                            type ?
                                                <>
                                                    <Type content={`${start} - ${end} `} speed={speed / 2} />
                                                    <Type content={'| '} speed={speed} className={styles['gray']} />
                                                    <Type content={location} speed={speed / 2} className={styles['gray']} />
                                                    <span></span>
                                                </> :
                                                <>
                                                    {start} - {end} | {location}
                                                </>
                                        }
                                    </div>
                                    <div className={styles['lines']}>
                                        {lines.map((line, index) => {
                                            return (
                                                <span key={index} className={styles['line']}>
                                                    <span style={{ marginRight: '6px' }} >❯</span>
                                                    {
                                                        type ?
                                                            <>
                                                                <Type content={line} speed={speed / 6} />
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
            <section className={styles['right']}>
                <div id={styles['skills']}>
                    <div className={styles['comment']}>{'// Skills'}</div>
                    {
                        skills.map(({ name, started }, index) => {
                            const years = (curentYear - started || 1);

                            return (
                                <div key={index} className={styles['skill']}>
                                    <span className={styles['name']}>
                                        {type ? <Type content={name} speed={speed} /> : name}
                                    </span>
                                    <span className={styles['years']}>
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
                <div id={styles['education']}>
                    <div className={styles['comment']}>{'// Education'}</div>
                    <div className={styles['college']}>
                        <a href="https://www.georgiasouthern.edu/campuses/armstrong-campus/" target="_blank" rel="noreferrer">
                            <Type content="Armstrong Atlantic State University" speed={speed / 2} />
                        </a>
                    </div>
                    <div className={styles['major']}>
                        {
                            type ?
                                <>
                                    <Type content="2006 - 2007 " speed={speed} className={styles['blue']} />
                                    <Type content={'| '} speed={speed} className={styles['light']} />
                                    <Type content="Computer Science" speed={speed} className={styles['light']} />
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
                <div id={styles['contact']}>
                    <div className={styles['comment']}>{'// Contact'}</div>
                    <div className={styles['info']}>
                        <div>
                            <Link href="tel:9124922522" aria-label="My phone number">
                                <Type content="📱 (912) 492-2522" speed={speed * 2 / 3} startAtChar={2} />
                            </Link>
                        </div>
                        <div>
                            <Link href="mailto:stephen.a.matheis@gmail.com" aria-label="My email address">
                                <Type content="📧 stephen.a.matheis@gmail.com" speed={speed / 2} startAtChar={2} />
                            </Link>
                        </div>
                        <div>
                            <Link href="https://github.com/stephenmatheis" target="_blank" rel="noreferrer" title='GitHub' aria-label="My GitHub profile">
                                <Type content="👩‍💻 github.com/stephenmatheis" speed={speed / 2} startAtChar={5} />
                            </Link>
                        </div>
                        <div>
                            <Link href="https://www.linkedin.com/in/stephenmatheis/" target="_blank" rel="noreferrer" title='LinkedIn' aria-label="My LinkedIn profile">
                                <Type content="💼 linkedin.com/in/stephenmatheis" speed={speed / 2} startAtChar={2} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}