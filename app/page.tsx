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
            <Main columns={2}>
                <video
                    autoPlay
                    loop
                    playsInline
                    muted
                    preload="auto"
                    style={{
                        width: 640 / 2,
                        height: 480 / 2,
                        margin: '0 auto',
                    }}
                    src="/memoji-loop-22s.mov"
                />
            </Main>
        </Page>
    );
}
