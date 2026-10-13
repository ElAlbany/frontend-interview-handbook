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
