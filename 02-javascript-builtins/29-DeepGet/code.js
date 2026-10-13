/**
 * Problem 29 — lodash-style get(obj, 'a.b.c', fallback)
 * Run: node code.js
 */
function get(obj, path, fallback = undefined) {
  const keys = Array.isArray(path) ? path : path.split(".");
  let cur = obj;
  for (const key of keys) {
    if (cur == null) return fallback;
    cur = cur[key];
  }
  return cur === undefined ? fallback : cur;
}

const data = { user: { address: { city: "Cairo" } } };

console.log(get(data, "user.address.city"));      // 'Cairo'
console.log(get(data, "user.phone.number", "N/A")); // 'N/A' — missing path, no crash
console.log(get(null, "a.b", "fallback"));        // 'fallback'
