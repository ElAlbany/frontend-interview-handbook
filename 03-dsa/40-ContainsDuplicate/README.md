# 40. Contains duplicate

**Frequency in interviews:** high

## The problem

Return `true` if any value appears at least twice in the array. Solve it in one line with a `Set`, then be ready for the follow-up "duplicate within distance k" variant (a sliding window of the last k elements).

## Examples

- Valid: `[1,2,3,1]` → `true`
- Invalid: `[1,2,3]` → `false`

## Approach and explanation

One line. The Set-size trick O(n). Follow-up "within distance k": keep a sliding window Set of the last k elements.

## Solution

`code.js`

```js
/**
 * Problem 40 — Contains duplicate
 * Run: node code.js
 */
const containsDuplicate = (nums) => new Set(nums).size !== nums.length;

// follow-up: duplicate within distance k (sliding window)
function containsNearbyDuplicate(nums, k) {
  const window = new Set();
  for (let i = 0; i < nums.length; i++) {
    if (window.has(nums[i])) return true;
    window.add(nums[i]);
    if (window.size > k) window.delete(nums[i - k]);
  }
  return false;
}

console.log(containsDuplicate([1, 2, 3, 1])); // true
console.log(containsDuplicate([1, 2, 3]));    // false
console.log(containsNearbyDuplicate([1, 2, 3, 1], 3)); // true
console.log(containsNearbyDuplicate([1, 2, 3, 1], 2)); // false
```

`code.ts`

```ts
/**
 * Problem 40 — Contains duplicate + nearby-duplicate follow-up (TypeScript)
 * Run: node code.ts
 */
const containsDuplicate = (nums: number[]): boolean => new Set(nums).size !== nums.length;

function containsNearbyDuplicate(nums: number[], k: number): boolean {
  const window = new Set<number>();
  for (let i = 0; i < nums.length; i++) {
    if (window.has(nums[i])) return true;
    window.add(nums[i]);
    if (window.size > k) window.delete(nums[i - k]);
  }
  return false;
}

console.log(containsDuplicate([1, 2, 3, 1]));          // true
console.log(containsDuplicate([1, 2, 3]));             // false
console.log(containsNearbyDuplicate([1, 2, 3, 1], 3)); // true
console.log(containsNearbyDuplicate([1, 2, 3, 1], 2)); // false
```
