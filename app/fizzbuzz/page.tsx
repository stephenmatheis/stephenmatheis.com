import { githubDark, githubLight } from '@pierre/highlights/themes';
import { mutedLight } from '@/app/theme';
import { raw } from '@/app/raw';
import { html } from '@/app/html';
import { Client } from './client';
import Link from 'next/link';

export default function FizzBuzzPage() {
    const text = raw('app/fizzbuzz/fizzbuzz.ts');
    const fizzBuzzHtml = html({
        file: 'app/fizzbuzz/fizzbuzz.ts',
        lang: 'ts',
        themes: {
            light: githubLight,
            dark: githubDark,
        },
    });
    const pageHtml = html({
        file: 'app/fizzbuzz/page.tsx',
        themes: {
            light: mutedLight,
        },
    });

    return (
        <main>
            <Client />
            <div className="code-block" aria-hidden="true" dangerouslySetInnerHTML={{ __html: pageHtml }} />
            <pre className="divider">{Array.from({ length: 80 }, () => '/')}</pre>
            <div className="code-block" aria-hidden="true" dangerouslySetInnerHTML={{ __html: fizzBuzzHtml }} />
            <section className="cloaked">
                <h1>FizzBuzz</h1>
                <p>Open your browser console and run fizzBuzz().</p>
                <nav>
                    <Link href="/">Home</Link>
                </nav>
                <pre>{text}</pre>
            </section>
        </main>
    );
}
