# 50. Longest substring without repeating characters

**Frequency in interviews:** high

## The problem

Find the length of the longest substring without repeating characters: `'abcabcbb'` → `3`. The pattern is a sliding window — expand right, and when a repeat appears, jump the left edge past it. O(n).

## Examples

- Valid: `'abcabcbb'` → `3` (`'abc'`)
- Invalid: `'bbbbb'` → `1` (window must shrink, not stall)

## Approach and explanation

Sliding window: expand right, jump left past any repeat. O(n). "Sliding window" and "two pointers" are the two patterns that cover most string/array mediums.

## Solution

`code.js`

```js
/**
 * Problem 50 — Longest substring without repeating characters (sliding window). O(n).
 * Run: node code.js
 */
function lengthOfLongestSubstring(s) {
  const seen = new Map(); // char -> last index
  let left = 0, best = 0;
  for (let right = 0; right < s.length; right++) {
    if (seen.has(s[right]) && seen.get(s[right]) >= left) {
      left = seen.get(s[right]) + 1; // shrink window past the repeat
    }
    seen.set(s[right], right);
    best = Math.max(best, right - left + 1);
  }
  return best;
}

console.log(lengthOfLongestSubstring("abcabcbb")); // 3 ('abc')
console.log(lengthOfLongestSubstring("bbbbb"));    // 1
console.log(lengthOfLongestSubstring("pwwkew"));   // 3 ('wke')
console.log(lengthOfLongestSubstring(""));         // 0
```

`code.ts`

```ts
/**
 * Problem 50 — Longest substring without repeating characters (TypeScript)
 * Run: node code.ts
 */
function lengthOfLongestSubstring(s: string): number {
  const seen = new Map<string, number>();
  let left = 0,
    best = 0;
  for (let right = 0; right < s.length; right++) {
    const last = seen.get(s[right]);
    if (last !== undefined && last >= left) left = last + 1;
    seen.set(s[right], right);
    best = Math.max(best, right - left + 1);
  }
  return best;
}

console.log(lengthOfLongestSubstring("abcabcbb")); // 3
console.log(lengthOfLongestSubstring("bbbbb"));    // 1
console.log(lengthOfLongestSubstring("pwwkew"));   // 3
console.log(lengthOfLongestSubstring(""));         // 0
```
