import { useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './type.module.scss';

export default function Type({ content, className, speed = 0, delay = 0, blink = false }) {
    const [delayed, setDelayed] = useState(delay > 0 ? true : false);
    const [text, setText] = useState('');
    const [index, setIndex] = useState(0);

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
                setText(text + content[index]);
                setIndex(index + 1);
            }, speed);
        }
    }, [content, speed, index, text, delayed]);

    return (
        <span className={styles['type-wrapper']}>
            {
                !delayed &&
                <span className={
                    classNames(
                        styles['type'],
                        { [styles['blink']]: blink },
                        className
                    )
                }>
                    {text}
                </span>
            }
            {
                <span className={styles['hidden']}>
                    {content}
                </span>
            }
        </span>
    )
}
