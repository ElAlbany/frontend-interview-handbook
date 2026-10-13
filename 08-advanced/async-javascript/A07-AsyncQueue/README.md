# A07 — Concurrency-limited async queue class

## The problem

Build a queue class: `queue.add(task)` accepts a function returning a promise, runs tasks with at most N in flight, and each call returns a promise for that task's result. This is the class version of the promise pool, closer to production job runners.

## Examples

- 8 tasks with concurrency 3 -> at most 3 running at any moment, all results delivered to their callers
- a task that rejects -> only that caller's promise rejects; the queue keeps processing

## Approach

Keep a FIFO array of jobs and a running counter. `add` wraps the task so its result resolves the caller's promise, pushes the wrapper, then pumps: while under the concurrency limit and jobs remain, shift and start one. When a job finishes (finally), decrement and pump again. Rejection is forwarded to the individual caller, not the queue.

## Complexity

Time O(1) per add, space O(queue length).

## Run

```bash
node code.ts
```
