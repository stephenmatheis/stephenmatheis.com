import Link from 'next/link';
import { mutedLight } from '@/app/theme';
import { html } from './html';

export default function Home() {
    const highlightedHtml = html({
        file: 'app/page.tsx',
        themes: {
            light: mutedLight,
        },
    });

    return (
        <main>
            <div className="code-block" aria-hidden="true" dangerouslySetInnerHTML={{ __html: highlightedHtml }} />
            <section className="cloaked">
                <h1>Stephen Matheis</h1>
                <p>Front-End Software Engineer</p>
                <p>Apple</p>
                <p>Austin, TX</p>
            </section>
            <section className="cloaked">
                <h2>Links</h2>
                <ul>
                    <li>
                        <a href="https://github.com/stephenmatheis">GitHub</a>
                    </li>
                    <li>
                        <a href="https://codepen.io/stephenmatheis">CodePen</a>
                    </li>
                </ul>
            </section>
            <section className="cloaked">
                <h2>Code</h2>
                <ul>
                    <li>
                        <Link href="/fizzbuzz">FizzBuzz</Link>
                    </li>
                    <li>
                        <Link href="/blank">Blank</Link>
                    </li>
                </ul>
            </section>
        </main>
    );
}
