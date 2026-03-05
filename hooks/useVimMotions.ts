import { useMode } from '@/providers/ModeProvider';
import { Dispatch, SetStateAction, useEffect } from 'react';

type Props = {
    max: number;
    selected: number;
    setSelected: Dispatch<SetStateAction<number>>;
    onEnter: () => void;
};

export function useVimMotions({ max, selected, setSelected, onEnter }: Props) {
    const { mode, setMode } = useMode();

    useEffect(() => {
        function handleKeydown(event: KeyboardEvent) {
            if (event.shiftKey || event.metaKey || event.ctrlKey || event.altKey) return;

            if (event.key === 'j') {
                setSelected((prev) => {
                    if (prev === max) return prev;

                    return prev + 1;
                });

                return;
            }

            if (event.key === 'k') {
                setSelected((prev) => {
                    if (prev === 0) return prev;

                    return prev - 1;
                });

                return;
            }

            if (event.key === 'i') {
                // if (mode === 'INSERT') return;

                setMode('INSERT');

                return;
            }

            if (event.key === 'Escape') {
                if (mode === 'NORMAL') return;

                setMode('NORMAL');

                return;
            }

            if (event.key === 'Enter') {
                onEnter?.();

                return;
            }
        }

        window.addEventListener('keydown', handleKeydown);

        return () => {
            window.removeEventListener('keydown', handleKeydown);
        };
    }, [max, selected, mode, setSelected, onEnter, setMode]);
}
