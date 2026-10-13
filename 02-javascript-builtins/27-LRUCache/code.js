/**
 * Problem 27 — LRU Cache (Map insertion order = recency order). get/put O(1).
 * Run: node code.js
 */
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }
  get(key) {
    if (!this.cache.has(key)) return -1;
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value); // move to most-recently-used
    return value;
  }
  put(key, value) {
    if (this.cache.has(key)) this.cache.delete(key);
    this.cache.set(key, value);
    if (this.cache.size > this.capacity) {
      this.cache.delete(this.cache.keys().next().value); // evict oldest
    }
  }
}

const lru = new LRUCache(2);
lru.put("a", 1);
lru.put("b", 2);
console.log(lru.get("a")); // 1 — and 'a' is now most-recently-used
lru.put("c", 3);           // evicts 'b', NOT 'a' (get refreshed it)
console.log(lru.get("b")); // -1
console.log(lru.get("a")); // 1
console.log(lru.get("c")); // 3
