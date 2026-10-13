const memo = new Array(1e6);
function fib(x: number): number {
  if (x === 0 || x === 1) return x;
  if (memo[x] !== undefined) {
    // console.log("memo");
    return memo[x];
  }
  return (memo[x] = fib(x - 1) + fib(x - 2));
}

// console.log(fib(0));
// console.log(fib(1));
// console.log(fib(2));
// console.log(fib(3));
// console.log(fib(4));
// console.log(fib(5));
// console.log(fib(6));
console.log(fib(7));
