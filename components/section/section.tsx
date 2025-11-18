import { HTMLAttributes } from 'react';
import { Heading } from '@/components/heading';
import styles from './section.module.scss';

type SectionProps = HTMLAttributes<HTMLElement> & {
    heading?: string;
};

export function Section({ heading, children, className, ...props }: SectionProps) {
    return (
        <section className={`${styles.section}${className ? ` ${className}` : ''}`} {...props}>
            {/* {heading && <Heading text={heading} />} */}
            {children}
        </section>
    );
}
