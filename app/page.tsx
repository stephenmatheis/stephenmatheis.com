import { Header } from '@/components/header';
import { Page } from '@/components/page';
import { Content } from '@/components/content';
import { Overlay } from '@/components/overlay';

export default function ResumePage() {
    return (
        <>
            {/* <Header /> */}
            <Page>
                <Content />
            </Page>
            <Overlay />
        </>
    );
}
