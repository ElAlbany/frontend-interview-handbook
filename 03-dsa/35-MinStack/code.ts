/**
 * Problem 35 — Min Stack (TypeScript)
 * Run: node code.ts
 */
class MinStack {
  private stack: number[] = [];
  private mins: number[] = [];

  push(x: number): void {
    this.stack.push(x);
    if (!this.mins.length || x <= this.mins.at(-1)!) this.mins.push(x);
  }
  pop(): void {
    if (this.stack.pop() === this.mins.at(-1)) this.mins.pop();
  }
  top(): number | undefined {
    return this.stack.at(-1);
  }
  getMin(): number | undefined {
    return this.mins.at(-1);
  }
}

const s = new MinStack();
s.push(3); s.push(1); s.push(2);
console.log(s.getMin()); // 1
s.pop();
console.log(s.getMin()); // 1
s.pop();                 // removes the min — mins must update too
console.log(s.getMin()); // 3
