'use client';

import { useEffect, useState } from 'react';
import styles from './verison-modal.module.scss';

export function VersionModal() {
    const [show, setShow] = useState(false);

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
                <div className={styles['version-modal']} data-modal>
                    <div
                        className={styles.close}
                        onClick={() => {
                            document.body.classList.remove('modal-open');
                            setShow(false);
                        }}
                    >
                        ✕
                    </div>
                    <div className={styles.content}>
                        <h2>New settings are available.</h2>
                        <p>
                            Changes to the default configuation have been reset.
                            I'm sorry for the inconveneince. Hopefully you like
                            the new options.
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}
