import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import styles from './page.module.scss';

export function Page({ children, ...props }) {
    const { links, text } = props;

    return (
        <div className={styles.page}>
            <Header />
            {children}
            <Footer links={links} text={text} />
        </div>
    );
}
