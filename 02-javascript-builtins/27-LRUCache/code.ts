/**
 * Problem 27 — LRU Cache, fully generic (TypeScript)
 * Run: node code.ts
 */
class LRUCache<K, V> {
  private cache = new Map<K, V>(); // Map preserves insertion order
  private capacity: number;

  constructor(capacity: number) {
    this.capacity = capacity;
  }

  get(key: K): V | -1 {
    if (!this.cache.has(key)) return -1;
    const value = this.cache.get(key)!;
    this.cache.delete(key);
    this.cache.set(key, value); // refresh recency
    return value;
  }

  put(key: K, value: V): void {
    if (this.cache.has(key)) this.cache.delete(key);
    this.cache.set(key, value);
    if (this.cache.size > this.capacity) {
      this.cache.delete(this.cache.keys().next().value!); // evict oldest
    }
  }
}

const lru = new LRUCache<string, number>(2);
lru.put("a", 1);
lru.put("b", 2);
console.log(lru.get("a")); // 1 — 'a' is now most-recently-used
lru.put("c", 3);           // evicts 'b', not 'a'
console.log(lru.get("b")); // -1
console.log(lru.get("a")); // 1
console.log(lru.get("c")); // 3
