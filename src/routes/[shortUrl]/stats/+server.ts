import type { KVNamespace } from '@cloudflare/workers-types';

const KV_NAMESPACE: KVNamespace = process.env.NODE_ENV === 'production'
    ? (globalThis as any).KV_NAMESPACE
    : {
        get: async () => null,
        put: async () => { console.log('Фейковий запис у KV'); }
    } as unknown as KVNamespace;

export async function GET({ params }: any) {
    const { shortUrl } = params;

    const keys = await KV_NAMESPACE.list({ prefix: `${shortUrl}:click:` });
    const stats = [];

    for (const key of keys.keys) {
        const data = await KV_NAMESPACE.get(key.name);
        !!data && stats.push(JSON.parse(data));
    }

    return {
        body: {
            shortUrl,
            stats,
            totalClicks: stats.length
        }
    };
}
