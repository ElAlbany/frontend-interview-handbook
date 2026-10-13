# A29 — Coin change (minimum coins)

## The problem

Given coin denominations and an amount, return the fewest coins needed, or -1 if impossible: coins [1,2,5], amount 11 -> 3 (5+5+1).

## Examples

- coins [1,2,5], amount 11 -> 3
- coins [2], amount 3 -> -1
- amount 0 -> 0

## Approach

Bottom-up DP: `dp[a]` = fewest coins for amount a. For each amount from 1 to target, try every coin: `dp[a] = min(dp[a], dp[a - coin] + 1)`. Greedy (always take the biggest coin) fails for non-canonical coin systems like [1,3,4] with amount 6 — have that counterexample ready, because 'why not greedy?' is the standard follow-up.

## Complexity

Time O(amount * coins), space O(amount).

## Run

```bash
node code.ts
```
