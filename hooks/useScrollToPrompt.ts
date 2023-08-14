import { useEffect } from 'react';
import { usePrompts } from '@/contexts/prompts';

export function useScrollToPrompt({ ref, label }) {
    const { prompts, selected } = usePrompts();
    const promptIndex = prompts.map(({ label }) => label).indexOf(label);

    useEffect(() => {
        if (prompts.length === 0) {
            return;
        }

        // https://stackoverflow.com/a/49860927
        const options: ScrollToOptions = {
            top:
                selected === promptIndex
                    ? ref.current.getBoundingClientRect().top +
                      window.scrollY -
                      parseInt(
                          getComputedStyle(
                              document.documentElement
                          ).getPropertyValue('--line-height')
                      ) *
                          4
                    : 0,
            behavior: 'smooth',
        };

        (window.innerWidth > 500
            ? window
            : document.querySelector('[data-page]')
        )?.scrollTo(options);
    }, [promptIndex, prompts, ref, selected]);

    return {
        promptIndex,
        selected,
    };
}
