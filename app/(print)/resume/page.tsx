import { Name } from '@/app/(print)/components/name';
import { About } from '@/components/about';
import { Experience } from '@/app/(print)/components/experience';
import { Contact } from '@/app/(print)/components/contact';
import { Skills } from '@/app/(print)/components/skills';
import { Work } from '@/app/(print)/components/work';
import { Version } from '@/app/(print)/components/version';

export default function ResumePage() {
    return (
        <div className="resume">
            <header>
                <Name />
                <Contact />
            </header>
            <About />
            <div className="content">
                <div className="column right">
                    <Skills />
                    <Work />
                </div>
                <div className="column left">
                    <Experience />
                </div>
            </div>
        </div>
    );
}
