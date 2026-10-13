/**
 * Problem 7 — TypeScript version (generics + keyof)
 * Run: node code.ts   (lowercase .ts — Node 24 strips types natively)
 */
interface Car {
  id: number;
  brand: string;
}

const cars: Car[] = [
  { id: 1, brand: "Toyota" },
  { id: 2, brand: "BMW" },
  { id: 1, brand: "Toyota" },
];

function uniqueBy<T, K extends keyof T>(arr: T[], key: K): T[] {
  const set = new Set<T[K]>();
  return arr.filter((item) => !set.has(item[key]) && set.add(item[key]));
}

console.log(uniqueBy(cars, "id"));
console.log(uniqueBy(cars, "brand"));
// console.log(uniqueBy(cars, "color")); // compile error: not a key of Car
