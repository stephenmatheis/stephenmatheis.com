'use client';

import { useEffect, useState } from 'react';
import { Statusbar } from '@/components/Statusbar';
import { Time } from '@/components/Time';
import { EditableList } from '@/components/EditableList';
import { useVimMotions } from '@/hooks/useVimMotions';
import { ListPair } from '@/lib/types';
import styles from './ProsAndCons.module.scss';

type ProsAndConsProps = {
    itemId: number;
};

export function ProsAndCons({ itemId }: ProsAndConsProps) {
    const [oneQuestion, setOneQuestion] = useState<string>('Pros');
    const [twoQuestion, setTwoQuestion] = useState<string>('Cons');
    const [oneList, setOneList] = useState<string[]>(['']);
    const [twoList, setTwoList] = useState<string[]>(['']);
    const [selectedList, setSelectedList] = useState<number>(0);
    const [proSelected, setProSelected] = useState<number>(0);
    const [conSelected, setConSelected] = useState<number>(0);

    const listsItems = [oneList, twoList];
    const listsSetItems = [setOneList, setTwoList];
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
        const storedLists = localStorage.getItem('lists');

        if (storedLists) {
            const lists = JSON.parse(storedLists);
            const loadedList = lists.find(({ id }) => id === itemId);

            if (loadedList) {
                setOneQuestion(loadedList.one.question);
                setOneList(loadedList.one.list);

                setTwoQuestion(loadedList.two.question);
                setTwoList(loadedList.two.list);
            }
        }
    }, [itemId]);

    useEffect(() => {
        const storedLists = localStorage.getItem('lists');

        if (storedLists) {
            const lists = JSON.parse(storedLists);
            const loadedList = lists.find(({ id }) => id === itemId);

            if (loadedList) {
                const newValue = {
                    ...loadedList,
                    one: {
                        ...loadedList.one,
                        list: oneList,
                    },
                };

                // console.log(newValue);

                const newLists = lists.map((list: ListPair) => {
                    if (list.id === itemId) {
                        return newValue;
                    }

                    return list;
                });

                localStorage.setItem('lists', JSON.stringify(newLists));
            }
        }
    }, [oneList]);

    useEffect(() => {
        const storedLists = localStorage.getItem('lists');

        if (storedLists) {
            const lists = JSON.parse(storedLists);
            const loadedList = lists.find(({ id }) => id === itemId);

            if (loadedList) {
                const newValue = {
                    ...loadedList,
                    two: {
                        ...loadedList.one,
                        list: twoList,
                    },
                };

                // console.log(newValue);

                const newLists = lists.map((list: ListPair) => {
                    if (list.id === itemId) {
                        return newValue;
                    }

                    return list;
                });

                localStorage.setItem('lists', JSON.stringify(newLists));
            }
        }
    }, [twoList]);

    return (
        <div className={styles.prosandcons}>
            <div className={styles.window}>
                {[oneQuestion, twoQuestion].map((label, index) => {
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
