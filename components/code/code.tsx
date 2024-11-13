import fs from 'fs';
import path from 'path';
import classNames from 'classnames';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import styles from './code.module.scss';

hljs.registerLanguage('javascript', javascript);

export function Code() {
    const filePath = path.join(process.cwd(), './components/code/code.tsx');
    const blockOfText = fs.readFileSync(filePath, 'utf8');

    return (
        <div className={classNames(styles.code, 'maxwidth')}>
            <div className={styles.diagram} />
            <div
                className={styles.javascript}
                dangerouslySetInnerHTML={{
                    __html: `<code>
                            ${
                                hljs.highlight(blockOfText, {
                                    language: 'javascript',
                                }).value
                            }
                        </code>`,
                }}
            />
        </div>
    );
}
