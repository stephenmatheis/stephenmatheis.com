'use client';

import classNames from 'classnames';
import { useState, useRef } from 'react';
import styles from './copy-to-clipboard.module.scss';

interface ICopyToClipboard {
    children: React.ReactNode;
}

export function CopyToClipboard({ children }: ICopyToClipboard) {
    const textInput = useRef<HTMLDivElement>(null);
    const [fadeBtn, seteFadeBtn] = useState(false);
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
            seteFadeBtn(true);

            setTimeout(() => {
                setCopied(false);

                setTimeout(() => {
                    seteFadeBtn(false);
                }, 300);
            }, 300);
        }, 3000);
    }

    return (
        <div className={styles['copy-to-clipboard']} data-code-block>
            <button
                aria-label="Copy code"
                type="button"
                className={classNames({
                    [styles.copied]: copied,
                    [styles.fade]: fadeBtn,
                })}
                onClick={onCopy}
                data-copy-code-btn
            >
                <span>{copied ? '✔' : 'Copy'}</span>
                {/* <span>{copied ? '👌' : 'Copy'}</span> */}
                {/* <span>{copied ? '✔' : '📋'}</span> */}
            </button>
            <div ref={textInput}>{children}</div>
        </div>
    );
}
