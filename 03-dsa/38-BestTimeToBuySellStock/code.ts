/**
 * Problem 38 — Best time to buy/sell stock (TypeScript). O(n).
 * Run: node code.ts
 */
function maxProfit(prices: number[]): number {
  let minPrice = Infinity,
    profit = 0;
  for (const price of prices) {
    minPrice = Math.min(minPrice, price);
    profit = Math.max(profit, price - minPrice);
  }
  return profit;
}

console.log(maxProfit([7, 1, 5, 3, 6, 4])); // 5
console.log(maxProfit([7, 6, 4, 3, 1]));    // 0
console.log(maxProfit([2, 4, 1]));          // 2
