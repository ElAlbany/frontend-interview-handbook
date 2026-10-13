/**
 * Problem 20 — Sleep/delay helper
 * Run: node code.js
 */
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

(async () => {
  console.log("start", new Date().toLocaleTimeString());
  await sleep(1000);
  console.log("1 second later", new Date().toLocaleTimeString());
})();
