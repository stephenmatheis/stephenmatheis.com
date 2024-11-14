import styles from './page.module.scss';
import { Title } from '@/components/title';

export default function HomePage() {
    return (
        <div className={styles.page}>
            <header>
                <div className="maxwidth">
                    <div className={styles.heading}>
                        <Title />
                        <div style={{ fontSize: 23, color: 'var(--ash)' }}>
                            <div style={{ marginBottom: 23 }}>
                                <strong style={{ color: 'var(--enamel)' }}>
                                    Matthew 7:7:
                                </strong>{' '}
                                Ask and it will be given to you; seek and you
                                will find; knock and the door will be opened to
                                you.
                            </div>
                            <div>
                                <strong style={{ color: 'var(--enamel)' }}>
                                    Mark 11:24:
                                </strong>{' '}
                                Therefore I tell you, all that you ask for in
                                prayer, believe that you will receive it and it
                                shall be yours.
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
}
