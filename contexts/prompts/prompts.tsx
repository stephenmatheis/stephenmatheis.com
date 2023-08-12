'use client';

import { createContext, useContext, useState } from 'react';
import { usePathname } from 'next/navigation';

export type PromptProps = {
    label: string;
    path: string;
    type?: string;
    newTab?: string;
};

export type PromptsContextProps = {
    prompts: PromptProps[];
    setPrompts: React.Dispatch<React.SetStateAction<PromptProps[]>>;
    selected: number;
    setSelected: React.Dispatch<React.SetStateAction<number>>;
};

const PromptsContext = createContext<PromptsContextProps>({
    prompts: [{ label: '', path: '' }],
    setPrompts: () => null,
    selected: 0,
    setSelected: () => null,
});

export function usePrompts() {
    return useContext(PromptsContext);
}

export function PromptsProvider({ children, prompts: defaultPrompts }) {
    const pathname = usePathname();
    const [prompts, setPrompts] = useState<PromptProps[]>(defaultPrompts);
    const [selected, setSelected] = useState<number>(
        prompts.map(({ path }) => path).indexOf(pathname)
    );

    return (
        <PromptsContext.Provider
            value={{ prompts, setPrompts, selected, setSelected }}
        >
            {children}
        </PromptsContext.Provider>
    );
}
