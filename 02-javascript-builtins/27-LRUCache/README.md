# 27. LRU Cache

**Frequency in interviews:** high

## The problem

Design an LRU (least-recently-used) cache with fixed capacity: `get` and `put` both O(1), and when full, evict the least recently used entry. Remember that `get()` also refreshes recency — the #1 bug candidates miss. Hint: JS `Map` preserves insertion order.

## Examples

- Valid: capacity 2, put a,b,c → `a` is evicted (least recently used)
- Invalid: `get(a)` then put c → `b` must be evicted instead — `get` refreshes recency (the common bug)

## Approach and explanation

Both operations O(1) thanks to `Map`'s insertion ordering. "Cache with eviction" is a real-world concept (browser caches, Redis `maxmemory-policy`) — this is a favorite at companies that ask juniors one "hard" question.

## Solution

`code.js`

```js
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
```

`code.ts`

```ts
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
```
