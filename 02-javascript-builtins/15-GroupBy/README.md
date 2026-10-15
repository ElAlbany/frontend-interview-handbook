# 15. Group array of objects by a key

**Frequency in interviews:** high

## The problem

Write `groupBy(array, key)` that groups objects into an object of arrays by the given key: orders by status → `{ pending: [...], paid: [...] }`. Bonus: accept a **function** as the key, like lodash does.

## Examples

- Valid: `groupBy(orders, 'status')` → `{ pending: [...], paid: [...] }`
- Invalid: an item missing the key lands in an `undefined` group — mention it

## Approach and explanation

Accepting a function OR a string key (like lodash) earns extra points. O(n).

## Solution

`code.js`

```js
/**
 * Problem 15 — Group array of objects by a key (string or function)
 * Run: node code.js
 */
function groupBy(arr, key) {
  return arr.reduce((acc, item) => {
    const k = typeof key === "function" ? key(item) : item[key];
    (acc[k] ??= []).push(item);
    return acc;
  }, {});
}

const orders = [
  { id: 1, status: "pending" },
  { id: 2, status: "paid" },
  { id: 3, status: "pending" },
];

console.log(groupBy(orders, "status"));
// { pending: [{id:1...},{id:3...}], paid: [{id:2...}] }
console.log(groupBy([1, 2, 3, 4], (n) => (n % 2 ? "odd" : "even")));
// { odd: [1,3], even: [2,4] }
```

`code.ts`

```ts
/**
 * Problem 15 — Group by key (TypeScript, overloads for string key or function)
 * Run: node code.ts
 */
function groupBy<T, K extends keyof T>(arr: T[], key: K): Record<string, T[]>;
function groupBy<T>(arr: T[], key: (item: T) => string): Record<string, T[]>;
function groupBy<T>(
  arr: T[],
  key: keyof T | ((item: T) => string),
): Record<string, T[]> {
  return arr.reduce<Record<string, T[]>>((acc, item) => {
    const k = typeof key === "function" ? key(item) : String(item[key]);
    (acc[k] ??= []).push(item);
    return acc;
  }, {});
}

interface Order {
  id: number;
  status: string;
}
const orders: Order[] = [
  { id: 1, status: "pending" },
  { id: 2, status: "paid" },
  { id: 3, status: "pending" },
];

console.log(groupBy(orders, "status")); // { pending: [...], paid: [...] }
console.log(groupBy([1, 2, 3, 4], (n) => (n % 2 ? "odd" : "even"))); // { odd: [1,3], even: [2,4] }
```
