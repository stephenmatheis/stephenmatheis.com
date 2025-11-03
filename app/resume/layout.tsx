import { CursorProvider } from '@/providers/cursor-provider';
import { Viewport as App } from '@/components/viewport';
import { Content } from '@/components/content';
import { Cursor } from '@/components/cursor';

export default function Layout({ children }: { children: React.ReactNode }) {
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
