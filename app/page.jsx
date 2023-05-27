import Header from '@/components/header';
import Main from './components/main';
import Footer from '@/components/footer';
import styles from './page.module.scss';

export default function Page() {
    return (
        <div className={styles.page}>
            <Header />
            <Main />
            <Footer
                links={[
                    {
                        label: 'GitHub',
                        path: 'https://github.com/stephenmatheis',
                        external: true,
                    },
                ]}
            />
        </div>
    );
}
