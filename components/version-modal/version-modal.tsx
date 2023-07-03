'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './verison-modal.module.scss';
import { LinkCtr } from '../link-ctr';

export function VersionModal() {
    const [show, setShow] = useState(false);
    const modal = useRef<HTMLDivElement>(null);

    function close() {
        modal?.current?.classList.add(styles.close);

        setTimeout(() => {
            document.body.classList.remove('modal-open');
            setShow(false);
        }, 300);
    }

    useEffect(() => {
        const shouldShow = localStorage.getItem('showVersionDialog');

        if (shouldShow === 'true') {
            setShow(true);
            localStorage.setItem('showVersionDialog', 'false');
        }
    }, []);

    return (
        <>
            {show && (
                <div className={styles['version-modal']} ref={modal} data-modal>
                    <div className={styles.close} onClick={close}>
                        ✕
                    </div>
                    <div className={styles.content}>
                        <h2>New settings are available.</h2>
                        <p>
                            If you made changes to the default configuation, I'm
                            afraid they had to be reset.
                        </p>
                        <p>
                            Hopefully you like the{' '}
                            <LinkCtr href="/settings" onClick={close}>
                                new options
                            </LinkCtr>
                            .
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}
