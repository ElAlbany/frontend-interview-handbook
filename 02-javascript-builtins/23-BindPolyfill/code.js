/**
 * Problem 23 — Function.prototype.bind from scratch
 * Run: node code.js
 */
Function.prototype.myBind = function (context, ...boundArgs) {
  const fn = this;
  return function (...callArgs) {
    return fn.apply(context, [...boundArgs, ...callArgs]);
  };
};

const user = { name: "Alice" };
function greet(greeting, punct) {
  return `${greeting}, ${this.name}${punct}`;
}

const bound = greet.myBind(user, "Hello");
console.log(bound("!")); // 'Hello, Alice!'

// this stays locked even if called differently:
const detached = bound;
console.log(detached("?")); // 'Hello, Alice?'
