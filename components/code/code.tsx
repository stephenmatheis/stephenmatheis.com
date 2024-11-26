import fs from 'fs';
import path from 'path';
import classNames from 'classnames';
import styles from './code.module.scss';
import SyntaxHighlighter from 'react-syntax-highlighter';

export function Code() {
    const filePath = path.join(process.cwd(), './components/code/code.tsx');
    const blockOfText = fs.readFileSync(filePath, 'utf8');

    return (
        <div className={classNames(styles.code, 'maxwidth')}>
            <div className={styles.diagram} />
            <div className={styles.javascript}>
                {/* <SyntaxHighlighter language="javascript" style={vs}> */}
                <SyntaxHighlighter
                    language="javascript"
                    useInlineStyles={false}
                >
                    {blockOfText}
                </SyntaxHighlighter>
            </div>
        </div>
    );
}
