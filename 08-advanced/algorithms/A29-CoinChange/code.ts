/**
 * A29 — Coin change, minimum coins (TypeScript). Bottom-up DP.
 * Run: node code.ts
 */
function coinChange(coins: number[], amount: number): number {
  const dp = new Array<number>(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let a = 1; a <= amount; a++) {
    for (const coin of coins) {
      if (coin <= a) dp[a] = Math.min(dp[a], dp[a - coin] + 1);
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}

console.log(coinChange([1, 2, 5], 11)); // 3  (5+5+1)
console.log(coinChange([2], 3));        // -1
console.log(coinChange([1], 0));        // 0
// why not greedy: [1,3,4] amount 6 -> greedy takes 4+1+1=3 coins, optimal is 3+3=2
console.log(coinChange([1, 3, 4], 6));  // 2
