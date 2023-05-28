import Header from '@/components/header';
import Footer from '@/components/footer';
import Projects from '@/components/projects';
import styles from './page.module.scss';

export default function Page() {
    return (
        <div className={styles.page}>
            <Header />
            <Projects />
            <Footer
                links={[{ label: 'Donwload a copy', path: '/resume.pdf' }]}
            />
        </div>
    );
}
