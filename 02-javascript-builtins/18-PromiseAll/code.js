/**
 * Problem 18 — Promise.all from scratch
 * Run: node code.js
 */
function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let done = 0;
    if (promises.length === 0) resolve([]);
    promises.forEach((p, i) => {
      Promise.resolve(p)
        .then((value) => {
          results[i] = value; // keep INPUT order, not completion order
          if (++done === promises.length) resolve(results);
        })
        .catch(reject); // first rejection fails everything
    });
  });
}

const slow = new Promise((r) => setTimeout(() => r("slow"), 200));
const fast = new Promise((r) => setTimeout(() => r("fast"), 50));

promiseAll([slow, fast, 42]).then(console.log); // ['slow', 'fast', 42] — order preserved
promiseAll([]).then(console.log);               // []
promiseAll([Promise.resolve(1), Promise.reject("boom")]).catch(console.log); // 'boom'
