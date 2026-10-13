/*
 * A38 - useOnClickOutside hook
 * Reference implementation: requires a React + TypeScript project (Vite, Next.js, ...).
 */
import { useEffect, type RefObject } from "react";

export function useOnClickOutside<T extends HTMLElement>(
  ref: RefObject<T | null>,
  handler: (event: MouseEvent | TouchEvent) => void
): void {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      // Do nothing when the ref is unset or the click was inside the element.
      if (!ref.current || !target || ref.current.contains(target)) return;
      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}
