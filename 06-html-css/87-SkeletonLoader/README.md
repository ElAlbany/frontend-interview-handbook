# 87. Skeleton loader

**Frequency in interviews:** high

## The problem

Build a shimmer skeleton loader with a moving gradient animated via `background-position`, and explain why skeletons beat spinners (they preview the layout and avoid CLS).

## Approach and explanation

The shimmer is a moving gradient, animated via `background-position` (compositor-friendly, no layout thrash). Ties into perceived-performance questions — skeletons beat spinners because they preview the layout and prevent CLS.

## Solution

`index.html`

```html
<!-- Problem 87 — Shimmer skeleton loader. Open in a browser. -->
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <div class="card">
    <div class="skeleton avatar"></div>
    <div class="skeleton line" style="width: 60%"></div>
    <div class="skeleton line" style="width: 90%"></div>
    <div class="skeleton line" style="width: 40%"></div>
  </div>
</body>
</html>
```

`style.css`

```css
body { font-family: sans-serif; padding: 24px; }
.card { width: 320px; display: grid; gap: 12px; }

.skeleton {
  border-radius: 8px;
  background: linear-gradient(90deg, #e2e8f0 25%, #f8fafc 50%, #e2e8f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;   /* moves the gradient — no layout thrash */
}
.avatar { width: 48px; height: 48px; border-radius: 50%; }
.line   { height: 16px; }

@keyframes shimmer {
  from { background-position: 200% 0; }
  to   { background-position: -200% 0; }
}

/* Why skeletons beat spinners: they preview the layout and prevent CLS. */
```
