/**
 * Problem 20 — Sleep helper (TypeScript)
 * Run: node code.ts
 */
const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

(async () => {
  console.log("start", new Date().toLocaleTimeString());
  await sleep(1000);
  console.log("1 second later", new Date().toLocaleTimeString());
})();
