import { useEffect } from 'react';
import { usePrompts } from '@/contexts/prompts';

export function useScrollToPrompt({
    ref,
    label,
    prompts: overridePrompts,
    selected: overrideSelected,
}) {
    const { prompts, selected } = usePrompts();
    const localSelected = overrideSelected || selected;
    const localPrompts = overridePrompts || prompts;
    const promptIndex = localPrompts.map(({ label }) => label).indexOf(label);

    useEffect(() => {
        if (
            localPrompts.length === 0 ||
            prompts[selected]?.type === 'console'
        ) {
            return;
        }

        if (selected === promptIndex) {
            // https://stackoverflow.com/a/49860927
            const options: ScrollToOptions = {
                top:
                    localSelected === promptIndex && promptIndex !== 0
                        ? ref.current.getBoundingClientRect().top +
                          (matchMedia('(pointer:fine)').matches
                              ? window.scrollY
                              : document.querySelector('[data-page]')
                                    ?.scrollTop) -
                          parseInt(
                              getComputedStyle(
                                  document.documentElement
                              ).getPropertyValue('--line-height')
                          ) *
                              4
                        : 0,
                behavior: 'smooth',
            };

            console.log(prompts[selected].label, options);

            (matchMedia('(pointer:fine)').matches
                ? window
                : document.querySelector('[data-page]')
            )?.scrollTo(options);
        }
    }, [promptIndex, localPrompts, ref, localSelected, prompts, selected]);

    return {
        promptIndex,
        selected: localSelected,
    };
}
