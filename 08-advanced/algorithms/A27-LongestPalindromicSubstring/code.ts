/**
 * A27 — Longest palindromic substring, expand-around-center (TypeScript)
 * Run: node code.ts
 */
function longestPalindrome(s: string): string {
  if (s.length < 2) return s;
  let bestStart = 0,
    bestLen = 1;

  const expand = (l: number, r: number): void => {
    while (l >= 0 && r < s.length && s[l] === s[r]) {
      l--;
      r++;
    }
    const len = r - l - 1; // last expansion overshot by one on each side
    if (len > bestLen) {
      bestStart = l + 1;
      bestLen = len;
    }
  };

  for (let i = 0; i < s.length; i++) {
    expand(i, i);     // odd-length center
    expand(i, i + 1); // even-length center
  }
  return s.slice(bestStart, bestStart + bestLen);
}

console.log(longestPalindrome("babad")); // 'bab' (or 'aba')
console.log(longestPalindrome("cbbd"));  // 'bb'
console.log(longestPalindrome("a"));     // 'a'
