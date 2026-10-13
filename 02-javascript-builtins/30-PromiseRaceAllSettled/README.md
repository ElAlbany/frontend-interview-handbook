# 30. `Promise.race` and `Promise.allSettled` from scratch

**Frequency in interviews:** medium

## The problem

Reimplement `Promise.race` (settle with the first promise that settles, win or fail) and `Promise.allSettled` (wait for all, never reject, tag each outcome). Know the real-world use of `race`: request timeouts.

## Examples

- Valid: `race([slow, fast])` → the first settled promise wins
- Invalid: `allSettled` with one rejection → still **resolves** with a status array (it never rejects)

## Approach and explanation

`allSettled` is just `all` where every promise is pre-wrapped to never reject. Real use for `race`: **request timeouts** — `Promise.race([fetch(url), timeout(5000)])`.

## Solution

`code.js`

```js
/**
 * Problem 30 — Promise.race and Promise.allSettled from scratch
 * Run: node code.js
 */
function promiseRace(promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((p) => Promise.resolve(p).then(resolve, reject));
  });
}

function promiseAllSettled(promises) {
  return Promise.all(
    promises.map((p) =>
      Promise.resolve(p)
        .then((value) => ({ status: "fulfilled", value }))
        .catch((reason) => ({ status: "rejected", reason }))
    )
  );
}

const slow = new Promise((r) => setTimeout(() => r("slow"), 300));
const fast = new Promise((r) => setTimeout(() => r("fast"), 50));

promiseRace([slow, fast]).then(console.log); // 'fast'

// real use of race: a request timeout
const timeout = new Promise((_, rej) => setTimeout(() => rej(new Error("timeout")), 100));
promiseRace([slow, timeout]).catch((e) => console.log(e.message)); // 'timeout'

promiseAllSettled([Promise.resolve(1), Promise.reject("bad")]).then(console.log);
// [{ status: 'fulfilled', value: 1 }, { status: 'rejected', reason: 'bad' }]
```

`code.ts`

```ts
/**
 * Problem 30 — Promise.race / Promise.allSettled from scratch (TypeScript)
 * Run: node code.ts
 */
function promiseRace<T>(promises: (T | Promise<T>)[]): Promise<T> {
  return new Promise((resolve, reject) => {
    promises.forEach((p) => Promise.resolve(p).then(resolve, reject));
  });
}

function promiseAllSettled<T>(
  promises: (T | Promise<T>)[]
): Promise<PromiseSettledResult<T>[]> {
  return Promise.all(
    promises.map((p) =>
      Promise.resolve(p)
        .then((value): PromiseSettledResult<T> => ({ status: "fulfilled", value }))
        .catch((reason): PromiseSettledResult<T> => ({ status: "rejected", reason }))
    )
  );
}

const slow = new Promise<string>((r) => setTimeout(() => r("slow"), 300));
const fast = new Promise<string>((r) => setTimeout(() => r("fast"), 50));

promiseRace([slow, fast]).then(console.log); // 'fast'

const timeout = new Promise<never>((_, rej) => setTimeout(() => rej(new Error("timeout")), 100));
promiseRace([slow, timeout]).catch((e: Error) => console.log(e.message)); // 'timeout'

promiseAllSettled([Promise.resolve(1), Promise.reject("bad")]).then(console.log);
// [{ status: 'fulfilled', value: 1 }, { status: 'rejected', reason: 'bad' }]
```
