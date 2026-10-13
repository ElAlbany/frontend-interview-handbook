# A30 — House robber (1D DP)

## The problem

Houses in a row hold money; robbing two adjacent houses triggers an alarm. Maximize the take: [2,7,9,3,1] -> 12 (2+9+1).

## Examples

- [2,7,9,3,1] -> 12
- [1,2,3,1] -> 4
- [2,1,1,2] -> 4

## Approach

At each house decide: rob it (take its money plus the best from two houses back) or skip it (keep the best from one house back). `dp[i] = max(dp[i-1], dp[i-2] + nums[i])`. Two rolling variables replace the array. The 'rob or skip' framing is the template for a whole family of 1D DP problems.

## Complexity

Time O(n), space O(1).

## Run

```bash
node code.ts
```
