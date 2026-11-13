import { Header } from '@/app/components/Header';
import { Syntax } from '@/app/components/Syntax';
import Link from 'next/link';

const updated = new Date().toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
    timeZone: 'America/Chicago',
});

export default function Home() {
    return (
        <>
            <Header />
            <main>
                <section>
                    <h2>
                        <Syntax muted>## </Syntax>
                        Contact
                    </h2>
                    <ul>
                        <li>
                            - <Syntax>[email me](</Syntax>
                            <a href="mailto:stephen@matheis.email">
                                <Syntax>mailto:</Syntax>stephen@matheis.email
                            </a>
                            <Syntax>)</Syntax>
                        </li>
                        <li>
                            - <Syntax>[GitHub](</Syntax>
                            <a href="https://github.com/stephenmatheis">
                                <Syntax>https://</Syntax>github.com/stephenmatheis
                            </a>
                            <Syntax>)</Syntax>
                        </li>
                    </ul>
                </section>
                <section>
                    <h2>
                        <Syntax muted>## </Syntax>
                        Pages
                    </h2>
                    <ul>
                        <li>
                            - [Library](<Link href="/library">/library</Link>)
                        </li>
                        <li>
                            - [Test](<Link href="/test">/test</Link>)
                        </li>
                    </ul>
                </section>
            </main>
            <footer>
                <p>
                    v43{' '}
                    <span className="muted">
                        <Syntax>//</Syntax> updated {updated}
                    </span>
                </p>
            </footer>
        </>
    );
}
