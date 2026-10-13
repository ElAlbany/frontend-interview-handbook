/**
 * A10 — Deferred promise utility (TypeScript)
 * Run: node code.ts
 */
class Deferred<T> {
  readonly promise: Promise<T>;
  resolve!: (value: T) => void;
  reject!: (err?: unknown) => void;

  constructor() {
    this.promise = new Promise<T>((res, rej) => {
      this.resolve = res;
      this.reject = rej;
    });
  }
}

// Real use: a gate that blocks consumers until initialization finishes
const ready = new Deferred<string>();

async function consumer(name: string): Promise<void> {
  const config = await ready.promise; // blocks here until someone resolves it
  console.log(name, "got:", config);
}

void consumer("service A");
void consumer("service B");

setTimeout(() => ready.resolve("config loaded"), 300);
// Expected: both consumers print 'config loaded' after ~300ms
