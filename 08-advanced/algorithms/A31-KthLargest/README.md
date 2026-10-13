# A31 — Kth largest element

## The problem

Find the kth largest element: [3,2,1,5,6,4], k=2 -> 5. Sorting is accepted; the follow-up pushes toward O(n).

## Examples

- [3,2,1,5,6,4], k=2 -> 5
- [3,2,3,1,2,4,5,5,6], k=4 -> 4

## Approach

Baseline: sort descending, take index k-1 — O(n log n). Upgrade one: a min-heap of size k, O(n log k). Upgrade two: quickselect — partition like quicksort but recurse only into the side containing the answer, O(n) average. In an interview, state all three with their complexities and implement the one asked for; quickselect is the answer that stands out.

## Complexity

Sort O(n log n); heap O(n log k); quickselect O(n) average.

## Run

```bash
node code.ts
```
