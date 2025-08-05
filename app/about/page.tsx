import { Viewport } from '@/components/viewport';
import { Content } from '@/components/content';
import { Name } from '@/components/name';
import { Experience } from '@/components/experience';
import { Contact } from '@/components/contact';
import { Skills } from '@/components/skills';
import { Work } from '@/components/work';
import { Markup } from '@/components/markup';

export default function AboutPage() {
    return (
        <Viewport>
            <Content>
                <Name />
                <Contact />
                <Experience />
                <Skills />
                <Work />
            </Content>
            <Markup />
        </Viewport>
    );
}
