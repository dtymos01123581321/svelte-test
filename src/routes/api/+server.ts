import type { RequestHandler } from '@sveltejs/kit';
import type { KVNamespace } from '@cloudflare/workers-types'; // Імпорт типу

declare const KV_NAMESPACE: KVNamespace;

export const POST: RequestHandler = async ({ request }) => {
    const { url, shortUrl } = await request.json();

    const existingShortUrl = await KV_NAMESPACE.get(shortUrl);

    if (existingShortUrl) {
        return new Response(JSON.stringify({ message: 'Short URL already exists' }), { status: 400 });
    }

    await KV_NAMESPACE.put(shortUrl, url);

    return new Response(null, { status: 200 });
};
