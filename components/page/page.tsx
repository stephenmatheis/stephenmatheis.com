import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import styles from './page.module.scss';

export function Page({
    children,
    noHeader = false,
    noFooter = false,
    ...props
}) {
    const { links, text } = props;

    return (
        <div className={styles.page}>
            {!noHeader && <Header />}
            {children}
            {!noFooter && <Footer links={links} text={text} />}
        </div>
    );
}
