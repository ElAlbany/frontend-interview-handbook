# 3. Palindrome check

**Frequency in interviews:** very high

## The problem

Write a function that returns `true` if a string reads the same forwards and backwards. Solve it once with built-ins, then with two pointers — interviewers use this to see whether you know the O(1)-space approach.

## Examples

- Valid: `'racecar'` → `true`
- Invalid: `'hello'` → `false`

## Approach and explanation

Two pointers: O(n) time, O(1) space. Mention the pointer version first — it shows you know more than built-ins.

## Solution

`code.js`

```js
/**
 * Problem 3 — Palindrome check
 * Run: node code.js
 */
const isPalindrome = (s) => s === [...s].reverse().join("");

// two pointers: O(n) time, O(1) space
function isPalindrome2p(s) {
  let l = 0, r = s.length - 1;
  while (l < r) {
    if (s[l] !== s[r]) return false;
    l++; r--;
  }
  return true;
}

console.log(isPalindrome("racecar"));   // true
console.log(isPalindrome("hello"));     // false
console.log(isPalindrome2p("racecar")); // true
console.log(isPalindrome2p("ab"));      // false
console.log(isPalindrome2p(""));        // true (empty string reads the same)
```

`code.ts`

```ts
/**
 * Problem 3 — Palindrome check (TypeScript)
 * Run: node code.ts
 */
const isPalindrome = (s: string): boolean => s === [...s].reverse().join("");

// two pointers: O(n) time, O(1) space
function isPalindrome2p(s: string): boolean {
  let l = 0,
    r = s.length - 1;
  while (l < r) {
    if (s[l] !== s[r]) return false;
    l++;
    r--;
  }
  return true;
}

console.log(isPalindrome("racecar"));   // true
console.log(isPalindrome("hello"));     // false
console.log(isPalindrome2p("racecar")); // true
console.log(isPalindrome2p("ab"));      // false
```
