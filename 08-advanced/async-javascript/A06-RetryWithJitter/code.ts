/**
 * A06 — Retry with backoff, jitter, and a retry predicate (TypeScript)
 * Run: node code.ts
 */
interface RetryOptions {
  attempts?: number;
  baseDelay?: number;
  shouldRetry?: (err: unknown) => boolean;
}

async function retry<T>(fn: () => Promise<T>, options: RetryOptions = {}): Promise<T> {
  const { attempts = 3, baseDelay = 200, shouldRetry = () => true } = options;
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      return await fn();
    } catch (err) {
      if (attempt === attempts || !shouldRetry(err)) throw err;
      const backoff = baseDelay * 2 ** (attempt - 1);
      const jitter = Math.random() * backoff; // full jitter: prevents lockstep retries
      console.log(`attempt ${attempt} failed, retrying in ~${Math.round(jitter)}ms`);
      await new Promise((r) => setTimeout(r, jitter));
    }
  }
  throw new Error("unreachable");
}

let tries = 0;
const flaky = async (): Promise<string> => {
  tries++;
  if (tries < 3) throw Object.assign(new Error("server error"), { status: 503 });
  return "ok";
};

retry(flaky, { attempts: 3, baseDelay: 100 }).then(console.log); // 'ok'

// the predicate stops retries on client errors:
retry(
  async () => Promise.reject(Object.assign(new Error("bad request"), { status: 400 })),
  { attempts: 3, baseDelay: 50, shouldRetry: (e) => (e as { status: number }).status >= 500 }
).catch((e: Error) => console.log("gave up instantly:", e.message)); // no retries for a 400
