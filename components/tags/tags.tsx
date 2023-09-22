import { Tag } from '@/components/tag';
import styles from './tags.module.scss';

type Props = {
    tags: string[];
    selected?: string[];
    newTab?: boolean;
    color?: string;
    none?: boolean;
};

export function Tags({ tags, selected, newTab, none }: Props) {
    return (
        <>
            {tags && tags.length > 0 && (
                <span className={styles.tags}>
                    #{' '}
                    {tags.map((tag: string, index: number) => {
                        return (
                            <Tag
                                key={tag}
                                tag={tag}
                                selected={selected}
                                spacer={
                                    none || index < tags.length - 1
                                        ? true
                                        : false
                                }
                                newTab={newTab}
                            />
                        );
                    })}
                    {none && (
                        <Tag
                            key="(none)"
                            tag="(none)"
                            selected={selected}
                            spacer={false}
                            newTab={newTab}
                        />
                    )}
                </span>
            )}
        </>
    );
}
