/**
 * Problem 19 — Retry with exponential backoff
 * Run: node code.js
 */
async function retry(fn, attempts = 3, delay = 500) {
  try {
    return await fn();
  } catch (err) {
    if (attempts <= 1) throw err;
    await new Promise((r) => setTimeout(r, delay));
    return retry(fn, attempts - 1, delay * 2);
  }
}

// Demo: flaky function succeeds on the 3rd try
let tries = 0;
const flaky = async () => {
  tries++;
  if (tries < 3) throw new Error("fail " + tries);
  return "success on try " + tries;
};

retry(flaky, 3, 100).then(console.log); // 'success on try 3'
retry(async () => { throw new Error("always fails"); }, 2, 50)
  .catch((e) => console.log("gave up:", e.message)); // 'gave up: always fails'
