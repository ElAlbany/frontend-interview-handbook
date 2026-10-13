function reverseString(str: String): String {
  let reservedString: String = "";
  for (let i = str.length - 1; i >= 0; i--) {
    reservedString += str[i];
  }
  return reservedString;
}
const res = (s: String): String => [...s].reverse().join("");
console.log(res("hello"));
