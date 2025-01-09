'use client';

import { useState } from 'react';
import { Planet } from '@/components/planet';
import styles from './planets.module.scss';

export function Planets() {
    const [startMove, setStartMove] = useState<boolean>(false);
    const [startEnter, setStartEnter] = useState<boolean>(false);

    function handleMove() {
        setStartMove(true);
    }

    function handleEnter() {
        setStartEnter(true);
    }

    return (
        <div className={styles.planets}>
            <Planet
                color="green"
                className="rise"
                size={'80vw'}
                startMove={startMove}
                handleMove={handleMove}
                handleEnter={handleEnter}
            />
            {startEnter && (
                <Planet color="tan" className="rise" size={'60vw'} />
            )}
        </div>
    );
}
