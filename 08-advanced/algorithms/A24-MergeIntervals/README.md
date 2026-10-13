# A24 — Merge overlapping intervals

## The problem

Merge all overlapping intervals: [[1,3],[2,6],[8,10],[15,18]] -> [[1,6],[8,10],[15,18]].

## Examples

- [[1,3],[2,6],[8,10],[15,18]] -> [[1,6],[8,10],[15,18]]
- [[1,4],[4,5]] -> [[1,5]] (touching counts as overlapping)

## Approach

Sort by start time — after sorting, any overlap is always with the previous merged interval, so a single linear pass suffices: extend the current interval's end if the next one starts before it ends, otherwise push and start a new one. Sorting first is the step candidates forget.

## Complexity

Time O(n log n) for the sort, space O(n) for output.

## Run

```bash
node code.ts
```
