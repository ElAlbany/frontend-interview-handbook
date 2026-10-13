/**
 * Problem 15 — Group by key (TypeScript, overloads for string key or function)
 * Run: node code.ts
 */
function groupBy<T, K extends keyof T>(arr: T[], key: K): Record<string, T[]>;
function groupBy<T>(arr: T[], key: (item: T) => string): Record<string, T[]>;
function groupBy<T>(arr: T[], key: keyof T | ((item: T) => string)): Record<string, T[]> {
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
