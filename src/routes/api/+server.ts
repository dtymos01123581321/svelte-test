import type { RequestHandler } from '@sveltejs/kit';
import type { KVNamespace } from '@cloudflare/workers-types'; // Імпорт типу

const KV_NAMESPACE: KVNamespace = process.env.NODE_ENV === 'production'
    ? (globalThis as any).KV_NAMESPACE
    : {
        get: async () => null,
        put: async () => { console.log('Фейковий запис у KV'); }
    } as unknown as KVNamespace;

export const POST: RequestHandler = async ({ request }) => {
    try {
        const { url, shortUrl } = await request.json();

        const existingShortUrl = await KV_NAMESPACE.get(shortUrl);
        console.log('existingShortUrl  --; ', existingShortUrl);

        if (existingShortUrl) {
            return new Response(JSON.stringify({ message: 'Short URL already exists' }), { status: 400 });
        }

        await KV_NAMESPACE.put(shortUrl, url);

        return new Response(null, { status: 200 });
    } catch (error) {
        // Обробка помилок, якщо щось пішло не так
        console.error('Error in POST request:', error);
        return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
    }
};
