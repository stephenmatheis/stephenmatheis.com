import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import styles from './page.module.scss';

export function Page({ children }) {
    return (
        <div className={styles.page}>
            <Header />
            {children}
            <Footer />
        </div>
    );
}
