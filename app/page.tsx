import { Page } from '@/components/page';
import { Main } from '@/components/main';

export default function RootPage() {
    return (
        <Page
            links={[
                {
                    label: 'GitHub',
                    path: 'https://github.com/stephenmatheis',
                    external: true,
                },
            ]}
        >
            <Main columns={3}>
                <video
                    autoPlay
                    loop
                    playsInline
                    muted
                    preload="auto"
                    style={{ width: 640 / 2, height: 480 / 2 }}
                    src="/memoji-loop-22s.mov"
                />
            </Main>
        </Page>
    );
}
