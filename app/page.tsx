import { Viewport } from '@/components/viewport';
import { Content } from '@/components/content';
import { Markup } from '@/components/markup';

export default function ResumePage() {
    return (
        <>
            <Viewport>
                <Content />
                <Markup />
            </Viewport>
        </>
    );
}
