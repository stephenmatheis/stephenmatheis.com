'use client';

import { useEffect, useRef } from 'react';
import { Editor, Box, Textarea, Input, Text } from '@/lib/editor';
import { log, loggingOff } from '@/lib/utils';
import styles from './page.module.scss';

export default function Page() {
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

        const nameInput = Input({ flex: 1, placeholder: 'Your name…' });
        const emailInput = Input({ flex: 1, placeholder: 'you@example.com' });

        nameInput
            .on('change', (v) => console.log('name:', v))
            .on('enter', (v) => {
                editor.modal.show(
                    Box(
                        { title: 'Confirm', width: 50, height: 7, flexDirection: 'column', padding: 2 },
                        Text({ content: `Submit "${v}"?  Press Escape to cancel.` }),
                    ),
                );
            });

        emailInput.on('input', (v) => {
            if (v) {
                editor.float.show(
                    Box(
                        { title: 'Hint', width: 30, height: 4, flexDirection: 'column', padding: 1 },
                        Text({ content: 'Press Tab to continue' }),
                    ),
                    { type: 'corner', corner: 'top-right', offsetX: 2, offsetY: 2 },
                );
            } else {
                editor.float.hide();
            }
        });

        editor.root.add(
            Box(
                { flexDirection: 'row', border: false, padding: 0 },
                Box(
                    { title: 'Form', flexDirection: 'column', flex: 1, paddingY: 1, paddingX: 2 },
                    Box({ title: 'Name', height: 3 }, nameInput),
                    Box({ title: 'Email', height: 3 }, emailInput),
                ),
                Textarea({ title: 'Notes', flex: 2 }),
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
