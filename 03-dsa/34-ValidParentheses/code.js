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
