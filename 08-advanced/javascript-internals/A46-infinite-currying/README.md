# A46. Infinite currying with implicit conversion

Difficulty: Medium

## Problem

Implement `add` so that all of these work:

- `add(1)(2)(3)` can be called with any number of chained invocations.
- When the result is coerced to a primitive (via `Number()`, the `+` operator,
  or string interpolation), it evaluates to the running total.

Expected behavior is shown below. The trick is that a function is also an
object, so it can carry both a call signature and coercion hooks.

## Example

```ts
Number(add(1)(2)(3));    // 6
add(1)(2)(3)(4) + 0;      // 10
`${add(1, 2)(3)}`;        // "6"
add(5)(5).valueOf();      // 10
```

## Approach

- Each call adds its arguments to an accumulated total held in a closure, and returns a new function that does the same.
- The returned function defines `valueOf`, `toString`, and `Symbol.toPrimitive` returning the total. JavaScript calls these when it needs a primitive from the function object.
- `Symbol.toPrimitive` takes precedence over `valueOf`/`toString`; defining all three covers older engines and every coercion context.
- Supporting both `add(1, 2)` and `add(1)(2)` just means summing `...args` instead of a single argument.

Run with: node code.ts (Node 24+ recommended, runs TypeScript directly).

## Solution

The full implementation lives in `code.ts` in this folder:

```ts
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
```
