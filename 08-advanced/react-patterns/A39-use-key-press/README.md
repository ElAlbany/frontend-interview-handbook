# A39. useKeyPress hook

Difficulty: Easy-Medium

## Problem

Implement `useKeyPress(targetKey)` which returns `true` while the given
keyboard key (for example `"Enter"`, `"Escape"`, `"ArrowDown"`) is held down
and `false` otherwise. It must update on both `keydown` and `keyup`, and react
correctly when `targetKey` changes.

## Example

```tsx
function Editor() {
  const shiftDown = useKeyPress("Shift");
  const escPressed = useKeyPress("Escape");
  // shiftDown === true only while Shift is physically held
}
```

## Approach

- State is a boolean; flip it to `true` on `keydown` and to `false` on `keyup`, comparing `event.key` to `targetKey`.
- Both listeners live in one effect that depends on `targetKey`, so switching keys re-subscribes cleanly.
- Return a cleanup that removes both listeners - forgetting `keyup` leaks a listener per render.
- Optional hardening (worth mentioning in interviews): reset to `false` on window `blur`, because `keyup` can be missed if focus leaves the window.

Reference implementation. It requires a React + TypeScript project (for example Vite or Next.js) and is not meant to run with plain node.

## Solution

The full implementation lives in `code.tsx` in this folder:

```tsx
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
```
