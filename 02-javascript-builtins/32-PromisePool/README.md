# 32. Promise pool — run N async tasks with max concurrency

**Frequency in interviews:** high

## The problem

Write `promisePool(tasks, limit)`: run async task functions with at most `limit` executing concurrently, and resolve with all results. Real-world framing: upload 50 files, 3 at a time.

## Examples

- Valid: 50 tasks, limit 3 → never more than 3 running at once
- Invalid: forgetting the final `Promise.all(results)` → returns before the tail finishes

## Approach and explanation

Real use: uploading 50 files but only 3 at a time, throttling API calls. This one makes juniors look senior — it's the pattern behind connection pools and upload queues (ties into the file-upload system design question).

## Solution

`code.js`

```js
/**
 * Problem 32 — Promise pool: max concurrency limit
 * Run: node code.js
 */
async function promisePool(tasks, limit) {
  const results = [];
  const executing = new Set();
  for (const task of tasks) {
    const p = Promise.resolve().then(task);
    results.push(p);
    executing.add(p);
    p.finally(() => executing.delete(p));
    if (executing.size >= limit) await Promise.race(executing);
  }
  return Promise.all(results);
}

let running = 0, maxRunning = 0;
const makeTask = (i) => async () => {
  running++;
  maxRunning = Math.max(maxRunning, running);
  await new Promise((r) => setTimeout(r, 100));
  running--;
  return i;
};

const tasks = Array.from({ length: 8 }, (_, i) => makeTask(i));
promisePool(tasks, 3).then((res) => {
  console.log(res);                       // [0,1,2,3,4,5,6,7]
  console.log("max concurrent:", maxRunning); // 3 — never exceeded
});
```

`code.ts`

```ts
/**
 * Problem 32 — Promise pool with concurrency limit (TypeScript)
 * Run: node code.ts
 */
async function promisePool<T>(tasks: Array<() => Promise<T>>, limit: number): Promise<T[]> {
  const results: Promise<T>[] = [];
  const executing = new Set<Promise<T>>();
  for (const task of tasks) {
    const p = Promise.resolve().then(task);
    results.push(p);
    executing.add(p);
    p.finally(() => executing.delete(p));
    if (executing.size >= limit) await Promise.race(executing);
  }
  return Promise.all(results);
}

let running = 0,
  maxRunning = 0;
const makeTask = (i: number) => async (): Promise<number> => {
  running++;
  maxRunning = Math.max(maxRunning, running);
  await new Promise((r) => setTimeout(r, 100));
  running--;
  return i;
};

const tasks = Array.from({ length: 8 }, (_, i) => makeTask(i));
promisePool(tasks, 3).then((res) => {
  console.log(res);                           // [0,1,2,3,4,5,6,7]
  console.log("max concurrent:", maxRunning); // 3
});
```
