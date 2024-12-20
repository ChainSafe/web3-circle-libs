import QuickLRU from 'quick-lru';

// Default cache configuration
const DEFAULT_MAX_SIZE = 100;
const DEFAULT_MAX_AGE = 600000; // 10 minutes in milliseconds

// Single global cache instance
const globalCache = new QuickLRU<string, unknown>({
  maxSize: DEFAULT_MAX_SIZE,
  maxAge: DEFAULT_MAX_AGE,
});

/**
 * Invalidate entire cache namespace
 * @param name Cache namespace to invalidate
 */
export function invalidateCache(name: string): void {
  globalCache.delete(name);
}

/**
 * Cached loader utility
 * @param name Cache name
 * @param fetchFn Function to fetch data if not in cache
 */
export async function cachedLoader<V>(
  name: string,
  fetchFn: () => Promise<V>,
): Promise<V> {
  // Check cache first
  const cachedData = globalCache.get(name);
  if (cachedData !== undefined) {
    return cachedData as V;
  }

  // Fetch and cache new data
  const freshData = await fetchFn();
  globalCache.set(name, freshData);

  return freshData;
}
