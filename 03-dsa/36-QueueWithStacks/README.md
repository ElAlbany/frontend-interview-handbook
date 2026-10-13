# 36. Queue using two stacks

**Frequency in interviews:** medium

## The problem

Implement a FIFO queue using only two LIFO stacks, with `enqueue` and `dequeue`. The key move: pour the inbox into the outbox only when the outbox is empty — that gives amortized O(1) operations.

## Examples

- Valid: enqueue 1,2,3 → `dequeue()` returns `1` (FIFO, not LIFO)
- Invalid: dequeue with both stacks empty → returns `undefined` — handle it gracefully

## Approach and explanation

Push to inbox, pour into outbox only when outbox is empty — each element moves exactly twice, so operations are amortized O(1).

## Solution

`code.js`

```js
/**
 * Problem 36 — Queue (FIFO) built from two stacks (LIFO). Amortized O(1).
 * Run: node code.js
 */
class QueueWithStacks {
  constructor() { this.inbox = []; this.outbox = []; }
  enqueue(x) { this.inbox.push(x); }
  dequeue() {
    if (!this.outbox.length) {
      while (this.inbox.length) this.outbox.push(this.inbox.pop());
    }
    return this.outbox.pop();
  }
}

const q = new QueueWithStacks();
q.enqueue(1); q.enqueue(2); q.enqueue(3);
console.log(q.dequeue()); // 1 — FIFO, not 3
q.enqueue(4);
console.log(q.dequeue()); // 2
console.log(q.dequeue()); // 3
console.log(q.dequeue()); // 4
console.log(q.dequeue()); // undefined (empty)
```

`code.ts`

```ts
/**
 * Problem 36 — Queue from two stacks (TypeScript, generic)
 * Run: node code.ts
 */
class QueueWithStacks<T> {
  private inbox: T[] = [];
  private outbox: T[] = [];

  enqueue(x: T): void {
    this.inbox.push(x);
  }
  dequeue(): T | undefined {
    if (!this.outbox.length) {
      while (this.inbox.length) this.outbox.push(this.inbox.pop()!);
    }
    return this.outbox.pop();
  }
}

const q = new QueueWithStacks<number>();
q.enqueue(1); q.enqueue(2); q.enqueue(3);
console.log(q.dequeue()); // 1
q.enqueue(4);
console.log(q.dequeue()); // 2
console.log(q.dequeue()); // 3
console.log(q.dequeue()); // 4
console.log(q.dequeue()); // undefined
```
