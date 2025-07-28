import { Page } from '@/components/page';
import { Content } from '@/components/content';
import { Overlay } from '@/components/overlay';
import { Markup } from '@/components/markup';
import { Viewport } from '@/components/viewport';
import { Details } from '@/components/details';
import { Pointer } from '@/components/pointer';

export default function ResumePage() {
    return (
        <>
            <Viewport>
                <Details />
                <Page>
                    <Content />
                </Page>
                <Pointer />
            </Viewport>
            <Markup />
        </>
    );
}
