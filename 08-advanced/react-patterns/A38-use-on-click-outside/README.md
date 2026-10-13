# A38. useOnClickOutside hook

Difficulty: Medium

## Problem

Write `useOnClickOutside(ref, handler)` that calls `handler` whenever the
user clicks (or taps) anywhere *outside* the element held by `ref`. This is the
standard behavior behind dropdowns, modals, and popovers closing when you click
elsewhere.

## Example

```tsx
function Dropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => setOpen(false));
  return <div ref={ref}>{open && <ul>...</ul>}</div>;
}
```

## Approach

- Attach listeners to `document` for both `mousedown` and `touchstart` so it works on desktop and mobile.
- Inside the listener, bail out if `ref.current` is missing or if `ref.current.contains(event.target)` - that means the click was inside.
- Use `mousedown` rather than `click` so the menu closes before a click on a button inside would re-open it.
- Remove both listeners in the effect cleanup, and keep `ref` and `handler` in the dependency array.

Reference implementation. It requires a React + TypeScript project (for example Vite or Next.js) and is not meant to run with plain node.

## Solution

The full implementation lives in `code.tsx` in this folder:

```tsx
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
```
