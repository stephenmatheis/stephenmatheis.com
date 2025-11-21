'use client';

import * as motion from 'motion/react-client';
import { MotionValue, useMotionValue, useMotionValueEvent, useTransform } from 'motion/react';
import { Name } from '@/components/name';
import { Experience } from '@/components/experience';
import { Contact } from '@/components/contact';
import { Skills } from '@/components/skills';
import { Work } from '@/components/work';
import { lerp } from '@/utils/math';
import styles from './sheet.module.scss';

const translateX = '-0%';
const startingZ = -1500;

export function Sheet({ scrollY }: { scrollY: MotionValue<number> }) {
    const translateZ = useTransform(() => startingZ + scrollY.get());
    const opacity = useMotionValue(startingZ < -1500 ? 0 : 1);

    useMotionValueEvent(translateZ, 'change', (latest) => {
        if (latest <= -2000) {
            opacity.set(0);

            return;
        }

        if (latest >= -1500) {
            opacity.set(1);

            return;
        }

        const amount = (latest - -2000) / 500;
        const value = lerp(0, 1, amount);

        console.log('opacity:', value);

        opacity.set(value);
    });

    return (
        <motion.div
            className={styles.sheet}
            style={{
                opacity,
                translateX,
                translateZ,
            }}
        >
            <div className={styles.content}>
                <div className={styles.left}>
                    <Name />
                    <div>
                        For the past 11 years I’ve worked exclusively as a professional software engineer building
                        applications for clients like Apple, the Department of War, and the National Oceanic and
                        Atmospheric Administration.
                    </div>
                    <Experience />
                    <Work />
                </div>
                <div className={styles.right}>
                    <Contact />
                    <Skills />
                </div>
            </div>
        </motion.div>
    );
}
