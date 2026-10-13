/**
 * Problem 30 — Promise.race and Promise.allSettled from scratch
 * Run: node code.js
 */
function promiseRace(promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((p) => Promise.resolve(p).then(resolve, reject));
  });
}

function promiseAllSettled(promises) {
  return Promise.all(
    promises.map((p) =>
      Promise.resolve(p)
        .then((value) => ({ status: "fulfilled", value }))
        .catch((reason) => ({ status: "rejected", reason }))
    )
  );
}

const slow = new Promise((r) => setTimeout(() => r("slow"), 300));
const fast = new Promise((r) => setTimeout(() => r("fast"), 50));

promiseRace([slow, fast]).then(console.log); // 'fast'

// real use of race: a request timeout
const timeout = new Promise((_, rej) => setTimeout(() => rej(new Error("timeout")), 100));
promiseRace([slow, timeout]).catch((e) => console.log(e.message)); // 'timeout'

promiseAllSettled([Promise.resolve(1), Promise.reject("bad")]).then(console.log);
// [{ status: 'fulfilled', value: 1 }, { status: 'rejected', reason: 'bad' }]
