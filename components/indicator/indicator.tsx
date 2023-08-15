'use client';

import { RefObject, useRef } from 'react';
import { useScrollToPrompt } from '@/hooks/useScrollToPrompt';
import styles from './indicator.module.scss';
import { PromptProps } from '@/contexts/prompts/prompts';

type IndicatorProps = {
    label: string;
    selected?: number;
    prompts?: PromptProps[] | undefined;
    scrollCtr?: RefObject<HTMLDivElement>;
};

export function Indicator({
    label,
    selected: overrideSelected,
    prompts,
    scrollCtr,
}: IndicatorProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { promptIndex, selected } = useScrollToPrompt({
        ref,
        label,
        selected: overrideSelected,
        prompts,
        scrollCtr,
    });

    return (
        <div
            ref={ref}
            className={[
                ...(selected === promptIndex ? [styles.selected] : []),
                styles.indicator,
            ].join(' ')}
        >
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
            </svg>
        </div>
    );
}
