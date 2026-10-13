# 83. Holy grail layout (header / nav / main / aside / footer)

**Frequency in interviews:** high

## The problem

Build the classic layout — header, footer, left nav, right aside, main filling the middle — using `grid-template-areas` so the CSS literally draws the layout. Follow-up: collapse to one column on mobile.

## Approach and explanation

`grid-template-areas` lets you *draw* the layout in the CSS. Follow-up: "make it responsive" → one media query that collapses to a single column.

## Solution

`index.html`

```html
<!-- Problem 83 — Holy grail layout with grid-template-areas. Open in a browser. -->
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="style.css" />
</head>
<body class="page">
  <header>Header</header>
  <nav>Nav</nav>
  <main>Main content — resize the window below 700px to see the mobile collapse</main>
  <aside>Aside</aside>
  <footer>Footer</footer>
</body>
</html>
```

`style.css`

```css
.page {
  display: grid;
  grid-template-areas:
    "header header header"
    "nav    main   aside"
    "footer footer footer";
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 200px 1fr 200px;
  min-height: 100vh;
  margin: 0;
  font-family: sans-serif;
  text-align: center;
}
header { grid-area: header; background: #3b82f6; color: white; padding: 16px; }
nav    { grid-area: nav;     background: #bfdbfe; padding: 16px; }
main   { grid-area: main;    background: #eff6ff; padding: 16px; }
aside  { grid-area: aside;   background: #bfdbfe; padding: 16px; }
footer { grid-area: footer;  background: #1e3a8a; color: white; padding: 16px; }

/* follow-up: one column on mobile */
@media (max-width: 700px) {
  .page {
    grid-template-areas: "header" "nav" "main" "aside" "footer";
    grid-template-columns: 1fr;
  }
}
```
