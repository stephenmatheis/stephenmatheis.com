import { LoadListScreen } from '@/components/LoadListScreen';
import { NewListScreen } from '@/components/NewListScreen';
import { ProsAndCons } from '@/components/ProsAndCons';

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    // console.log(slug);

    if (slug[0] === 'new') {
        return <NewListScreen />;
    }

    if (slug[0] === 'load') {
        return <LoadListScreen />;
    }

    return <ProsAndCons itemId={parseInt(slug[0])} />;
}
