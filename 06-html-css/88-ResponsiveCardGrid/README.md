# 88. Responsive card grid

**Frequency in interviews:** very high

## The problem

Build a responsive card grid with **zero media queries**: `repeat(auto-fill, minmax(240px, 1fr))`. Be able to explain every piece of that one line.

## Approach and explanation

One line, fully responsive — `auto-fill` + `minmax` means cards never shrink below 240px and extra columns appear as space allows, **no media queries needed**. In Tailwind: `grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4`. This is the modern answer that surprises interviewers expecting breakpoint soup.

## Solution

`index.html`

```html
<!-- Problem 88 — Responsive card grid with ZERO media queries. Open and resize. -->
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <div class="grid">
    <div class="card">Card 1</div>
    <div class="card">Card 2</div>
    <div class="card">Card 3</div>
    <div class="card">Card 4</div>
    <div class="card">Card 5</div>
    <div class="card">Card 6</div>
  </div>
</body>
</html>
```

`style.css`

```css
body { font-family: sans-serif; padding: 24px; margin: 0; }

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  /* auto-fill: create as many columns as fit
     minmax(240px, 1fr): never below 240px, share leftover space equally */
  gap: 16px;
}

.card {
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 12px;
  padding: 32px;
  text-align: center;
}

/* Tailwind equivalent: grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4 */
```
