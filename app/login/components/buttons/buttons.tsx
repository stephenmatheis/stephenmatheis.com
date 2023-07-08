'use client';

import styles from './buttons.module.scss';

export function Buttons() {
    return (
        <div className={styles.buttons}>
            <button
                onClick={async () => {
                    const res = await fetch('api/octokit/user', {
                        method: 'POST',
                    });

                    const data = await res.json();

                    console.log('User:', data);
                }}
            >
                Get user
            </button>
            <button
                onClick={async () => {
                    // TODO: Submit values with form
                    const res = await fetch('api/octokit/create/issue', {
                        method: 'POST',
                    });

                    const data = await res.json();

                    console.log('Create issue:', data);
                }}
            >
                Create issue
            </button>
        </div>
    );
}
