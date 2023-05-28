import Header from '@/components/header';
import Main from './components/main/main';
import Footer from '@/components/footer';
import styles from './page.module.scss';

export default function Page() {
    return (
        <div id={styles['resume']}>
            <Header />
            <Main />
            <Footer
                links={[{ label: 'Donwload a copy', path: '/resume.pdf' }]}
            />
        </div>
    );
}
