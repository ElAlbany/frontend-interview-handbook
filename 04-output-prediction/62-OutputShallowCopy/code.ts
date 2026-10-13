/**
 * Problem 62 — Shallow copy trap (TypeScript). Predict, then run: node code.ts
 */
interface Doc {
  user: { name: string };
}

const original: Doc = { user: { name: "Alice" } };
const copy = { ...original };
copy.user.name = "Changed";
console.log(original.user.name); // 'Changed' — nested object is SHARED

const deep = structuredClone(original);
deep.user.name = "Deep";
console.log(original.user.name); // 'Changed' — untouched this time
