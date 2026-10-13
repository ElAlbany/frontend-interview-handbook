# A05 — Run promise factories sequentially

## The problem

Given an array of functions that each return a promise, run them one at a time — each starts only after the previous one resolves — and collect the results in order. Contrast with `Promise.all` (parallel) and the promise pool (bounded parallel).

## Examples

- tasks with random 10-100ms delays -> results still arrive in input order, total time equals the sum of delays
- empty array -> resolves with [] immediately

## Approach

An async function with a plain `for...of` loop and `await` inside is the clearest correct answer — each iteration waits for the previous. The reduce-based one-liner (`tasks.reduce((p, t) => p.then(t), Promise.resolve())`) is worth knowing but harder to read.

## Complexity

Time O(n) sequential, space O(n) for results.

## Run

```bash
node code.ts
```
