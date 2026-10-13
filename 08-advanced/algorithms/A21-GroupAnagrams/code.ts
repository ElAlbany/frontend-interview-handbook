/**
 * A21 — Group anagrams (TypeScript)
 * Run: node code.ts
 */
function groupAnagrams(strs: string[]): string[][] {
  const groups = new Map<string, string[]>();
  for (const word of strs) {
    const key = [...word].sort().join(""); // canonical form shared by all anagrams
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(word);
  }
  return [...groups.values()];
}

console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]));
// [['eat','tea','ate'], ['tan','nat'], ['bat']]
console.log(groupAnagrams([""]));  // [['']]
console.log(groupAnagrams(["a"])); // [['a']]
