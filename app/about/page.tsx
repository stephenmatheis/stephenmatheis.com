'use client';

import { Name } from '@/components/name';
import { Experience } from '@/components/experience';
import { Contact } from '@/components/contact';
import { Skills } from '@/components/skills';
import { Work } from '@/components/work';
import { LastLine } from '@/components/last-line';
import { Markup } from '@/components/markup';

export default function AboutPage() {
    return (
        <>
            <Name />
            <Contact />
            <Experience />
            <Skills />
            <Work />
            <LastLine />
            {/* <Markup /> */}
        </>
    );
}
