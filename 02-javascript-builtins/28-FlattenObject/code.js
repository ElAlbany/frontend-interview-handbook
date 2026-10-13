/**
 * Problem 28 — Flatten nested object into dot-path keys
 * Run: node code.js
 */
function flattenObject(obj, prefix = "", out = {}) {
  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === "object" && !Array.isArray(value)) {
      flattenObject(value, path, out);
    } else {
      out[path] = value; // arrays and primitives stay as-is
    }
  }
  return out;
}

console.log(flattenObject({ a: { b: { c: 1 } }, d: 2 }));
// { 'a.b.c': 1, d: 2 }
console.log(flattenObject({ user: { name: "Alice", roles: ["admin"] } }));
// { 'user.name': 'Alice', 'user.roles': ['admin'] } — array NOT flattened
