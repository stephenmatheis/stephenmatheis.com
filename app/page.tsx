'use client';

import { useEffect, useRef } from 'react';
import { Editor, Box } from '@/lib/editor';
import { log, loggingOff } from '@/lib/utils';
import styles from './page.module.scss';

export default function Home() {
    const pageRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        loggingOff();

        const editor = Editor({
            canvas: canvasRef.current!,
            textarea: textareaRef.current!,
            container: containerRef.current!,
        });

        editor.root.add(Box({ flexDirection: 'column', paddingX: 2, paddingY: 1 }));

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
