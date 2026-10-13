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
