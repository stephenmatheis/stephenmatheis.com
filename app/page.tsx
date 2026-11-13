import { Header } from '@/app/components/Header';
import { Syntax } from '@/app/components/Syntax';
import Link from 'next/link';
import { Heading } from './components/Heading';

export default function Home() {
    return (
        <>
            <Header />
            <main>
                <section>
                    <h2>
                        <Heading />
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
                        <Heading />
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
                    <a href="https://github.com/stephenmatheis/stephenmatheis.com/tree/main">v43</a>
                </p>
            </footer>
        </>
    );
}
