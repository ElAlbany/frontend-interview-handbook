/**
 * Problem 52 — Reverse words, normalizing whitespace (TypeScript)
 * Run: node code.ts
 */
const reverseWords = (s: string): string =>
  s.trim().split(/\s+/).reverse().join(" ");

console.log(reverseWords("  hello   world  ")); // 'world hello'
console.log(reverseWords("the sky is blue"));   // 'blue is sky the'
