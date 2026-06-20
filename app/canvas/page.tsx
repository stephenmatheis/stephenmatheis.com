'use client';

import { useEffect, useRef } from 'react';
import { createEditor, Box } from '@/lib/editor';
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

        const half = Math.floor(editor.cols / 2);

        editor.root.add(
            Box(
                { border: false, padding: 0, width: editor.cols, height: editor.rows },
                Box({ title: 'One', interactive: true, width: half }),
                Box({ title: 'Two', interactive: true, x: half, width: editor.cols - half }),
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
