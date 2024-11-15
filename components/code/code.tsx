import fs from 'fs';
import path from 'path';
import classNames from 'classnames';
import styles from './code.module.scss';

export function Code() {
    const filePath = path.join(process.cwd(), './components/code/code.tsx');
    const blockOfText = fs.readFileSync(filePath, 'utf8');

    console.log(blockOfText);

    return (
        <div className={classNames(styles.code, 'maxwidth')}>
            <div className={styles.diagram} />
            <div className={styles.javascript}>Test</div>
        </div>
    );
}
