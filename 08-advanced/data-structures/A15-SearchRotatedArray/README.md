# A15 — Search in a rotated sorted array

## The problem

A sorted array was rotated at some pivot ([4,5,6,7,0,1,2]). Find a target in O(log n).

## Examples

- [4,5,6,7,0,1,2], target 0 -> 4
- target 3 -> -1

## Approach

One half of any rotated array is always sorted. At each midpoint, determine which half is sorted (`nums[lo] <= nums[mid]` means the left half is), then check whether the target lies inside that half's range to decide which side to discard. The sorted-half check is the insight the interviewer is waiting for.

## Complexity

Time O(log n), space O(1).

## Run

```bash
node code.ts
```
