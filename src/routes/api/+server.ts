import type { RequestHandler } from '@sveltejs/kit';
import type { KVNamespace } from '@cloudflare/workers-types'; // Імпорт типу

const KV_NAMESPACE: KVNamespace = process.env.NODE_ENV === 'production'
    ? (globalThis as any).KV_NAMESPACE
    : {
        get: async () => null,
        put: async () => { console.log('Фейковий запис у KV'); }
    } as unknown as KVNamespace;

export const POST: RequestHandler = async ({ request }) => {
    const { url, shortUrl } = await request.json();

    const existingShortUrl = await KV_NAMESPACE.get(shortUrl);

    if (existingShortUrl) {
        return new Response(JSON.stringify({ message: 'Short URL already exists' }), { status: 400 });
    }

    await KV_NAMESPACE.put(shortUrl, url);

    return new Response(null, { status: 200 });
};
