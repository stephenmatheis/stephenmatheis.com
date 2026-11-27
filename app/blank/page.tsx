import { githubDark, githubLight } from '@pierre/highlights/themes';
import { mutedLight } from '@/app/theme';
import { html } from '@/app/html';
import { raw } from '@/app/raw';
import Link from 'next/link';

export default function BlankPage() {
    const text = raw('app/blank/blank.css');
    const blankCSS = html({
        file: 'app/blank/blank.css',
        lang: 'css',
        themes: {
            light: githubLight,
            dark: githubDark,
        },
    });
    const pageHtml = html({
        file: 'app/blank/page.tsx',
        themes: {
            light: mutedLight,
        },
    });

    return (
        <main>
            <div className="code-block" aria-hidden="true" dangerouslySetInnerHTML={{ __html: pageHtml }} />
            <pre className="divider">{Array.from({ length: 80 }, () => '/')}</pre>
            <div className="code-block" aria-hidden="true" dangerouslySetInnerHTML={{ __html: blankCSS }} />
            <section className="cloaked">
                <h1>Blank</h1>
                <p>My go-to CSS reset.</p>
                <nav>
                    <Link href="/">Home</Link>
                </nav>
                <pre>{text}</pre>
            </section>
        </main>
    );
}
