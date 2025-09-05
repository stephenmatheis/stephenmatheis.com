import { Name } from '@/components/name';
import { Experience } from '@/components/experience';
import { Contact } from '@/components/contact';
import { Skills } from '@/components/skills';
import { Work } from '@/components/work';

export default function AboutPage() {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '3rem',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Name />
                <Contact />
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '.5in',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Experience />
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        flexBasis: '25%',
                        gap: '2rem',
                    }}
                >
                    <Skills />
                    <Work />
                </div>
            </div>
        </div>
    );
}
