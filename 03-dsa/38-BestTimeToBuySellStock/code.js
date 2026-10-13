/**
 * Problem 38 — Best time to buy/sell stock: max profit, one transaction. O(n).
 * Run: node code.js
 */
function maxProfit(prices) {
  let minPrice = Infinity, profit = 0;
  for (const price of prices) {
    minPrice = Math.min(minPrice, price);
    profit = Math.max(profit, price - minPrice);
  }
  return profit;
}

console.log(maxProfit([7, 1, 5, 3, 6, 4])); // 5 (buy 1, sell 6)
console.log(maxProfit([7, 6, 4, 3, 1]));    // 0 (only falling — never negative)
console.log(maxProfit([2, 4, 1]));          // 2
