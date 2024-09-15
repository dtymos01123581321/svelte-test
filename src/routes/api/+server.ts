export default {
    async fetch(request: Request): Promise<Response> {
        if (request.method === 'POST') {
            const { url, shortUrl } = await request.json();

            // Перевірка чи існує вже Short URL
            const existingShortUrl = await KV_NAMESPACE.get(shortUrl);

            if (existingShortUrl) {
                return new Response(JSON.stringify({ message: 'Short URL already exists' }), { status: 400 });
            }

            // Збереження нового URL
            await KV_NAMESPACE.put(shortUrl, url);

            return new Response(null, { status: 200 });
        }

        return new Response("Method not allowed", { status: 405 });
    }
};
