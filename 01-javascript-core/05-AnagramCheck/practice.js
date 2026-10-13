function Anagram(str1, str2) {
  if (str1.length !== str2.length) return false;
  const count = {};
  for (const ch of str1) count[ch] = (count[count] || 0) + 1;
  for (const ch of str2) {
    if (!count[ch]) return false;
    count[ch]--;
  }

  return true;
}

Anagram("silent", "listen") ? console.log("true") : console.log(false);

// function Anagram(str1, str2) {
//   if (str1.length !== str2.length) return false;
//   const m1 = new Map();
//   const m2 = new Map();
//   const l = str1.length;
//   for (let i = 0; i < l; i++) {
//     if (!m1.has(str1[i])) m1.set(str1[i], 1);
//     else m1.set(str1[i], m1.get(str1[i]) + 1);
//     if (!m2.has(str2[i])) m2.set(str2[i], 1);
//     else m2.set(str2[i], m2.get(str2[i]) + 1);
//   }

//   if (m1.length !== m2.length) return false;
//   for (const [key, value] of m1) {
//     if (!m2.has(key)) return false;
//     if (m2.get(key) !== value) return false;
//     m1.delete(key);
//     m2.delete(key);
//   }
//   if (m1.length || m2.length) return false;
//   return true;
// }
