'use client';

import { useEffect, useRef } from 'react';
import { createEditor, Box } from '@/lib/editor';
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

        const editor = createEditor({
            canvas: canvasRef.current!,
            textarea: textareaRef.current!,
            container: containerRef.current!,
        });

        editor.statusBar({ right: 'Ln {ln}/{rows}, Col {col}/{cols}' });

        editor.root.add(
            Box(
                { flexDirection: 'row', border: false, padding: 0 },
                Box({ title: 'Nav', width: 10 }),
                Box({ title: 'One', interactive: true, flex: 1 }),
                Box({ title: 'Two', interactive: true, flex: 1 }),
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
