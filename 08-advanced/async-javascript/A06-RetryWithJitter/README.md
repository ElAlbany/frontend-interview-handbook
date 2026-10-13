# A06 — Retry with exponential backoff, jitter, and a retry predicate

## The problem

Extend basic retry: the delay doubles each attempt, full jitter randomizes it (prevents many clients retrying in lockstep — the thundering-herd problem), and a `shouldRetry(error)` predicate decides which errors are retryable (retry a 503, never a 400).

## Examples

- a function that fails twice then succeeds -> resolves on the third attempt
- `shouldRetry` returning false -> the error is thrown immediately, no retries
- attempts exhausted -> the last error is thrown

## Approach

Loop from 1 to attempts. On failure: if it was the last attempt or the predicate says no, rethrow. Otherwise compute `baseDelay * 2 ** (attempt - 1)` and sleep a random fraction of it (full jitter). An iterative loop is easier to reason about than recursion here.

## Complexity

Time O(attempts) worst case, space O(1).

## Run

```bash
node code.ts
```
