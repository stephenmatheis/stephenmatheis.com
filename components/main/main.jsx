import classNames from 'classnames';
import Link from 'next/link';
import Type from '@/components/type/type';
import jobs from '@/data/jobs';
import skills from '@/data/skills';
import projects from '@/data/projects';
import contact from '@/data/contact';
import styles from './main.module.scss';

function Experience({ type, speed }) {
    return (
        <div id={styles['experience']}>
            <div className={styles['comment']}>
                {type ? <Type content={'// Experience'} speed={speed / 2} /> : <span>{'// Experience'}</span>}
            </div>
            {
                jobs.map(({ title, company, location, start, end, lines }, index) => {
                    return (
                        <div key={index} className={styles['job']}>
                            <div className={styles['title']}>
                                {type ? <Type content={title} speed={speed / 2} /> : <span>{title}</span>}
                                <span> </span>
                                {type ? <Type content={`@ ${company}`} speed={speed / 2} className={styles['company']} /> : <span className={styles['company']}>@ {company}</span>}
                            </div>
                            <div className={styles['date']}>
                                {
                                    type ?
                                        <>
                                            <Type content={`${start} - ${end} `} speed={speed / 2} className={styles['date']} />
                                            <Type content={'• '} speed={speed} className={styles['location']} />
                                            <Type content={location} speed={speed / 2} />
                                            <span></span>
                                        </> :
                                        <>
                                            {start} - {end}
                                            <span className={styles['location']}> • {location}</span>
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
    );
}

function Skills({ type, speed }) {
    return (
        <div id={styles['skills']}>
            <div className={styles['comment']}>
                {type ? <Type content={'// Skills'} speed={speed / 2} /> : <span>{'// Skills'}</span>}
            </div>
            <div className={styles['groups-ctr']}>
                {
                    skills.map(({ group, items }, index) => {
                        return (
                            <div key={index} className={styles['group']}>
                                <div className={styles['name']}>
                                    {type ? <Type content={group} speed={speed} /> : group}
                                </div>
                                <span className={styles['items-ctr']}>
                                    {
                                        items.map((item, index) => {
                                            return (
                                                <span key={item} className={styles['item']}>
                                                    {type ? <Type content={item} speed={speed} /> : item}
                                                    {index !== items.length - 1 ? ',' : ''}
                                                </span>
                                            )
                                        })
                                    }
                                </span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

function Projects({ type, speed }) {
    return (
        <div id={styles['projects']}>
            <div className={styles['comment']}>
                {type ? <Type content={'// Projects'} speed={speed / 2} /> : <span>{'// Projects'}</span>}
            </div>
            {
                projects.map(({ name, link, description }, index) => {
                    return (
                        <div key={index} className={styles['project-ctr']}>
                            <div className={styles['link-ctr']}>
                                <Link href={link} aria-label={name} target="_blank">
                                    {
                                        type ?
                                            <Type content={name} speed={speed * 2 / 3} className={styles['link-text']} /> :
                                            <span className={styles['link-text']}>{name}</span>
                                    }
                                </Link>
                            </div>
                            <div className={styles['description']}>{description}</div>
                        </div>
                    )
                })
            }
        </div>
    );
}

function Contact({ type, speed }) {
    return (
        <div id={styles['contact']}>
            <div className={styles['comment']}>
                {type ? <Type content={'// Contact'} speed={speed / 2} /> : <span>{'// Contact'}</span>}
            </div>
            <div className={styles['info']}>
                {
                    contact.map(({ emoji, href, text, label }) => {
                        return (
                            <div key={text} className={styles['link-ctr']}>
                                <Link href={href} aria-label={label}>
                                    {emoji && <span className={styles['emoji']}>{emoji}</span>}
                                    {
                                        type ?
                                            <Type content={text} speed={speed * 2 / 3} className={styles['link-text']} /> :
                                            <span className={styles['link-text']}>{text}</span>
                                    }
                                </Link>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default function Main({ type, speed, loading, showLinkBackground }) {
    return (
        <main
            className={
                classNames(styles['main'],
                    {
                        [styles['link-background']]: showLinkBackground,
                        [styles['loading']]: loading
                    }
                )
            }
        >
            <section className={styles['left']}>
                <Experience type={type} speed={speed} />
            </section>
            <section className={styles['right']}>
                <Skills type={type} speed={speed} />
                <Projects type={type} speed={speed} />
                <Contact type={type} speed={speed} />
            </section>
        </main>
    );
}