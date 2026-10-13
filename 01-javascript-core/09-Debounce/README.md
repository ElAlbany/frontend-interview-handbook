# 9. Debounce

**Frequency in interviews:** very high

## The problem

Implement `debounce(fn, delay)`: return a wrapped function that executes `fn` only after it hasn't been called for `delay` ms — rapid repeated calls reset the timer. Know the real-world "why" (search inputs, autosave — fewer API calls) before writing any code.

## Examples

- Valid: 3 calls within 300ms → `fn` runs **once**
- Invalid: call, wait past the delay, call again → runs **twice** (correctly not debounced)

## Approach and explanation

Every call resets the timer; only the last call within a quiet window runs. Follow-ups: **leading edge** (run immediately, then go quiet), **flush/cancel** methods, and debounce vs throttle (next problem).

## Solution

`code.js`

```js
/**
 * Problem 9 — Debounce: run only after calls stop for `delay` ms.
 * Run: node code.js
 */
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Demo: 5 rapid calls -> fn runs ONCE, with the LAST arguments
const log = debounce((msg) => console.log("fired with:", msg), 300);
log("call 1");
log("call 2");
log("call 3");
log("call 4");
log("call 5"); // only this one survives the 300ms quiet window
// Expected: a single line 'fired with: call 5' after ~300ms
```

`code.ts`

```ts
/**
 * Problem 9 — Debounce (TypeScript, fully typed with Parameters<F>)
 * Run: node code.ts
 */
function debounce<F extends (...args: never[]) => void>(
  fn: F,
  delay: number
): (...args: Parameters<F>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return function (this: unknown, ...args: Parameters<F>) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Demo: 5 rapid calls -> fn runs ONCE, with the LAST arguments
const log = debounce((msg: string) => console.log("fired with:", msg), 300);
log("call 1");
log("call 2");
log("call 3");
log("call 4");
log("call 5");
// Expected: a single line 'fired with: call 5' after ~300ms
```
