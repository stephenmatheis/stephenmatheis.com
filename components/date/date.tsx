import { parseISO, format } from 'date-fns';
import styles from './date.module.scss';

type Props = {
    dateString: string;
    className?: string;
};

export default function Comment({ dateString, className = '' }: Props) {
    const date = parseISO(dateString);

    return (
        <time
            className={[styles['date'], className].join(' ')}
            dateTime={dateString}
        >
            {format(date, 'LLLL	d, yyyy')}
        </time>
    );
}
