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
