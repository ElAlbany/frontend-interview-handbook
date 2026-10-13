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
