import { Tag } from '@/components/tag';
import styles from './tags.module.scss';
import { Suspense } from 'react';

type Props = {
    tags: string[];
    newTab?: boolean;
    color?: string;
};

export function Tags({ tags, newTab, color = 'muted' }: Props) {
    return (
        <>
            {tags && tags.length > 0 && (
                <span className={[styles.tags, styles[color]].join(' ')}>
                    #{' '}
                    {tags.map((tag: string, index: number) => {
                        return (
                            <Suspense key={tag} fallback={<>#</>}>
                                <Tag
                                    tag={tag}
                                    spacer={index < tags.length - 1}
                                    newTab={newTab}
                                    color={color}
                                />
                            </Suspense>
                        );
                    })}
                </span>
            )}
        </>
    );
}
