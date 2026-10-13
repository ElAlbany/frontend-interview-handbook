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
