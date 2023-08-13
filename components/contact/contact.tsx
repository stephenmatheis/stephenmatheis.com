import { UpdatePrompts } from '@/components/update-prompts';
import { Indicator } from '@/components/indicator';
import { Comment } from '@/components/comment';
import { LinkCtr } from '@/components/link-ctr';
import contact from '@/data/contact';
import styles from './contact.module.scss';

export function Contact() {
    return (
        <div className={styles['contact']}>
            <UpdatePrompts
                prompts={[
                    {
                        label: 'Contact',
                        type: 'content',
                    },
                    ...contact.map(({ label, href }) => {
                        return {
                            label: label,
                            path: href,
                            type: 'contact',
                        };
                    }),
                ]}
            />
            <Indicator label={'Contact'} />
            <Comment text={'Contact'} />
            <div className={styles['info']}>
                {contact.map(({ text, href, label }) => {
                    return (
                        <div key={text}>
                            <Indicator label={label} />
                            <LinkCtr href={href} label={label}>
                                {text}
                            </LinkCtr>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
