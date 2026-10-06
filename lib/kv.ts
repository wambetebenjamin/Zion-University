// In-memory fallback cache when Vercel KV credentials are not set in environment
const fallbackStore: Record<string, any> = {};

export async function kvSet(key: string, value: any): Promise<void> {
  try {
    if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
      const { kv } = await import("@vercel/kv");
      await kv.set(key, value);
      return;
    }
  } catch (err) {
    console.warn("Vercel KV not reachable, falling back to memory store:", err);
  }
  fallbackStore[key] = value;
}

export async function kvGet<T = any>(key: string): Promise<T | null> {
  try {
    if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
      const { kv } = await import("@vercel/kv");
      const data = await kv.get<T>(key);
      if (data !== null) return data;
    }
  } catch (err) {
    console.warn("Vercel KV not reachable, falling back to memory store:", err);
  }
  return fallbackStore[key] ?? null;
}

export async function kvListPush(key: string, item: any): Promise<void> {
  try {
    if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
      const { kv } = await import("@vercel/kv");
      await kv.lpush(key, item);
      return;
    }
  } catch (err) {
    console.warn("Vercel KV not reachable, falling back to memory store:", err);
  }
  if (!Array.isArray(fallbackStore[key])) {
    fallbackStore[key] = [];
  }
  fallbackStore[key].unshift(item);
}

export async function kvListGet<T = any>(key: string): Promise<T[]> {
  try {
    if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
      const { kv } = await import("@vercel/kv");
      const list = await kv.lrange<T>(key, 0, -1);
      if (list && list.length > 0) return list;
    }
  } catch (err) {
    console.warn("Vercel KV not reachable, falling back to memory store:", err);
  }
  return fallbackStore[key] ?? [];
}
