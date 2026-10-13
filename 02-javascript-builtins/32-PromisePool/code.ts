/**
 * Problem 32 — Promise pool with concurrency limit (TypeScript)
 * Run: node code.ts
 */
async function promisePool<T>(tasks: Array<() => Promise<T>>, limit: number): Promise<T[]> {
  const results: Promise<T>[] = [];
  const executing = new Set<Promise<T>>();
  for (const task of tasks) {
    const p = Promise.resolve().then(task);
    results.push(p);
    executing.add(p);
    p.finally(() => executing.delete(p));
    if (executing.size >= limit) await Promise.race(executing);
  }
  return Promise.all(results);
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

const tasks = Array.from({ length: 8 }, (_, i) => makeTask(i));
promisePool(tasks, 3).then((res) => {
  console.log(res);                           // [0,1,2,3,4,5,6,7]
  console.log("max concurrent:", maxRunning); // 3
});
