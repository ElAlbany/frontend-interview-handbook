# 44. Rotate array by k

**Frequency in interviews:** medium

## The problem

Rotate an array to the right by `k` positions, in place. Two things they watch for: guarding `k > length` with modulo, and the elegant three-reversal trick (reverse all, reverse the first k, reverse the rest).

## Examples

- Valid: `[1,2,3,4,5]`, k=3 → `[3,4,5,1,2]`
- Invalid: k=8 with length 5 → must `k %= n` first or the result is wrong

## Approach and explanation

The three-reversal trick: reverse all, reverse first k, reverse the rest. O(n), O(1) space. Interviewers love seeing the `k %= n` guard (k can exceed length).

## Solution

`code.js`

```js
/**
 * Problem 44 — Rotate array right by k, in place (three-reversal trick)
 * Run: node code.js
 */
function rotate(nums, k) {
  const n = nums.length;
  if (n === 0) return nums;
  k %= n; // guard: k can exceed the length
  const rev = (l, r) => {
    while (l < r) {
      [nums[l], nums[r]] = [nums[r], nums[l]];
      l++; r--; // separate lines — l++/r-- inside the swap assign to the wrong slots
    }
  };
  rev(0, n - 1); rev(0, k - 1); rev(k, n - 1);
  return nums;
}

console.log(rotate([1, 2, 3, 4, 5], 3));  // [3, 4, 5, 1, 2]
console.log(rotate([1, 2, 3, 4, 5], 8));  // [3, 4, 5, 1, 2] (8 % 5 = 3)
console.log(rotate([1], 10));             // [1]
```

`code.ts`

```ts
/**
 * Problem 44 — Rotate array right by k, in place (TypeScript)
 * Run: node code.ts
 */
function rotate(nums: number[], k: number): number[] {
  const n = nums.length;
  if (n === 0) return nums;
  k %= n;
  const rev = (l: number, r: number): void => {
    while (l < r) {
      [nums[l], nums[r]] = [nums[r], nums[l]];
      l++;
      r--;
    }
  };
  rev(0, n - 1);
  rev(0, k - 1);
  rev(k, n - 1);
  return nums;
}

console.log(rotate([1, 2, 3, 4, 5], 3)); // [3, 4, 5, 1, 2]
console.log(rotate([1, 2, 3, 4, 5], 8)); // [3, 4, 5, 1, 2]
console.log(rotate([1], 10));            // [1]
```
