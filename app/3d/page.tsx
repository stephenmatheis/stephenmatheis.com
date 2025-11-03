'use client';

import { Canvas } from '@react-three/fiber';
import { Grid, OrbitControls, Stage, Environment } from '@react-three/drei';
import { EffectComposer, Bloom, ToneMapping } from '@react-three/postprocessing';
import { Color } from 'three';
import Model from './Model';
import styles from './page.module.scss';

export default function Page() {
    return (
        <div className={styles.page}>
            <Canvas flat shadows camera={{ position: [-15, 0, 10], fov: 25 }}>
                <Stage
                    intensity={0.5}
                    shadows={{ type: 'accumulative', bias: -0.001, intensity: Math.PI }}
                    adjustCamera={false}
                >
                    <Model rotation={[0, Math.PI, 0]} />
                </Stage>
                <Grid
                    renderOrder={-1}
                    position={[0, -0.9, 0]}
                    infiniteGrid
                    cellSize={0.6}
                    cellThickness={0.6}
                    sectionSize={3.3}
                    sectionThickness={1.5}
                    sectionColor={new Color(0.5, 0.5, 1)}
                    fadeDistance={30}
                />
                <OrbitControls makeDefault minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} />
                <EffectComposer>
                    <Bloom luminanceThreshold={2} mipmapBlur />
                    <ToneMapping />
                </EffectComposer>
                <Environment background preset="sunset" blur={0.8} />
            </Canvas>
        </div>
    );
}
