# A41. Infinite scroll component

Difficulty: Medium

## Problem

Build an `InfiniteScroll` component that calls `onLoadMore` whenever the
user scrolls close to the bottom of the list, but only while `hasMore` is true
and not while a load is already in flight (`loading`). Do not use scroll-event
math - use the IntersectionObserver API.

## Example

```tsx
<InfiniteScroll
  hasMore={page < totalPages}
  loading={status === "pending"}
  onLoadMore={() => setPage((p) => p + 1)}
>
  {items.map((item) => <Row key={item.id} item={item} />)}
</InfiniteScroll>
```

## Approach

- Render a tiny invisible sentinel div after the children and observe it with `IntersectionObserver`; when it intersects the viewport, fire `onLoadMore`.
- Use `rootMargin` (for example 200px) to start loading *before* the user actually reaches the bottom - this hides latency.
- Do not observe at all while `loading` or when `hasMore` is false; the early return plus effect dependencies handle both.
- Call `observer.disconnect()` in cleanup. Observers that outlive their element are a classic leak.

Reference implementation. It requires a React + TypeScript project (for example Vite or Next.js) and is not meant to run with plain node.

## Solution

The full implementation lives in `code.tsx` in this folder:

```tsx
/*
 * A41 - Infinite scroll component
 * Reference implementation: requires a React + TypeScript project (Vite, Next.js, ...).
 */
import { useEffect, useRef, type ReactNode } from "react";

interface InfiniteScrollProps {
  onLoadMore: () => void;
  hasMore: boolean;
  loading: boolean;
  children: ReactNode;
}

export function InfiniteScroll({ onLoadMore, hasMore, loading, children }: InfiniteScrollProps) {
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasMore || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) onLoadMore();
      },
      { rootMargin: "200px" } // start fetching before the bottom is visible
    );

    const sentinel = sentinelRef.current;
    if (sentinel) observer.observe(sentinel);
    return () => observer.disconnect();
  }, [onLoadMore, hasMore, loading]);

  return (
    <div>
      {children}
      {hasMore && <div ref={sentinelRef} style={{ height: 1 }} />}
      {loading && <p>Loading...</p>}
    </div>
  );
}
```
