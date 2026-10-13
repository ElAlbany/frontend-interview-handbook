# 84. Sticky navbar

**Frequency in interviews:** high

## The problem

Make a navbar stick to the top while scrolling using `position: sticky`. Know the two gotchas: an ancestor with `overflow: hidden` breaks it, and it sticks only within its parent's bounds.

## Approach and explanation

One property — but know the gotchas: `sticky` fails if any ancestor has `overflow: hidden`, and it sticks within its **parent's** bounds, not the whole page. Follow-up: shadow appears only after scrolling → IntersectionObserver on a sentinel, or `scroll` listener toggling a class.

## Solution

`index.html`

```html
<!-- Problem 84 — Sticky navbar. Open in a browser and scroll. -->
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <div class="navbar">Sticky Navbar — I stay on top while you scroll</div>
  <main>
    <!-- filler content so the page scrolls -->
    <p style="height: 2000px">Scroll down… the navbar stays.</p>
  </main>
</body>
</html>
```

`style.css`

```css
body { margin: 0; font-family: sans-serif; }

.navbar {
  position: sticky;
  top: 0;
  z-index: 50;
  background: white;
  padding: 16px 24px;
  font-weight: bold;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Gotchas to say out loud:
   - sticky breaks if ANY ancestor has overflow: hidden
   - it sticks within its parent's bounds, not the whole page */
```
