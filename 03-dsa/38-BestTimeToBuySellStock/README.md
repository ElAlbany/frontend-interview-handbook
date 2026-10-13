# 38. Best time to buy and sell stock

**Frequency in interviews:** very high

## The problem

Given daily prices, find the maximum profit from one buy and one later sell (you must buy before you sell). Return 0 if no profit is possible. The insight: track the cheapest price seen so far and the best profit ending today.

## Examples

- Valid: `[7,1,5,3,6,4]` → `5` (buy at 1, sell at 6)
- Invalid: `[7,6,4,3,1]` → `0` (prices only fall — profit never goes negative)

## Approach and explanation

One pass, O(n). The insight: track the minimum *seen so far* and the best profit *possible ending today*.

## Solution

`code.js`

```js
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
```

`code.ts`

```ts
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
```
