# 55. Valid palindrome (alphanumeric only)

**Frequency in interviews:** high

## The problem

Return `true` if a string is a palindrome considering **only letters and digits**, ignoring case: `'A man, a plan, a canal: Panama'` → `true`. Sanitize first, then two pointers.

## Examples

- Valid: `'A man, a plan, a canal: Panama'` → `true`
- Invalid: `'race a car'` → `false`

## Approach and explanation

Sanitize first (lowercase + strip non-alphanumerics), then two pointers. Combines string prep with the pointer pattern from Problem 3.

## Solution

`code.js`

```js
/**
 * Problem 55 — Valid palindrome (alphanumeric only, case-insensitive)
 * Run: node code.js
 */
function isPalindromeClean(s) {
  const clean = s.toLowerCase().replace(/[^a-z0-9]/g, "");
  let l = 0, r = clean.length - 1;
  while (l < r) if (clean[l++] !== clean[r--]) return false;
  return true;
}

console.log(isPalindromeClean("A man, a plan, a canal: Panama")); // true
console.log(isPalindromeClean("race a car"));                     // false
console.log(isPalindromeClean(" "));                              // true (nothing to compare)
```

`code.ts`

```ts
/**
 * Problem 55 — Valid palindrome, alphanumeric only (TypeScript)
 * Run: node code.ts
 */
function isPalindromeClean(s: string): boolean {
  const clean = s.toLowerCase().replace(/[^a-z0-9]/g, "");
  let l = 0,
    r = clean.length - 1;
  while (l < r) if (clean[l++] !== clean[r--]) return false;
  return true;
}

console.log(isPalindromeClean("A man, a plan, a canal: Panama")); // true
console.log(isPalindromeClean("race a car"));                     // false
console.log(isPalindromeClean(" "));                              // true
```
