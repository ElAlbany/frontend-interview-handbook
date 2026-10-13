/**
 * Problem 18 — Promise.all from scratch (TypeScript)
 * Run: node code.ts
 */
function promiseAll<T>(promises: (T | Promise<T>)[]): Promise<T[]> {
  return new Promise((resolve, reject) => {
    const results: T[] = new Array(promises.length);
    let done = 0;
    if (promises.length === 0) resolve([]);
    promises.forEach((p, i) => {
      Promise.resolve(p)
        .then((value) => {
          results[i] = value; // keep INPUT order
          if (++done === promises.length) resolve(results);
        })
        .catch(reject);
    });
  });
}

const slow = new Promise<string>((r) => setTimeout(() => r("slow"), 200));
const fast = new Promise<string>((r) => setTimeout(() => r("fast"), 50));

promiseAll<string>([slow, fast, "instant"]).then(console.log); // ['slow','fast','instant']
promiseAll<number>([]).then(console.log);                      // []
promiseAll([Promise.resolve(1), Promise.reject("boom")]).catch(console.log); // 'boom'

// Note: the real Promise.all uses variadic tuple types so
// [Promise<string>, Promise<number>] -> Promise<[string, number]>.
// Mentioning that limitation is a plus in an interview.
