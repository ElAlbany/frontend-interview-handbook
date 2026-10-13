# A35 — Minimum meeting rooms

## The problem

Given meeting time intervals, find the minimum number of rooms needed so no meeting overlaps: [[0,30],[5,10],[15,20]] -> 2.

## Examples

- [[0,30],[5,10],[15,20]] -> 2
- [[7,10],[2,4]] -> 1 (no overlap)

## Approach

Sweep line with two sorted arrays: sort all start times and all end times separately. Walk starts in order; if the next start is before the earliest active end, a new room is needed, otherwise a room frees up (advance the end pointer). The peak number of simultaneous meetings is the answer. Equivalent to a min-heap of end times — know both framings.

## Complexity

Time O(n log n) for sorting, space O(n).

## Run

```bash
node code.ts
```
