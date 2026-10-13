/**
 * Problem 37 — Binary search (TypeScript). Input MUST be sorted. O(log n).
 * Run: node code.ts
 */
function binarySearch(arr: number[], target: number): number {
  let lo = 0,
    hi = arr.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (arr[mid] === target) return mid;
    arr[mid] < target ? (lo = mid + 1) : (hi = mid - 1);
  }
  return -1;
}

console.log(binarySearch([1, 3, 5, 7, 9], 5)); // 2
console.log(binarySearch([1, 3, 5, 7, 9], 4)); // -1
console.log(binarySearch([], 1));              // -1
