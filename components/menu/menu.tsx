'use client';

import { useRef, useState } from 'react';
import styles from './menu.module.scss';

export type MenuButton = {
    label: string;
    action: () => void;
};

type Props = {
    buttons: MenuButton[];
};

export function Menu({ buttons }: Props): JSX.Element {
    const menu = useRef<HTMLDivElement>(null!);
    const [showMenu, setShowMenu] = useState(false);

    // TODO:
    // Determine best position based on x, y and
    // window width / height

    function close() {
        menu.current.classList.add(styles.close);

        setTimeout(() => {
            setShowMenu(false);
        }, 150);
    }

    return (
        <div className={styles['menu-ctr']}>
            <button
                className={styles.btn}
                onClick={() => {
                    if (showMenu) {
                        close();
                    } else {
                        setShowMenu(true);
                    }
                }}
            >
                ···
            </button>
            {showMenu && (
                <div ref={menu} className={styles.menu}>
                    {buttons.map(({ label, action }) => {
                        return (
                            <button
                                key={label}
                                className={styles.btn}
                                onClick={(event): void => {
                                    action();
                                    setTimeout(() => {
                                        close();
                                    }, 150);
                                }}
                            >
                                {label}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
