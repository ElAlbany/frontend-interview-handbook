function palindrome(str) {
  for (let i = 0; i < str.length / 2; i++) {
    if (str[i] !== str[str.length - i - 1]) return false;
  }
  return true;
}
const pal = (s) => s === [...s].reverse().join("");
const res = pal("racecar") ? console.log("Yes") : console.log("No");
