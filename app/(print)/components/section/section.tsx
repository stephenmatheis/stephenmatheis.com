import { HTMLAttributes } from 'react';
import { Comment } from '@/app/(print)/components/comment';
import styles from './section.module.scss';

type SectionProps = HTMLAttributes<HTMLElement> & {
    heading?: string;
};

export function Section({ heading, children, className, ...props }: SectionProps) {
    return (
        <section className={`${styles.section}${className ? ` ${className}` : ''}`} {...props}>
            {heading && <Comment text={heading} />}
            {children}
        </section>
    );
}
