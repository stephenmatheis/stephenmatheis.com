import { Name } from '@/components/name';
import { Experience } from '@/components/experience';
import { Footer } from '@/components/footer';
import { Contact } from '@/components/contact';
import { Skills } from '@/components/skills';
import { Work } from '@/components/work';
import { Markup } from '@/components/markup';

export default function AboutPage() {
    return (
        <>
            <Name />
            <Contact />
            <Experience />
            <Footer />
            <Skills />
            <Work />
            <Markup />
        </>
    );
}
