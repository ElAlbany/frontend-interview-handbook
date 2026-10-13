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
