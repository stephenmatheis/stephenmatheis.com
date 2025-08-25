import { Name } from '@/app/(print)/components/name';
import { Experience } from '@/app/(print)/components/experience';
import { Contact } from '@/app/(print)/components/contact';
import { Skills } from '@/app/(print)/components/skills';
import { Work } from '@/app/(print)/components/work';
import { Version } from '@/app/(print)/components/version';

export default function ResumePage() {
    return (
        <>
            <Name />
            <Contact />
            <Experience />
            <Skills />
            <Work />
            <Version />
        </>
    );
}
