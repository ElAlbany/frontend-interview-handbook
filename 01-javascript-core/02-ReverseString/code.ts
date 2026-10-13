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
