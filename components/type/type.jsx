import { forwardRef, useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './type.module.scss';

const Type = forwardRef(function Type2({ content, className, wrapperClass, startAtChar = 0, speed = 0, delay = 0, blink, cursor }, ref) {
    const [delayed, setDelayed] = useState(delay > 0 ? true : false);
    const [prefix, setPrefix] = useState('');
    const [suffix, setSuffix] = useState(content);
    const [index, setIndex] = useState(startAtChar > 0 ? startAtChar - 1 : startAtChar);

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
                className={classNames(styles['type'], wrapperClass)}
            >
                {
                    index === content.length ?
                        <span
                            ref={ref}
                            className={className}
                        >
                            {content}
                        </span>
                        :
                        <>
                            <span
                                // ref={ref}
                                className={classNames(styles['prefix'], className)}
                            >
                                {prefix}
                            </span>
                            <span
                                ref={ref}
                                className={classNames(styles['suffix'], className)}
                            >
                                {suffix}
                            </span>
                        </>
                }
            </span>

            {/* TESTING */}
            {/* <span
                ref={ref}
                className={classNames(styles['type'], wrapperClass)}
            >
                {
                    <span className={classNames(styles['prefix'], className)}>
                        {content}
                    </span>
                }
            </span> */}
        </>
    )
});

export default Type;
