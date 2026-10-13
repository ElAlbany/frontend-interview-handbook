# 5. Anagram check (frequency counter)

**Frequency in interviews:** very high

## The problem

Given two strings, return `true` if one is an anagram of the other — same characters with the same counts, in any order (`'listen'` / `'silent'` → `true`). Assume lowercase letters unless told otherwise. The expected solution counts character frequencies; mention that sorting works too but costs O(n log n).

## Examples

- Valid: `('listen', 'silent')` → `true`
- Invalid: `('ab', 'abc')` → `false` (length mismatch — check it first)

## Approach and explanation

O(n) time, O(k) space (k = alphabet size). The frequency-counter pattern also solves "first unique character" and "most common element".

## Solution

`code.js`

```js
/**
 * Problem 5 — Anagram check via frequency counter. O(n).
 * Run: node code.js
 */
function isAnagram(a, b) {
  if (a.length !== b.length) return false;
  const count = {};
  for (const ch of a) count[ch] = (count[ch] || 0) + 1;
  for (const ch of b) {
    if (!count[ch]) return false;
    count[ch]--;
  }
  return true;
}

console.log(isAnagram("listen", "silent")); // true
console.log(isAnagram("hello", "world"));   // false
console.log(isAnagram("ab", "abc"));        // false (length mismatch)
console.log(isAnagram("aab", "aba"));       // true
```

`code.ts`

```ts
/**
 * Problem 5 — Anagram check (TypeScript). Frequency counter, O(n).
 * Run: node code.ts
 */
function isAnagram(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  const count: Record<string, number> = {};
  for (const ch of a) count[ch] = (count[ch] ?? 0) + 1;
  for (const ch of b) {
    if (!count[ch]) return false;
    count[ch]--;
  }
  return true;
}

console.log(isAnagram("listen", "silent")); // true
console.log(isAnagram("hello", "world"));   // false
console.log(isAnagram("ab", "abc"));        // false (length mismatch)
```
