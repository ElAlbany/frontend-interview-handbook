# 34. Valid parentheses

**Frequency in interviews:** very high

## The problem

Given a string containing only brackets — `() [] {}` — return `true` if every opener is closed in the correct order by its matching type. `'({[]})'` → `true`, `'([)]'` → `false`. The intended tool is a stack.

## Examples

- Valid: `'({[]})'` → `true`
- Invalid: `'([)]'` → `false` (interleaved — the stack catches it)

## Approach and explanation

The canonical stack problem: push openers, on a closer pop and check it matches. O(n) time/space. Follow-up: "add angle brackets" → just extend the map.

## Solution

`code.js`

```js
/**
 * Problem 34 — Valid parentheses via stack
 * Run: node code.js
 */
function isValid(s) {
  const pairs = { ")": "(", "]": "[", "}": "{" };
  const stack = [];
  for (const ch of s) {
    if (ch in pairs) {
      if (stack.pop() !== pairs[ch]) return false;
    } else {
      stack.push(ch);
    }
  }
  return stack.length === 0;
}

console.log(isValid("({[]})")); // true
console.log(isValid("([)]"));   // false
console.log(isValid("((("));    // false (unclosed openers)
console.log(isValid(""));       // true
```

`code.ts`

```ts
/**
 * Problem 34 — Valid parentheses (TypeScript)
 * Run: node code.ts
 */
function isValid(s: string): boolean {
  const pairs: Record<string, string> = { ")": "(", "]": "[", "}": "{" };
  const stack: string[] = [];
  for (const ch of s) {
    if (ch in pairs) {
      if (stack.pop() !== pairs[ch]) return false;
    } else {
      stack.push(ch);
    }
  }
  return stack.length === 0;
}

console.log(isValid("({[]})")); // true
console.log(isValid("([)]"));   // false
console.log(isValid("((("));    // false
console.log(isValid(""));       // true
```
