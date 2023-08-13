import { useEffect } from 'react';
import { usePrompts } from '@/contexts/prompts';

export function useScrollToPrompt({ ref, label }) {
    const { prompts, selected } = usePrompts();
    const promptIndex = prompts.map(({ label }) => label).indexOf(label);

    useEffect(() => {
        if (!ref || prompts[selected].type === 'console') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });

            return;
        }

        // https://stackoverflow.com/a/49860927
        if (selected === promptIndex) {
            const { top } = ref.current.getBoundingClientRect();
            const lineHeight = getComputedStyle(
                document.documentElement
            ).getPropertyValue('--line-height');

            window.scrollTo({
                top: top + window.scrollY - parseInt(lineHeight) * 4,
                behavior: 'smooth',
            });
        }
    }, [promptIndex, prompts, ref, selected]);

    return {
        promptIndex,
        selected,
    };
}
