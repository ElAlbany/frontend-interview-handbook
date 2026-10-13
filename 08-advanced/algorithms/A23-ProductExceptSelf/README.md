# A23 — Product of array except self

## The problem

Return an array where each position holds the product of all other elements — without division, in O(n).

## Examples

- [1,2,3,4] -> [24,12,8,6]
- [-1,1,0,-3,3] -> [0,0,9,0,0]

## Approach

Two passes. First pass builds prefix products (product of everything to the left). Second pass walks right-to-left multiplying by a running suffix product. The output array doubles as the prefix table, keeping extra space at O(1). The constraint 'no division' exists because of zeros — and because the prefix/suffix idea is what they want to see.

## Complexity

Time O(n), space O(1) extra (output array excluded).

## Run

```bash
node code.ts
```
