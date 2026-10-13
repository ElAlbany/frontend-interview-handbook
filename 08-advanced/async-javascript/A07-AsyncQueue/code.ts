/**
 * A07 — Concurrency-limited async queue (TypeScript)
 * Run: node code.ts
 */
class AsyncQueue {
  private queue: Array<() => Promise<void>> = [];
  private running = 0;
  private concurrency: number;

  constructor(concurrency: number) {
    this.concurrency = concurrency;
  }

  add<T>(task: () => Promise<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const job = async () => {
        this.running++;
        try {
          resolve(await task());
        } catch (e) {
          reject(e); // failure goes to this caller only — the queue keeps processing
        } finally {
          this.running--;
          this.next();
        }
      };
      this.queue.push(job);
      this.next();
    });
  }

  private next(): void {
    while (this.running < this.concurrency && this.queue.length > 0) {
      void this.queue.shift()!();
    }
  }
}

let running = 0,
  maxRunning = 0;
const makeTask = (i: number) => async (): Promise<number> => {
  running++;
  maxRunning = Math.max(maxRunning, running);
  await new Promise((r) => setTimeout(r, 100));
  running--;
  return i;
};

const queue = new AsyncQueue(3);
Promise.all(Array.from({ length: 8 }, (_, i) => queue.add(makeTask(i)))).then((res) => {
  console.log(res);                           // [0..7]
  console.log("max concurrent:", maxRunning); // 3
});
