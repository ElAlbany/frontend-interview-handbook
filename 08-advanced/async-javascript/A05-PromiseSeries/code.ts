/**
 * A05 — Run promise factories sequentially (TypeScript)
 * Run: node code.ts
 */
async function promiseSeries<T>(tasks: Array<() => Promise<T>>): Promise<T[]> {
  const results: T[] = [];
  for (const task of tasks) {
    results.push(await task); // each task starts only after the previous resolves
  }
  return results;
}

const started: number[] = [];
const makeTask = (i: number, ms: number) => async (): Promise<number> => {
  started.push(i);
  await new Promise((r) => setTimeout(r, ms));
  return i;
};

promiseSeries([makeTask(0, 100), makeTask(1, 10), makeTask(2, 10)]).then((res) => {
  console.log(res);         // [0, 1, 2]
  console.log(started);     // [0, 1, 2] — order of START, proving sequential execution
});
