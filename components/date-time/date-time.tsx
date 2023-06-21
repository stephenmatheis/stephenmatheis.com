import { parseISO, format } from 'date-fns';
import styles from './date-time.module.scss';

type Props = {
    dateString: string;
    className?: string;
};

export function DateTime({ dateString, className = '' }: Props) {
    const date = parseISO(dateString);

    return (
        <time
            className={[styles['date-time'], className].join(' ')}
            dateTime={dateString}
            suppressHydrationWarning
        >
            {format(date, 'LLLL	d, yyyy')}
        </time>
    );
}
