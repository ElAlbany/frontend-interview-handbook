/**
 * A13 — Circular buffer / ring buffer (TypeScript)
 * Run: node code.ts
 */
class CircularBuffer<T> {
  private buffer: (T | undefined)[];
  private head = 0;
  private size = 0;
  private capacity: number;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.buffer = new Array<T | undefined>(capacity);
  }

  write(value: T): void {
    if (this.size < this.capacity) {
      this.buffer[(this.head + this.size) % this.capacity] = value;
      this.size++;
    } else {
      this.buffer[this.head] = value;              // overwrite oldest
      this.head = (this.head + 1) % this.capacity; // wrap around
    }
  }

  read(): T | undefined {
    if (this.size === 0) return undefined;
    const value = this.buffer[this.head];
    this.buffer[this.head] = undefined;
    this.head = (this.head + 1) % this.capacity;
    this.size--;
    return value;
  }

  get length(): number {
    return this.size;
  }
}

const buf = new CircularBuffer<number>(3);
buf.write(1); buf.write(2); buf.write(3);
console.log(buf.read());   // 1
buf.write(4); buf.write(5); // buffer holds 3, 4, 5 (overwrote 2)
console.log(buf.read());   // 3
console.log(buf.read());   // 4
console.log(buf.read());   // 5
console.log(buf.read());   // undefined (empty)
