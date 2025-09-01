import { Name } from '@/components/name';
import { Experience } from '@/components/experience';
import { Contact } from '@/components/contact';
import { Skills } from '@/components/skills';
import { Work } from '@/components/work';
import { Sheet } from '@/components/sheet';
import { Content } from '@/components/content';
import { About } from '@/components/about';
import { Toolbar } from '@/components/toolbar';
import styles from './page.module.scss';

export default function AboutPage() {
    return (
        <>
            <Sheet>
                <Content>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                            gap: '1in',
                            height: '100%',
                        }}
                    >
                        <div
                            style={{
                                flex: '1',
                                display: 'flex',
                                justifyContent: 'flex-end',
                            }}
                        >
                            <Name />
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                gap: '1in',
                            }}
                        >
                            <div>
                                <About />
                            </div>
                            <div>
                                <Skills />
                            </div>
                        </div>
                        <div>
                            <Experience />
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-end',
                                gap: '1in',
                            }}
                        >
                            <Contact />
                            <Work />
                        </div>
                    </div>
                </Content>
            </Sheet>
            <Toolbar />
        </>
    );
}
