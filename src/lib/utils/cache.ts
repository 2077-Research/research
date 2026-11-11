type CacheEntry<T> = { data: T; timestamp: number };

class CacheStore {
	private entries = new Map<string, CacheEntry<unknown>>();

	has(key: string) {
		return this.entries.has(key);
	}

	get<T>(key: string) {
		return this.entries.get(key) as CacheEntry<T> | undefined;
	}

	set<T>(key: string, value: CacheEntry<T>) {
		this.entries.set(key, value);
	}
}

export const cache = new CacheStore();
export const CACHE_TTL = 5 * 60 * 1000;

export const isCacheValid = (timestamp: number): boolean => {
	return Date.now() - timestamp < CACHE_TTL;
};
