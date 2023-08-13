'use client';

import { Experience } from '@/components/experience';
import { Skills } from '@/components/skills';
import { Projects } from '@/components/projects';
import { Contact } from '@/components/contact';
import { UpdatePrompts } from '@/components/update-prompts';
import styles from './content.module.scss';

// TODO: Add to prompts

export function Content() {
    return (
        <div className={styles.resume}>
            <UpdatePrompts
                // TODO: Move to Experience, Skils, and Contact
                // Add a prompt for each job, skill block, and contact?
                // At least one for each contact type so enter works
                // to launch a new email or link
                prompts={[
                    {
                        label: 'Experience',
                        type: 'content',
                    },
                    {
                        label: 'Skills',
                        type: 'content',
                    },
                    {
                        label: 'Contact',
                        type: 'content',
                    },
                ]}
            />
            <section className={styles.left}>
                <Experience />
            </section>
            <section className={styles.right}>
                <Skills />
                <Projects printOnly />
                <Contact />
            </section>
        </div>
    );
}
