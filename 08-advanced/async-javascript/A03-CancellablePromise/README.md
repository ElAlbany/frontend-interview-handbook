# A03 — Cancellable promise wrapper

## The problem

Wrap a promise so callers can cancel it: after `cancel()` is called, the wrapped promise must never resolve or reject, even if the underlying operation finishes. (True cancellation of the underlying work needs AbortController — this wrapper ignores the outcome.)

## Examples

- cancel before the promise settles -> the wrapper stays pending forever
- cancel after the promise settled -> no effect; the result was already delivered

## Approach

Race the real promise against a cancelled flag: settle the wrapper only if the flag is still false when the underlying promise resolves or rejects. The state lives in a closure shared by `cancel()` and the handlers.

## Complexity

Time O(1), space O(1).

## Run

```bash
node code.ts
```
