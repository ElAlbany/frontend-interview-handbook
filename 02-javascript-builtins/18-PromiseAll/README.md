# 18. `Promise.all` from scratch

**Frequency in interviews:** high

## The problem

Reimplement `Promise.all`: take an array of promises and resolve with an array of results **in input order** once all succeed; reject as soon as any one rejects. The graded details: order preservation, empty input, and first-rejection behavior.

## Examples

- Valid: `[p1, p2]` → values in **input order**, not completion order
- Invalid: one promise rejects → the whole thing rejects immediately

## Approach and explanation

Three things interviewers check: results preserve **input order** (not completion order), empty array resolves immediately, first rejection rejects the whole thing.

## Solution

`code.js`

```js
/**
 * Problem 18 — Promise.all from scratch
 * Run: node code.js
 */
function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let done = 0;
    if (promises.length === 0) resolve([]);
    promises.forEach((p, i) => {
      Promise.resolve(p)
        .then((value) => {
          results[i] = value; // keep INPUT order, not completion order
          if (++done === promises.length) resolve(results);
        })
        .catch(reject); // first rejection fails everything
    });
  });
}

const slow = new Promise((r) => setTimeout(() => r("slow"), 200));
const fast = new Promise((r) => setTimeout(() => r("fast"), 50));

promiseAll([slow, fast, 42]).then(console.log); // ['slow', 'fast', 42] — order preserved
promiseAll([]).then(console.log);               // []
promiseAll([Promise.resolve(1), Promise.reject("boom")]).catch(console.log); // 'boom'
```

`code.ts`

```ts
/**
 * Problem 18 — Promise.all from scratch (TypeScript)
 * Run: node code.ts
 */
function promiseAll<T>(promises: (T | Promise<T>)[]): Promise<T[]> {
  return new Promise((resolve, reject) => {
    const results: T[] = new Array(promises.length);
    let done = 0;
    if (promises.length === 0) resolve([]);
    promises.forEach((p, i) => {
      Promise.resolve(p)
        .then((value) => {
          results[i] = value; // keep INPUT order
          if (++done === promises.length) resolve(results);
        })
        .catch(reject);
    });
  });
}

const slow = new Promise<string>((r) => setTimeout(() => r("slow"), 200));
const fast = new Promise<string>((r) => setTimeout(() => r("fast"), 50));

promiseAll<string>([slow, fast, "instant"]).then(console.log); // ['slow','fast','instant']
promiseAll<number>([]).then(console.log);                      // []
promiseAll([Promise.resolve(1), Promise.reject("boom")]).catch(console.log); // 'boom'

// Note: the real Promise.all uses variadic tuple types so
// [Promise<string>, Promise<number>] -> Promise<[string, number]>.
// Mentioning that limitation is a plus in an interview.
```
