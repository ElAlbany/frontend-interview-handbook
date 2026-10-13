# 56. Event loop order

**Frequency in interviews:** very high

## The problem



## Approach and explanation

**Predict first:**
- Correct answer: `1, 4, 3, 2`
- Common wrong guess: `1, 4, 2, 3` — assuming `setTimeout(0)` beats promises (it never does)

**Answer: `1, 4, 3, 2`.** Sync code first; then ALL microtasks (promises); then ONE macrotask (setTimeout). Even with `0` ms, a timer never beats a promise.

## Solution

`code.js`

```js
/**
 * Problem 56 — Predict the output BEFORE running, then run: node code.js
 * Expected: 1, 4, 3, 2 (sync -> all microtasks -> one macrotask)
 */
console.log("1");
setTimeout(() => console.log("2"), 0);
Promise.resolve().then(() => console.log("3"));
console.log("4");
```

`code.ts`

```ts
/**
 * Problem 56 — Predict the output BEFORE running, then run: node code.ts
 * Expected: 1, 4, 3, 2 (sync -> all microtasks -> one macrotask)
 */
console.log("1");
setTimeout(() => console.log("2"), 0);
Promise.resolve().then(() => console.log("3"));
console.log("4");
```
