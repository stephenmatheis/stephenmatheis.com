import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import styles from './page.module.scss';

export function Page({ children }) {
    return (
        <div className={styles.page}>
            <Header />
            {children}
            {/* <Footer /> */}
        </div>
    );
}
