# A22 — Top K frequent elements

## The problem

Return the k most frequent values in an array: [1,1,1,2,2,3], k=2 -> [1,2].

## Examples

- [1,1,1,2,2,3], k=2 -> [1, 2]
- [1], k=1 -> [1]

## Approach

Count frequencies with a Map, then sort entries by count descending and take k. The follow-up asks for better than O(n log n): bucket sort by frequency (index = count) gives O(n), and a min-heap of size k gives O(n log k). Know all three and when each wins.

## Complexity

Time O(n log n) with sort, O(n) with bucket sort. Space O(n).

## Run

```bash
node code.ts
```
