import { parseISO, format } from 'date-fns';
import styles from './date.module.scss';

type Props = {
    dateString: string,
};

export default function Comment({ dateString }: Props) {
    const date = parseISO(dateString);

    return (
        <time className={styles['date']} dateTime={dateString}>
            {format(date, 'LLLL	d, yyyy')}
        </time>
    );
}
