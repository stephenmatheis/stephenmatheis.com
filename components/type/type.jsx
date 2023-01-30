import { useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './type.module.scss';

export default function Type({ content, className, wrapperClass, startAtChar = 0, speed = 0, delay = 0, blink = false }) {
    const [delayed, setDelayed] = useState(delay > 0 ? true : false);
    const [text, setText] = useState('');
    const [index, setIndex] = useState(startAtChar);

    useEffect(() => {
        setText(content.substring(0, startAtChar));
    }, [content, startAtChar]);

    useEffect(() => {
        setTimeout(() => {
            setDelayed(false);
        }, delay);
    }, [delay]);

    useEffect(() => {
        if (delayed) {
            return;
        }

        if (startAtChar && text.length < startAtChar) {
            return;
        }

        if (index < content.length) {
            setTimeout(() => {
                setText(text + content[index]);
                setIndex(index + 1);
            }, speed);
        }
    }, [content, speed, index, text, delayed, startAtChar]);

    return (
        <span className={classNames(styles['type-wrapper'], wrapperClass)}>
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
