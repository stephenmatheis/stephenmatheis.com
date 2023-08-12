'use client';

import classNames from 'classnames';
import { UpdatePrompts } from '@/components/update-prompts';
import { Project } from '@/components/project';
import projects from '@/data/projects';
import styles from './projects.module.scss';

type Props = {
    displayImages?: boolean;
    printOnly?: boolean;
};

export function Projects({ displayImages, printOnly }: Props) {
    return (
        <div
            className={classNames(styles.projects, {
                [styles['print-only']]: printOnly,
            })}
        >
            <UpdatePrompts
                prompts={[
                    ...projects.map(({ link }) => {
                        return {
                            label: link,
                            path: link,
                            type: 'project',
                            newTab: true,
                        };
                    }),
                ]}
            />
            <div
                className={classNames(styles['projects-wrapper'], {
                    [styles['compact']]: !displayImages,
                })}
            >
                {projects.map(({ name, link, description, image }) => (
                    <Project
                        key={name}
                        name={name}
                        link={link}
                        description={description}
                        image={image}
                        displayImages={displayImages}
                    />
                ))}
            </div>
        </div>
    );
}
