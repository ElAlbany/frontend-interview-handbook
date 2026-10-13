# A28 — Climbing stairs (DP introduction)

## The problem

n stairs, climbing 1 or 2 at a time — how many distinct ways to reach the top? The canonical first dynamic-programming question.

## Examples

- n=2 -> 2 (1+1, 2)
- n=3 -> 3 (1+1+1, 1+2, 2+1)
- n=5 -> 8

## Approach

Recognize the Fibonacci shape: ways(n) = ways(n-1) + ways(n-2), because your last step is either 1 or 2 stairs. Then show the progression interviews reward: naive recursion (exponential) -> memoization (O(n)) -> bottom-up with two variables (O(n) time, O(1) space).

## Complexity

Time O(n), space O(1) for the iterative version.

## Run

```bash
node code.ts
```
