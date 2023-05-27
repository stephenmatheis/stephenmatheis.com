import Header from '@/components/header';
import Main from './components/main';
import Footer from './components/footer';
import styles from './page.module.scss';

export default function Page() {
    return (
        <div className={styles.page}>
            <Header />
            <Main />
            <Footer />
        </div>
    );
}
