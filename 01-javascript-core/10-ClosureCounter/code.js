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
