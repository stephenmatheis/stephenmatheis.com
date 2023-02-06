import { } from 'react';
import classNames from 'classnames';
import styles from './window.module.scss';

export default function Header({ }) {
    return (
        <div className={styles['window']}>
            {/* Title bar */}
            <div className={styles['title-bar']}></div>
            {/* Main */}
            <div className={styles['main']}></div>
        </div>
    );
}