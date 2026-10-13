/**
 * Problem 30 — Promise.race / Promise.allSettled from scratch (TypeScript)
 * Run: node code.ts
 */
function promiseRace<T>(promises: (T | Promise<T>)[]): Promise<T> {
  return new Promise((resolve, reject) => {
    promises.forEach((p) => Promise.resolve(p).then(resolve, reject));
  });
}

function promiseAllSettled<T>(
  promises: (T | Promise<T>)[]
): Promise<PromiseSettledResult<T>[]> {
  return Promise.all(
    promises.map((p) =>
      Promise.resolve(p)
        .then((value): PromiseSettledResult<T> => ({ status: "fulfilled", value }))
        .catch((reason): PromiseSettledResult<T> => ({ status: "rejected", reason }))
    )
  );
}

const slow = new Promise<string>((r) => setTimeout(() => r("slow"), 300));
const fast = new Promise<string>((r) => setTimeout(() => r("fast"), 50));

promiseRace([slow, fast]).then(console.log); // 'fast'

const timeout = new Promise<never>((_, rej) => setTimeout(() => rej(new Error("timeout")), 100));
promiseRace([slow, timeout]).catch((e: Error) => console.log(e.message)); // 'timeout'

promiseAllSettled([Promise.resolve(1), Promise.reject("bad")]).then(console.log);
// [{ status: 'fulfilled', value: 1 }, { status: 'rejected', reason: 'bad' }]
