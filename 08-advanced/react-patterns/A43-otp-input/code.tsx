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
