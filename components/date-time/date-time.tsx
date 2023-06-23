import { parseISO, format } from 'date-fns';
import styles from './date-time.module.scss';

type Props = {
    dateString: string;
    className?: string;
};

export function DateTime({ dateString, className = '' }: Props) {
    if (!dateString) return null;

    const date = parseISO(dateString);

    // @see https://github.com/vercel/next.js/discussions/39425#discussioncomment-3367041
    return (
        <time
            className={[styles['date-time'], className].join(' ')}
            dateTime={dateString}
            suppressHydrationWarning
        >
            {format(date, 'LLLL d, yyyy')}
        </time>
    );
}
