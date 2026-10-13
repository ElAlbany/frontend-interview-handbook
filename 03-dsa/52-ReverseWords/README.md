# 52. Reverse words in a string

**Frequency in interviews:** high

## The problem

Reverse the order of words in a string while normalizing whitespace: `'  hello   world  '` → `'world hello'`. The trap is multiple spaces — split on `/\s+/` after trimming, never on `' '`.

## Examples

- Valid: `'  hello   world  '` → `'world hello'`
- Invalid: plain `split(' ')` on multiple spaces → produces empty strings — use `/\s+/`

## Approach and explanation

The trick is the `/\s+/` regex — plain `split(' ')` explodes on multiple spaces. If asked to do it in place (C-style), describe: reverse whole string, then reverse each word.

## Solution

`code.js`

```js
/**
 * Problem 52 — Reverse words, normalizing whitespace
 * Run: node code.js
 */
const reverseWords = (s) => s.trim().split(/\s+/).reverse().join(" ");

console.log(reverseWords("  hello   world  ")); // 'world hello'
console.log(reverseWords("the sky is blue"));   // 'blue is sky the'

// the trap: split(' ') on multiple spaces
console.log("a  b".split(" "));   // ['a', '', 'b'] — empty strings!
console.log("a  b".split(/\s+/)); // ['a', 'b']
```

`code.ts`

```ts
/**
 * Problem 52 — Reverse words, normalizing whitespace (TypeScript)
 * Run: node code.ts
 */
const reverseWords = (s: string): string =>
  s.trim().split(/\s+/).reverse().join(" ");

console.log(reverseWords("  hello   world  ")); // 'world hello'
console.log(reverseWords("the sky is blue"));   // 'blue is sky the'
```
