function palindrome(str: String): Boolean {
  for (let i = 0; i < str.length / 2; i++) {
    if (str[i] !== str[str.length - i - 1]) return false;
  }
  return true;
}
const pali = (s: String): Boolean => s === [...s].reverse().join("");
pali("hh") ? console.log("Yes") : console.log("No");
