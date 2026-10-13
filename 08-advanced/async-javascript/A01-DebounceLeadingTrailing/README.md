# A01 — Debounce with leading and trailing options

## The problem

Extend a basic debounce with options: `leading` fires on the first call of a burst, `trailing` fires the last call after the burst settles. Supporting both modes (like lodash) is a classic follow-up to the basic debounce question.

## Examples

- `debounce(fn, 300)` called 5 times rapidly -> fn runs once, with the last arguments (trailing default)
- `debounce(fn, 300, { leading: true, trailing: false })` -> fn fires immediately on the first call, then stays silent during the burst

## Approach

Track three things: the timer, the latest arguments, and whether a timer is active. On each call: if `leading` and no timer is running, fire immediately and mark the call consumed. Otherwise store the arguments and (re)start the timer; when it fires, run with the stored arguments if `trailing` is on. The subtle bug to avoid: after a leading fire, do not let the trailing edge fire the same call again — clear the stored arguments.

## Complexity

Time O(1) per call, space O(1).

## Run

```bash
node code.ts
```
