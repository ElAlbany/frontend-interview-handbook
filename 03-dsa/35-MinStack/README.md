# 35. Min stack

**Frequency in interviews:** high

## The problem

Design a stack with `push`, `pop`, `top`, and `getMin` — all O(1). The puzzle: `getMin` can't rescan the stack, so maintain a parallel structure tracking the running minimum.

## Examples

- Valid: push 3, 1, 2 → `getMin()` is `1`
- Invalid: pop the `1`, then `getMin()` → must be back to `2` (forgetting to pop `mins` is the classic bug)

## Approach and explanation

A parallel stack tracks the running minimum so you never rescan. Pattern: "O(1) extra query" usually means "maintain a second structure".

## Solution

`code.js`

```js
/**
 * Problem 35 — Min Stack: getMin() in O(1) via a parallel mins stack
 * Run: node code.js
 */
class MinStack {
  constructor() { this.stack = []; this.mins = []; }
  push(x) {
    this.stack.push(x);
    if (!this.mins.length || x <= this.mins.at(-1)) this.mins.push(x);
  }
  pop() {
    if (this.stack.pop() === this.mins.at(-1)) this.mins.pop();
  }
  top() { return this.stack.at(-1); }
  getMin() { return this.mins.at(-1); }
}

const s = new MinStack();
s.push(3); s.push(1); s.push(2);
console.log(s.getMin()); // 1
console.log(s.top());    // 2
s.pop();                 // removes 2
console.log(s.getMin()); // 1
s.pop();                 // removes 1 (the min!) — mins must update too
console.log(s.getMin()); // 3 — the classic bug is forgetting this line
```

`code.ts`

```ts
/**
 * Problem 35 — Min Stack (TypeScript)
 * Run: node code.ts
 */
class MinStack {
  private stack: number[] = [];
  private mins: number[] = [];

  push(x: number): void {
    this.stack.push(x);
    if (!this.mins.length || x <= this.mins.at(-1)!) this.mins.push(x);
  }
  pop(): void {
    if (this.stack.pop() === this.mins.at(-1)) this.mins.pop();
  }
  top(): number | undefined {
    return this.stack.at(-1);
  }
  getMin(): number | undefined {
    return this.mins.at(-1);
  }
}

const s = new MinStack();
s.push(3); s.push(1); s.push(2);
console.log(s.getMin()); // 1
s.pop();
console.log(s.getMin()); // 1
s.pop();                 // removes the min — mins must update too
console.log(s.getMin()); // 3
```
