/*
 * A46 - Infinite currying with implicit conversion
 * Run with: node code.ts
 */

type AddFunction = {
  (...rest: number[]): AddFunction;
  valueOf(): number;
  toString(): string;
};

function add(...args: number[]): AddFunction {
  const total = args.reduce((a, b) => a + b, 0);

  const chained = ((...rest: number[]): AddFunction => add(total, ...rest)) as AddFunction;

  // Coercion hooks: called when JS needs a primitive from this function.
  chained.valueOf = () => total;
  chained.toString = () => String(total);
  (chained as unknown as Record<symbol, unknown>)[Symbol.toPrimitive] = () => total;

  return chained;
}

console.log(Number(add(1)(2)(3)));       // 6
console.log(add(1)(2)(3)(4) + 0);        // 10
console.log(`${add(1, 2)(3)}`);          // 6
console.log(add(5)(5).valueOf() === 10); // true
