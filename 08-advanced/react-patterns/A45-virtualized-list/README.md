# A45. Virtualized list (windowing)

Difficulty: Hard

## Problem

Render a list of 100,000 rows without rendering 100,000 DOM nodes.
Implement `VirtualizedList` from scratch: fixed `rowHeight`, a fixed-height
scroll container, and a `renderRow(item, index)` prop. Only the visible rows
(plus a small `overscan` buffer) should exist in the DOM at any time.

This is what libraries like react-window do; interviewers ask for the core
mechanism.

## Example

```tsx
<VirtualizedList
  items={rows}              // 100_000 items
  rowHeight={32}
  height={480}              // viewport height in px
  renderRow={(row, i) => <span>{i}. {row.name}</span>}
/>
```

## Approach

- Track `scrollTop` in state from the container's `onScroll`.
- Compute the visible window: `start = floor(scrollTop / rowHeight) - overscan`, `end = ceil((scrollTop + height) / rowHeight) + overscan`, clamped to the array bounds.
- Render an inner spacer div with `height = items.length * rowHeight` so the scrollbar reflects the full list.
- Position each rendered row absolutely at `top: index * rowHeight` inside the spacer.
- Overscan (rendering a few extra rows above/below) hides blank flashes during fast scrolling.

Reference implementation. It requires a React + TypeScript project (for example Vite or Next.js) and is not meant to run with plain node.

## Solution

The full implementation lives in `code.tsx` in this folder:

```tsx
/*
 * A45 - Virtualized list (windowing)
 * Reference implementation: requires a React + TypeScript project (Vite, Next.js, ...).
 */
import { useState, type ReactNode, type UIEvent } from "react";

interface VirtualizedListProps<T> {
  items: T[];
  rowHeight: number;
  height: number; // viewport height in px
  renderRow: (item: T, index: number) => ReactNode;
  overscan?: number; // extra rows rendered above/below the viewport
}

export function VirtualizedList<T>({
  items,
  rowHeight,
  height,
  renderRow,
  overscan = 5,
}: VirtualizedListProps<T>) {
  const [scrollTop, setScrollTop] = useState(0);

  const start = Math.max(0, Math.floor(scrollTop / rowHeight) - overscan);
  const end = Math.min(
    items.length,
    Math.ceil((scrollTop + height) / rowHeight) + overscan
  );

  const onScroll = (e: UIEvent<HTMLDivElement>) =>
    setScrollTop(e.currentTarget.scrollTop);

  return (
    <div onScroll={onScroll} style={{ height, overflowY: "auto" }}>
      {/* Spacer: gives the scrollbar the full-list height */}
      <div style={{ height: items.length * rowHeight, position: "relative" }}>
        {items.slice(start, end).map((item, i) => {
          const index = start + i;
          return (
            <div
              key={index}
              style={{
                position: "absolute",
                top: index * rowHeight,
                height: rowHeight,
                width: "100%",
              }}
            >
              {renderRow(item, index)}
            </div>
          );
        })}
      </div>
    </div>
  );
}
```
