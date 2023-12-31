import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import styles from './page.module.scss';

export function Page({
    children,
    noFooter = false,
    noHeader = false,
    footerClass = '',
    ...props
}) {
    const { anchors, links, text } = props;

    return (
        <div className={styles.page} data-page>
            {!noHeader && <Header anchors={anchors} />}
            {children}
            {!noFooter && (
                <Footer links={links} text={text} footerClass={footerClass} />
            )}
        </div>
    );
}
