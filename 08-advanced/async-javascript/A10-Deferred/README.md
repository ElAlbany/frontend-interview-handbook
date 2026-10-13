# A10 — Deferred promise utility

## The problem

Implement a Deferred: an object exposing a `promise` plus external `resolve`/`reject` methods — the pre-async/await pattern that is still useful for gates, semaphores, and coordinating code that produces a value in one place and consumes it in another.

## Examples

- create a deferred, hand its promise to a consumer, resolve it later from elsewhere -> consumer receives the value
- reject -> consumer's catch runs

## Approach

The constructor captures the executor's resolve/reject callbacks into instance fields (definite assignment). Anything holding the instance can now settle the promise from outside. A real-world use: a 'gate' that blocks all callers until some initialization completes.

## Complexity

Time O(1), space O(1).

## Run

```bash
node code.ts
```
