import styles from './date-time.module.scss';

type Props = {
    dateString: string;
    className?: string;
    short?: boolean;
};

export function DateTime({ dateString, className = '', short = false }: Props) {
    if (!dateString) return null;

    // @see https://github.com/vercel/next.js/discussions/39425#discussioncomment-3367041
    return (
        <time
            className={[styles['date-time'], className].join(' ')}
            dateTime={dateString}
            suppressHydrationWarning
        >
            {short ? formatShort(dateString) : dateString}
        </time>
    );
}

function formatShort(dateString: string) {
    return new Date(dateString).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
    });
}
