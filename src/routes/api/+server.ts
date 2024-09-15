import type { RequestHandler } from '@sveltejs/kit';
import type { KVNamespace } from '@cloudflare/workers-types'; // Імпорт типу

// Використовуємо KV_NAMESPACE для продакшену та змінну оточення для локального середовища
const KV_NAMESPACE: KVNamespace = process.env.NODE_ENV === 'production'
    ? (globalThis as any).KV_NAMESPACE // Для Cloudflare Workers
    : { // Для локального середовища, якщо ви бажаєте використати фейковий або реальний API
        get: async () => null, // Можна додати локальну реалізацію
        put: async () => { console.log('Фейковий запис у KV'); }
    } as unknown as KVNamespace;

export const POST: RequestHandler = async ({ request }) => {
    const { url, shortUrl } = await request.json();

    // Отримання значення з KV
    const existingShortUrl = await KV_NAMESPACE.get(shortUrl);

    if (existingShortUrl) {
        return new Response(JSON.stringify({ message: 'Short URL already exists' }), { status: 400 });
    }

    // Збереження нового URL в KV
    await KV_NAMESPACE.put(shortUrl, url);

    return new Response(null, { status: 200 });
};
