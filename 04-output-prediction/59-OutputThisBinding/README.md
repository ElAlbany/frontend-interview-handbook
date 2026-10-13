# 59. `this` binding

**Frequency in interviews:** high

## The problem



## Approach and explanation

**Predict first:**
- Correct answer: `'Alice'`, `undefined`, `undefined`
- Common wrong guess: `'Alice'` from the detached `f()` — `this` is lost on a plain call

`this` is decided by the **call site**, not where the function was written. Arrows have no own `this` — that's why they're used for callbacks and class fields in React.

## Solution

`code.js`

```js
/**
 * Problem 59 — this binding. Predict, then run: node code.js
 */
"use strict";
const user = {
  name: "Alice",
  greet() { console.log("method:", this?.name); },
  greetArrow: () => console.log("arrow:", this?.name),
};
user.greet();       // 'method: Alice' — this = user
const f = user.greet;
f();                // 'method: undefined' — plain call, this is lost
user.greetArrow();  // 'arrow: undefined' — arrows capture outer this
```

`code.ts`

```ts
/**
 * Problem 59 — this binding (TypeScript). Predict, then run: node code.ts
 */
interface User {
  name: string;
  greet(): void;
  greetArrow: () => void;
}

const user: User = {
  name: "Alice",
  greet(this: User) {
    console.log("method:", this?.name);
  },
  greetArrow: () => console.log("arrow:", (globalThis as Record<string, unknown>).name),
};

user.greet();      // 'method: Alice'
const f = user.greet;
f.call(undefined); // 'method: undefined' — plain call, this is lost
user.greetArrow(); // 'arrow: undefined' — arrows capture outer this
```
