import Link from 'next/link';
import styles from './page.module.scss';
import { ScrollJacked } from '@/components/scrolljacked';
import { Title } from '@/components/title';

export default function HomePage() {
    return (
        <div className={styles.home}>
            <header>
                <div className="maxwidth">
                    <div className={styles.heading}>
                        <Title />
                        <menu>
                            <Link href="/resume.pdf">↓ DOWNLOAD</Link>
                            <Link
                                href="https://github.com/stephenmatheis"
                                target="_blank"
                            >
                                &gt; GITHUB
                            </Link>
                            <Link
                                href="https://codepen.io/stephenmatheis"
                                target="_blank"
                            >
                                # CODEPEN
                            </Link>
                        </menu>
                    </div>
                </div>
            </header>
            <ScrollJacked />
        </div>
    );
}
