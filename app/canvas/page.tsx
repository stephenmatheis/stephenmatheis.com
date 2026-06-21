'use client';

import { useEffect, useRef } from 'react';
import { Editor, Box, Input } from '@/lib/editor';
import styles from './page.module.scss';
import { log, loggingOff } from '@/lib/utils';

export default function Home() {
    const pageRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        loggingOff();

        log('START: Editor created.');

        const editor = Editor({
            canvas: canvasRef.current!,
            textarea: textareaRef.current!,
            container: containerRef.current!,
        });

        editor.statusBar({
            left: 'Grid {cols} x {rows}',
            center: 'Region {r_cols} x {r_rows}',
            right: 'Ln {ln}, Col {col}',
        });

        const nameInput = Input({ flex: 1, placeholder: 'Your name…', width: 30 });
        const emailInput = Input({ flex: 1, placeholder: 'you@example.com', border: true });
        const noteInput = Input({ flex: 1, placeholder: 'No background…', background: false });

        nameInput
            .on('input', (v) => console.log('name typing:', v))
            .on('enter', (v) => console.log('name submitted:', v))
            .on('change', (v) => console.log('name committed:', v));

        emailInput
            .on('input', (v) => console.log('email typing:', v))
            .on('change', (v) => console.log('email committed:', v));

        noteInput
            .on('input', (v) => console.log('note typing:', v))
            .on('change', (v) => console.log('note committed:', v));

        editor.root.add(
            Box(
                { flexDirection: 'column', border: false, paddingX: 2, paddingY: 1 },
                Box({ title: 'Name', flex: 1 }, nameInput),
                Box({ title: 'Email', flex: 1 }, emailInput),
                Box({ title: 'Note', flex: 1 }, noteInput),
            ),
        );

        log('END');

        if (pageRef.current) {
            pageRef.current.style.opacity = '1';
        }

        return () => editor.destroy();
    }, []);

    return (
        <div ref={pageRef} className={styles.page} style={{ opacity: 0 }}>
            <div ref={containerRef} className={styles.renderer}>
                <canvas ref={canvasRef} />
                <textarea
                    ref={textareaRef}
                    className={styles.input}
                    name="input"
                    tabIndex={0}
                    autoFocus
                    suppressHydrationWarning
                />
            </div>
        </div>
    );
}
