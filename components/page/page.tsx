import { Footer } from '@/components/footer';
import { DPad } from '@/components/d-pad';
import { PromptsProvider } from '@/contexts/prompts';
import styles from './page.module.scss';

export function Page({ children, noFooter = false, ...props }) {
    const { links, text } = props;

    return (
        <PromptsProvider
            prompts={
                [
                    // {
                    //     label: 'Posts',
                    //     path: '/posts',
                    //     type: 'console',
                    // },
                    // {
                    //     label: 'RSS',
                    //     path: '/rss',
                    //     type: 'console',
                    //     nest: '/posts',
                    //     newTab: true,
                    // },
                    // {
                    //     label: 'Archive',
                    //     path: '/archive',
                    //     type: 'console',
                    // },
                    // {
                    //     label: 'Projects',
                    //     path: '/projects',
                    //     type: 'console',
                    // },
                    // {
                    //     label: 'About',
                    //     path: '/about',
                    //     type: 'console',
                    // },
                    // {
                    //     label: 'Resume',
                    //     path: '/resume.pdf',
                    //     type: 'console',
                    //     newTab: true,
                    // },
                    // {
                    //     label: 'Settings',
                    //     path: '/settings',
                    //     type: 'console',
                    // },
                ]
            }
        >
            <div className={styles.page} data-page>
                {children}
                {!noFooter && <Footer links={links} text={text} />}
            </div>
            <DPad />
        </PromptsProvider>
    );
}
