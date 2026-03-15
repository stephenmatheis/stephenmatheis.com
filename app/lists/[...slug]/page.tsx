import { ProsAndCons } from '@/components/ProsAndCons';

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    return <ProsAndCons itemId={slug} />;
}
