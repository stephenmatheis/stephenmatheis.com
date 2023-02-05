import { forwardRef, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import styles from './type2.module.scss';

const Type = forwardRef(function Type2({ content, className, startAtChar = 0, speed = 0, delay = 0, blink, cursor }, ref) {
    const [delayed, setDelayed] = useState(delay > 0 ? true : false);
    const [prefix, setPrefix] = useState('');
    const [suffix, setSuffix] = useState('');
    const [index, setIndex] = useState(startAtChar - 1);
    const prefixRef = useRef();
    const cursorRef = useRef();

    useEffect(() => {
        setTimeout(() => {
            setDelayed(false);
        }, delay);
    }, [delay]);

    useEffect(() => {
        if (delayed) {
            return;
        }

        if (index < content.length) {
            setTimeout(() => {
                const nextIndex = index + 1;
                const prefix = content.substring(0, nextIndex);
                const suffix = content.substring(nextIndex);

                setPrefix(prefix);
                setSuffix(suffix);
                setIndex(nextIndex);
            }, speed);
        }
    }, [content, speed, index, delayed, cursor]);

    return (
        <>
            <span
                ref={ref}
                className={classNames(styles['type'], className)}
            >
                <span
                    ref={prefixRef}
                    className={styles['prefix']}
                >
                    {prefix}
                </span>
                <span className={styles['suffix']}>
                    {suffix}
                </span>
            </span>
        </>
    )
});

export default Type;
