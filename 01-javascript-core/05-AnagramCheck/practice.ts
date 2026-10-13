function Anagram(str1: String, str2: String): boolean {
  if (str1.length !== str2.length) return false;
  const count: Record<string, number> = {};
  for (const ch of str1) count[ch] = (count[ch] || 0) + 1;
  for (const ch of str2) {
    if (!count[ch]) return false;
    count[ch]--;
  }

  return true;
}

Anagram("silent", "listen") ? console.log("true") : console.log(false);
