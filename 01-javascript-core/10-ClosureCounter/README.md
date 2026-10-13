# 10. Closure counter

**Frequency in interviews:** very high

## The problem

Create a counter using a **closure**: an inner function that increments and returns a count no outside code can touch directly. Expect the follow-up "add decrement and reset" — return an object of methods all sharing the same private variable.

## Examples

- Valid: `increment(); increment()` → value is `2`
- Invalid: `counter.count` → `undefined` (state is private — that's the point)

## Approach and explanation

The classic closure demo: `count` is private — nothing outside can touch it except through the returned methods. Follow-up: "why not a class?" → closures give true privacy; class fields are public unless `#private`.

## Solution

`code.js`

```js
/**
 * Problem 10 — Closure counter with private state
 * Run: node code.js
 */
function createCounter() {
  let count = 0;
  return {
    increment: () => ++count,
    decrement: () => --count,
    reset: () => (count = 0),
    get value() { return count; },
  };
}

const counter = createCounter();
counter.increment();
counter.increment();
console.log(counter.value);  // 2
counter.decrement();
console.log(counter.value);  // 1
counter.reset();
console.log(counter.value);  // 0
console.log(counter.count);  // undefined — count is PRIVATE (the whole point)
```

`code.ts`

```ts
/**
 * Problem 10 — Closure counter (TypeScript, with an interface)
 * Run: node code.ts
 */
interface Counter {
  increment(): number;
  decrement(): number;
  reset(): number;
  readonly value: number; // getter exposed as a read-only property
}

function createCounter(): Counter {
  let count = 0;
  return {
    increment: () => ++count,
    decrement: () => --count,
    reset: () => (count = 0),
    get value() {
      return count;
    },
  };
}

const counter = createCounter();
counter.increment();
counter.increment();
console.log(counter.value); // 2
counter.decrement();
console.log(counter.value); // 1
counter.reset();
console.log(counter.value); // 0
```
