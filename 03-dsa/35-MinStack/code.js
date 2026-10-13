/**
 * Problem 35 — Min Stack: getMin() in O(1) via a parallel mins stack
 * Run: node code.js
 */
class MinStack {
  constructor() { this.stack = []; this.mins = []; }
  push(x) {
    this.stack.push(x);
    if (!this.mins.length || x <= this.mins.at(-1)) this.mins.push(x);
  }
  pop() {
    if (this.stack.pop() === this.mins.at(-1)) this.mins.pop();
  }
  top() { return this.stack.at(-1); }
  getMin() { return this.mins.at(-1); }
}

const s = new MinStack();
s.push(3); s.push(1); s.push(2);
console.log(s.getMin()); // 1
console.log(s.top());    // 2
s.pop();                 // removes 2
console.log(s.getMin()); // 1
s.pop();                 // removes 1 (the min!) — mins must update too
console.log(s.getMin()); // 3 — the classic bug is forgetting this line
