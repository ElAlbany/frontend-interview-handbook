# 2. Reverse a string

**Frequency in interviews:** very high

## The problem

Write a function that takes a string and returns it reversed: `'hello'` → `'olleh'`. First solve it with built-ins, then be ready to write the manual loop — and to explain which version handles emoji/Unicode correctly.

## Examples

- Valid: `'hello'` → `'olleh'`
- Invalid: `''` → `''` (empty string must not crash)

## Approach and explanation

`[...s]` (not `s.split('')`) handles Unicode/emoji correctly. O(n) time and space. Follow-up: reverse **words** instead of chars (see Problem 52).

## Solution

`code.js`

```js
/**
 * Problem 2 — Reverse a string
 * Run: node code.js
 */
const reverse = (s) => [...s].reverse().join(""); // [...s] handles emoji/Unicode

function reverseManual(s) {
  let out = "";
  for (let i = s.length - 1; i >= 0; i--) out += s[i];
  return out;
}

console.log(reverse("hello"));        // 'olleh'
console.log(reverse(""));             // ''
console.log(reverse("a b 🚗"));        // '🚗 b a' (spread keeps the emoji intact)
console.log(reverseManual("world"));  // 'dlrow'
```

`code.ts`

```ts
/**
 * Problem 2 — Reverse a string (TypeScript)
 * Run: node code.ts
 */
const reverse = (s: string): string => [...s].reverse().join(""); // [...s] handles emoji/Unicode

function reverseManual(s: string): string {
  let out = "";
  for (let i = s.length - 1; i >= 0; i--) out += s[i];
  return out;
}

console.log(reverse("hello"));       // 'olleh'
console.log(reverse(""));            // ''
console.log(reverseManual("world")); // 'dlrow'
```
