# A02 — Throttle with a trailing call

## The problem

A basic throttle drops calls that arrive inside the interval window. Extend it so the last dropped call still fires once the window expires — users expect their final scroll position or input to be processed.

## Examples

- 10 calls in 100ms with interval 500 -> first call fires immediately, the last call fires once at the 500ms mark
- a single call -> fires immediately, no trailing duplicate

## Approach

On each call compute the remaining time in the window. If the window has expired, clear any pending trailing timer and fire now. Otherwise store the arguments and schedule a single trailing timer for the remaining time. Only ever schedule one trailing timer — later calls just replace its arguments.

## Complexity

Time O(1) per call, space O(1).

## Run

```bash
node code.ts
```
