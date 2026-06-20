'use client';

import { useEffect, useRef } from 'react';
import { Box } from '@/lib/tui';
import { createEditor } from '@/lib/editor';
import styles from './page.module.scss';

export default function Home() {
    const pageRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        const editor = createEditor({
            canvas: canvasRef.current!,
            textarea: textareaRef.current!,
            container: containerRef.current!,
        });

        editor.root.add(
            Box(
                { title: 'Outer', paddingX: 2 },
                Box(
                    { title: 'Inner', titleAlignment: 'right', paddingX: 2 },
                    Box({ title: 'Center', titleAlignment: 'center' }),
                ),
            ),
        );

        if (pageRef.current) {
            pageRef.current.style.opacity = '1';
        }

        return () => editor.destroy();
    }, []);

    return (
        <div ref={pageRef} className={styles.page} style={{ opacity: 0 }}>
            <div ref={containerRef} className={styles.renderer}>
                <canvas ref={canvasRef} />
                <textarea ref={textareaRef} className={styles.input} tabIndex={0} autoFocus suppressHydrationWarning />
            </div>
        </div>
    );
}
