# A04 — Timeout wrapper for any promise

## The problem

Write `withTimeout(promise, ms)` that settles with the original promise but rejects with a timeout error if it takes longer than `ms`. Used for API calls that must not hang forever.

## Examples

- resolves in 50ms with a 200ms timeout -> the value passes through
- resolves in 500ms with a 100ms timeout -> rejects 'Timed out after 100ms'

## Approach

`Promise.race` between the real promise and a timer promise that rejects after `ms`. The first settlement wins. In production prefer `AbortSignal.timeout(ms)` with fetch, but implementing it manually shows you understand race semantics.

## Complexity

Time O(1) to set up, space O(1).

## Run

```bash
node code.ts
```
