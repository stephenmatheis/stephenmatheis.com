'use client';

import { RefObject, useState, useRef } from 'react';
import styles from './new-post.module.scss';

function parseMS(modal: RefObject<HTMLDivElement>, value: string): number {
    if (!modal.current) {
        return 0;
    }

    const style = getComputedStyle(modal.current);
    const speed = style.getPropertyValue(value);

    return parseInt(speed.replace('ms', ''));
}

export function NewPost() {
    const [showForm, setShowForm] = useState(false);
    const backdrop = useRef<HTMLDivElement>(null);
    const modal = useRef<HTMLDivElement>(null);

    function close() {
        const speed = parseMS(backdrop, '--speed');
        const delay = parseMS(backdrop, '--delay');

        modal?.current?.classList.add(styles.close);
        backdrop?.current?.classList.add(styles.close);

        setTimeout(() => {
            document.body.classList.remove('modal-open');
            setShowForm(false);
        }, speed + delay);
    }

    return (
        <>
            <button
                className={styles.button}
                onClick={() => {
                    document.body.classList.add('modal-open');
                    setShowForm(true);
                }}
            >
                New post
            </button>
            {showForm && (
                <div className={styles.backdrop} ref={backdrop} data-backdrop>
                    <div className={styles['form']} ref={modal} data-modal>
                        <div className={styles.close} onClick={close}>
                            ✕
                        </div>
                        <div className={styles.content}>
                            <h2>New post</h2>
                            <p>Testing...</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
