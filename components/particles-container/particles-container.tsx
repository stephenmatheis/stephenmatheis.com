'use client';

import { useEffect, useMemo, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import {
    type Container,
    type ISourceOptions,
    MoveDirection,
    OutMode,
} from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';
import styles from './particles-container.module.scss';

export function ParticlesContainer() {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    async function particlesLoaded(container?: Container): Promise<void> {
        console.log(container);
    }

    const options: ISourceOptions = useMemo(
        () => ({
            background: {
                color: {
                    value: 'var(--carbon)',
                },
            },
            fpsLimit: 120,
            interactivity: {
                events: {
                    onClick: {
                        enable: true,
                        mode: 'push',
                    },
                    onHover: {
                        enable: true,
                        mode: 'repulse',
                    },
                },
                modes: {
                    push: {
                        quantity: 4,
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4,
                    },
                },
            },
            particles: {
                color: {
                    value: '#6c6c58',
                },
                links: {
                    color: '#6c6c58',
                    distance: 1,
                    enable: true,
                    opacity: 0.5,
                    width: 1,
                },
                move: {
                    direction: MoveDirection.none,
                    enable: true,
                    outModes: {
                        default: OutMode.out,
                    },
                    random: false,
                    speed: 3,
                    straight: false,
                },
                number: {
                    density: {
                        enable: true,
                    },
                    value: 80,
                },
                opacity: {
                    value: 0.5,
                },
                shape: {
                    type: 'circle',
                },
                size: {
                    value: { min: 1, max: 5 },
                },
            },
            detectRetina: true,
        }),
        []
    );

    if (init) {
        return (
            <Particles
                className={styles.particles}
                id="tsparticles"
                particlesLoaded={particlesLoaded}
                options={options}
            />
        );
    }

    return <></>;
}
