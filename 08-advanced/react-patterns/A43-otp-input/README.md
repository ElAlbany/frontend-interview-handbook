# A43. OTP input component

Difficulty: Medium-Hard

## Problem

Build a one-time-password input: `length` single-character boxes (default 6)
behaving as one logical field. Requirements:

- Typing a digit fills the current box and moves focus to the next.
- Only digits are accepted.
- `Backspace` in an empty box moves focus to the previous box.
- Pasting `"1 2 3 4 5 6"` (or any string) distributes its digits across boxes.
- The component is fully controlled: `value` / `onChange` with a string.

## Example

```tsx
const [code, setCode] = useState("");
<OtpInput length={6} value={code} onChange={setCode} />
// code === "483920" as the user types or pastes
```

## Approach

- Store the real value in the parent as one string; derive per-box characters with `padEnd(length).split('')` so boxes and value never disagree.
- Keep an array of input refs (`useRef<Array<HTMLInputElement | null>>([])`) and move focus imperatively with `focusAt(i)`.
- Sanitize every input path with `replace(/\D/g, '')`: typing, and paste via `onPaste` + `clipboardData`.
- On `Backspace` with an empty current box, move focus back one - this is the detail most candidates miss.

Reference implementation. It requires a React + TypeScript project (for example Vite or Next.js) and is not meant to run with plain node.

## Solution

The full implementation lives in `code.tsx` in this folder:

```tsx
/*
 * A43 - OTP input component
 * Reference implementation: requires a React + TypeScript project (Vite, Next.js, ...).
 */
import { useRef, type ChangeEvent, type ClipboardEvent, type KeyboardEvent } from "react";

interface OtpInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
}

export function OtpInput({ length = 6, value, onChange }: OtpInputProps) {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const digits = value.padEnd(length, " ").slice(0, length).split("");

  const focusAt = (i: number) => inputsRef.current[i]?.focus();

  const writeDigit = (i: number, ch: string) => {
    const next = value.padEnd(length, " ").split("");
    next[i] = ch || " ";
    onChange(next.join("").trimEnd());
  };

  const handleChange = (i: number) => (e: ChangeEvent<HTMLInputElement>) => {
    const ch = e.target.value.replace(/\D/g, "").slice(-1);
    writeDigit(i, ch);
    if (ch && i < length - 1) focusAt(i + 1);
  };

  const handleKeyDown = (i: number) => (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      if (digits[i].trim()) {
        writeDigit(i, "");
      } else if (i > 0) {
        writeDigit(i - 1, "");
        focusAt(i - 1);
      }
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    if (!text) return;
    onChange(text);
    focusAt(Math.min(text.length, length - 1));
  };

  return (
    <div style={{ display: "flex", gap: 8 }}>
      {digits.map((d, i) => (
        <input
          key={i}
          ref={(el) => {
            inputsRef.current[i] = el;
          }}
          value={d.trim()}
          onChange={handleChange(i)}
          onKeyDown={handleKeyDown(i)}
          onPaste={handlePaste}
          inputMode="numeric"
          autoComplete={i === 0 ? "one-time-code" : "off"}
          maxLength={1}
          style={{ width: 40, height: 48, textAlign: "center", fontSize: 20 }}
        />
      ))}
    </div>
  );
}
```
