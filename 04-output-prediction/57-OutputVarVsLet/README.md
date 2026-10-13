# 57. `var` vs `let` in a loop

**Frequency in interviews:** very high

## The problem



## Approach and explanation

**Predict first:**
- Correct answer: `3, 3, 3` with `var`; `0, 1, 2` with `let`
- Common wrong guess: `0, 1, 2` for both

`var` is function-scoped: one shared `i`, and all timers see it after the loop finished. `let` creates a fresh binding per iteration. Fix for `var`: an IIFE capturing the value, or just use `let`.

## Solution

`code.js`

```js
/**
 * Problem 57 — Predict BEFORE running: node code.js
 * var loop: 3, 3, 3 | let loop: 0, 1, 2
 */
for (var i = 0; i < 3; i++) setTimeout(() => console.log("var:", i));
for (let j = 0; j < 3; j++) setTimeout(() => console.log("let:", j));
```

`code.ts`

```ts
/**
 * Problem 57 — Predict BEFORE running: node code.ts
 * var loop: 3, 3, 3 | let loop: 0, 1, 2
 */
for (var i = 0; i < 3; i++) setTimeout(() => console.log("var:", i));
for (let j = 0; j < 3; j++) setTimeout(() => console.log("let:", j));
```
