// Syntax highlighted textarea inspired by:
// https://codepen.io/WebCoder49/pen/dyNyraq
// https://css-tricks.com/creating-an-editable-textarea-that-supports-syntax-highlighted-code/

'use client';

import {
    RefObject,
    useCallback,
    useState,
    useRef,
    KeyboardEvent,
    useEffect,
} from 'react';
import { marked } from 'marked';
import { Toggle } from '@/components/toggle';
import Prism from 'prismjs';
import 'prismjs/components/prism-markdown';
import 'prismjs/plugins/custom-class/prism-custom-class.min.js';
import styles from './new-post.module.scss';

Prism.plugins.customClass.add(({ content, type, language }) => {
    if (content === 'return' && type === 'keyword' && language === 'js') {
        return 'return';
    }
});

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
    const code = useRef<HTMLModElement>(null);
    const pre = useRef<HTMLPreElement>(null);
    const [showForm, setShowForm] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [exists, setExists] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const [content, setContent] = useState('');
    const [view, setView] = useState('Markdown');

    marked.use({
        mangle: false,
        headerIds: false,
    });

    const html = marked.parse(content);

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

    function update(text: string) {
        let result_element = code.current;

        if (!result_element) {
            return;
        }

        // Handle final newlines (see article)
        if (text[text.length - 1] == '\n') {
            text += ' ';
        }

        // Update code
        result_element.innerHTML = text
            .replace(new RegExp('&', 'g'), '&amp;')
            .replace(new RegExp('<', 'g'), '&lt;'); /* Global RegExp */

        // Syntax Highlight
        Prism.highlightElement(result_element);
    }

    function sync_scroll(element: Element) {
        /* Scroll result to scroll coords of event - sync with textarea */
        let result_element = pre.current;

        if (!result_element) {
            return;
        }

        // Get and set x and y
        result_element.scrollTop = element.scrollTop;
        result_element.scrollLeft = element.scrollLeft;
    }

    function check_tab(
        element: HTMLTextAreaElement,
        event: KeyboardEvent<HTMLTextAreaElement>
    ) {
        let code = element.value;

        // FIXME: Trying to tab more than one line causes the text selected to disappear
        // cmd+z does not revert this change.
        if (event.key == 'Tab') {
            /* Tab key pressed */
            event.preventDefault(); // stop normal

            let before_tab = code.slice(0, element.selectionStart); // text before tab
            let after_tab = code.slice(
                element.selectionEnd,
                element.value.length
            ); // text after tab
            let cursor_pos = element.selectionStart + 1; // where cursor moves after tab - moving forward by 1 char to after tab

            element.value = before_tab + '\t' + after_tab; // add tab char
            // move cursor
            element.selectionStart = cursor_pos;
            element.selectionEnd = cursor_pos;

            update(element.value); // Update text to include indent
        }
    }

    console.log(view);

    useEffect(() => {
        if (view === 'Markdown') {
            update(content);
        }
    }, [view]);

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
                        {/* Cancel button */}
                        <div className={styles.close} onClick={close}>
                            Cancel
                        </div>
                        {/* Markdown/Preview toggle */}
                        <div className={styles.view}>
                            <Toggle
                                options={['Markdown', 'Preview']}
                                defaultOption={'Markdown'}
                                localStorageKey={'new-post-view'}
                                addDataAttr={false}
                                addCssVariable={false}
                                onUpdate={(option) => {
                                    setView(option);
                                }}
                            />
                        </div>
                        <div className={styles.content}>
                            <div className={styles.title}>
                                <div className={styles.field}>
                                    <label htmlFor="title">Title</label>
                                    <input
                                        ref={title}
                                        type="text"
                                        name="title"
                                        autoFocus={true}
                                        onChange={(
                                            event: React.ChangeEvent<HTMLInputElement>
                                        ) => {
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
                                                        body?.current
                                                            ?.innerText,
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
                            {/* Markdown */}
                            {view === 'Markdown' && (
                                <div className={styles.field}>
                                    <div className="prism-wrapper">
                                        <textarea
                                            ref={body}
                                            placeholder=""
                                            id={styles.editing}
                                            spellCheck="false"
                                            value={content}
                                            onInput={() => {
                                                if (!body.current) {
                                                    return;
                                                }

                                                setContent(body.current.value);
                                                update(body.current.value);
                                                sync_scroll(body.current);
                                            }}
                                            onScroll={() => {
                                                if (!body.current) {
                                                    return;
                                                }

                                                sync_scroll(body.current);
                                            }}
                                            onKeyDown={(
                                                event: KeyboardEvent<HTMLTextAreaElement>
                                            ): void => {
                                                if (!body.current) {
                                                    return;
                                                }

                                                check_tab(body.current, event);
                                            }}
                                        />
                                        <pre
                                            ref={pre}
                                            id={styles.highlighting}
                                            aria-hidden="true"
                                        >
                                            <code
                                                ref={code}
                                                className={[
                                                    styles['language-markdown'],
                                                    'language-md',
                                                ].join(' ')}
                                                id={
                                                    styles[
                                                        'highlighting-content'
                                                    ]
                                                }
                                            />
                                        </pre>
                                    </div>
                                </div>
                            )}
                            {/* Preview */}
                            {view === 'Preview' && (
                                <div className={styles.preview}>
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: html,
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
