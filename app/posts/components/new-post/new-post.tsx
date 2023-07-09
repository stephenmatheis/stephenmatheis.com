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

export function NewPost({ posts }) {
    const titles = posts.map(({ title }) => title);
    const backdrop = useRef<HTMLDivElement>(null);
    const modal = useRef<HTMLDivElement>(null);
    const uploadBtn = useRef<HTMLButtonElement>(null);
    const title = useRef<HTMLInputElement>(null);
    const body = useRef<HTMLTextAreaElement>(null);
    const [showForm, setShowForm] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [exists, setExists] = useState(false);

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
            <div className={styles.toolbar}>
                <button
                    className={styles.button}
                    onClick={() => {
                        document.body.classList.add('modal-open');
                        setShowForm(true);
                    }}
                >
                    New post
                </button>
            </div>
            {showForm && (
                <div className={styles.backdrop} ref={backdrop} data-backdrop>
                    <div className={styles['form']} ref={modal} data-modal>
                        <div className={styles.close} onClick={close}>
                            ✕
                        </div>
                        <div className={styles.content}>
                            {/* TODO: Add aria */}
                            <div className={styles.title}>
                                <div className={styles.field}>
                                    <label htmlFor="title">Title</label>
                                    <input
                                        ref={title}
                                        type="text"
                                        name="title"
                                        autoFocus={true}
                                        onChange={(event) => {
                                            const value = event.target.value;

                                            if (value) {
                                                if (titles.includes(value)) {
                                                    setDisabled(true);
                                                    setExists(true);
                                                } else {
                                                    setDisabled(false);
                                                    setExists(false);
                                                }
                                            } else {
                                                setDisabled(true);
                                            }
                                        }}
                                    />
                                    {/* DEV: */}
                                    {exists && (
                                        <div className={styles.exists}>
                                            <em>
                                                {' '}
                                                A post with this title already
                                                exists.
                                            </em>
                                        </div>
                                    )}
                                </div>
                                <button
                                    ref={uploadBtn}
                                    className={styles.upload}
                                    tabIndex={-1}
                                    disabled={disabled}
                                    onClick={async () => {
                                        setDisabled(true);

                                        console.log('Uploading...');

                                        // DEV: Test creating a post
                                        const res = await fetch(
                                            'api/octokit/create/post',
                                            {
                                                method: 'POST',
                                                body: JSON.stringify({
                                                    title: title?.current
                                                        ?.value,
                                                    content:
                                                        body?.current?.value,
                                                }),
                                            }
                                        );
                                        const data = await res.json();

                                        console.log(data);
                                    }}
                                >
                                    <svg
                                        id="icon-arrow-up2"
                                        viewBox="0 0 32 32"
                                    >
                                        <path d="M27.414 12.586l-10-10c-0.781-0.781-2.047-0.781-2.828 0l-10 10c-0.781 0.781-0.781 2.047 0 2.828s2.047 0.781 2.828 0l6.586-6.586v19.172c0 1.105 0.895 2 2 2s2-0.895 2-2v-19.172l6.586 6.586c0.39 0.39 0.902 0.586 1.414 0.586s1.024-0.195 1.414-0.586c0.781-0.781 0.781-2.047 0-2.828z"></path>
                                    </svg>
                                </button>
                            </div>
                            {/* TODO: Markdown syntax highlighting */}
                            <div className={styles.field}>
                                <textarea ref={body} name="body" />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
