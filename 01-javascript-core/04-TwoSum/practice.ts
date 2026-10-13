function TwoSum(nums: number[], target: number): [number, number] {
  let a = -1,
    b = -1;
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    if (map.has(target - nums[i])) ((a = i), (b = map.get(target - nums[i])));
    else map.set(nums[i], i);
  }
  return [b, a];
}
const nums: number[] = [2, 7, 11, 15];
const target: number = 9;
const expected: number[] = [0, 1];

let [a, b]: [number, number] = TwoSum(nums, target);
console.log(a, " ", b);
