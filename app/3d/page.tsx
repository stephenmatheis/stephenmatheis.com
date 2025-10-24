'use client';

import { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import Model from './Model';
import styles from './page.module.scss';

export default function Page() {
    const ref = useRef(null);

    return (
        <div className={styles.page}>
            <Canvas shadows dpr={[1, 2]} camera={{ fov: 50 }}>
                <Suspense fallback={null}>
                    <Stage preset="rembrandt" intensity={1} environment="city">
                        <Model />
                    </Stage>
                </Suspense>
                <OrbitControls ref={ref} />
            </Canvas>
        </div>
    );
}
