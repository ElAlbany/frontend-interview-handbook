/**
 * Problem 31 — Promisify a Node-style callback function
 * Run: node code.js
 */
function promisify(fn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      fn(...args, (err, result) => (err ? reject(err) : resolve(result)));
    });
  };
}

// a fake old-style API: callback receives (err, data)
function oldFetchUser(id, callback) {
  setTimeout(() => {
    if (id > 0) callback(null, { id, name: "Alice" });
    else callback(new Error("invalid id"));
  }, 100);
}

const fetchUser = promisify(oldFetchUser);

fetchUser(1).then(console.log);                       // { id: 1, name: 'Alice' }
fetchUser(-1).catch((e) => console.log("err:", e.message)); // 'err: invalid id'
