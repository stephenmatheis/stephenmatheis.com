'use client';

import { createContext, useContext, useState } from 'react';
import { usePathname } from 'next/navigation';

export type PromptProps = {
    label: string;
    path?: string;
    type?: string;
    newTab?: string;
    nest?: string;
};

export type PromptsContextProps = {
    prompts: PromptProps[];
    setPrompts: React.Dispatch<React.SetStateAction<PromptProps[]>>;
    selected: number;
    setSelected: React.Dispatch<React.SetStateAction<number>>;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const PromptsContext = createContext<PromptsContextProps>({
    prompts: [{ label: '', path: '' }],
    setPrompts: () => null,
    selected: 0,
    setSelected: () => null,
    open: false,
    setOpen: () => null,
});

export function usePrompts() {
    return useContext(PromptsContext);
}

export function PromptsProvider({ children, prompts: defaultPrompts }) {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const [prompts, setPrompts] = useState<PromptProps[]>(
        defaultPrompts.filter((prompt: PromptProps) => {
            const { nest } = prompt;

            if (nest === undefined) {
                return prompt;
            }

            if (nest === pathname) {
                return prompt;
            }
        })
    );
    const pathIndex = prompts.map(({ path }) => path).indexOf(pathname);
    const startIndex = pathIndex !== -1 ? pathIndex : 0;
    const [selected, setSelected] = useState<number>(startIndex);

    console.log(prompts);

    return (
        <PromptsContext.Provider
            value={{
                prompts,
                setPrompts,
                selected,
                setSelected,
                open,
                setOpen,
            }}
        >
            {children}
        </PromptsContext.Provider>
    );
}
