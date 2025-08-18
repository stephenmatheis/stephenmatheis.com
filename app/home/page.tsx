import { PageControls } from '@/components/page-controls';
import { TableOfContents } from '@/components/table-of-contents';

export default function RootPage() {
    return (
        <>
            <TableOfContents />
            <PageControls />
        </>
    );
}
