import { useEffect } from 'react';
import { usePrompts } from '@/contexts/prompts';

export function useScrollToPrompt({ ref, label }) {
    const { prompts, selected } = usePrompts();
    const promptIndex = prompts.map(({ label }) => label).indexOf(label);

    useEffect(() => {
        if (selected === promptIndex) {
            ref.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [promptIndex, ref, selected]);

    return {
        promptIndex, selected
    }
}
