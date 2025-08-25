import { CursorProvider } from '@/providers/cursor-provider';
import { Cursor } from '@/components/cursor';
import { Viewport as App } from '@/components/viewport';
import { Content } from '@/components/content';
import './layout.scss';

export default function SheetLayout({ children }: { children: React.ReactNode }) {
    return (
        <CursorProvider>
            <App>
                <Content>{children}</Content>
                <div id="markup-overlay" />
            </App>
            <Cursor />
        </CursorProvider>
    );
}
