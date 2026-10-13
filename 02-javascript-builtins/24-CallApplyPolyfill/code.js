/**
 * Problem 24 — call/apply from scratch
 * Run: node code.js
 */
Function.prototype.myCall = function (context, ...args) {
  context = Object(context ?? globalThis);
  const key = Symbol();
  context[key] = this;
  const result = context[key](...args); // called as a method -> this = context
  delete context[key];
  return result;
};

Function.prototype.myApply = function (context, argsArray) {
  return this.myCall(context, ...(argsArray ?? []));
};

function introduce(age) {
  return `${this.name}, ${age}`;
}

console.log(introduce.myCall({ name: "Alice" }, 23));    // 'Alice, 23'
console.log(introduce.myApply({ name: "Sara" }, [25])); // 'Sara, 25'
