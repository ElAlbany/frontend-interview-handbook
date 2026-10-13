# A14 — Binary search: first and last occurrence

## The problem

In a sorted array with duplicates, find the first and last index of a target. Plain binary search finds *some* match; bounds need biased variants.

## Examples

- [1,2,2,2,3], target 2 -> first 1, last 3
- target 4 -> -1, -1

## Approach

Two biased binary searches. Lower bound: when `arr[mid] >= target` move left (`hi = mid - 1` after recording mid as a candidate), else move right — the last recorded candidate is the first occurrence. Upper bound mirrors it. This is exactly C++'s lower_bound/upper_bound and the basis of 'count occurrences in O(log n)'.

## Complexity

Time O(log n), space O(1).

## Run

```bash
node code.ts
```
