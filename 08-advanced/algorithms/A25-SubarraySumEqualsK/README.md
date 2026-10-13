# A25 — Subarray sum equals K

## The problem

Count contiguous subarrays whose sum equals k: [1,1,1], k=2 -> 2. Negative numbers are allowed, which kills sliding window — that realization is part of the test.

## Examples

- [1,1,1], k=2 -> 2
- [1,2,3], k=3 -> 2 ([1,2] and [3])
- [-1,-1,1], k=0 -> 1

## Approach

Prefix sums plus a frequency map. If prefix[j] - prefix[i] = k, the subarray between them sums to k — so walking left to right, count how many earlier prefixes equal `currentSum - k`. Seed the map with {0: 1} for subarrays starting at index 0. Sliding window fails here because negative numbers make the sum non-monotonic — say that out loud.

## Complexity

Time O(n), space O(n).

## Run

```bash
node code.ts
```
