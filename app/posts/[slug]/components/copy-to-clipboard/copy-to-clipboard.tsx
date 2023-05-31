'use client';

import classNames from 'classnames';
import { useState, useRef } from 'react';
import styles from './copy-to-clipboard.module.scss';

interface ICopyToClipboard {
    children: React.ReactNode;
}

export const CopyToClipboard = ({ children }: ICopyToClipboard) => {
    const textInput = useRef<HTMLDivElement>(null);
    const [copied, setCopied] = useState(false);

    function onCopy() {
        setCopied(true);

        if (
            textInput.current !== null &&
            textInput.current.textContent !== null
        ) {
            navigator.clipboard.writeText(textInput.current.textContent);
        }

        setTimeout(() => {
            setCopied(false);
        }, 3000);
    }

    return (
        <div className={styles['copy-to-clipboard']}>
            <button
                aria-label="Copy code"
                type="button"
                className={classNames({
                    [styles.copied]: copied,
                })}
                onClick={onCopy}
            >
                <span>{copied ? '✔' : 'Copy'}</span>
            </button>
            <div ref={textInput}>{children}</div>
        </div>
    );
};
