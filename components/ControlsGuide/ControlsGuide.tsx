import styles from './ControlsGuide.module.scss';

const controls = [
    {
        cmd: 'h',
        label: 'move cursor left',
    },
    {
        cmd: 'j',
        label: 'move cursor down',
    },
    {
        cmd: 'k',
        label: 'move cursor up',
    },
    {
        cmd: 'l',
        label: 'move cursor right',
    },
    {
        cmd: 'i',
        label: 'insert mode on',
    },
    {
        cmd: 'esc',
        label: 'return to normal mode',
    },
    {
        cmd: 'return',
        label: 'select item under cursor',
    },
    {
        cmd: 'q',
        label: 'quit/close/back',
    },
];

export function ControlsGuide() {
    return (
        <div className={styles.guide}>
            <div className={styles.title}>NORMAL</div>

            {controls.map(({ cmd, label }, index) => {
                return (
                    <div key={index} className={styles.group}>
                        <div className={styles.cmd}>{cmd}</div>
                        <div className={styles.arrow}>
                            <svg width="16" height="16" viewBox="0 0 16 16" strokeLinejoin="round">
                                <path
                                    d="M9.53033 2.21968L9 1.68935L7.93934 2.75001L8.46967 3.28034L12.4393 7.25001H1.75H1V8.75001H1.75H12.4393L8.46967 12.7197L7.93934 13.25L9 14.3107L9.53033 13.7803L14.6036 8.70711C14.9941 8.31659 14.9941 7.68342 14.6036 7.2929L9.53033 2.21968Z"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    fill="currentColor"
                                />
                            </svg>
                        </div>
                        <div className={styles.label}>{label}</div>
                    </div>
                );
            })}
        </div>
    );
}
