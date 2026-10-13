# 62. Shallow copy trap

**Frequency in interviews:** medium

## The problem



## Approach and explanation

**Predict first:**
- Correct answer: prints `'Changed'` — the nested object is shared
- Common wrong guess: spread performs a deep copy (it copies one level only)

Spread copies only the top level; nested objects are still shared references. Fix: `structuredClone(original)` or a deep-clone helper (Problem 16). This bug class shows up constantly in React state updates.

## Solution

`code.js`

```js
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
```

`code.ts`

```ts
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
```
