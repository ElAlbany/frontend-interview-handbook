/*
 * A39 - useKeyPress hook
 * Reference implementation: requires a React + TypeScript project (Vite, Next.js, ...).
 */
import { useEffect, useState } from "react";

export function useKeyPress(targetKey: string): boolean {
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const onDown = (event: KeyboardEvent) => {
      if (event.key === targetKey) setPressed(true);
    };
    const onUp = (event: KeyboardEvent) => {
      if (event.key === targetKey) setPressed(false);
    };
    // If the window loses focus we may never see keyup; reset defensively.
    const onBlur = () => setPressed(false);

    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    window.addEventListener("blur", onBlur);
    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);
      window.removeEventListener("blur", onBlur);
    };
  }, [targetKey]);

  return pressed;
}
