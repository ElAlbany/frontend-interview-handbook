# 82. Center a div — four ways

**Frequency in interviews:** very high

## The problem

Center a child div horizontally and vertically — give four different ways, then say which you'd pick (grid `place-items`) and why.

## Approach and explanation

Name all four, then say which you'd pick and why: "Grid `place-items` — one line, works for both axes."

## Solution

`index.html`

```html
<!-- Problem 82 — Center a div, 4 ways. Open this file in a browser. -->
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <h2>1. Flexbox</h2>
  <div class="demo flex-parent"><div class="box">flex</div></div>

  <h2>2. Grid (shortest)</h2>
  <div class="demo grid-parent"><div class="box">grid</div></div>

  <h2>3. Absolute + transform (classic)</h2>
  <div class="demo abs-parent"><div class="box abs-child">absolute</div></div>

  <h2>4. Margin auto (horizontal only)</h2>
  <div class="demo"><div class="box margin-child">margin</div></div>
</body>
</html>
```

`style.css`

```css
.demo { height: 160px; background: #f1f5f9; margin-bottom: 16px; position: relative; }
.box { background: #3b82f6; color: white; padding: 16px 24px; border-radius: 8px; width: fit-content; }

/* 1. Flexbox — the standard answer */
.flex-parent { display: flex; justify-content: center; align-items: center; }

/* 2. Grid — one line for both axes */
.grid-parent { display: grid; place-items: center; }

/* 3. Absolute + transform — the pre-flexbox classic */
.abs-child { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); }

/* 4. Margin auto — horizontal centering of a block with a width */
.margin-child { margin: 0 auto; }
```
