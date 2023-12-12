import { ReactNode } from 'react';

type Props = {
    children?: ReactNode;
};

// TODO: Add Header and Footer links to list of page prompts
export function Main({ children }: Props) {
    return <main>{children}</main>;
}
