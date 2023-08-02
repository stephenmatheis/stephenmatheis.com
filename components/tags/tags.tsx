import { Suspense } from 'react';
import { Fallback } from '@/components/fallback';
import { Tag } from '@/components/tag';
import styles from './tags.module.scss';

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
                            <Suspense fallback={<Fallback />} key={tag}>
                                <Tag
                                    key={tag}
                                    tag={tag}
                                    spacer={index < tags.length - 1}
                                    newTab={newTab}
                                    color={color}
                                />
                                <Tag
                                    key={tag}
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
