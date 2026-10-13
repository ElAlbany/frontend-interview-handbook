/**
 * A04 — Timeout wrapper for any promise (TypeScript)
 * Run: node code.ts
 */
function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error(`Timed out after ${ms}ms`)), ms)
    ),
  ]);
}

const fastTask = new Promise<string>((r) => setTimeout(() => r("quick result"), 50));
const slowTask = new Promise<string>((r) => setTimeout(() => r("too late"), 500));

withTimeout(fastTask, 200).then(console.log); // 'quick result'
withTimeout(slowTask, 100).catch((e: Error) => console.log(e.message)); // 'Timed out after 100ms'
