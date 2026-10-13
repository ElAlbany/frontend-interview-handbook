# 51. First unique character in a string

**Frequency in interviews:** high

## The problem

Return the index of the first character that appears exactly once, or -1 if none exists. Two passes: count frequencies, then scan for the first count of 1.

## Examples

- Valid: `'leetcode'` → `0` (`'l'`)
- Invalid: `'aabb'` → `-1` (no unique character exists)

## Approach and explanation

Two passes: count, then find the first with count 1. O(n). Another frequency-counter win (same family as anagrams).

## Solution

`code.js`

```js
/**
 * Problem 51 — First unique character in a string. Two passes, O(n).
 * Run: node code.js
 */
function firstUniqChar(s) {
  const count = new Map();
  for (const ch of s) count.set(ch, (count.get(ch) || 0) + 1);
  for (let i = 0; i < s.length; i++) {
    if (count.get(s[i]) === 1) return i;
  }
  return -1;
}

console.log(firstUniqChar("leetcode"));     // 0 ('l')
console.log(firstUniqChar("loveleetcode")); // 2 ('v')
console.log(firstUniqChar("aabb"));         // -1
```

`code.ts`

```ts
/**
 * Problem 51 — First unique character (TypeScript)
 * Run: node code.ts
 */
function firstUniqChar(s: string): number {
  const count = new Map<string, number>();
  for (const ch of s) count.set(ch, (count.get(ch) ?? 0) + 1);
  for (let i = 0; i < s.length; i++) {
    if (count.get(s[i]) === 1) return i;
  }
  return -1;
}

console.log(firstUniqChar("leetcode"));     // 0
console.log(firstUniqChar("loveleetcode")); // 2
console.log(firstUniqChar("aabb"));         // -1
```
