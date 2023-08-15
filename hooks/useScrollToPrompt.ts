import { RefObject, useEffect } from 'react';
import { usePrompts } from '@/contexts/prompts';
import { PromptProps } from '@/contexts/prompts/prompts';

type Props = {
    ref: RefObject<HTMLDivElement>;
    label: string;
    prompts?: PromptProps[];
    selected?: number;
    scrollCtr?: RefObject<HTMLDivElement>;
};

export function useScrollToPrompt({
    ref,
    label,
    selected: overrideSelected,
    prompts: overridePrompts,
    scrollCtr,
}: Props) {
    const { prompts, selected } = usePrompts();
    const localSelected = overrideSelected || selected;
    const localPrompts = overridePrompts || prompts;
    const promptIndex = localPrompts.map(({ label }) => label).indexOf(label);

    useEffect(() => {
        if (localPrompts.length === 0) {
            return;
        }

        if (localSelected === promptIndex) {
            const node =
                scrollCtr?.current || document.querySelector('[data-page]');
            const nodeTop = scrollCtr?.current
                ? scrollCtr?.current.getBoundingClientRect().top
                : 0;
            const offset =
                (matchMedia('(pointer:fine)').matches
                    ? window.scrollY
                    : node?.scrollTop) || 0;
            const lineHeight = parseInt(
                getComputedStyle(document.documentElement).getPropertyValue(
                    '--line-height'
                )
            );
            const gap = scrollCtr?.current ? lineHeight : lineHeight * 4;
            const refTop = ref.current?.getBoundingClientRect().top || 0;

            // https://stackoverflow.com/a/49860927
            const options: ScrollToOptions = {
                top:
                    localSelected === promptIndex && promptIndex !== 0
                        ? refTop + offset - gap - nodeTop
                        : 0,
                behavior: 'smooth',
            };
            
            (matchMedia('(pointer:fine)').matches
                ? window
                : document.querySelector('[data-page]')
            )?.scrollTo(options);
        }
    }, [
        promptIndex,
        localPrompts,
        ref,
        localSelected,
        prompts,
        selected,
        scrollCtr,
    ]);

    return {
        promptIndex,
        selected: localSelected,
    };
}
