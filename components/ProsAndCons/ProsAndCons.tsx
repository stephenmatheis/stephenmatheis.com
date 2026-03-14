'use client';

import { useEffect, useState } from 'react';
import { Statusbar } from '@/components/Statusbar';
import { useMode } from '@/providers/ModeProvider';
import { Time } from '@/components/Time';
import { useVimMotions } from '@/hooks/useVimMotions';
import styles from './ProsAndCons.module.scss';
import { EditableList } from '../EditableList';

export function ProsAndCons() {
    const [pros, setPros] = useState<string[]>(['One', 'Two', 'Three', 'Four']);
    const [cons, setCons] = useState<string[]>(['A', 'B', 'C', 'D']);
    const [selectedList, setSelectedList] = useState<number>(0);
    const [proSelected, setProSelected] = useState<number>(0);
    const [conSelected, setConSelected] = useState<number>(0);

    const listsItems = [pros, cons];
    const listsSetItems = [setPros, setCons];
    const max = listsItems[selectedList].length - 1;
    const listSelections = [proSelected, conSelected];
    const listSetSelections = [setProSelected, setConSelected];
    const selected = listSelections[selectedList];
    const setSelected = listSetSelections[selectedList];

    useVimMotions({
        maxHorizontal: listsItems.length - 1,
        horizontal: selectedList,
        setHorizontal: setSelectedList,
        max,
        selected,
        setSelected,
        onEnter() {
            console.log('???');
        },
    });

    useEffect(() => {
        const storedPros = localStorage.getItem('pros');

        if (storedPros !== null) {
            setPros(JSON.parse(storedPros));
        }

        const storedCons = localStorage.getItem('cons');

        if (storedCons !== null) {
            setPros(JSON.parse(storedCons));
        }
    }, []);

    return (
        <div className={styles.prosandcons}>
            <div className={styles.window}>
                {['Pros', 'Cons'].map((label, index) => {
                    return (
                        <div key={index} className={styles.pane}>
                            <div className={styles.label}>{label}</div>
                            <EditableList
                                selected={index === selectedList ? listSelections[index] : null}
                                items={listsItems[index]}
                                setItems={listsSetItems[index]}
                            />
                        </div>
                    );
                })}
            </div>
            <Statusbar msg="" outerBar="" innerBar={<Time />} />
        </div>
    );
}
