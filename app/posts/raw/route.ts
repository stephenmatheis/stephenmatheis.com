import { generateRaw } from '@/lib/generate-raw';

export async function GET() {
    const raw = await generateRaw();

    return new Response(raw, {
        headers: {
            'Content-Type': 'text/plain',
        },
    });
}
