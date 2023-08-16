import { RefObject, useCallback, useEffect } from 'react';
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
    const selectNode = useCallback(
        (scrollCtr: RefObject<HTMLDivElement> | undefined) => {
            if (scrollCtr?.current) {
                return {
                    node: scrollCtr.current,
                    nodeTop: scrollCtr.current.getBoundingClientRect().top,
                    offset: scrollCtr.current.scrollTop,
                };
            } else if (matchMedia('(pointer:coarse)').matches) {
                return {
                    node: document.querySelector('[data-page]'),
                    offset: window.scrollY,
                    nodeTop: 0,
                };
            } else {
                return {
                    node: window,
                    offset: window.scrollY,
                    nodeTop: 0,
                };
            }
        },
        []
    );

    useEffect(() => {
        if (localPrompts.length === 0) {
            return;
        }

        if (localSelected === promptIndex) {
            const { node, nodeTop, offset } = selectNode(scrollCtr);
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

            node?.scrollTo(options);
        }
    }, [localPrompts, localSelected, promptIndex, scrollCtr, selectNode, ref]);

    return {
        promptIndex,
        selected: localSelected,
    };
}
