# 20. Sleep / delay

**Frequency in interviews:** high

## The problem

Write a `sleep(ms)` helper that can be awaited: `await sleep(1000)` pauses async execution for one second. The question tests whether you know that `setTimeout` alone doesn't integrate with `await` — you must wrap it in a Promise.

## Examples

- Valid: `await sleep(1000)` → pauses one second
- Invalid: bare `setTimeout(fn, 1000)` → does NOT pause `await` — the classic mistake

## Approach and explanation

One line, but it tests whether you understand that `setTimeout` alone doesn't pause `await` — you must wrap it in a Promise. Used inside retry logic, polling, and testing.

## Solution

`code.js`

```js
/**
 * Problem 20 — Sleep/delay helper
 * Run: node code.js
 */
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

(async () => {
  console.log("start", new Date().toLocaleTimeString());
  await sleep(1000);
  console.log("1 second later", new Date().toLocaleTimeString());
})();
```

`code.ts`

```ts
/**
 * Problem 20 — Sleep helper (TypeScript)
 * Run: node code.ts
 */
const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

(async () => {
  console.log("start", new Date().toLocaleTimeString());
  await sleep(1000);
  console.log("1 second later", new Date().toLocaleTimeString());
})();
```
