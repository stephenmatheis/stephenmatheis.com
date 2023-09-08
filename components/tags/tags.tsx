import { Tag } from '@/components/tag';
import styles from './tags.module.scss';

type Props = {
    tags: string[];
    selected?: string[];
    newTab?: boolean;
    color?: string;
};

export function Tags({ tags, selected, newTab, color = 'muted' }: Props) {
    return (
        <>
            {tags && tags.length > 0 && (
                <span className={[styles.tags, styles[color]].join(' ')}>
                    #{' '}
                    {tags.map((tag: string, index: number) => {
                        return (
                            <Tag
                                key={tag}
                                selected={selected}
                                tag={tag}
                                spacer={index < tags.length - 1}
                                newTab={newTab}
                                color={color}
                            />
                        );
                    })}
                </span>
            )}
        </>
    );
}
