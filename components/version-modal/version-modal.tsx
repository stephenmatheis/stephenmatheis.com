'use client';

import { RefObject, useEffect, useRef, useState } from 'react';
import { LinkCtr } from '../link-ctr';
import styles from './verison-modal.module.scss';

function parseMS(modal: RefObject<HTMLDivElement>, value: string): number {
    if (!modal.current) {
        return 0;
    }

    const style = getComputedStyle(modal.current);
    const speed = style.getPropertyValue(value);

    return parseInt(speed.replace('ms', ''));
}

export function VersionModal() {
    const [show, setShow] = useState(false);
    const modal = useRef<HTMLDivElement>(null);

    function close() {
        modal?.current?.classList.add(styles.close);
        document.body.classList.remove('modal-open');

        const speed = parseMS(modal, '--speed');
        const delay = parseMS(modal, '--delay');

        setTimeout(() => {
            setShow(false);
        }, speed + delay);
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
                            If you made changes to the default configuation, I&apos;m
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
