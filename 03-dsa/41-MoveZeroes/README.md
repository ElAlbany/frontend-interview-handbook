# 41. Move zeroes (in place)

**Frequency in interviews:** high

## The problem

Move all 0s to the end of the array **in place**, preserving the order of the non-zero elements. No new array — use two pointers, one marking the next insertion slot.

## Examples

- Valid: `[0,1,0,3,12]` → `[1,3,12,0,0]` (order preserved)
- Invalid: `[0,0,0]` → `[0,0,0]` unchanged, no crash

## Approach and explanation

Two pointers: `insert` marks where the next non-zero belongs. O(n), O(1) space.

## Solution

`code.js`

```js
/**
 * Problem 41 — Move zeroes to the end, in place, order preserved. O(n), O(1).
 * Run: node code.js
 */
function moveZeroes(nums) {
  let insert = 0; // where the next non-zero belongs
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      [nums[insert], nums[i]] = [nums[i], nums[insert]];
      insert++; // separate line — incrementing inside the swap assigns to the wrong slot
    }
  }
  return nums;
}

console.log(moveZeroes([0, 1, 0, 3, 12])); // [1, 3, 12, 0, 0]
console.log(moveZeroes([0, 0, 0]));        // [0, 0, 0]
console.log(moveZeroes([1, 2, 3]));        // [1, 2, 3]
```

`code.ts`

```ts
/**
 * Problem 41 — Move zeroes in place (TypeScript). O(n), O(1).
 * Run: node code.ts
 */
function moveZeroes(nums: number[]): number[] {
  let insert = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      [nums[insert], nums[i]] = [nums[i], nums[insert]];
      insert++; // separate line — incrementing inside the swap assigns to the wrong slot
    }
  }
  return nums;
}

console.log(moveZeroes([0, 1, 0, 3, 12])); // [1, 3, 12, 0, 0]
console.log(moveZeroes([0, 0, 0]));        // [0, 0, 0]
console.log(moveZeroes([1, 2, 3]));        // [1, 2, 3]
```
