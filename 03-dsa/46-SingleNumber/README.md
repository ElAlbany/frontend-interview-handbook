# 46. Single number (every element appears twice except one)

**Frequency in interviews:** medium

## The problem

Every element in the array appears twice except one — find the loner in O(n) time and O(1) space. The elegant answer is XOR (pairs cancel); if it doesn't come to mind, offer the frequency-Map version first.

## Examples

- Valid: `[4,1,2,1,2]` → `4`
- Invalid: `[]` → `0` from XOR — call out that input is guaranteed non-empty or guard it

## Approach and explanation

XOR: `a ^ a = 0` and `a ^ 0 = a`, so pairs cancel and the loner survives. O(n), O(1). If you don't recall XOR, the Set/Map frequency answer is acceptable — offer it first, then XOR.

## Solution

`code.js`

```js
/**
 * Problem 46 — Single number (all others appear twice). XOR: O(n), O(1).
 * Run: node code.js
 */
const singleNumber = (nums) => nums.reduce((acc, n) => acc ^ n, 0);
// a ^ a = 0, a ^ 0 = a -> pairs cancel, the loner survives

// fallback answer if XOR doesn't come to mind: frequency Map
function singleNumberMap(nums) {
  const count = new Map();
  for (const n of nums) count.set(n, (count.get(n) || 0) + 1);
  for (const [n, c] of count) if (c === 1) return n;
}

console.log(singleNumber([4, 1, 2, 1, 2]));    // 4
console.log(singleNumber([7]));                // 7
console.log(singleNumberMap([4, 1, 2, 1, 2])); // 4
```

`code.ts`

```ts
/**
 * Problem 46 — Single number via XOR (TypeScript). O(n), O(1).
 * Run: node code.ts
 */
const singleNumber = (nums: number[]): number => nums.reduce((acc, n) => acc ^ n, 0);

function singleNumberMap(nums: number[]): number | undefined {
  const count = new Map<number, number>();
  for (const n of nums) count.set(n, (count.get(n) ?? 0) + 1);
  for (const [n, c] of count) if (c === 1) return n;
  return undefined;
}

console.log(singleNumber([4, 1, 2, 1, 2]));    // 4
console.log(singleNumber([7]));                // 7
console.log(singleNumberMap([4, 1, 2, 1, 2])); // 4
```
