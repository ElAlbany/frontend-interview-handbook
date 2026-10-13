/**
 * A14 — First and last occurrence via biased binary search (TypeScript)
 * Run: node code.ts
 */
function firstOccurrence(arr: number[], target: number): number {
  let lo = 0, hi = arr.length - 1, result = -1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (arr[mid] >= target) {
      if (arr[mid] === target) result = mid; // candidate — but keep looking LEFT
      hi = mid - 1;
    } else {
      lo = mid + 1;
    }
  }
  return result;
}

function lastOccurrence(arr: number[], target: number): number {
  let lo = 0, hi = arr.length - 1, result = -1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (arr[mid] <= target) {
      if (arr[mid] === target) result = mid; // candidate — but keep looking RIGHT
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }
  return result;
}

const arr = [1, 2, 2, 2, 3];
console.log(firstOccurrence(arr, 2), lastOccurrence(arr, 2)); // 1 3
console.log(firstOccurrence(arr, 4), lastOccurrence(arr, 4)); // -1 -1
// count occurrences in O(log n): last - first + 1
console.log("count of 2:", lastOccurrence(arr, 2) - firstOccurrence(arr, 2) + 1); // 3
