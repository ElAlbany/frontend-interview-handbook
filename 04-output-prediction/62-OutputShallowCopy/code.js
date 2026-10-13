/**
 * Problem 62 — Shallow copy trap. Predict, then run: node code.js
 */
const original = { user: { name: "Alice" } };
const copy = { ...original };
copy.user.name = "Changed";
console.log(original.user.name); // 'Changed' — nested object is SHARED

// the fix:
const deep = structuredClone(original);
deep.user.name = "Deep";
console.log(original.user.name); // 'Changed' — untouched this time
